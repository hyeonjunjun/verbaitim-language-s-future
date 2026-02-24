import { Link, useLocation } from "react-router-dom";
import WaveformLogo from "./WaveformLogo";
import {
    LayoutDashboard,
    Mic2,
    Database,
    History,
    Settings,
    ChevronRight,
    Plus,
    BookMarked
} from "lucide-react";

const WorkbenchSidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, path: "/workbench" },
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
        <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0 transition-colors duration-500">
            {/* Sidebar Header */}
            <div className="h-14 flex items-center px-6 border-b border-border">
                <Link to="/" className="flex items-center gap-3 group">
                    <WaveformLogo size={20} />
                    <span className="font-display font-bold text-lg tracking-tight text-foreground italic">VerbAItim</span>
                </Link>
            </div>

            {/* Primary Navigation */}
            <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group ${isActive
                                ? "bg-signal/10 text-signal shadow-inner"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={isActive ? "text-signal" : "text-muted-foreground group-hover:text-foreground"} />
                                {item.name}
                            </div>
                            {isActive && <ChevronRight size={14} />}
                        </Link>
                    );
                })}
            </nav>

            {/* Projects Section */}
            <div className="mt-8 px-4 flex-1">
                <div className="flex items-center justify-between px-3 mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Active Corpus</h3>
                    <button className="p-1 hover:bg-accent/50 rounded text-muted-foreground hover:text-foreground transition-colors">
                        <Plus size={14} />
                    </button>
                </div>

                <div className="space-y-1">
                    {corpusProjects.map((project) => (
                        <button
                            key={project.name}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all text-left group"
                        >
                            <BookMarked size={14} className="text-muted-foreground/70 group-hover:text-foreground" />
                            <div className="truncate flex-1">{project.name}</div>
                            <div className={`w-2 h-2 rounded-full ${project.color}`} title={project.status} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="p-4 border-t border-border space-y-1 mt-auto">
                <Link
                    to="/workbench/settings"
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === "/workbench/settings"
                            ? "bg-signal/10 text-signal shadow-inner"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                >
                    <Settings size={18} className={location.pathname === "/workbench/settings" ? "text-signal" : "text-muted-foreground"} />
                    Settings
                </Link>
            </div>
        </aside>
    );
};

export default WorkbenchSidebar;
