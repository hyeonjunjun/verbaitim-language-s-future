import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { useAudioStore } from "@/hooks/useAudioStore";
import {
    Users,
    FileAudio,
    Activity,
    Clock,
    ArrowUpRight,
    Mic,
    BookOpen,
    MessageSquarePlus,
    Upload
} from "lucide-react";

const WorkbenchDashboard = () => {
    const navigate = useNavigate();
    const { backendStatus, backendMode, checkBackendHealth } = useAudioStore();

    useEffect(() => {
        checkBackendHealth();
    }, [checkBackendHealth]);

    const statusLabel = backendStatus === "online"
        ? `Allosaurus Node: Online (${backendMode})`
        : backendStatus === "checking"
            ? "Checking…"
            : "Backend Offline";

    return (
        <WorkbenchLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <Headline as="h1" className="text-3xl font-display mb-2 text-foreground">Project Overview</Headline>
                        <Text className="text-muted-foreground/80">Manage your language corpora and collaborative sessions.</Text>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">System Status</p>
                        <p className={`text-sm font-mono flex items-center gap-2 justify-end font-bold ${backendStatus === "online" ? "text-signal" : backendStatus === "checking" ? "text-muted-foreground" : "text-ochre"
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${backendStatus === "online" ? "bg-signal animate-pulse shadow-[0_0_8px_rgba(var(--signal),0.5)]" : backendStatus === "checking" ? "bg-muted-foreground animate-pulse" : "bg-ochre"
                                }`} />
                            {statusLabel}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: "Active Speakers", value: "12", icon: Users, trend: "+2 this week" },
                        { label: "Total Recordings", value: "142", icon: FileAudio, trend: "4.2 GB used" },
                        { label: "Transcription Rate", value: "89%", icon: Activity, trend: "Avg Confidence" },
                        { label: "Lab Hours", value: "324h", icon: Clock, trend: "This quarter" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-signal/30 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-signal/10 text-signal rounded-lg group-hover:scale-110 transition-transform shadow-inner">
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">{stat.trend}</div>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Projects */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display font-bold text-lg text-foreground">Active Projects</h2>
                                <button className="text-xs text-muted-foreground hover:text-signal transition-colors font-medium">
                                    View All Projects
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "Mixtec - San Juan", progress: 68, sessions: 24, lastActive: "2 hrs ago" },
                                    { name: "Zapotec - Tlacolula", progress: 42, sessions: 12, lastActive: "1 day ago" }
                                ].map(project => (
                                    <div key={project.name} className="p-5 bg-card border border-border rounded-xl hover:border-signal/30 transition-all cursor-pointer group shadow-sm hover:shadow-md hover:shadow-signal/10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-signal transition-colors">{project.name}</h3>
                                                <p className="text-xs text-muted-foreground">{project.sessions} sessions</p>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-signal bg-signal/10 px-2 py-1 rounded-md border border-signal/20">{project.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2 shadow-inner">
                                            <div className="h-full bg-signal" style={{ width: `${project.progress}%` }} />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/60 text-right uppercase tracking-wider font-bold">Active {project.lastActive}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Sessions Feed */}
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display font-bold text-lg text-foreground">Recent Sessions</h2>
                                <button className="text-xs text-signal hover:underline flex items-center gap-1 font-bold italic">
                                    View Full History <ArrowUpRight size={14} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { title: "lakota_elder_interview_04", language: "Lakota", date: "2 hours ago", status: "Needs Review", typIcon: Mic },
                                    { title: "Plant names — field walk", language: "Zapotec", date: "Yesterday", status: "Notes", typIcon: BookOpen },
                                    { title: "Kinship terms with María", language: "Mixtec", date: "3 days ago", status: "Verified", typIcon: MessageSquarePlus },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-xl hover:bg-background hover:border-signal/30 transition-all cursor-pointer group/row">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-card flex items-center justify-center rounded-lg border border-border text-muted-foreground group-hover/row:text-signal transition-colors shadow-sm">
                                                <item.typIcon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">{item.language} • {item.date}</p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Needs Review' ? 'bg-ochre/10 text-ochre border border-ochre/20' :
                                            item.status === 'Verified' ? 'bg-sage/10 text-sage border border-sage/20' :
                                                'bg-clay/10 text-clay border border-clay/20'
                                            }`}>
                                            {item.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Tasks / Sidebar */}
                    <div className="space-y-6">
                        <div className="mb-2">
                            <h3 className="font-display font-bold text-lg text-foreground">Quick Actions</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Record", icon: Mic, path: "/workbench/record", desc: "Live capture", primary: true },
                                { label: "Notes", icon: BookOpen, path: "/workbench/notes", desc: "Observations", primary: false },
                                { label: "Elicit", icon: MessageSquarePlus, path: "/workbench/elicitation", desc: "Structured", primary: false },
                                { label: "Upload", icon: Upload, path: "/workbench/editor", desc: "Transcribe", primary: false }
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    onClick={() => navigate(action.path)}
                                    className={`flex flex-col items-start p-4 border rounded-xl transition-all text-left group active:scale-95 ${action.primary ? 'bg-signal text-signal-foreground border-signal/20 shadow-lg shadow-signal/20 hover:shadow-xl hover:shadow-signal/30' : 'bg-card border-border hover:border-signal/50 hover:bg-signal/5'}`}
                                >
                                    <div className={`mb-3 transition-colors ${action.primary ? 'text-white/80 group-hover:text-white' : 'text-muted-foreground group-hover:text-signal'}`}>
                                        <action.icon size={20} />
                                    </div>
                                    <p className={`font-bold text-sm mb-1 ${action.primary ? 'text-white' : 'text-foreground'}`}>{action.label}</p>
                                    <p className={`text-[10px] ${action.primary ? 'text-white/70' : 'text-muted-foreground'}`}>{action.desc}</p>
                                </button>
                            ))}
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground/60 mb-6">Network Health</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Storage Capacity", value: "72%", sub: "4.2GB / 10GB" },
                                    { label: "Sync Status", value: "Optimal", sub: "Last sync 5m ago" },
                                ].map((metric) => (
                                    <div key={metric.label}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-foreground">{metric.label}</span>
                                            <span className="text-xs text-signal font-mono font-bold tracking-tighter">{metric.value}</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full bg-signal shadow-[0_0_8px_rgba(var(--signal),0.4)]" style={{ width: metric.value === 'Optimal' ? '100%' : metric.value }} />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/60 mt-2 font-mono uppercase italic tracking-tighter">{metric.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchDashboard;
