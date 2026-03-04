import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchSidebar from "../components/WorkbenchSidebar";
import { Search, Bell, User, Mic } from "lucide-react";

interface WorkbenchLayoutProps {
    children: ReactNode;
}

const WorkbenchLayout = ({ children }: WorkbenchLayoutProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
            {/* Sidebar */}
            <WorkbenchSidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

                {/* ── Glassmorphism top header ───────────────────── */}
                <header className="h-16 border-b border-border/80 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 transition-all relative">
                    {/* Warm gradient underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
                            <input
                                type="text"
                                placeholder="Search corpus, speakers, or annotations…"
                                className="w-full bg-card border border-border/70 rounded-full py-2 pl-11 pr-4 text-sm text-foreground font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                        {/* Record shortcut — shimmer on hover */}
                        <button
                            onClick={() => navigate("/workbench/record")}
                            className="hidden sm:flex items-center gap-2 relative overflow-hidden bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 group"
                        >
                            <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Mic size={14} className="relative z-10" />
                            <span className="relative z-10">Record</span>
                        </button>

                        {/* Notification bell with glowing dot */}
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background glow-primary" />
                        </button>

                        <div className="h-7 w-px bg-border/60 mx-1" />

                        {/* User chip */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-foreground leading-tight">Dr. Sarah Chen</p>
                                <p className="text-[10px] text-primary uppercase tracking-widest font-bold">Field Linguist</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 shadow-sm flex items-center justify-center text-primary hover:scale-105 transition-transform cursor-pointer">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content scroll area — dot-grid overlay for depth */}
                <main className="flex-1 overflow-y-auto relative" data-lenis-prevent="true">
                    <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WorkbenchLayout;

