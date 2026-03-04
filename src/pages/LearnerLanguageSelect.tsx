import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, Search, UserCircle, MapPin } from "lucide-react";
import { useLearnerStore } from "@/hooks/useLearnerStore";
import { useAudioStore } from "@/hooks/useAudioStore";
import { useEffect } from "react";

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

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-foreground font-body p-6 pb-20">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8 max-w-md mx-auto pt-6">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/30">
                    <UserCircle size={24} className="text-muted-foreground" />
                </button>
                <div className="flex flex-col items-center">
                    <button className="flex items-center gap-1 text-sm font-bold text-card-foreground">
                        Choose language <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="max-w-md mx-auto">
                <h1 className="text-4xl font-display font-medium text-center mb-8 text-card-foreground tracking-tight">VerbAItim.</h1>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="Search languages..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/50 text-card-foreground"
                    />
                </div>

                {/* Language Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => handleSelectCourse(course.id)}
                                className="bg-white rounded-3xl p-4 border border-border/50 shadow-sm cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
                            >
                                <div
                                    className="aspect-[4/3] rounded-2xl mb-4 overflow-hidden relative"
                                    style={{ backgroundColor: course.themeColor }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-foreground/10">
                                        <span className="font-serif text-6xl">{course.symbol}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                    {course.learnerCount} learners
                                </p>
                                <h3 className="font-bold text-card-foreground text-lg leading-tight mb-1">
                                    {course.name} <br />
                                    {course.region && (
                                        <span className="text-sm font-medium text-muted-foreground">({course.region})</span>
                                    )}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-2 font-medium">
                                    By {course.creatorName}
                                </p>
                            </div>
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
