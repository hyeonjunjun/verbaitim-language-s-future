import { useNavigate, Link } from "react-router-dom";
import { UserCircle, Flame, Bell, CheckCircle2, Lock, Store, School, Leaf, MapPin, Sparkles } from "lucide-react";
import { useLearnerStore, LessonUnit } from "@/hooks/useLearnerStore";
import { useAudioStore } from "@/hooks/useAudioStore";
import { useEffect } from "react";
import { motion } from "framer-motion";

// Map string names from store to actual Lucide components
const IconMap: Record<string, any> = {
    Store: Store,
    School: School,
    Leaf: Leaf,
    MapPin: MapPin,
};

const LearnerDashboard = () => {
    const navigate = useNavigate();
    const { sessions } = useAudioStore();
    const {
        courses,
        activeCourseId,
        units,
        dailyGoal,
        lessonsCompletedToday,
        syncWithAudioStore
    } = useLearnerStore();

    const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

    // Sync derived units whenever audio sessions change
    useEffect(() => {
        syncWithAudioStore(sessions);
    }, [sessions, syncWithAudioStore]);

    // Redirect to select if no active course is available
    useEffect(() => {
        if (!activeCourse) {
            navigate('/learner/select', { replace: true });
        }
    }, [activeCourse, navigate]);

    // Don't render until we have a valid course
    if (!activeCourse) return null;

    const handleLessonClick = (unitId: string, status: string) => {
        if (status === 'active') {
            navigate('/learner/lesson');
        }
    };

    const renderUnitIcon = (unit: LessonUnit) => {
        const IconComponent = IconMap[unit.iconName] || Store;

        if (unit.status === 'completed') {
            return (
                <div className="w-16 h-16 rounded-[1.25rem] bg-sage/20 border-2 border-sage/30 flex items-center justify-center group-hover:scale-105 transition-transform relative">
                    <IconComponent size={32} className="text-sage" />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#FDFCFB] rounded-full flex items-center justify-center">
                        <CheckCircle2 size={22} className="text-sage fill-sage/20" />
                    </div>
                </div>
            );
        }

        if (unit.status === 'active') {
            return (
                <div className="animate-bounce">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-primary flex items-center justify-center shadow-[0_8px_30px_rgb(196,107,68,0.3)] group-hover:scale-105 transition-transform relative">
                        <IconComponent size={32} className="text-white" />
                    </div>
                </div>
            );
        }

        // Locked
        return (
            <div className="w-16 h-16 rounded-[1.25rem] bg-muted/50 border-2 border-border/50 flex items-center justify-center">
                <IconComponent size={32} className="text-muted-foreground/50" />
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#FDFCFB] rounded-full flex items-center justify-center">
                    <Lock size={18} className="text-muted-foreground" />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDFCFB] via-secondary/10 to-[#FDFCFB] text-foreground font-body p-6 pb-20 relative overflow-hidden">
            {/* Soft background blob */}
            <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="fixed bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sage/5 blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Top Navigation */}
                <header className="flex items-center justify-between mb-8 pt-6">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors">
                            <UserCircle size={24} className="text-muted-foreground" />
                        </button>
                        <Link to="/workbench" className="px-5 py-2.5 bg-white/60 backdrop-blur-md border border-border/50 shadow-sm text-foreground text-xs font-bold rounded-full hover:bg-white hover:shadow-md hover:border-primary/20 transition-all flex items-center gap-2">
                            <Sparkles size={14} className="text-primary" /> Switch to Linguist
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-primary font-bold">
                            <Flame size={20} className="fill-current text-primary" />
                            <span className="text-lg">12</span>
                        </div>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted/30 transition-colors">
                            <Bell size={24} className="text-muted-foreground" />
                        </button>
                    </div>
                </header>

                <h1 className="text-3xl font-display font-medium text-card-foreground mb-6 tracking-tight">
                    Hi Maria,
                </h1>

                {/* Daily Goal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-[2rem] p-6 border border-border/50 shadow-sm mb-10 relative overflow-hidden cursor-pointer hover:border-primary/30 group transition-colors"
                >
                    {/* Decorative pattern for the goal card */}
                    <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors pointer-events-none" />

                    {/* Line Art Illustration */}
                    <img
                        src="/learner_village.png"
                        alt="Village Illustration"
                        className="absolute -right-4 bottom-0 w-36 h-36 sm:-right-8 sm:-bottom-4 sm:w-56 sm:h-56 object-contain opacity-90 mix-blend-multiply pointer-events-none group-hover:scale-105 group-hover:-rotate-2 group-hover:opacity-100 transition-all duration-700 ease-out"
                    />

                    <div className="relative z-10 pr-28 sm:pr-40">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 mb-4">
                            <h2 className="text-[17px] font-bold text-card-foreground leading-snug">
                                {lessonsCompletedToday}/{dailyGoal} lessons today.<br />
                                {lessonsCompletedToday >= dailyGoal ? "Daily goal met!" : "You're almost there!"}
                            </h2>
                            <span className="self-start px-2.5 py-1 bg-white/80 backdrop-blur-sm border border-border/50 shadow-sm text-muted-foreground text-[11px] font-bold rounded-md">
                                {activeCourse.name} {activeCourse.region && `(${activeCourse.region})`}
                            </span>
                        </div>
                        <div className="h-2.5 w-full bg-muted/80 rounded-full overflow-hidden mt-6 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-sage to-[#81C784] rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${Math.min((lessonsCompletedToday / dailyGoal) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </motion.div>

                {units.length > 0 ? (
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-2xl text-card-foreground tracking-tight">Explore the Village</h3>
                            <p className="text-muted-foreground font-medium text-sm mt-1">Practice skills in specific contexts</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 px-6 bg-muted/20 rounded-[2rem] border border-border/50 border-dashed">
                        <MapPin size={40} className="mx-auto text-muted-foreground/40 mb-4" />
                        <h3 className="font-bold text-xl text-card-foreground mb-2">No learning paths yet</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Waiting for the Field Linguist to record and transcribe sessions in the Workbench. Once they do, new learning units will appear here magically!
                        </p>
                        <Link to="/workbench" className="mx-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-sm hover:bg-primary/90 transition-colors">
                            Go to Workbench
                        </Link>
                    </div>
                )}

                {/* Village Explorer Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                    {units.map((unit, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            key={unit.id}
                            onClick={() => handleLessonClick(unit.id, unit.status)}
                            className={`flex items-center gap-5 p-5 rounded-[2rem] bg-white/80 backdrop-blur-sm border shadow-sm transition-all
                                ${unit.status === 'locked'
                                    ? 'opacity-60 border-border/40'
                                    : 'cursor-pointer hover:border-primary/40 hover:shadow-md hover:-translate-y-1 border-border/50 group'
                                }`}
                        >
                            <div className="shrink-0 relative">
                                {renderUnitIcon(unit)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className={`font-bold text-[19px] mb-1 truncate ${unit.status === 'active' ? 'text-primary' : 'text-card-foreground'}`}>
                                    {unit.title}
                                </h4>
                                <p className="text-[13px] font-medium text-muted-foreground leading-snug line-clamp-2 mb-2">
                                    {unit.description}
                                </p>

                                {unit.status !== 'locked' && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${unit.status === 'completed' ? 'bg-sage' : 'bg-primary/50'}`}
                                                style={{ width: `${(unit.completedLessons / unit.totalLessons) * 100}%` }}
                                            />
                                        </div>
                                        <span className={`text-[11px] font-bold ${unit.status === 'completed' ? 'text-sage' : 'text-muted-foreground'}`}>
                                            {unit.completedLessons}/{unit.totalLessons}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnerDashboard;
