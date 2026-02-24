import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import {
    Search,
    Plus,
    Database,
    Users,
    FileAudio,
    Calendar,
    ArrowUpRight,
    Filter,
} from "lucide-react";

// ── Mock Data ────────────────────────────────────────────────────────

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
}

const MOCK_CORPORA: Corpus[] = [
    {
        id: "1",
        name: "Lakota_Corpus_Q4",
        language: "Lakota",
        languageCode: "lkt",
        speakers: 8,
        recordings: 42,
        totalSegments: 320,
        transcribedSegments: 284,
        status: "In Progress",
        lastModified: "2 hours ago",
        description: "Elder interviews and ceremonial narratives from Pine Ridge.",
    },
    {
        id: "2",
        name: "Quechua_Archive_01",
        language: "Quechua",
        languageCode: "que",
        speakers: 5,
        recordings: 28,
        totalSegments: 196,
        transcribedSegments: 196,
        status: "Reviewed",
        lastModified: "Yesterday",
        description: "Agricultural vocabulary and seasonal stories from Cusco region.",
    },
    {
        id: "3",
        name: "Maori_Elders_2024",
        language: "Māori",
        languageCode: "mri",
        speakers: 12,
        recordings: 67,
        totalSegments: 540,
        transcribedSegments: 312,
        status: "In Progress",
        lastModified: "3 days ago",
        description: "Oral histories and whakataukī from North Island elders.",
    },
    {
        id: "4",
        name: "Cherokee_Syllabary",
        language: "Cherokee",
        languageCode: "chr",
        speakers: 3,
        recordings: 15,
        totalSegments: 120,
        transcribedSegments: 120,
        status: "Reviewed",
        lastModified: "1 week ago",
        description: "Syllabary pronunciation guide with native speaker validation.",
    },
    {
        id: "5",
        name: "Navajo_Stories",
        language: "Navajo",
        languageCode: "nav",
        speakers: 6,
        recordings: 34,
        totalSegments: 280,
        transcribedSegments: 45,
        status: "In Progress",
        lastModified: "4 days ago",
        description: "Traditional coyote stories and coming-of-age narratives.",
    },
    {
        id: "6",
        name: "Hawaiian_Archive_Legacy",
        language: "Hawaiian",
        languageCode: "haw",
        speakers: 4,
        recordings: 22,
        totalSegments: 180,
        transcribedSegments: 180,
        status: "Archived",
        lastModified: "2 months ago",
        description: "Historical recordings digitized from the Bishop Museum collection.",
    },
];

// ── Component ────────────────────────────────────────────────────────

const CorpusLibrary = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<"All" | CorpusStatus>("All");

    const filters: ("All" | CorpusStatus)[] = ["All", "In Progress", "Reviewed", "Archived"];

    const filteredCorpora = MOCK_CORPORA.filter((c) => {
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
                            {MOCK_CORPORA.length} corpora ·{" "}
                            {MOCK_CORPORA.reduce((sum, c) => sum + c.recordings, 0)} recordings ·{" "}
                            {MOCK_CORPORA.reduce((sum, c) => sum + c.speakers, 0)} speakers
                        </Text>
                    </div>
                    <button
                        onClick={() => navigate("/workbench/editor")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-signal text-white rounded-xl text-sm font-bold hover:bg-signal/90 transition-all active:scale-95 shadow-lg shadow-signal/20"
                    >
                        <Plus size={16} /> New Corpus
                    </button>
                </div>

                {/* Search + Filters */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search corpora by name or language…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-signal/30 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeFilter === filter
                                        ? "bg-signal/15 text-signal border border-signal/30 shadow-inner"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Corpus Grid */}
                {filteredCorpora.length === 0 ? (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCorpora.map((corpus) => {
                            const progress = Math.round(
                                (corpus.transcribedSegments / corpus.totalSegments) * 100
                            );
                            return (
                                <button
                                    key={corpus.id}
                                    onClick={() => navigate("/workbench/editor")}
                                    className="text-left bg-card border border-border rounded-2xl p-6 hover:border-signal/30 hover:shadow-lg transition-all duration-300 group"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-signal/10 border border-signal/20 flex items-center justify-center text-signal group-hover:scale-110 transition-transform shadow-inner">
                                                <Database size={18} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm text-foreground group-hover:text-signal transition-colors">
                                                    {corpus.name}
                                                </h3>
                                                <p className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">
                                                    {corpus.language} · {corpus.languageCode}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            size={14}
                                            className="text-muted-foreground/30 group-hover:text-signal transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs text-muted-foreground/70 mb-5 line-clamp-2 leading-relaxed">
                                        {corpus.description}
                                    </p>

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
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-mono text-muted-foreground/50">
                                                {corpus.transcribedSegments}/{corpus.totalSegments} segments
                                            </span>
                                            <span className="text-[10px] font-mono font-bold text-signal">
                                                {progress}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div
                                                className="h-full bg-signal rounded-full transition-all duration-500"
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
