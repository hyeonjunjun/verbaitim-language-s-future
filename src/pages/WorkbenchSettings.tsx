import { useState, useEffect } from "react";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { useAudioStore } from "@/hooks/useAudioStore";
import {
    Cpu,
    Volume2,
    Download,
    Globe,
    User,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react";

// ── Component ────────────────────────────────────────────────────────

const WorkbenchSettings = () => {
    const { backendStatus, backendMode, checkBackendHealth } = useAudioStore();
    const [apiUrl, setApiUrl] = useState("http://localhost:8001/api");
    const [confidenceThreshold, setConfidenceThreshold] = useState(85);
    const [defaultExport, setDefaultExport] = useState("json");
    const [playbackSpeed, setPlaybackSpeed] = useState("1.0");
    const [displayName, setDisplayName] = useState("Dr. Sarah Chen");
    const [role, setRole] = useState("Lead Linguist");

    useEffect(() => {
        checkBackendHealth();
    }, [checkBackendHealth]);

    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">
                        Settings
                    </Headline>
                    <Text className="text-muted-foreground/80">
                        Configure your workbench preferences and backend connection.
                    </Text>
                </div>

                <div className="space-y-8">
                    {/* ── 1. Transcription Model ──────────────────── */}
                    <section className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-signal/10 text-signal rounded-lg shadow-inner">
                                <Cpu size={18} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-sm text-foreground">
                                    Transcription Model
                                </h2>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                    Phonetic recognition engine
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {/* Model selector */}
                            <div>
                                <label className="text-xs font-semibold text-foreground/80 mb-2 block">
                                    Active Model
                                </label>
                                <div className="relative">
                                    <select className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-signal/30 transition-all">
                                        <option>Allosaurus — uni2005 (Universal)</option>
                                        <option>Allosaurus — eng2020 (English)</option>
                                        <option>MockRecognizer (Lite Demo)</option>
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                    />
                                </div>
                            </div>

                            {/* Confidence threshold */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-semibold text-foreground/80">
                                        Confidence Threshold
                                    </label>
                                    <span className="text-xs font-mono font-bold text-signal">
                                        {confidenceThreshold}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={50}
                                    max={99}
                                    value={confidenceThreshold}
                                    onChange={(e) =>
                                        setConfidenceThreshold(Number(e.target.value))
                                    }
                                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-signal"
                                />
                                <p className="text-[10px] text-muted-foreground/50 mt-1 italic">
                                    Segments below this threshold will be flagged for manual review.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ── 2. Audio Settings ────────────────────────── */}
                    <section className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-signal/10 text-signal rounded-lg shadow-inner">
                                <Volume2 size={18} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-sm text-foreground">
                                    Audio Settings
                                </h2>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                    Playback and recording defaults
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-semibold text-foreground/80 mb-2 block">
                                    Default Sample Rate
                                </label>
                                <div className="relative">
                                    <select className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-signal/30 transition-all">
                                        <option>44,100 Hz (CD Quality)</option>
                                        <option>48,000 Hz (Professional)</option>
                                        <option>22,050 Hz (Low Bandwidth)</option>
                                        <option>16,000 Hz (Speech Optimized)</option>
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-foreground/80 mb-2 block">
                                    Playback Speed
                                </label>
                                <div className="flex items-center gap-2">
                                    {["0.5", "0.75", "1.0", "1.25", "1.5"].map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => setPlaybackSpeed(speed)}
                                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${playbackSpeed === speed
                                                    ? "bg-signal/15 text-signal border border-signal/30 shadow-inner"
                                                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                }`}
                                        >
                                            {speed}x
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── 3. Export Preferences ────────────────────── */}
                    <section className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-signal/10 text-signal rounded-lg shadow-inner">
                                <Download size={18} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-sm text-foreground">
                                    Export Preferences
                                </h2>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                    Default output format
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: "json", label: "JSON", desc: "Structured data interchange" },
                                { id: "csv", label: "CSV", desc: "Spreadsheet compatible" },
                                { id: "elan", label: "ELAN XML", desc: "Linguistic annotation" },
                            ].map((format) => (
                                <button
                                    key={format.id}
                                    onClick={() => setDefaultExport(format.id)}
                                    className={`p-4 rounded-xl border text-left transition-all ${defaultExport === format.id
                                            ? "bg-signal/10 border-signal/30 shadow-inner"
                                            : "bg-background border-border hover:border-signal/20"
                                        }`}
                                >
                                    <p
                                        className={`text-sm font-bold mb-1 ${defaultExport === format.id
                                                ? "text-signal"
                                                : "text-foreground"
                                            }`}
                                    >
                                        {format.label}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground/60">
                                        {format.desc}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* ── 4. Backend Connection ────────────────────── */}
                    <section className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-signal/10 text-signal rounded-lg shadow-inner">
                                <Globe size={18} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-sm text-foreground">
                                    Backend Connection
                                </h2>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                    API server configuration
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-semibold text-foreground/80 mb-2 block">
                                    API Endpoint
                                </label>
                                <input
                                    type="text"
                                    value={apiUrl}
                                    onChange={(e) => setApiUrl(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-signal/30 transition-all"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                                <div className="flex items-center gap-3">
                                    {backendStatus === "online" ? (
                                        <CheckCircle2 size={18} className="text-sage" />
                                    ) : backendStatus === "checking" ? (
                                        <Loader2 size={18} className="text-muted-foreground animate-spin" />
                                    ) : (
                                        <AlertCircle size={18} className="text-ochre" />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {backendStatus === "online"
                                                ? "Connected"
                                                : backendStatus === "checking"
                                                    ? "Checking…"
                                                    : "Disconnected"}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground/60 font-mono">
                                            {backendStatus === "online"
                                                ? `Mode: ${backendMode} · Latency: <50ms`
                                                : "Unable to reach API server"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={checkBackendHealth}
                                    className="text-xs font-bold text-signal hover:text-signal/80 uppercase tracking-wider transition-colors"
                                >
                                    Test Connection
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ── 5. Account ───────────────────────────────── */}
                    <section className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-signal/10 text-signal rounded-lg shadow-inner">
                                <User size={18} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-sm text-foreground">
                                    Account
                                </h2>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                    Profile and role
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-semibold text-foreground/80 mb-2 block">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-signal/30 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-foreground/80 mb-2 block">
                                    Role
                                </label>
                                <div className="relative">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full bg-background border border-border rounded-xl py-2.5 px-4 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-signal/30 transition-all"
                                    >
                                        <option>Lead Linguist</option>
                                        <option>Field Researcher</option>
                                        <option>Community Contributor</option>
                                        <option>Language Learner</option>
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Save */}
                <div className="mt-8 flex items-center justify-end gap-4">
                    <button className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Reset to Defaults
                    </button>
                    <button className="px-6 py-2.5 bg-signal text-white rounded-xl text-sm font-bold hover:bg-signal/90 transition-all active:scale-95 shadow-lg shadow-signal/20">
                        Save Settings
                    </button>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchSettings;
