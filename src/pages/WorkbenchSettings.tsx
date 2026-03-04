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
    const { backendStatus, backendMode, checkBackendHealth, confidenceThreshold, playbackSpeed, defaultExport, updateSettings } = useAudioStore();
    const [apiUrl, setApiUrl] = useState("http://localhost:8001/api");
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
                    <section className="bg-card border border-border rounded-[1.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/5 text-primary rounded-xl shadow-sm border border-primary/15">
                                <Cpu size={20} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-base text-card-foreground">
                                    Transcription Model
                                </h2>
                                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">
                                    Phonetic recognition engine
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Model selector */}
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                                    Active Model
                                </label>
                                <div className="relative">
                                    <select className="w-full bg-background border border-border rounded-2xl py-3 px-4 text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm">
                                        <option>Allosaurus — uni2005 (Universal)</option>
                                        <option>Allosaurus — eng2020 (English)</option>
                                        <option>MockRecognizer (Lite Demo)</option>
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                    />
                                </div>
                            </div>

                            {/* Confidence threshold */}
                            <div className="pt-2">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        Confidence Threshold
                                    </label>
                                    <span className="text-sm font-mono font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-md">
                                        {confidenceThreshold}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={50}
                                    max={99}
                                    value={confidenceThreshold}
                                    onChange={(e) =>
                                        updateSettings({ confidenceThreshold: Number(e.target.value) })
                                    }
                                    className="w-full h-2.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                                />
                                <p className="text-[11px] text-muted-foreground/80 mt-2 font-medium">
                                    Segments below this threshold will be flagged for manual review.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ── 2. Audio Settings ────────────────────────── */}
                    <section className="bg-card border border-border rounded-[1.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/5 text-primary rounded-xl shadow-sm border border-primary/15">
                                <Volume2 size={20} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-base text-card-foreground">
                                    Audio Settings
                                </h2>
                                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">
                                    Playback and recording defaults
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                                    Default Sample Rate
                                </label>
                                <div className="relative">
                                    <select className="w-full bg-background border border-border rounded-2xl py-3 px-4 text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm">
                                        <option>44,100 Hz (CD Quality)</option>
                                        <option>48,000 Hz (Professional)</option>
                                        <option>22,050 Hz (Low Bandwidth)</option>
                                        <option>16,000 Hz (Speech Optimized)</option>
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                                    Playback Speed
                                </label>
                                <div className="flex items-center gap-2 bg-background p-1 rounded-2xl border border-border shadow-sm">
                                    {["0.5", "0.75", "1.0", "1.25", "1.5"].map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => updateSettings({ playbackSpeed: speed })}
                                            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${playbackSpeed === speed
                                                ? "bg-primary text-white shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
                    <section className="bg-card border border-border rounded-[1.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/5 text-primary rounded-xl shadow-sm border border-primary/15">
                                <Download size={20} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-base text-card-foreground">
                                    Export Preferences
                                </h2>
                                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">
                                    Default output format
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: "json", label: "JSON", desc: "Structured data interchange" },
                                { id: "csv", label: "CSV", desc: "Spreadsheet compatible" },
                                { id: "elan", label: "ELAN XML", desc: "Linguistic annotation" },
                            ].map((format) => (
                                <button
                                    key={format.id}
                                    onClick={() => updateSettings({ defaultExport: format.id })}
                                    className={`p-5 rounded-2xl border text-left transition-all ${defaultExport === format.id
                                        ? "bg-primary/5 border-primary shadow-sm"
                                        : "bg-background border-border hover:border-primary/40 shadow-sm"
                                        }`}
                                >
                                    <p
                                        className={`text-[15px] font-bold mb-1 ${defaultExport === format.id
                                            ? "text-primary"
                                            : "text-card-foreground"
                                            }`}
                                    >
                                        {format.label}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground font-medium">
                                        {format.desc}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* ── 4. Backend Connection ────────────────────── */}
                    <section className="bg-card border border-border rounded-[1.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/5 text-primary rounded-xl shadow-sm border border-primary/15">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-base text-card-foreground">
                                    Backend Connection
                                </h2>
                                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">
                                    API server configuration
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                                    API Endpoint
                                </label>
                                <input
                                    type="text"
                                    value={apiUrl}
                                    onChange={(e) => setApiUrl(e.target.value)}
                                    className="w-full bg-background border border-border rounded-2xl py-3 px-4 text-sm font-mono font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
                                />
                            </div>

                            <div className="flex items-center justify-between p-5 bg-background rounded-2xl border border-border shadow-sm">
                                <div className="flex items-center gap-4">
                                    {backendStatus === "online" ? (
                                        <CheckCircle2 size={20} className="text-sage" />
                                    ) : backendStatus === "checking" ? (
                                        <Loader2 size={20} className="text-muted-foreground animate-spin" />
                                    ) : (
                                        <AlertCircle size={20} className="text-ochre" />
                                    )}
                                    <div>
                                        <p className="text-[15px] font-bold text-card-foreground">
                                            {backendStatus === "online"
                                                ? "Connected"
                                                : backendStatus === "checking"
                                                    ? "Checking…"
                                                    : "Disconnected"}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                                            {backendStatus === "online"
                                                ? `Mode: ${backendMode} · Latency: <50ms`
                                                : "Unable to reach API server"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={checkBackendHealth}
                                    className="text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wider transition-colors px-4 py-2 bg-primary/10 rounded-xl"
                                >
                                    Test Connection
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ── 5. Account ───────────────────────────────── */}
                    <section className="bg-card border border-border rounded-[1.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/5 text-primary rounded-xl shadow-sm border border-primary/15">
                                <User size={20} />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-base text-card-foreground">
                                    Account
                                </h2>
                                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-widest mt-0.5">
                                    Profile and role
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-background border border-border rounded-2xl py-3 px-4 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                                    Role
                                </label>
                                <div className="relative">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full bg-background border border-border rounded-2xl py-3 px-4 text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
                                    >
                                        <option>Lead Linguist</option>
                                        <option>Field Researcher</option>
                                        <option>Community Contributor</option>
                                        <option>Language Learner</option>
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Save */}
                <div className="mt-10 flex items-center justify-end gap-4">
                    <button className="px-5 py-3 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                        Reset to Defaults
                    </button>
                    <button className="px-8 py-3 bg-primary text-white rounded-2xl text-base font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                        Save Settings
                    </button>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchSettings;
