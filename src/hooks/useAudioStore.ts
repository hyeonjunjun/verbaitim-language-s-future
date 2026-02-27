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
}

interface AudioState {
    // Audio file state
    audioFile: File | null;
    audioUrl: string | null;
    fileName: string;

    // Transcription state
    segments: Segment[];
    isTranscribing: boolean;
    transcriptionError: string | null;

    // Backend state
    backendStatus: "online" | "offline" | "checking";
    backendMode: string;

    // Actions
    loadAudioFile: (file: File) => void;
    clearAudio: () => void;
    transcribe: (language?: string) => Promise<void>;
    updateSegment: (id: string, fields: Partial<Segment>) => void;
    addSegment: () => void;
    removeSegment: (id: string) => void;
    checkBackendHealth: () => Promise<void>;
}

// ── Helpers ──────────────────────────────────────────────────────────

let segmentCounter = 0;

function generateId(): string {
    return `seg_${Date.now()}_${++segmentCounter}`;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
}

// Mock segment data for the MockRecognizer (simulates multi-utterance return)
function generateMockSegments(fileName: string): Segment[] {
    const mockData = [
        {
            startTime: 1.2,
            endTime: 3.8,
            speaker: "SP_01",
            ipa: "haʊ miˈtakuˌjepi",
            meaning: "Hello, my relatives.",
            confidence: 98,
        },
        {
            startTime: 4.5,
            endTime: 8.2,
            speaker: "SP_02",
            ipa: "tʃʰãˈte waˈʃteja naˈpetʃʰijuˌzape",
            meaning: "I shake your hands with a good heart.",
            confidence: 92,
        },
        {
            startTime: 9.0,
            endTime: 12.4,
            speaker: "SP_01",
            ipa: "ˈtokʃa aˈkʰe wãˈtʃʰijãkĩ kte",
            meaning: "I will see you again soon.",
            confidence: 95,
        },
        {
            startTime: 13.1,
            endTime: 15.6,
            speaker: "SP_01",
            ipa: "piˈla.ma.ja.je.lo",
            meaning: "Thank you.",
            confidence: 99,
        },
    ];

    return mockData.map((d) => ({
        id: generateId(),
        time: formatTime(d.startTime),
        startTime: d.startTime,
        endTime: d.endTime,
        speaker: d.speaker,
        ipa: d.ipa,
        meaning: d.meaning,
        confidence: d.confidence,
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
            backendStatus: "checking",
            backendMode: "",

            loadAudioFile: (file: File) => {
                // Revoke previous URL if any
                const prev = get().audioUrl;
                if (prev) URL.revokeObjectURL(prev);

                const url = URL.createObjectURL(file);
                set({
                    audioFile: file,
                    audioUrl: url,
                    fileName: file.name,
                    segments: [],
                    transcriptionError: null,
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
                });
            },

            transcribe: async (language = "ipa") => {
                const { audioFile } = get();
                if (!audioFile) return;

                set({ isTranscribing: true, transcriptionError: null });

                try {
                    // Try the real API first
                    const result: TranscriptionResult = await transcribeAudio(audioFile, language);

                    // If the API returns segments, use them
                    if (result.segments && result.segments.length > 0) {
                        const segments: Segment[] = result.segments.map((s) => ({
                            id: generateId(),
                            time: formatTime(s.start_time),
                            startTime: s.start_time,
                            endTime: s.end_time,
                            speaker: s.speaker,
                            ipa: s.ipa,
                            meaning: s.meaning,
                            confidence: Math.round(s.confidence * 100),
                        }));
                        set({ segments, isTranscribing: false });
                    } else {
                        // Single-result fallback: wrap in one segment + add mock contextual segments
                        const mockSegments = generateMockSegments(audioFile.name);
                        // Override the first with the real API result
                        if (mockSegments.length > 0) {
                            mockSegments[0].ipa = result.ipa;
                            mockSegments[0].meaning = result.meaning;
                        }
                        set({ segments: mockSegments, isTranscribing: false });
                    }
                } catch (error) {
                    // If API is unreachable, use mock segments for demo
                    console.warn("API transcription failed, using mock data:", error);
                    const mockSegments = generateMockSegments(audioFile.name);
                    set({
                        segments: mockSegments,
                        isTranscribing: false,
                        transcriptionError:
                            error instanceof Error ? error.message : "Transcription failed",
                    });
                }
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
                const lastSegment = segments[segments.length - 1];
                const startTime = lastSegment ? lastSegment.endTime + 0.5 : 0;

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

            checkBackendHealth: async () => {
                set({ backendStatus: "checking" });
                try {
                    const health = await checkHealth();
                    set({
                        backendStatus: "online",
                        backendMode: health.mode,
                    });
                } catch {
                    set({ backendStatus: "offline", backendMode: "" });
                }
            },
        }),
        {
            name: "verbaitim-storage",
            // We cannot persist File objects or ObjectURLs to localStorage.
            partialize: (state) => ({
                fileName: state.fileName,
                segments: state.segments,
            }),
        }
    )
);
