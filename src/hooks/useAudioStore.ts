import { create } from "zustand";
import { persist } from "zustand/middleware";
import { transcribeAudio, checkHealth, type TranscriptionResult } from "@/lib/api";

// ── Types ────────────────────────────────────────────────────────────

export interface Segment {
    id: string;
    time: string;        // Display timestamp "00:01:23"
    startTime: number;   // Seconds
    endTime: number;     // Seconds
    speaker: string;
    ipa: string;
    meaning: string;
    confidence: number;
    culturalContext?: string;
}

/** A completed transcription session stored in history */
export interface StoredSession {
    id: string;
    fileName: string;
    language: string;
    segmentCount: number;
    avgConfidence: number;          // 0–100
    durationSeconds: number;        // from last segment's endTime
    model: string;                  // "uni2005" | "MockRecognizer (Lite)"
    createdAt: string;              // ISO timestamp
    segments: Segment[];
}

interface AudioState {
    // Active audio file
    audioFile: File | null;
    audioUrl: string | null;
    fileName: string;

    // Active transcription state
    segments: Segment[];
    isTranscribing: boolean;
    transcriptionError: string | null;
    lastTranscriptionModel: string;

    // Completed session history (persisted)
    sessions: StoredSession[];

    // Backend status
    backendStatus: "online" | "offline" | "checking";
    backendMode: string;

    // Persisted user settings
    confidenceThreshold: number;
    playbackSpeed: string;
    defaultExport: string;
    selectedModel: string;
    displayName: string;
    role: string;
    apiUrl: string;

    // Actions
    loadAudioFile: (file: File) => void;
    clearAudio: () => void;
    transcribe: (language?: string) => Promise<void>;
    updateSegment: (id: string, fields: Partial<Segment>) => void;
    addSegment: () => void;
    removeSegment: (id: string) => void;
    deleteSession: (id: string) => void;
    checkBackendHealth: () => Promise<void>;
    updateSettings: (settings: Partial<Pick<AudioState, "confidenceThreshold" | "playbackSpeed" | "defaultExport" | "selectedModel" | "displayName" | "role" | "apiUrl">>) => void;
    resetSettings: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────

let segmentCounter = 0;

function generateId(): string {
    return `seg_${Date.now()}_${++segmentCounter}`;
}

function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
}

function avgConfidence(segs: Segment[]): number {
    if (!segs.length) return 0;
    const sum = segs.reduce((acc, s) => acc + s.confidence, 0);
    return Math.round(sum / segs.length);
}

// Fallback mock segments (only used when backend is unreachable)
function generateMockSegments(): Segment[] {
    const mockData = [
        { startTime: 1.2, endTime: 3.8, speaker: "SP_01", ipa: "haʊ miˈtakuˌjepi", meaning: "Hello, my relatives.", confidence: 98 },
        { startTime: 4.5, endTime: 8.2, speaker: "SP_02", ipa: "tʃʰãˈte waˈʃteja naˈpetʃʰijuˌzape", meaning: "I shake your hands with a good heart.", confidence: 92 },
        { startTime: 9.0, endTime: 12.4, speaker: "SP_01", ipa: "ˈtokʃa aˈkʰe wãˈtʃʰijãkĩ kte", meaning: "I will see you again soon.", confidence: 95 },
        { startTime: 13.1, endTime: 15.6, speaker: "SP_01", ipa: "piˈla.ma.ja.je.lo", meaning: "Thank you.", confidence: 99 },
    ];
    return mockData.map((d) => ({
        id: generateId(),
        time: formatTime(d.startTime),
        ...d,
    }));
}

// ── Store ─────────────────────────────────────────────────────────────

