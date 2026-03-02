import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import {
    SWADESH_207,
    SWADESH_CATEGORIES,
    fetchAsjpWordList,
    type SwadeshItem,
    type AsjpWordList,
} from "@/lib/datasets";
import { useAudioStore } from "@/hooks/useAudioStore";
import {
    MessageSquarePlus,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Globe,
    Mic,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Layers,
    Filter,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────

interface ElicitationResponse {
    itemId: number;
    gloss: string;
    response: string;   // IPA or free text entered by the researcher
    recorded: boolean;
}

// Target languages available in the elicitation module
const TARGET_LANGUAGES: Array<{ label: string; code: string }> = [
    { label: "Lakota", code: "lkt" },
    { label: "Quechua", code: "que" },
    { label: "Māori", code: "mri" },
    { label: "Cherokee", code: "chr" },
    { label: "Navajo", code: "nav" },
    { label: "Zapotec", code: "zap" },
    { label: "Mixtec", code: "mix" },
    { label: "Custom", code: "ipa" },
];

// ── Component ─────────────────────────────────────────────────────────

const WorkbenchElicitation = () => {
    const navigate = useNavigate();
    const { fileName } = useAudioStore();

    // Session state
    const [language, setLanguage] = useState("lkt");
    const [categoryFilter, setCategoryFilter] = useState<string>("All");
    const [currentIdx, setCurrentIdx] = useState(0);
    const [responses, setResponses] = useState<Map<number, ElicitationResponse>>(new Map());
    const [asjpData, setAsjpData] = useState<AsjpWordList | null>(null);
    const [asjpLoading, setAsjpLoading] = useState(false);
    const [sessionStarted, setSessionStarted] = useState(false);

    // Filtered list of Swadesh items
    const filteredItems = useMemo<SwadeshItem[]>(() => {
        if (categoryFilter === "All") return SWADESH_207;
        return SWADESH_207.filter((w) => w.category === categoryFilter);
    }, [categoryFilter]);

    const currentItem = filteredItems[currentIdx];
    const progress = Math.round(
        (responses.size / filteredItems.length) * 100
    );

    // Fetch ASJP comparison data when language changes
    const loadAsjp = useCallback(async (code: string) => {
        setAsjpLoading(true);
        const data = await fetchAsjpWordList(code);
        setAsjpData(data);
        setAsjpLoading(false);
    }, []);

    const handleStart = () => {
        setSessionStarted(true);
        setCurrentIdx(0);
        loadAsjp(language);
    };

    const handleResponse = (text: string) => {
        if (!currentItem) return;
        setResponses((prev) => {
            const next = new Map(prev);
            next.set(currentItem.id, {
                itemId: currentItem.id,
                gloss: currentItem.gloss,
                response: text,
                recorded: false,
            });
            return next;
        });
    };

    const markRecorded = () => {
        if (!currentItem) return;
        setResponses((prev) => {
            const next = new Map(prev);
            const existing = next.get(currentItem.id);
            if (existing) next.set(currentItem.id, { ...existing, recorded: true });
            return next;
        });
    };

    const goNext = () => setCurrentIdx((i) => Math.min(i + 1, filteredItems.length - 1));
    const goPrev = () => setCurrentIdx((i) => Math.max(i - 1, 0));

    // ASJP reference form for the current gloss
    const asjpRef = asjpData?.words.find(
        (w) => w.meaning.toLowerCase() === currentItem?.gloss.toLowerCase()
    );

    // ── Setup screen ────────────────────────────────────────────────
    if (!sessionStarted) {
        return (
            <WorkbenchLayout>
                <div className="p-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">
                            Structured Elicitation
                        </Headline>
                        <Text className="text-muted-foreground/80">
                            Guided prompt-response sessions using the Swadesh 207 core vocabulary list.
                            ASJP reference forms are fetched live for comparison.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Language picker */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground/60 mb-4">
                                Target Language
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                {TARGET_LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        className={`px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all text-left ${language === lang.code
                                                ? "bg-signal/12 text-signal border-signal/25 shadow-sm"
                                                : "bg-background border-border/70 text-muted-foreground hover:text-foreground hover:border-signal/20"
                                            }`}
                                    >
                                        {lang.label}
                                        <span className="block text-[10px] font-mono opacity-50">{lang.code}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category filter */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground/60 mb-4">
                                Semantic Domain
                            </h2>
                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                                <button
                                    onClick={() => setCategoryFilter("All")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${categoryFilter === "All"
                                            ? "bg-signal/12 text-signal border-signal/25"
                                            : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    All 207
                                </button>
                                {SWADESH_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${categoryFilter === cat
                                                ? "bg-signal/12 text-signal border-signal/25"
                                                : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl mb-6">
                        <div>
                            <p className="font-bold text-foreground">
                                {filteredItems.length} prompts
                                {categoryFilter !== "All" ? ` in "${categoryFilter}"` : " from Swadesh 207"}
                            </p>
                            <p className="text-xs text-muted-foreground/60 mt-0.5">
                                ASJP reference forms will load from{" "}
                                <span className="font-mono">asjp.clld.org</span> for comparison.
                            </p>
                        </div>
                        <button
                            onClick={handleStart}
                            className="flex items-center gap-2 px-6 py-3 bg-signal text-white rounded-xl font-bold hover:bg-signal/90 transition-all active:scale-95 shadow-lg shadow-signal/25"
                        >
                            <MessageSquarePlus size={16} /> Start Session
                        </button>
                    </div>
                </div>
            </WorkbenchLayout>
        );
    }

    // ── Active session screen ────────────────────────────────────────
    const currentResponse = responses.get(currentItem?.id ?? -1);

    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-4xl mx-auto">
                {/* Header row */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Headline as="h1" className="text-2xl font-display text-foreground">
                            Elicitation — {TARGET_LANGUAGES.find((l) => l.code === language)?.label ?? language.toUpperCase()}
                        </Headline>
                        <p className="text-xs text-muted-foreground/60 uppercase tracking-widest font-mono mt-0.5">
                            Swadesh 207{categoryFilter !== "All" ? ` · ${categoryFilter}` : ""} · ASJP reference on
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { setSessionStarted(false); setResponses(new Map()); setCurrentIdx(0); }}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
                        >
                            <RotateCcw size={13} /> Reset
                        </button>
                        <button
                            onClick={() => navigate("/workbench/record")}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-signal/12 border border-signal/20 text-xs text-signal font-bold hover:bg-signal/18 transition-all"
                        >
                            <Mic size={13} /> Record
                        </button>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs text-muted-foreground/60 mb-1.5">
                        <span>{responses.size} of {filteredItems.length} responded</span>
                        <span className="font-mono">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-signal to-signal/70 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Main prompt card */}
                {currentItem && (
                    <div className="bg-card border border-border rounded-2xl p-8 mb-6 relative overflow-hidden">
                        {/* IPA watermark */}
                        <div className="absolute top-4 right-6 text-[80px] font-display text-foreground/3 select-none pointer-events-none leading-none">
                            {currentItem.id}
                        </div>

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40">
                                    #{currentItem.id} · {currentItem.category}
                                </span>
                                <h2 className="text-4xl font-display font-bold text-foreground mt-1 tracking-tight">
                                    {currentItem.gloss}
                                </h2>
                            </div>
                            {currentResponse?.recorded && (
                                <span className="flex items-center gap-1 text-sage text-xs font-bold bg-sage/10 border border-sage/20 px-3 py-1.5 rounded-full">
                                    <CheckCircle2 size={12} /> Recorded
                                </span>
                            )}
                        </div>

                        {/* ASJP reference */}
                        <div className="flex items-center gap-3 mb-6 p-3 bg-background/50 border border-border/50 rounded-xl">
                            <Globe size={14} className="text-muted-foreground/40 shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-bold">
                                    ASJP Reference Form
                                </p>
                                {asjpLoading ? (
                                    <p className="text-xs text-muted-foreground/50 italic">Loading from asjp.clld.org…</p>
                                ) : asjpRef ? (
                                    <p className="text-sm font-mono text-signal">{asjpRef.form}</p>
                                ) : (
                                    <p className="text-xs text-muted-foreground/40 italic">Not found in ASJP for this language</p>
                                )}
                            </div>
                        </div>

                        {/* Response input */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground/50">
                                IPA / Response
                            </label>
                            <input
                                type="text"
                                placeholder="Type IPA transcription or phonemic form…"
                                value={currentResponse?.response ?? ""}
                                onChange={(e) => handleResponse(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 font-mono text-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-signal/25 focus:border-signal/30 transition-all"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-4">
                            {currentResponse?.response && !currentResponse.recorded && (
                                <button
                                    onClick={markRecorded}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sage/12 border border-sage/20 text-sage text-xs font-bold hover:bg-sage/20 transition-all"
                                >
                                    <CheckCircle2 size={13} /> Mark Recorded
                                </button>
                            )}
                            {currentResponse && (
                                <button
                                    onClick={() => {
                                        setResponses((prev) => {
                                            const next = new Map(prev);
                                            next.delete(currentItem.id);
                                            return next;
                                        });
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-destructive hover:border-destructive/20 transition-all"
                                >
                                    <XCircle size={13} /> Clear
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={goPrev}
                        disabled={currentIdx === 0}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>

                    {/* Item jump dots (show ±3 around current) */}
                    <div className="flex items-center gap-1.5">
                        {filteredItems.slice(Math.max(0, currentIdx - 3), currentIdx + 4).map((item, i) => {
                            const actualIdx = Math.max(0, currentIdx - 3) + i;
                            const isCurrent = actualIdx === currentIdx;
                            const isDone = responses.has(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentIdx(actualIdx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${isCurrent ? "bg-signal scale-125" :
                                            isDone ? "bg-sage/60" : "bg-border"
                                        }`}
                                    title={item.gloss}
                                />
                            );
                        })}
                    </div>

                    <button
                        onClick={goNext}
                        disabled={currentIdx === filteredItems.length - 1}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-signal text-white text-sm font-semibold hover:bg-signal/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>

                {/* Response summary */}
                {responses.size > 0 && (
                    <div className="mt-8 bg-card border border-border rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
                                <Layers size={14} /> Session Responses ({responses.size})
                            </h3>
                            <button
                                onClick={() => {
                                    const data = Array.from(responses.values());
                                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                                    const a = document.createElement("a");
                                    a.href = URL.createObjectURL(blob);
                                    a.download = `elicitation_${language}_${Date.now()}.json`;
                                    a.click();
                                }}
                                className="flex items-center gap-1.5 text-xs text-signal hover:text-signal/80 font-bold transition-colors"
                            >
                                <BookOpen size={12} /> Export JSON
                            </button>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {Array.from(responses.values()).map((r) => (
                                <div
                                    key={r.itemId}
                                    className="flex items-center justify-between text-sm py-2 border-b border-border/40 last:border-0"
                                >
                                    <span className="text-muted-foreground/70 w-40 truncate">{r.gloss}</span>
                                    <span className="font-mono text-foreground flex-1 text-center">{r.response || "—"}</span>
                                    {r.recorded ? (
                                        <CheckCircle2 size={13} className="text-sage shrink-0" />
                                    ) : (
                                        <div className="w-3 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchElicitation;
