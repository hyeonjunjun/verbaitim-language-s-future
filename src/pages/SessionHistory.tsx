import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import {
    Mic2,
    FileText,
    Download,
    Edit3,
    Trash2,
    CheckCircle2,
    Clock,
    Activity,
    Layers,
    TrendingUp,
} from "lucide-react";

// ── Mock Data ────────────────────────────────────────────────────────

interface HistoryEntry {
    id: string;
    action: "transcribe" | "edit" | "export" | "review" | "delete";
    description: string;
    corpus: string;
    timestamp: string;
    details?: string;
}

const MOCK_HISTORY: HistoryEntry[] = [
    {
        id: "h1",
        action: "transcribe",
        description: "Transcribed lakota_elder_interview_04.wav",
        corpus: "Lakota_Corpus_Q4",
        timestamp: "Today, 2:45 PM",
        details: "4 segments · 94% avg confidence · Lakota (lkt)",
    },
    {
        id: "h2",
        action: "edit",
        description: "Edited segment #2 IPA transcription",
        corpus: "Lakota_Corpus_Q4",
        timestamp: "Today, 2:30 PM",
        details: "Changed haʊ → hɑːʊ · Speaker: EF_01",
    },
    {
        id: "h3",
        action: "transcribe",
        description: "Transcribed ceremonial_chant_archive_B.wav",
        corpus: "Lakota_Corpus_Q4",
        timestamp: "Today, 11:20 AM",
        details: "7 segments · 91% avg confidence · Lakota (lkt)",
    },
    {
        id: "h4",
        action: "export",
        description: "Exported Quechua_Archive_01 as ELAN XML",
        corpus: "Quechua_Archive_01",
        timestamp: "Yesterday, 5:10 PM",
        details: "196 segments · 28 recordings · Full corpus export",
    },
    {
        id: "h5",
        action: "review",
        description: "Marked Quechua_Archive_01 as Reviewed",
        corpus: "Quechua_Archive_01",
        timestamp: "Yesterday, 5:05 PM",
        details: "All 196 segments verified by Dr. Sarah Chen",
    },
    {
        id: "h6",
        action: "transcribe",
        description: "Transcribed verb_morphology_session_01.mp3",
        corpus: "Maori_Elders_2024",
        timestamp: "Yesterday, 3:40 PM",
        details: "12 segments · 88% avg confidence · Māori (mri)",
    },
    {
        id: "h7",
        action: "edit",
        description: "Bulk-edited speaker labels for 15 segments",
        corpus: "Maori_Elders_2024",
        timestamp: "2 days ago",
        details: "Renamed SP_01 → Elder_Hemi, SP_02 → Elder_Aroha",
    },
    {
        id: "h8",
        action: "transcribe",
        description: "Transcribed origin_story_part3.wav",
        corpus: "Navajo_Stories",
        timestamp: "3 days ago",
        details: "9 segments · 86% avg confidence · Navajo (nav)",
    },
    {
        id: "h9",
        action: "delete",
        description: "Removed duplicate segment from Cherokee_Syllabary",
        corpus: "Cherokee_Syllabary",
        timestamp: "4 days ago",
        details: "Segment 47 was a duplicate of segment 12",
    },
    {
        id: "h10",
        action: "export",
        description: "Exported Cherokee_Syllabary as CSV",
        corpus: "Cherokee_Syllabary",
        timestamp: "1 week ago",
        details: "120 segments · 15 recordings · Syllabary subset",
    },
];

// ── Helpers ──────────────────────────────────────────────────────────

function actionIcon(action: HistoryEntry["action"]) {
    switch (action) {
        case "transcribe":
            return <Mic2 size={14} />;
        case "edit":
            return <Edit3 size={14} />;
        case "export":
            return <Download size={14} />;
        case "review":
            return <CheckCircle2 size={14} />;
        case "delete":
            return <Trash2 size={14} />;
    }
}

function actionColor(action: HistoryEntry["action"]) {
    switch (action) {
        case "transcribe":
            return "bg-signal/15 text-signal border-signal/20";
        case "edit":
            return "bg-sky-500/10 text-sky-500 border-sky-500/20";
        case "export":
            return "bg-sage/15 text-sage border-sage/20";
        case "review":
            return "bg-sage/15 text-sage border-sage/20";
        case "delete":
            return "bg-ochre/10 text-ochre border-ochre/20";
    }
}

// ── Component ────────────────────────────────────────────────────────

const SessionHistory = () => {
    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">
                        Session History
                    </Headline>
                    <Text className="text-muted-foreground/80">
                        Track all transcription, editing, and export activity across your corpora.
                    </Text>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Sessions This Week", value: "18", icon: Layers },
                        { label: "Segments Processed", value: "247", icon: FileText },
                        { label: "Avg Confidence", value: "91.3%", icon: TrendingUp },
                        { label: "Hours Logged", value: "12.4h", icon: Clock },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 group hover:border-signal/20 transition-all"
                        >
                            <div className="p-2 bg-signal/10 text-signal rounded-lg group-hover:scale-110 transition-transform shadow-inner">
                                <stat.icon size={18} />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-foreground tracking-tight">{stat.value}</p>
                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity Feed */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                        <h2 className="font-display font-bold text-sm text-foreground">Recent Activity</h2>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50">
                            <Activity size={10} />
                            <span>{MOCK_HISTORY.length} events</span>
                        </div>
                    </div>

                    <div className="divide-y divide-border/50">
                        {MOCK_HISTORY.map((entry, idx) => (
                            <div
                                key={entry.id}
                                className="flex items-start gap-4 px-6 py-5 hover:bg-accent/20 transition-colors group"
                            >
                                {/* Timeline dot + line */}
                                <div className="flex flex-col items-center pt-0.5">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${actionColor(
                                            entry.action
                                        )}`}
                                    >
                                        {actionIcon(entry.action)}
                                    </div>
                                    {idx < MOCK_HISTORY.length - 1 && (
                                        <div className="w-px flex-1 bg-border/50 mt-2 min-h-[16px]" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-foreground mb-0.5">
                                                {entry.description}
                                            </p>
                                            {entry.details && (
                                                <p className="text-xs text-muted-foreground/60 italic">
                                                    {entry.details}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[10px] text-muted-foreground/50 font-mono whitespace-nowrap">
                                                {entry.timestamp}
                                            </p>
                                            <p className="text-[10px] text-signal/60 font-bold uppercase tracking-wider mt-0.5">
                                                {entry.corpus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="px-6 py-6 border-t border-border text-center">
                        <button className="text-xs font-bold text-signal hover:text-signal/80 transition-colors uppercase tracking-widest">
                            Load Older Activity
                        </button>
                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default SessionHistory;