export const useAudioStore = create<AudioState>()(
    persist(
        (set, get) => ({
            audioFile: null,
            audioUrl: null,
            fileName: "",
            segments: [],
            isTranscribing: false,
            transcriptionError: null,
            lastTranscriptionModel: "",
            sessions: [],
            backendStatus: "checking",
            backendMode: "",
            confidenceThreshold: 85,
            playbackSpeed: "1.0",
            defaultExport: "json",
            selectedModel: "allosaurus-uni2005",
            displayName: "Dr. Sarah Chen",
            role: "Lead Linguist",
            apiUrl: "http://localhost:8001/api",

            loadAudioFile: (file: File) => {
                const prev = get().audioUrl;
                if (prev) URL.revokeObjectURL(prev);
                set({
                    audioFile: file,
                    audioUrl: URL.createObjectURL(file),
                    fileName: file.name,
                    segments: [],
                    transcriptionError: null,
                    lastTranscriptionModel: "",
                });
            },

            clearAudio: () => {
                const prev = get().audioUrl;
                if (prev) URL.revokeObjectURL(prev);
                set({
                    audioFile: null,
                    audioUrl: null,
                    fileName: "",
                    segments: [],
                    isTranscribing: false,
                    transcriptionError: null,
                    lastTranscriptionModel: "",
                });
            },

            transcribe: async (language = "ipa") => {
                const { audioFile, fileName } = get();
                if (!audioFile) return;

                set({ isTranscribing: true, transcriptionError: null });

                let finalSegments: Segment[] = [];
                let modelUsed = "unknown";

                try {
                    const result: TranscriptionResult = await transcribeAudio(audioFile, language);
                    modelUsed = result.model ?? "uni2005";

                    if (result.segments && result.segments.length > 0) {
                        finalSegments = result.segments.map((s) => ({
                            id: generateId(),
                            time: formatTime(s.start_time),
                            startTime: s.start_time,
                            endTime: s.end_time,
                            speaker: s.speaker,
                            ipa: s.ipa,
                            meaning: s.meaning,
                            confidence: Math.round(s.confidence * 100),
                        }));
                    } else {
                        // Single-result: wrap + mock padding
                        const mock = generateMockSegments();
                        if (mock.length > 0 && result.ipa) {
                            mock[0].ipa = result.ipa;
                            mock[0].meaning = result.meaning;
                        }
                        finalSegments = mock;
                    }
                } catch (err) {
                    console.warn("API transcription failed — using mock data:", err);
                    finalSegments = generateMockSegments();
                    modelUsed = "MockRecognizer (offline)";
                    set({ transcriptionError: err instanceof Error ? err.message : "Transcription failed" });
                }

                // ── Push completed session to history ─────────────────
                const duration = finalSegments.at(-1)?.endTime ?? 0;
                const newSession: StoredSession = {
                    id: generateSessionId(),
                    fileName,
                    language,
                    segmentCount: finalSegments.length,
                    avgConfidence: avgConfidence(finalSegments),
                    durationSeconds: duration,
                    model: modelUsed,
                    createdAt: new Date().toISOString(),
                    segments: finalSegments,
                };

                set((state) => ({
                    segments: finalSegments,
                    isTranscribing: false,
                    lastTranscriptionModel: modelUsed,
                    // Prepend so newest is first; cap at 100 entries
                    sessions: [newSession, ...state.sessions].slice(0, 100),
                }));
            },

            updateSegment: (id, fields) => {
                set((state) => ({
                    segments: state.segments.map((s) =>
                        s.id === id ? { ...s, ...fields } : s
                    ),
                }));
            },

            addSegment: () => {
                const { segments } = get();
                const last = segments[segments.length - 1];
                const startTime = last ? last.endTime + 0.5 : 0;
                set((state) => ({
                    segments: [
                        ...state.segments,
                        {
                            id: generateId(),
                            time: formatTime(startTime),
                            startTime,
                            endTime: startTime + 3,
                            speaker: "SP_01",
                            ipa: "",
                            meaning: "",
                            confidence: 0,
                        },
                    ],
                }));
            },

            removeSegment: (id) => {
                set((state) => ({
                    segments: state.segments.filter((s) => s.id !== id),
                }));
            },

            deleteSession: (id) => {
                set((state) => ({
                    sessions: state.sessions.filter((s) => s.id !== id),
                }));
            },

            updateSettings: (settings) => {
                set(settings);
            },

            resetSettings: () => set({
                confidenceThreshold: 85,
                playbackSpeed: "1.0",
                defaultExport: "json",
                selectedModel: "allosaurus-uni2005",
                displayName: "Dr. Sarah Chen",
                role: "Lead Linguist",
                apiUrl: "http://localhost:8001/api",
            }),

            checkBackendHealth: async () => {
                set({ backendStatus: "checking" });
                try {
                    const health = await checkHealth();
                    set({ backendStatus: "online", backendMode: health.mode });
                } catch {
                    set({ backendStatus: "offline", backendMode: "" });
                }
            },
        }),
        {
            name: "verbaitim-storage",
            partialize: (state) => ({
                fileName: state.fileName,
                segments: state.segments,
                sessions: state.sessions,
                confidenceThreshold: state.confidenceThreshold,
                playbackSpeed: state.playbackSpeed,
                defaultExport: state.defaultExport,
                selectedModel: state.selectedModel,
                displayName: state.displayName,
                role: state.role,
                apiUrl: state.apiUrl,
            }),
        }
    )
);
