import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Play, Heart, Volume2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useLearnerStore } from "@/hooks/useLearnerStore";
import { useAudioStore } from "@/hooks/useAudioStore";

const LearnerLesson = () => {
    const navigate = useNavigate();
    const { units, completeLesson, lives, deductLife } = useLearnerStore();
    const { sessions } = useAudioStore();

    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [showContext, setShowContext] = useState(false);

    // Grab the first 'active' unit
    const activeUnit = units.find(u => u.status === 'active');

    // Find the corresponding audio session
    const session = sessions.find(s => s.id === activeUnit?.id);

    // Only segments with meaning and ipa can be practiced
    const completableSegments = session?.segments.filter(s => !!s.meaning && !!s.ipa) || [];
    const currentSegmentIndex = activeUnit?.completedLessons || 0;
    const currentSegment = completableSegments[currentSegmentIndex];

    useEffect(() => {
        if (!activeUnit || !currentSegment) {
            navigate('/learner/select', { replace: true });
        }
    }, [activeUnit, currentSegment, navigate]);

    // Don't render until we have valid data
    if (!activeUnit || !currentSegment) return null;

    const handleCheck = () => {
        if (!currentSegment?.meaning) return;

        // Simple fuzzy match for prototype: remove punctuation and case
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

        if (normalize(inputValue) === normalize(currentSegment.meaning)) {
            setStatus("success");
            // Auto continue after success
            setTimeout(() => {
                completeLesson(activeUnit!.id);
                // Clear input and reset status if we're not done yet
                if (currentSegmentIndex + 1 < completableSegments.length) {
                    setStatus("idle");
                    setInputValue("");
                    setShowContext(false);
                } else {
                    navigate('/learner');
                }
            }, 1500);
        } else {
            setStatus("error");
            deductLife();
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    const handleTTS = () => {
        if (!currentSegment?.meaning) return;
        const utterance = new SpeechSynthesisUtterance(currentSegment.meaning);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    if (!activeUnit || !currentSegment) return null;

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-foreground font-body flex flex-col pt-safe">
            {/* Top Bar Navigation */}
            <header className="px-6 pt-6 pb-4 flex items-center gap-4 sticky top-0 bg-[#FDFCFB] z-10 w-full max-w-2xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <X size={28} />
                </button>
                <div className="flex-1 h-3 bg-muted/40 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#A5D6A7] rounded-full transition-all duration-300"
                        style={{ width: `${(activeUnit.completedLessons / activeUnit.totalLessons) * 100}%` }}
                    />
                </div>
                <div className="flex items-center gap-1.5 text-sage font-bold shrink-0">
                    <Heart size={24} className={`fill-current text-destructive ${lives === 0 ? "opacity-30" : ""}`} />
                    <span className="text-destructive text-lg">{lives}</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-6 pt-6 pb-32 flex flex-col w-full max-w-2xl mx-auto overflow-y-auto hide-scrollbar">
                <h1 className="text-2xl font-bold text-card-foreground mb-6">
                    Listen and type the meaning
                </h1>

                {/* Audio Card */}
                <div className="bg-white rounded-[2rem] p-6 border border-border/50 shadow-sm mb-6 flex flex-col items-center justify-center relative min-h-[160px] shrink-0">
                    <div className="flex-1 flex items-center justify-center w-full">
                        <button className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                            <Play size={28} className="fill-current ml-2" />
                        </button>
                    </div>
                    <div className="w-full mt-6 absolute bottom-6 left-0 px-6">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-primary rounded-full transition-all duration-1000" />
                        </div>
                    </div>
                </div>

                {/* Subtitle / Transcription */}
                {currentSegment.ipa && (
                    <div className="flex items-center justify-center gap-3 mb-6 shrink-0">
                        <button
                            onClick={handleTTS}
                            className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center text-primary shrink-0 hover:bg-muted/50 transition-colors"
                            title="Play English translation aloud"
                        >
                            <Volume2 size={20} />
                        </button>
                        <p className="text-xl font-medium text-card-foreground text-center line-clamp-2">
                            {currentSegment.ipa}
                        </p>
                    </div>
                )}

                {/* Cultural Context Accordion */}
                {(currentSegment.culturalContext || activeUnit.culturalContext) && (
                    <div className="mb-6 shrink-0 bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm transition-all">
                        <button
                            onClick={() => setShowContext(!showContext)}
                            className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/10 transition-colors"
                        >
                            <div className="flex items-center gap-2 text-primary">
                                <Info size={18} />
                                <span className="font-bold text-sm">Cultural context</span>
                            </div>
                            {showContext ? (
                                <ChevronUp size={18} className="text-muted-foreground" />
                            ) : (
                                <ChevronDown size={18} className="text-muted-foreground" />
                            )}
                        </button>
                        <div
                            className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${showContext ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="p-4 bg-muted/30 rounded-xl">
                                <p className="text-sm font-medium text-card-foreground leading-relaxed">
                                    {currentSegment.culturalContext || activeUnit.culturalContext}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="mt-auto relative shrink-0">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type in English"
                        className={`w-full bg-white border-2 rounded-2xl p-4 text-lg font-medium resize-none h-32 focus:outline-none transition-colors placeholder:text-muted-foreground/50 shadow-sm ${status === "error"
                            ? "border-destructive text-destructive"
                            : status === "success"
                                ? "border-sage text-sage"
                                : "border-border/50 focus:border-primary/50"
                            }`}
                    />
                    {status === "error" && (
                        <p className="text-destructive text-sm font-bold absolute -bottom-6 left-2 animate-in fade-in slide-in-from-top-2">
                            Incorrect. Try: "{currentSegment.meaning}"
                        </p>
                    )}
                </div>
            </main>

            {/* Bottom Action Bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-6 border-t transition-colors duration-300 ${status === "success" ? "bg-sage/10 border-sage/20" : "bg-[#FDFCFB] border-border/30"
                }`}>
                <div className="w-full max-w-2xl mx-auto flex justify-between items-center">
                    <button
                        onClick={() => {
                            completeLesson(activeUnit!.id);
                            if (currentSegmentIndex + 1 >= completableSegments.length) {
                                navigate('/learner');
                            }
                        }}
                        className="px-6 py-3 font-bold text-muted-foreground hover:bg-muted/30 rounded-2xl transition-colors"
                    >
                        Skip
                    </button>
                    <button
                        onClick={handleCheck}
                        disabled={!inputValue.trim() || status !== "idle"}
                        className={`px-10 py-4 font-bold rounded-2xl text-lg transition-all ${status === "success"
                            ? "bg-sage text-white shadow-lg shadow-sage/30"
                            : inputValue.trim()
                                ? "bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                    >
                        {status === "success" ? "Correct!" : "Check"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LearnerLesson;
