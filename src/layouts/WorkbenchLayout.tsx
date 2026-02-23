import { ReactNode } from "react";
import WorkbenchSidebar from "../components/WorkbenchSidebar";
import { Search, Bell, User } from "lucide-react";

interface WorkbenchLayoutProps {
    children: ReactNode;
}

const WorkbenchLayout = ({ children }: WorkbenchLayoutProps) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
            {/* Sidebar - Fixed Chassis */}
            <WorkbenchSidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 transition-colors">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input
                                type="text"
                                placeholder="Search corpus, speakers, or annotations..."
                                className="w-full bg-secondary border border-border rounded-lg py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-signal/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-signal rounded-full border-2 border-card" />
                        </button>
                        <div className="h-8 w-px bg-border mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-semibold text-foreground">Dr. Sarah Chen</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Lead Linguist</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-signal/20 to-signal/10 border border-border flex items-center justify-center text-signal">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Scroll Area */}
                <main className="flex-1 overflow-y-auto bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default WorkbenchLayout;
