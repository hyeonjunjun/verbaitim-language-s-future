import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { useAudioStore } from "@/hooks/useAudioStore";
import {
    fetchGlottologInfo,
    ENDANGERMENT_COLOURS,
    type GlottologLanguage,
} from "@/lib/datasets";
import {
    Search,
    Plus,
    Database,
    Users,
    FileAudio,
    Calendar,
    ArrowUpRight,
    Filter,
    Globe,
    ShieldAlert,
    Inbox,
    Mic,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

type CorpusStatus = "In Progress" | "Reviewed" | "Archived";

interface Corpus {
    id: string;
    name: string;
    language: string;
    languageCode: string;
    speakers: number;
    recordings: number;
    totalSegments: number;
    transcribedSegments: number;
    status: CorpusStatus;
    lastModified: string;
    description: string;
    sessionIds: string[];
}

// ── Glottolog enrichment sub-hook ────────────────────────────────────

function useGlottologBatch(codes: string[]) {
    const [data, setData] = useState<Record<string, GlottologLanguage | null>>({});
    const fetched = useRef(new Set<string>());

    useEffect(() => {
        codes.forEach(async (code) => {
            if (fetched.current.has(code)) return;
            fetched.current.add(code);
            const info = await fetchGlottologInfo(code);
            setData((prev) => ({ ...prev, [code]: info }));
        });
    }, [codes.join(",")]);

    return data;
}

// ── Build corpora from real session data ─────────────────────────────

function buildCorporaFromSessions(sessions: ReturnType<typeof useAudioStore>["sessions"]): Corpus[] {
    if (sessions.length === 0) return [];

    // Group sessions by language
    const grouped = new Map<string, typeof sessions>();
    sessions.forEach((sess) => {
        const lang = sess.language || "Unknown";
        const bucket = grouped.get(lang) || [];
        bucket.push(sess);
        grouped.set(lang, bucket);
    });

    return Array.from(grouped.entries()).map(([lang, sessList]) => {
        const totalSegments = sessList.reduce((sum, s) => sum + s.segmentCount, 0);
        const verifiedSegments = sessList.reduce((sum, s) =>
            sum + s.segments.filter((seg) => seg.confidence > 85).length, 0
        );
        const speakers = new Set(sessList.flatMap((s) => s.segments.map((seg) => seg.speaker))).size;
        const latestDate = new Date(Math.max(...sessList.map((s) => new Date(s.createdAt).getTime())));
        const daysSince = Math.round((Date.now() - latestDate.getTime()) / (1000 * 60 * 60 * 24));
        const lastModified = daysSince === 0 ? "Today" : daysSince === 1 ? "Yesterday" : `${daysSince} days ago`;

        const allVerified = verifiedSegments === totalSegments && totalSegments > 0;
        const status: CorpusStatus = allVerified ? "Reviewed" : "In Progress";

        return {
            id: `auto-${lang.toLowerCase().replace(/\s+/g, "-")}`,
            name: `${lang}_Corpus`,
            language: lang,
            languageCode: lang.toLowerCase().substring(0, 3),
            speakers,
            recordings: sessList.length,
            totalSegments,
            transcribedSegments: verifiedSegments,
            status,
            lastModified,
            description: `${sessList.length} session${sessList.length !== 1 ? "s" : ""} with ${totalSegments} segments from ${speakers} speaker${speakers !== 1 ? "s" : ""}.`,
            sessionIds: sessList.map((s) => s.id),
        };
    });
}

// ── Component ────────────────────────────────────────────────────────

const CorpusLibrary = () => {
    const navigate = useNavigate();
    const { sessions } = useAudioStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<"All" | CorpusStatus>("All");

    // Derive corpora from real sessions
    const corpora = useMemo(() => buildCorporaFromSessions(sessions), [sessions]);

    // Fetch Glottolog data for all language codes in the library
    const glottologData = useGlottologBatch(corpora.map((c) => c.languageCode));

    const filters: ("All" | CorpusStatus)[] = ["All", "In Progress", "Reviewed", "Archived"];

    const filteredCorpora = corpora.filter((c) => {
        const matchesFilter = activeFilter === "All" || c.status === activeFilter;
        const matchesSearch =
            searchQuery === "" ||
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.language.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const statusStyle = (status: CorpusStatus) => {
        switch (status) {
            case "In Progress":
                return "bg-ochre/10 text-ochre border-ochre/20";
            case "Reviewed":
                return "bg-sage/10 text-sage border-sage/20";
            case "Archived":
                return "bg-muted text-muted-foreground border-border";
        }
    };

    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">
                            Corpus Library
                        </Headline>
                        <Text className="text-muted-foreground/80">
                            {corpora.length > 0
                                ? `${corpora.length} corpora · ${corpora.reduce((sum, c) => sum + c.recordings, 0)} recordings · ${corpora.reduce((sum, c) => sum + c.speakers, 0)} speakers`
                                : "No corpora yet. Record sessions to build your library."}
                        </Text>
                    </div>
                    <button
                        onClick={() => navigate("/workbench/record")}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-base font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <Plus size={18} /> New Session
                    </button>
                </div>

                {/* Search + Filters */}
                {corpora.length > 0 && (
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input
                                type="text"
                                placeholder="Search corpora by name or language…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-card border border-border rounded-full py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 rounded-[0.85rem] text-xs font-bold transition-all ${activeFilter === filter
                                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {corpora.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-border rounded-2xl text-center">
                        <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground/30 mb-5">
                            <Inbox size={30} />
                        </div>
                        <p className="text-base font-bold text-foreground/50 mb-1">No corpora yet</p>
                        <p className="text-sm text-muted-foreground/40 mb-6 max-w-xs">
                            Record audio sessions and transcribe them. Your sessions will be automatically organized into corpora by language.
                        </p>
                        <button
                            onClick={() => navigate("/workbench/record")}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-base font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <Mic size={18} className="fill-current" /> Start Recording
                        </button>
                    </div>
                ) : filteredCorpora.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground/30 mb-4">
                            <Filter size={28} />
                        </div>
                        <p className="text-sm font-semibold text-foreground/60 mb-1">No corpora found</p>
                        <p className="text-xs text-muted-foreground/40">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                ) : (
                    /* Corpus Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCorpora.map((corpus) => {
                            const progress = corpus.totalSegments > 0
                                ? Math.round((corpus.transcribedSegments / corpus.totalSegments) * 100)
                                : 0;
                            return (
                                <button
                                    key={corpus.id}
                                    onClick={() => {
                                        // Navigate to editor with first session of this corpus
                                        if (corpus.sessionIds.length > 0) {
                                            navigate(`/workbench/editor/${corpus.sessionIds[0]}`);
                                        }
                                    }}
                                    className="text-left bg-card border border-border rounded-[1.5rem] p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group shadow-sm flex flex-col justify-between h-full"
                                >
                                    <div>
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/15 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm">
                                                    <Database size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-base text-card-foreground group-hover:text-primary transition-colors">
                                                        {corpus.name}
                                                    </h3>
                                                    <p className="text-[10px] text-muted-foreground/80 font-mono uppercase tracking-widest mt-0.5">
                                                        {corpus.language} · {corpus.languageCode}
                                                    </p>
                                                    {/* Glottolog endangerment badge */}
                                                    {glottologData[corpus.languageCode] && (
                                                        <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mt-0.5 ${ENDANGERMENT_COLOURS[glottologData[corpus.languageCode]!.endangerment]
                                                            }`}>
                                                            <ShieldAlert size={8} />
                                                            {glottologData[corpus.languageCode]!.endangerment}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ArrowUpRight
                                                size={18}
                                                className="text-muted-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </div>

                                        {/* Description */}
                                        <p className="text-[13px] font-medium text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                                            {corpus.description}
                                        </p>
                                    </div>
                                    <div>

                                        {/* Stats Row */}
                                        <div className="flex items-center gap-4 mb-4 text-[10px] text-muted-foreground/60 font-mono">
                                            <span className="flex items-center gap-1">
                                                <Users size={10} /> {corpus.speakers}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FileAudio size={10} /> {corpus.recordings}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={10} /> {corpus.lastModified}
                                            </span>
                                            {glottologData[corpus.languageCode] && (
                                                <span className="flex items-center gap-1 text-muted-foreground/40">
                                                    <Globe size={10} /> {glottologData[corpus.languageCode]!.family}
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-mono text-muted-foreground/60 font-bold uppercase tracking-widest">
                                                    {corpus.transcribedSegments}/{corpus.totalSegments} verified
                                                </span>
                                                <span className="text-[11px] font-mono font-bold text-primary">
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-secondary rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className="h-full bg-primary rounded-full transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex items-center justify-end">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyle(
                                                    corpus.status
                                                )}`}
                                            >
                                                {corpus.status}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </WorkbenchLayout>
    );
};

export default CorpusLibrary;
