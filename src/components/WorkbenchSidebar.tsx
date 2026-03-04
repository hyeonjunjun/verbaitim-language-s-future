import { Link, useLocation } from "react-router-dom";
import WaveformLogo from "./WaveformLogo";
import {
    LayoutDashboard,
    Mic,
    Mic2,
    Database,
    History,
    Settings,
    ChevronRight,
    Plus,
    BookMarked
} from "lucide-react";

// Decorative IPA characters that float quietly in the sidebar background
const IPA_CHARS = ["ʃ", "ŋ", "ʒ", "θ", "ɾ", "ʔ", "ɯ", "χ", "ʕ", "β"];

const WorkbenchSidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, path: "/workbench" },
        { name: "Record Session", icon: Mic, path: "/workbench/record" },
        { name: "Live Editor", icon: Mic2, path: "/workbench/editor" },
        { name: "Corpus Library", icon: Database, path: "/workbench/corpus" },
        { name: "History", icon: History, path: "/workbench/history" },
    ];

    const corpusProjects = [
        { name: "Lakota_Corpus_Q4", status: "In Progress", color: "bg-ochre" },
        { name: "Quechua_Archive_01", status: "Reviewed", color: "bg-sage" },
        { name: "Maori_Elders_2024", status: "Transcribing", color: "bg-clay" },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0 transition-colors duration-500 relative overflow-hidden">

            {/* Floating IPA watermark characters — purely decorative */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
                {IPA_CHARS.map((char, i) => (
                    <span
                        key={i}
                        className="absolute font-display text-foreground ipa-float"
                        style={{
                            left: `${(i * 37 + 8) % 88}%`,
                            top: `${(i * 61 + 12) % 90}%`,
                            fontSize: `${14 + (i % 3) * 6}px`,
                            opacity: 0.05,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${5 + (i % 3)}s`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>

            {/* Sidebar Header — warm gradient swatch */}
            <div className="h-16 flex items-center px-5 border-b border-border relative bg-gradient-to-r from-primary/5 via-transparent to-transparent shrink-0">
                {/* Subtle left accent stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
                <Link to="/" className="flex items-center gap-3 group relative z-10">
                    <WaveformLogo size={22} />
                    <span className="font-display font-bold text-lg tracking-tight text-foreground italic">Verb<span className="text-primary font-sans not-italic">AI</span>tim</span>
                </Link>
            </div>

            {/* Primary Navigation */}
            <nav className="p-3 space-y-0.5 relative z-10">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group relative overflow-hidden ${isActive
                                ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                }`}
                        >
                            {/* Active shimmer sweep */}
                            {isActive && (
                                <div className="absolute inset-0 shimmer pointer-events-none" />
                            )}
                            <div className="flex items-center gap-3 relative z-10">
                                <item.icon
                                    size={18}
                                    className={isActive
                                        ? "text-primary"
                                        : "text-muted-foreground group-hover:text-primary transition-colors"}
                                />
                                <span className="tracking-tight">{item.name}</span>
                            </div>
                            {isActive && (
                                <ChevronRight size={14} className="text-primary/60 relative z-10 shrink-0" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-5 my-1 h-px bg-gradient-to-r from-transparent via-border to-transparent relative z-10" />

            {/* Projects Section */}
            <div className="px-3 flex-1 relative z-10 mt-3">
                <div className="flex items-center justify-between px-2 mb-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Active Corpus</h3>
                    <button className="p-1 hover:bg-accent/60 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                        <Plus size={13} />
                    </button>
                </div>

                <div className="space-y-0.5">
                    {corpusProjects.map((project) => (
                        <button
                            key={project.name}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all text-left group"
                        >
                            <BookMarked size={13} className="text-muted-foreground/60 group-hover:text-foreground shrink-0" />
                            <div className="truncate flex-1 font-mono">{project.name}</div>
                            <div className={`w-1.5 h-1.5 rounded-full ${project.color} shrink-0`} title={project.status} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="p-3 border-t border-border space-y-0.5 mt-auto relative z-10 bg-gradient-to-t from-secondary/10 to-transparent">
                <Link
                    to="/workbench/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${location.pathname === "/workbench/settings"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                        }`}
                >
                    <Settings
                        size={18}
                        className={location.pathname === "/workbench/settings" ? "text-primary" : "text-muted-foreground"}
                    />
                    Settings
                </Link>
            </div>
        </aside>
    );
};

export default WorkbenchSidebar;
