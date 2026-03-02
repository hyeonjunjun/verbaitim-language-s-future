import { useState, useRef, useEffect, useCallback } from "react";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import WaveformPlayer, { type WaveformPlayerHandle } from "@/components/WaveformPlayer";
import { useAudioStore } from "@/hooks/useAudioStore";
import { toast } from "sonner";
import { fetchPhoibleInventory, type PhoibleInventory } from "@/lib/datasets";
import {
    Play,
    Pause,
    Settings,
    Mic,
    Wand2,
    FileText,
    ChevronDown,
    ChevronUp,
    Layers,
    Sparkles,
    Save,
    Download,
    Plus,
    Users,
    Upload,
    Loader2,
    Trash2,
    X,
    AlertCircle,
    FileJson,
    FileSpreadsheet,
    BookOpen,
} from "lucide-react";

const WorkbenchEditor = () => {
    const waveformRef = useRef<WaveformPlayerHandle>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const ipaInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("ipa");
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [phoibleData, setPhoibleData] = useState<PhoibleInventory | null>(null);
    const [phoibleLoading, setPhoibleLoading] = useState(false);
    const [showPhoiblePanel, setShowPhoiblePanel] = useState(false);
    const activeIpaRef = useRef<string | null>(null); // tracks focused segment id

    // Global keyboard listener for Spacebar play/pause
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only toggle play if we are NOT typing inside an input/textarea
            if (e.code === "Space" && e.target instanceof HTMLElement) {
                if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                    e.preventDefault();
                    if (waveformRef.current) {
                        waveformRef.current.playPause();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Auto-fetch PHOIBLE phoneme inventory when language changes
    useEffect(() => {
        if (!selectedLanguage || selectedLanguage === "ipa") {
            setPhoibleData(null);
            return;
        }
        let cancelled = false;
        setPhoibleLoading(true);
        fetchPhoibleInventory(selectedLanguage).then((inv) => {
            if (!cancelled) {
                setPhoibleData(inv);
                setPhoibleLoading(false);
                if (inv && inv.phonemes.length > 0) setShowPhoiblePanel(true);
            }
        });
        return () => { cancelled = true; };
    }, [selectedLanguage]);

    // Insert a phoneme chip into the active IPA input
    const insertPhoneme = useCallback((phoneme: string) => {
        const segId = activeIpaRef.current;
        if (!segId) return;
        const input = ipaInputRefs.current[segId];
        if (!input) return;
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const newVal = input.value.slice(0, start) + phoneme + input.value.slice(end);
        // Trigger react synthetic change so the store stays in sync
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        nativeSetter?.call(input, newVal);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
        input.setSelectionRange(start + phoneme.length, start + phoneme.length);
    }, []);

    // Zustand store
    const {
        audioFile,
        audioUrl,
        fileName,
        segments,
        isTranscribing,
        transcriptionError,
        loadAudioFile,
        clearAudio,
        transcribe,
        updateSegment,
        addSegment,
        removeSegment,
        confidenceThreshold,
        defaultExport,
    } = useAudioStore();

    // ── File handling ────────────────────────────────────────────────

    const handleFileSelect = useCallback(
        (file: File) => {
            const allowedTypes = [
                "audio/wav",
                "audio/mpeg",
                "audio/mp3",
                "audio/ogg",
                "audio/flac",
                "audio/x-wav",
                "audio/webm",
                "video/webm",
            ];
            // Also accept by extension
            const ext = file.name.split(".").pop()?.toLowerCase();
            const allowedExts = ["wav", "mp3", "ogg", "flac", "webm", "m4a"];

            if (
                !allowedTypes.includes(file.type) &&
                !allowedExts.includes(ext || "")
            ) {
                alert("Please upload an audio file (WAV, MP3, OGG, FLAC, WebM).");
                return;
            }
            loadAudioFile(file);
        },
        [loadAudioFile]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFileSelect(file);
        },
        [handleFileSelect]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
        },
        [handleFileSelect]
    );

    // ── Time formatting ──────────────────────────────────────────────

    function formatDisplayTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    // ── Confidence colour helper (respects persisted threshold) ──────────
    function confColor(confidence: number) {
        if (confidence >= 95) return "sage";
        if (confidence >= confidenceThreshold) return "signal";
        return "ochre";
    }

    // ── Export helpers ───────────────────────────────────────────────────

    function exportJSON() {
        const data = JSON.stringify(
            segments.map((s) => ({
                timestamp: s.time,
                startTime: s.startTime,
                endTime: s.endTime,
                speaker: s.speaker,
                ipa: s.ipa,
                meaning: s.meaning,
                confidence: s.confidence,
            })),
            null,
            2
        );
        triggerDownload(data, `${fileName || "verbaitim-export"}.json`, "application/json");
    }

    function exportCSV() {
        const header = "Timestamp,StartTime,EndTime,Speaker,IPA,Meaning,Confidence";
        const rows = segments.map((s) =>
            [
                s.time,
                s.startTime,
                s.endTime,
                `"${s.speaker}"`,
                `"${s.ipa.replace(/"/g, "'")}"`,
                `"${s.meaning.replace(/"/g, "'")}"`,
                s.confidence,
            ].join(",")
        );
        const data = [header, ...rows].join("\n");
        triggerDownload(data, `${fileName || "verbaitim-export"}.csv`, "text/csv");
    }

    function triggerDownload(content: string, filename: string, mimeType: string) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        setShowExportMenu(false);
        toast.success(`Exported as ${filename.split(".").pop()?.toUpperCase()}`);
    }

    function handleSave() {
        // Persist to localStorage via the store (already done via persist middleware).
        // In the future this will POST to /api/sessions/:id/segments.
        toast.success("Session saved", {
            description: `${segments.length} segments stored locally.`,
        });
    }

    // ── Highlight the row whose time range includes the current playhead ──
    const activeSegmentId = segments.find(
        (s) => currentTime >= s.startTime && currentTime <= s.endTime
    )?.id;

    return (
        <WorkbenchLayout>
            <div className="h-full flex flex-col overflow-hidden">
                {/* ─── Editor Toolbar ─────────────────────────────── */}
                <div className="h-12 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 transition-colors duration-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border">
                            <button className="p-1 px-2 hover:bg-accent/50 rounded flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors">
                                <Layers size={14} className="text-muted-foreground" /> Layers
                            </button>
                            <button className="p-1 px-2 bg-signal/15 text-signal rounded flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider border border-signal/30 shadow-inner">
                                <Mic size={14} /> Editor
                            </button>
                        </div>
                        <div className="h-4 w-px bg-border mx-2" />
                        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/60">
                            <span className="text-foreground/80 font-bold tracking-tighter">
                                {fileName || "No file loaded"}
                            </span>
                            {fileName && (
                                <>
                                    <span className="mx-2">/</span>
                                    <span className="italic">Layer: Phonemic_Draft</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Transcribe Button */}
                        {audioFile && !isTranscribing && (
                            <button
                                onClick={() => transcribe(selectedLanguage)}
                                className="flex items-center gap-2 px-4 py-1.5 bg-signal text-white rounded-lg text-xs font-bold hover:bg-signal/90 transition-all active:scale-95 shadow-lg shadow-signal/20"
                            >
                                <Wand2 size={14} />
                                Transcribe
                            </button>
                        )}
                        {isTranscribing && (
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-signal/20 text-signal rounded-lg text-xs font-bold border border-signal/30">
                                <Loader2 size={14} className="animate-spin" />
                                Transcribing…
                            </div>
                        )}

                        {segments.length > 0 && (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 text-foreground rounded-lg text-xs font-bold hover:bg-accent transition-all active:scale-95 border border-border"
                            >
                                <Save size={14} /> Save
                            </button>
                        )}

                        {/* Export / Download menu */}
                        {segments.length > 0 && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowExportMenu((v) => !v)}
                                    className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-accent/50 transition-all"
                                    title="Export segments"
                                >
                                    <Download size={16} />
                                </button>
                                {showExportMenu && (
                                    <>
                                        {/* Click-away backdrop */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowExportMenu(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                                            <div className="px-3 py-2 border-b border-border">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Export As</p>
                                            </div>
                                            <button
                                                onClick={exportJSON}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent/50 transition-colors text-left"
                                            >
                                                <FileJson size={14} className="text-signal" />
                                                <span className="font-semibold">JSON</span>
                                                <span className="ml-auto text-[10px] text-muted-foreground/50">structured</span>
                                            </button>
                                            <button
                                                onClick={exportCSV}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent/50 transition-colors text-left"
                                            >
                                                <FileSpreadsheet size={14} className="text-sage" />
                                                <span className="font-semibold">CSV</span>
                                                <span className="ml-auto text-[10px] text-muted-foreground/50">spreadsheet</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <button className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-accent/50 transition-all">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* ─── PHOIBLE Phoneme Reference Panel ───────────── */}
                {(phoibleData || phoibleLoading) && (
                    <div className="shrink-0 border-b border-border">
                        <button
                            onClick={() => setShowPhoiblePanel((v) => !v)}
                            className="w-full flex items-center justify-between px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-foreground hover:bg-accent/30 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <BookOpen size={11} />
                                PHOIBLE Phoneme Inventory — {phoibleData?.languageName ?? selectedLanguage.toUpperCase()}
                                {phoibleData && (
                                    <span className="text-signal font-mono">({phoibleData.phonemes.length} phones)</span>
                                )}
                            </span>
                            {showPhoiblePanel ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                        {showPhoiblePanel && (
                            <div className="px-6 py-3 bg-background/30">
                                {phoibleLoading ? (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50 italic">
                                        <Loader2 size={12} className="animate-spin" /> Loading from phoible.org…
                                    </div>
                                ) : phoibleData && phoibleData.phonemes.length > 0 ? (
                                    <div className="space-y-2">
                                        {["consonant", "vowel"].map((cls) => {
                                            const phones = phoibleData.phonemes.filter((p) => p.class === cls);
                                            if (!phones.length) return null;
                                            return (
                                                <div key={cls} className="flex items-start gap-3 flex-wrap">
                                                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold w-16 pt-1 shrink-0">{cls}s</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {phones.map((p) => (
                                                            <button
                                                                key={p.phoneme}
                                                                onClick={() => insertPhoneme(p.phoneme)}
                                                                title={`Insert /${p.phoneme}/ (${p.class})`}
                                                                className="px-2 py-0.5 rounded font-mono text-sm bg-card border border-border/60 text-foreground hover:bg-signal/10 hover:border-signal/30 hover:text-signal active:scale-95 transition-all"
                                                            >
                                                                {p.phoneme}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <p className="text-[9px] text-muted-foreground/30 font-mono italic pt-1">
                                            Click a phone to insert it at the cursor position in the active IPA field. Source: PHOIBLE / {phoibleData.source}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground/40 italic">No phoneme data found for this language in PHOIBLE.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ─── The Workspace Grid ─────────────────────────── */}
                <div className="flex-1 flex min-h-0">
                    {/* Main Stage */}
                    <div className="flex-1 flex flex-col min-w-0 border-r border-white/5 overflow-hidden">

                        {/* ─── Waveform / Upload Area ─────────────── */}
                        {!audioFile ? (
                            /* Empty State: Drop Zone */
                            <div
                                className={`h-64 border-b border-border relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shrink-0 ${isDragOver
                                    ? "bg-signal/10 border-signal/40"
                                    : "bg-background/50 hover:bg-card/50"
                                    }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleInputChange}
                                    className="hidden"
                                />
                                <div
                                    className={`flex flex-col items-center gap-4 transition-transform duration-300 ${isDragOver ? "scale-110" : ""
                                        }`}
                                >
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragOver
                                            ? "bg-signal/20 text-signal shadow-lg shadow-signal/20"
                                            : "bg-card border border-border text-muted-foreground"
                                            }`}
                                    >
                                        <Upload size={28} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-foreground mb-1">
                                            {isDragOver
                                                ? "Drop to load audio"
                                                : "Drop audio file or click to upload"}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-widest">
                                            WAV • MP3 • OGG • FLAC • WebM
                                        </p>
                                    </div>
                                </div>
                                {/* Subtle grid pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{
                                        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                                        backgroundSize: "20px 20px",
                                    }}
                                />
                            </div>
                        ) : (
                            /* Waveform View */
                            <div className="h-64 bg-background/50 border-b border-border relative flex flex-col overflow-hidden shrink-0 transition-colors">
                                {/* Clear button */}
                                <button
                                    onClick={clearAudio}
                                    className="absolute top-3 right-3 z-30 p-1.5 text-muted-foreground/60 hover:text-foreground hover:bg-destructive/10 rounded-lg transition-all"
                                    title="Remove audio"
                                >
                                    <X size={14} />
                                </button>

                                {/* Waveform */}
                                <div className="flex-1 relative flex items-center bg-card shadow-inner">
                                    <WaveformPlayer
                                        ref={waveformRef}
                                        audioUrl={audioUrl}
                                        className="w-full h-full"
                                        onTimeUpdate={setCurrentTime}
                                        onReady={setDuration}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                </div>

                                {/* Playback Controls */}
                                <div className="h-14 bg-card border-t border-border flex items-center px-6 gap-6 shrink-0 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => waveformRef.current?.playPause()}
                                            className="w-10 h-10 rounded-full bg-signal text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-signal/30"
                                        >
                                            {isPlaying ? (
                                                <Pause size={18} fill="currentColor" />
                                            ) : (
                                                <Play size={18} fill="currentColor" className="ml-1" />
                                            )}
                                        </button>
                                        <div className="font-mono text-xs text-muted-foreground font-bold tracking-tighter">
                                            {formatDisplayTime(currentTime)} /{" "}
                                            {formatDisplayTime(duration)}
                                        </div>
                                    </div>

                                    <div className="flex-1 flex items-center gap-3 max-w-sm">
                                        <Settings size={14} className="text-muted-foreground" />
                                        <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div
                                                className="h-full bg-signal/60 rounded-full transition-all duration-100"
                                                style={{
                                                    width: duration
                                                        ? `${(currentTime / duration) * 100}%`
                                                        : "0%",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <select
                                            value={selectedLanguage}
                                            onChange={(e) => setSelectedLanguage(e.target.value)}
                                            className="bg-background/50 px-2.5 py-1.5 rounded-lg border border-border font-mono text-[10px] text-muted-foreground focus:outline-none focus:ring-1 focus:ring-signal/30"
                                        >
                                            <option value="ipa">Universal IPA</option>
                                            <option value="que">Quechua</option>
                                            <option value="mri">Māori</option>
                                            <option value="lkt">Lakota</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─── Annotation Grid ────────────────────── */}
                        <div className="flex-1 overflow-y-auto bg-background/20 transition-colors">
                            {/* Error banner */}
                            {transcriptionError && (
                                <div className="mx-6 mt-4 flex items-center gap-3 px-4 py-3 bg-ochre/10 border border-ochre/20 rounded-xl text-xs text-ochre">
                                    <AlertCircle size={14} />
                                    <span>
                                        Backend unavailable — showing demo data.{" "}
                                        <span className="text-muted-foreground italic">
                                            ({transcriptionError})
                                        </span>
                                    </span>
                                </div>
                            )}

                            {segments.length === 0 && !isTranscribing ? (
                                /* Empty annotation state */
                                <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
                                    <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground/40 mb-4">
                                        <FileText size={24} />
                                    </div>
                                    <p className="text-sm font-semibold text-foreground/60 mb-1">
                                        No annotations yet
                                    </p>
                                    <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-widest max-w-xs">
                                        {audioFile
                                            ? 'Click "Transcribe" to analyze the audio'
                                            : "Upload an audio file to get started"}
                                    </p>
                                </div>
                            ) : (
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border shadow-sm z-20">
                                        <tr className="text-left">
                                            <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border w-24">
                                                Timestamp
                                            </th>
                                            <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border w-24">
                                                Speaker
                                            </th>
                                            <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border">
                                                IPA Transcription
                                            </th>
                                            <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border">
                                                English Translation
                                            </th>
                                            <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-20">
                                                Conf.
                                            </th>
                                            <th className="px-3 py-3 w-10" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Loading skeleton */}
                                        {isTranscribing && segments.length === 0 && (
                                            <>
                                                {[1, 2, 3].map((i) => (
                                                    <tr key={`skel_${i}`} className="border-b border-border/50">
                                                        <td className="px-6 py-5 border-r border-border/50">
                                                            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                                                        </td>
                                                        <td className="px-6 py-5 border-r border-border/50">
                                                            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                                                        </td>
                                                        <td className="px-6 py-5 border-r border-border/50">
                                                            <div className="h-6 w-48 bg-muted rounded animate-pulse mb-1" />
                                                            <div className="h-3 w-32 bg-muted/50 rounded animate-pulse" />
                                                        </td>
                                                        <td className="px-6 py-5 border-r border-border/50">
                                                            <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="h-4 w-10 bg-muted rounded animate-pulse mx-auto" />
                                                        </td>
                                                        <td className="px-3 py-5" />
                                                    </tr>
                                                ))}
                                            </>
                                        )}

                                        {/* Actual segment rows */}
                                        {segments.map((row) => (
                                            <tr
                                                key={row.id}
                                                className={`border-b border-border/50 group hover:bg-accent/30 focus-within:bg-accent/40 transition-colors ${activeSegmentId === row.id
                                                    ? "bg-signal/5 border-l-2 border-l-signal"
                                                    : ""
                                                    }`}
                                            >
                                                <td className="px-6 py-5 font-mono text-xs text-muted-foreground border-r border-border/50">
                                                    <button
                                                        className="flex items-center gap-2 hover:text-signal transition-colors"
                                                        onClick={() => {
                                                            if (duration > 0) {
                                                                waveformRef.current?.seekTo(
                                                                    row.startTime / duration
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            className={`w-1.5 h-1.5 rounded-full ${confColor(row.confidence) === "sage"
                                                                ? "bg-sage"
                                                                : confColor(row.confidence) === "signal"
                                                                    ? "bg-signal/60"
                                                                    : "bg-ochre"
                                                                }`}
                                                        />
                                                        {row.time}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-5 border-r border-border/50">
                                                    <input
                                                        type="text"
                                                        value={row.speaker}
                                                        onChange={(e) =>
                                                            updateSegment(row.id, {
                                                                speaker: e.target.value,
                                                            })
                                                        }
                                                        className="w-full bg-transparent font-bold text-xs text-foreground/80 border border-transparent rounded px-1 py-0.5 hover:border-border/60 focus:border-signal/40 focus:bg-background/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition-all"
                                                    />
                                                </td>
                                                <td className="px-6 py-5 border-r border-border/50">
                                                    <input
                                                        ref={(el) => { ipaInputRefs.current[row.id] = el; }}
                                                        type="text"
                                                        value={row.ipa}
                                                        onChange={(e) =>
                                                            updateSegment(row.id, {
                                                                ipa: e.target.value,
                                                            })
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                // Find the next segment index
                                                                const currentIndex = segments.findIndex(s => s.id === row.id);
                                                                if (currentIndex !== -1 && currentIndex < segments.length - 1) {
                                                                    const nextSegmentId = segments[currentIndex + 1].id;
                                                                    const nextInput = ipaInputRefs.current[nextSegmentId];
                                                                    // Scroll and focus next input
                                                                    if (nextInput) {
                                                                        nextInput.focus();
                                                                        nextInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                    }
                                                                } else if (currentIndex === segments.length - 1) {
                                                                    // If we are on the last one, maybe add a new segment and focus it
                                                                    addSegment();
                                                                }
                                                            }
                                                        }}
                                                        onFocus={() => { activeIpaRef.current = row.id; }}
                                                        className="w-full bg-transparent font-serif text-lg text-foreground border border-transparent rounded px-2 py-1 -mx-2 -my-1 hover:border-border/60 focus:border-signal/40 focus:bg-background/50 focus:outline-none focus:ring-1 focus:ring-signal/20 transition-all mb-1"
                                                    />
                                                    <div className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-muted-foreground transition-colors italic">
                                                        {row.confidence > 0
                                                            ? "Auto-Generated"
                                                            : "Manual Entry"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 border-r border-border/50">
                                                    <input
                                                        type="text"
                                                        value={row.meaning}
                                                        onChange={(e) =>
                                                            updateSegment(row.id, {
                                                                meaning: e.target.value,
                                                            })
                                                        }
                                                        onKeyDown={(e) => {
                                                            // On enter, cycle back to the next IPA input
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                const currentIndex = segments.findIndex(s => s.id === row.id);
                                                                if (currentIndex !== -1 && currentIndex < segments.length - 1) {
                                                                    const nextSegmentId = segments[currentIndex + 1].id;
                                                                    const nextInput = ipaInputRefs.current[nextSegmentId];
                                                                    if (nextInput) {
                                                                        nextInput.focus();
                                                                        nextInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        className="w-full bg-transparent border border-transparent rounded-md px-2 py-1 -mx-2 -my-1 text-muted-foreground hover:border-border/80 focus:border-signal/40 focus:bg-background/50 focus:text-foreground focus:outline-none focus:ring-1 focus:ring-signal/20 text-sm italic font-reading transition-all"
                                                    />
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col items-center">
                                                        <span
                                                            className={`text-[10px] font-mono font-bold mb-1 ${confColor(row.confidence) === "sage"
                                                                ? "text-sage"
                                                                : confColor(row.confidence) === "signal"
                                                                    ? "text-muted-foreground"
                                                                    : "text-ochre"
                                                                }`}
                                                        >
                                                            {row.confidence > 0
                                                                ? `${row.confidence}%`
                                                                : "—"}
                                                        </span>
                                                        <div className="w-10 h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                                            <div
                                                                className={`h-full rounded-full transition-all ${confColor(row.confidence) === "sage"
                                                                    ? "bg-sage"
                                                                    : confColor(row.confidence) === "signal"
                                                                        ? "bg-signal/60"
                                                                        : "bg-ochre"
                                                                    }`}
                                                                style={{
                                                                    width: `${row.confidence}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-5">
                                                    <button
                                                        onClick={() =>
                                                            removeSegment(row.id)
                                                        }
                                                        className="p-1 text-muted-foreground/30 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all rounded hover:bg-destructive/10"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {/* Add segment row */}
                                        {(segments.length > 0 || audioFile) && (
                                            <tr className="bg-signal/5 border-b border-border">
                                                <td className="px-6 py-12 text-center" colSpan={6}>
                                                    <button
                                                        onClick={addSegment}
                                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-signal/15 border border-signal/20 rounded-xl text-xs font-bold text-signal hover:bg-signal/20 transition-all shadow-inner"
                                                    >
                                                        <Plus size={14} /> Add Segment
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* ─── AI / Inspector Sidebar ─────────────────── */}
                    <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden shrink-0 transition-colors">
                        <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                AI Inspector
                            </h3>
                            <Sparkles size={14} className="text-signal" />
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Transcription Result */}
                            {segments.length > 0 && (
                                <div>
                                    <h4 className="flex items-center gap-2 text-xs font-semibold mb-4 text-foreground/80">
                                        <Wand2 size={14} className="text-signal" /> Phonetic
                                        Suggestions
                                    </h4>
                                    <div className="space-y-3">
                                        {segments.slice(0, 3).map((seg) => (
                                            <div
                                                key={seg.id}
                                                className="p-3 bg-background/50 border border-border/50 rounded-xl hover:border-signal/30 transition-all cursor-pointer group shadow-sm"
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-serif text-base text-foreground truncate mr-2">
                                                        {seg.ipa || "—"}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${seg.confidence > 95
                                                            ? "bg-sage/15 text-sage"
                                                            : seg.confidence > 90
                                                                ? "bg-signal/15 text-signal"
                                                                : "bg-ochre/15 text-ochre"
                                                            }`}
                                                    >
                                                        {seg.confidence}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-[8px] uppercase tracking-widest text-muted-foreground/40 font-bold italic">
                                                        {seg.time} — {seg.speaker}
                                                    </div>
                                                    <button
                                                        className="text-[9px] text-signal font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity hover:underline underline-offset-2"
                                                        onClick={() => {
                                                            if (duration > 0) {
                                                                waveformRef.current?.seekTo(
                                                                    seg.startTime / duration
                                                                );
                                                                waveformRef.current?.play();
                                                            }
                                                        }}
                                                    >
                                                        Play
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ByT5 Synthesis Panel */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-semibold mb-4 text-foreground/80">
                                    <FileText size={14} className="text-signal/80" /> ByT5
                                    Synthesis
                                </h4>
                                <div className="p-4 bg-gradient-to-br from-signal/15 to-signal/5 border border-signal/20 rounded-xl shadow-inner relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--signal),0.08)_0%,transparent_60%)]" />
                                    <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider italic relative z-10">
                                        Predicted Orthography
                                    </p>
                                    <p className="font-display text-xl text-foreground mb-4 italic relative z-10">
                                        {segments.length > 0
                                            ? segments[0].meaning || "Awaiting input…"
                                            : "Awaiting transcription…"}
                                    </p>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sage/15 text-sage">
                                                {segments.length > 0
                                                    ? `${segments[0].confidence}%`
                                                    : "—"}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground/70">
                                                confidence
                                            </span>
                                        </div>
                                        {segments.length > 0 && (
                                            <button className="text-[10px] text-signal font-bold uppercase px-2.5 py-1 rounded-md bg-signal/10 hover:bg-signal/20 transition-colors">
                                                Commit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Speaker Analysis */}
                            {segments.length > 0 && (
                                <div className="p-6 bg-background/30 border border-border rounded-2xl shadow-sm">
                                    <h4 className="text-xs font-semibold mb-4 text-foreground/80 font-mono tracking-tighter">
                                        Speaker: {segments[0].speaker}
                                    </h4>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-xl bg-signal/15 border border-signal/20 flex items-center justify-center text-signal shadow-inner">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-foreground">
                                                {segments[0].speaker}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground/80 uppercase font-mono italic">
                                                {segments.filter(
                                                    (s) =>
                                                        s.speaker === segments[0].speaker
                                                ).length}{" "}
                                                segments detected
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full w-4/5 bg-signal" />
                                        </div>
                                        <p className="text-[8px] text-muted-foreground/50 text-center uppercase tracking-[0.2em] font-bold">
                                            Vocal Signature Matched
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Empty sidebar state */}
                            {segments.length === 0 && !isTranscribing && (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Sparkles
                                        size={24}
                                        className="text-muted-foreground/20 mb-4"
                                    />
                                    <p className="text-xs text-muted-foreground/40 max-w-[200px]">
                                        Upload and transcribe audio to see AI-powered
                                        phonetic analysis here
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchEditor;
