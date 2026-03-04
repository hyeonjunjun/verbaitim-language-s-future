import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { useAudioStore } from "@/hooks/useAudioStore";
import {
    Users,
    FileAudio,
    Activity,
    Clock,
    ArrowUpRight,
    Mic,
    BookOpen,
    MessageSquarePlus,
    Upload,
    Wand2,
    Inbox,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// ── Helpers ───────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function formatHours(totalSeconds: number): string {
    const h = totalSeconds / 3600;
    if (h < 1) return `<1h`;
    return `${h.toFixed(1)}h`;
}

// ── Component ─────────────────────────────────────────────────────────

const WorkbenchDashboard = () => {
    const navigate = useNavigate();
    const {
        backendStatus,
        backendMode,
        checkBackendHealth,
        sessions,
        segments,
        fileName,
    } = useAudioStore();

    useEffect(() => {
        checkBackendHealth();
        // Poll every 30s so the status indicator stays live
        const interval = setInterval(checkBackendHealth, 30_000);
        return () => clearInterval(interval);
    }, [checkBackendHealth]);

    // ── Derive live stats from session history ────────────────────────
    const stats = useMemo(() => {
        const totalSegments = sessions.reduce((s, sess) => s + sess.segmentCount, 0);
        const totalDuration = sessions.reduce((s, sess) => s + sess.durationSeconds, 0);
        const speakers = new Set(
            sessions.flatMap((sess) =>
                sess.segments.map((sg) => sg.speaker)
            )
        ).size;
        const avgConf =
            sessions.length === 0
                ? 0
                : Math.round(
                    sessions.reduce((s, sess) => s + sess.avgConfidence, 0) /
                    sessions.length
                );

        return { totalSegments, totalDuration, speakers, avgConf };
    }, [sessions]);

    const statusLabel =
        backendStatus === "online"
            ? `Allosaurus Node: Online (${backendMode})`
            : backendStatus === "checking"
                ? "Checking…"
                : "Backend Offline — start the server";

    const recentSessions = sessions.slice(0, 5);
    const hasActiveFile = !!fileName;

    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">
                            Project Overview
                        </Headline>
                        <Text className="text-muted-foreground/80">
                            {sessions.length > 0
                                ? `${sessions.length} session${sessions.length !== 1 ? "s" : ""} recorded · ${stats.totalSegments} segments transcribed`
                                : "Record your first session to get started."}
                        </Text>
                    </div>
                    {/* Live backend status */}
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground/80 uppercase tracking-widest font-bold">System Status</p>
                        <p className={`text-sm font-mono flex items-center gap-2 justify-end font-bold mt-1 ${backendStatus === "online" ? "text-primary"
                            : backendStatus === "checking" ? "text-muted-foreground"
                                : "text-ochre"
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${backendStatus === "online" ? "bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                                : backendStatus === "checking" ? "bg-muted-foreground animate-pulse"
                                    : "bg-ochre"
                                }`} />
                            {statusLabel}
                        </p>
                    </div>
                </div>

                {/* ── Live Stats Grid ─────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        {
                            label: "Unique Speakers",
                            value: stats.speakers > 0 ? String(stats.speakers) : "—",
                            icon: Users,
                            trend: sessions.length > 0 ? `${sessions.length} sessions` : "No sessions yet",
                        },
                        {
                            label: "Total Recordings",
                            value: sessions.length > 0 ? String(sessions.length) : "—",
                            icon: FileAudio,
                            trend: stats.totalSegments > 0 ? `${stats.totalSegments} segments` : "No recordings yet",
                        },
                        {
                            label: "Avg Confidence",
                            value: stats.avgConf > 0 ? `${stats.avgConf}%` : "—",
                            icon: Activity,
                            trend: backendMode || "Run transcription first",
                        },
                        {
                            label: "Audio Logged",
                            value: stats.totalDuration > 0 ? formatHours(stats.totalDuration) : "—",
                            icon: Clock,
                            trend: stats.totalDuration > 0 ? formatDuration(stats.totalDuration) + " total" : "No audio yet",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="relative bg-card border border-border p-6 rounded-3xl shadow-sm hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:-translate-y-1 group-hover:bg-primary/15 transition-all border border-primary/20">
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider text-right max-w-[80px] leading-tight">
                                    {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-foreground mb-1 tracking-tight relative z-10">
                                {stat.value}
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium relative z-10">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Main Content Split ──────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Recent Sessions + Active File */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Active file banner */}
                        {hasActiveFile && (
                            <div
                                className="flex items-center justify-between p-5 bg-primary/5 border border-primary/20 rounded-3xl cursor-pointer hover:bg-primary/10 transition-all group"
                                onClick={() => navigate("/workbench/editor")}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
                                        <Wand2 size={18} />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-foreground">{fileName}</p>
                                        <p className="text-xs text-primary/80 uppercase tracking-widest font-bold mt-0.5">Active file · Click to open in editor</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={20} className="text-primary/50 group-hover:text-primary transition-colors" />
                            </div>
                        )}

                        {/* Recent Sessions */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display font-bold text-lg text-foreground">Recent Sessions</h2>
                                {sessions.length > 0 && (
                                    <button
                                        onClick={() => navigate("/workbench/history")}
                                        className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
                                    >
                                        View All <ArrowUpRight size={12} />
                                    </button>
                                )}
                            </div>

                            {recentSessions.length === 0 ? (
                                /* Empty state */
                                <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-2xl text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground/30 mb-4">
                                        <Inbox size={26} />
                                    </div>
                                    <p className="text-sm font-semibold text-foreground/60 mb-1">No sessions yet</p>
                                    <p className="text-xs text-muted-foreground/40 mb-4">
                                        Record and transcribe your first session to see it here.
                                    </p>
                                    <button
                                        onClick={() => navigate("/workbench/record")}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                    >
                                        <Mic size={13} /> Start Recording
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentSessions.map((sess) => (
                                        <div
                                            key={sess.id}
                                            onClick={() => navigate("/workbench/editor")}
                                            className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:bg-white hover:border-primary/30 transition-all cursor-pointer group shadow-sm"
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="h-12 w-12 bg-primary/5 border border-primary/15 flex items-center justify-center rounded-[1.25rem] text-primary shrink-0 group-hover:scale-105 transition-transform">
                                                    <Mic size={20} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-base font-bold text-foreground truncate">{sess.fileName}</p>
                                                    <p className="text-xs text-muted-foreground/80 font-medium">
                                                        {sess.language.toUpperCase()} · {sess.segmentCount} segments
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0 ml-3">
                                                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-1.5 ${sess.model.includes("Mock")
                                                    ? "bg-ochre/10 text-ochre border-ochre/20"
                                                    : "bg-sage/10 text-sage border-sage/20"
                                                    }`}>
                                                    {sess.model.includes("Mock") ? "Lite" : "Full"}
                                                </div>
                                                <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">
                                                    {formatDistanceToNow(new Date(sess.createdAt), { addSuffix: true })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Quick Actions + System */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-display font-bold text-lg text-foreground mb-3">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Record", icon: Mic, path: "/workbench/record", desc: "Live capture", primary: true },
                                    { label: "Notes", icon: BookOpen, path: "/workbench/notes", desc: "Observations", primary: false },
                                    { label: "Elicit", icon: MessageSquarePlus, path: "/workbench/elicitation", desc: "Structured", primary: false },
                                    { label: "Upload", icon: Upload, path: "/workbench/editor", desc: "Transcribe", primary: false },
                                ].map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() => navigate(action.path)}
                                        className={`relative overflow-hidden flex flex-col items-start p-5 border rounded-2xl transition-all text-left group active:scale-95 ${action.primary
                                            ? "bg-primary text-primary-foreground border-primary/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                            : "bg-card border-border hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                                            }`}
                                    >
                                        <span className={`absolute inset-0 shimmer ${action.primary ? "opacity-30 group-hover:opacity-60" : "opacity-0 group-hover:opacity-100"} transition-opacity pointer-events-none`} />
                                        <div className={`mb-4 p-2.5 rounded-xl transition-colors relative z-10 ${action.primary ? "bg-white/10 text-white" : "bg-secondary text-primary group-hover:bg-primary/10 border border-transparent group-hover:border-primary/20"}`}>
                                            <action.icon size={20} />
                                        </div>
                                        <p className={`font-bold text-base mb-1 relative z-10 ${action.primary ? "text-white" : "text-foreground"}`}>{action.label}</p>
                                        <p className={`text-xs font-medium relative z-10 ${action.primary ? "text-white/80" : "text-muted-foreground"}`}>{action.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Session model breakdown */}
                        {sessions.length > 0 && (
                            <div className="bg-card border border-border rounded-2xl p-5">
                                <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground/60 mb-5">Session Breakdown</h3>
                                <div className="space-y-4">
                                    {(() => {
                                        const fullCount = sessions.filter(s => !s.model.includes("Mock")).length;
                                        const liteCount = sessions.length - fullCount;
                                        const fullPct = sessions.length > 0 ? Math.round((fullCount / sessions.length) * 100) : 0;
                                        return [
                                            { label: "Full (Allosaurus)", value: `${fullCount}`, pct: fullPct },
                                            { label: "Lite (Mock / Offline)", value: `${liteCount}`, pct: 100 - fullPct },
                                        ];
                                    })().map((row) => (
                                        <div key={row.label}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-foreground">{row.label}</span>
                                                <span className="text-sm text-primary font-mono font-bold">{row.value}</span>
                                            </div>
                                            <div className="h-2 bg-secondary rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-700"
                                                    style={{ width: `${row.pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <p className="text-[10px] text-muted-foreground font-medium italic mt-2">
                                        Start the Python backend to get Full mode transcriptions.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchDashboard;

