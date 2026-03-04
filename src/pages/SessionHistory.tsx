import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { useAudioStore } from "@/hooks/useAudioStore";
import { exportSession } from "@/lib/exportSession";
import type { ExportFormat } from "@/lib/exportSession";
import {
    Mic2,
    FileText,
    Download,
    Trash2,
    Clock,
    Activity,
    Layers,
    TrendingUp,
    Inbox,
    Mic,
    ArrowUpRight,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

// ── Helpers ───────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function formatTotalHours(totalSeconds: number): string {
    const h = totalSeconds / 3600;
    return h < 0.1 ? "<0.1h" : `${h.toFixed(1)}h`;
}

// ── Component ─────────────────────────────────────────────────────────

const SessionHistory = () => {
    const navigate = useNavigate();
    const { sessions, deleteSession, segments } = useAudioStore();
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    // ── Derive live summary stats ────────────────────────────────────
    const totalSegments = sessions.reduce((s, sess) => s + sess.segmentCount, 0);
    const totalDuration = sessions.reduce((s, sess) => s + sess.durationSeconds, 0);
    const avgConf =
        sessions.length === 0
            ? 0
            : Math.round(sessions.reduce((s, sess) => s + sess.avgConfidence, 0) / sessions.length);

    // sessions in the last 7 days
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const sessionsThisWeek = sessions.filter(
        (s) => Date.now() - new Date(s.createdAt).getTime() < weekMs
    ).length;

    const handleDelete = (id: string) => {
        deleteSession(id);
        setConfirmDelete(null);
    };

    const handleExportSession = (sessId: string) => {
        const sess = sessions.find((s) => s.id === sessId);
        if (!sess) return;
        exportSession(sess, defaultExport as ExportFormat);
    };

    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">
                        Session History
                    </Headline>
                    <Text className="text-muted-foreground/80">
                        All transcription sessions from this device, stored locally.
                    </Text>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Sessions This Week", value: sessionsThisWeek > 0 ? String(sessionsThisWeek) : "—", icon: Layers },
                        { label: "Segments Processed", value: totalSegments > 0 ? String(totalSegments) : "—", icon: FileText },
                        { label: "Avg Confidence", value: avgConf > 0 ? `${avgConf}%` : "—", icon: TrendingUp },
                        { label: "Audio Logged", value: totalDuration > 0 ? formatTotalHours(totalDuration) : "—", icon: Clock },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-card border border-border rounded-[1.25rem] p-6 flex flex-col justify-between h-full group hover:border-primary/20 hover:shadow-md transition-all shadow-sm"
                        >
                            <div className="p-3 bg-primary/10 text-primary rounded-xl mb-4 group-hover:-translate-y-1 transition-transform border border-primary/20 self-start">
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-foreground tracking-tight mb-1">{stat.value}</p>
                                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Session List */}
                {sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-border rounded-2xl text-center">
                        <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground/25 mb-5">
                            <Inbox size={30} />
                        </div>
                        <p className="text-base font-bold text-foreground/50 mb-1">No sessions yet</p>
                        <p className="text-sm text-muted-foreground/40 mb-6 max-w-xs">
                            Once you record and transcribe audio, your sessions will appear here for review and export.
                        </p>
                        <button
                            onClick={() => navigate("/workbench/record")}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-base font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <Mic size={18} className="fill-current" /> Start Recording
                        </button>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <h2 className="font-display font-bold text-sm text-foreground">
                                All Sessions
                            </h2>
                            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50">
                                <Activity size={10} />
                                <span>{sessions.length} total</span>
                            </div>
                        </div>

                        <div className="divide-y divide-border/50">
                            {sessions.map((sess, idx) => (
                                <div
                                    key={sess.id}
                                    className="flex items-center gap-4 px-6 py-5 hover:bg-accent/20 transition-colors group"
                                >
                                    {/* Timeline icon */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-primary/5 text-primary border-primary/15 shadow-sm">
                                            <Mic2 size={16} />
                                        </div>
                                        {idx < sessions.length - 1 && (
                                            <div className="w-px flex-1 bg-border/40 mt-3 min-h-[20px]" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-foreground truncate leading-tight">
                                                    {sess.fileName}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground/60 font-mono mt-0.5">
                                                    {sess.segmentCount} segment{sess.segmentCount !== 1 ? "s" : ""} ·{" "}
                                                    {sess.avgConfidence}% conf · {formatDuration(sess.durationSeconds)} ·{" "}
                                                    {sess.language.toUpperCase()}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground/40 font-mono mt-0.5 italic">
                                                    {sess.model}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                {/* Timestamp */}
                                                <div className="text-right">
                                                    <p className="text-[10px] text-muted-foreground/50 font-mono whitespace-nowrap">
                                                        {formatDistanceToNow(new Date(sess.createdAt), { addSuffix: true })}
                                                    </p>
                                                    <p className="text-[9px] text-muted-foreground/30 font-mono">
                                                        {format(new Date(sess.createdAt), "MMM d, yyyy · h:mm a")}
                                                    </p>
                                                </div>

                                                {/* Model badge */}
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${sess.model.includes("Mock")
                                                    ? "bg-ochre/10 text-ochre border-ochre/20"
                                                    : "bg-sage/10 text-sage border-sage/20"
                                                    }`}>
                                                    {sess.model.includes("Mock") ? "Lite" : "Full"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        <button
                                            title="Open in editor"
                                            onClick={() => navigate(`/workbench/editor/${sess.id}`)}
                                            className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ArrowUpRight size={18} />
                                        </button>
                                        <button
                                            title="Download session JSON"
                                            onClick={() => handleExportSession(sess.id)}
                                            className="p-2 rounded-lg hover:bg-sage/10 text-muted-foreground hover:text-sage transition-colors"
                                        >
                                            <Download size={18} />
                                        </button>
                                        {confirmDelete === sess.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(sess.id)}
                                                    className="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-[10px] font-bold hover:bg-destructive/20 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(null)}
                                                    className="px-2 py-1 rounded-lg text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                title="Delete session"
                                                onClick={() => setConfirmDelete(sess.id)}
                                                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </WorkbenchLayout>
    );
};

export default SessionHistory;
