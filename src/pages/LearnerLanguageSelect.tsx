import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, Search, UserCircle, MapPin, Mic, BookOpen, Users } from "lucide-react";
import { useLearnerStore } from "@/hooks/useLearnerStore";
import { useAudioStore } from "@/hooks/useAudioStore";
import { useEffect } from "react";
import WaveformLogo from "@/components/WaveformLogo";
import { motion } from "framer-motion";

const LearnerLanguageSelect = () => {
    const navigate = useNavigate();
    const { courses, setActiveCourse, syncWithAudioStore } = useLearnerStore();
    const { sessions } = useAudioStore();

    useEffect(() => {
        syncWithAudioStore(sessions);
    }, [sessions, syncWithAudioStore]);

    const handleSelectCourse = (courseId: string) => {
        setActiveCourse(courseId);
        navigate('/learner');
    }

    // Derive stats from real data
    const totalSessions = sessions.length;
    const uniqueLanguages = new Set(sessions.map(s => s.language)).size;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDFCFB] via-secondary/10 to-[#FDFCFB] text-foreground font-body p-6 pb-20 relative overflow-hidden">
            {/* Soft background blob */}
            <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="fixed bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sage/5 blur-[120px] pointer-events-none" />

            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto pt-6">
                <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors">
                    <UserCircle size={24} className="text-muted-foreground" />
                </Link>
                <div className="flex flex-col items-center">
                    <button className="flex items-center gap-1 text-sm font-bold text-card-foreground">
                        Choose language <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                </div>
                <Link to="/workbench" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                    Workbench →
                </Link>
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Logo + headline */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <WaveformLogo size={36} />
                        <h1 className="text-3xl font-display font-bold tracking-tight text-card-foreground">
                            Verb<span className="text-primary font-sans">AI</span>tim
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Learn languages preserved by communities and field linguists.
                    </p>
                </div>

                {/* Stats bar */}
                <div className="flex items-center justify-center gap-6 mb-8 text-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mic size={14} className="text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-card-foreground">{totalSessions}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Sessions</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
                            <BookOpen size={14} className="text-sage-foreground" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-card-foreground">{uniqueLanguages}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Languages</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-ochre/20 flex items-center justify-center">
                            <Users size={14} className="text-ochre" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-card-foreground">{courses.length}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Courses</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search languages…"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-border/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50 text-card-foreground text-sm"
                    />
                </div>

                {/* Language Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
                        {courses.map((course, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                key={course.id}
                                onClick={() => handleSelectCourse(course.id)}
                                className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 border border-border/50 shadow-sm cursor-pointer hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all group"
                            >
                                <div
                                    className="aspect-[4/3] rounded-2xl mb-3 overflow-hidden relative"
                                    style={{ backgroundColor: course.themeColor }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-foreground/10">
                                        <span className="font-serif text-6xl">{course.symbol}</span>
                                    </div>
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                                        <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-primary/80 px-3 py-1.5 rounded-full">
                                            Start Learning →
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                                    {course.learnerCount} learners
                                </p>
                                <h3 className="font-bold text-card-foreground text-base leading-tight mb-0.5">
                                    {course.name}
                                </h3>
                                {course.region && (
                                    <p className="text-xs text-muted-foreground font-medium">{course.region}</p>
                                )}
                                <p className="text-[11px] text-muted-foreground/70 mt-2 font-medium">
                                    By {course.creatorName}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-6 bg-white rounded-3xl border border-border/50 shadow-sm">
                        <MapPin size={40} className="mx-auto text-muted-foreground/40 mb-4" />
                        <h3 className="font-bold text-xl text-card-foreground mb-2">No languages to learn yet</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Waiting for the Field Linguist to record some sessions in the Workbench!
                        </p>
                        <Link to="/workbench" className="mx-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-sm hover:bg-primary/90 transition-colors">
                            Go to Workbench
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearnerLanguageSelect;
