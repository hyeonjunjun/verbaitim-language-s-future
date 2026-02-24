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
    ArrowUpRight
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
                    {/* Recent Corpus Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display font-bold text-lg text-foreground">Recent Corpus Activity</h2>
                                <button className="text-xs text-signal hover:underline flex items-center gap-1 font-bold italic">
                                    View Full Library <ArrowUpRight size={14} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { file: "lakota_elder_interview_04.wav", size: "45.2 MB", date: "2 hours ago", status: "Needs Review" },
                                    { file: "ceremonial_chant_archive_B.wav", size: "12.8 MB", date: "Yesterday", status: "Transcribed" },
                                    { file: "verb_morphology_session_01.mp3", size: "8.1 MB", date: "3 days ago", status: "Processing" },
                                ].map((item) => (
                                    <div key={item.file} className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-xl hover:bg-background transition-all cursor-pointer group/row">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-card flex items-center justify-center rounded-lg border border-border text-muted-foreground group-hover/row:text-signal transition-colors shadow-sm">
                                                <FileAudio size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{item.file}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">{item.size} • {item.date}</p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Needs Review' ? 'bg-ochre/10 text-ochre border border-ochre/20' :
                                            item.status === 'Transcribed' ? 'bg-sage/10 text-sage border border-sage/20' :
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
                        <div className="bg-signal text-signal-foreground p-6 rounded-2xl shadow-xl shadow-signal/20 relative overflow-hidden group hover:shadow-2xl hover:shadow-signal/30 transition-all duration-300">
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="font-display font-bold text-xl mb-4 relative z-10 italic">Ready to transcribe?</h3>
                            <p className="text-sm text-white/80 mb-6 relative z-10 leading-relaxed font-medium">
                                Start a new recording or upload a file to begin phonetic analysis with Allosaurus.
                            </p>
                            <button
                                onClick={() => navigate("/workbench/editor")}
                                className="w-full bg-background text-signal py-3 rounded-xl font-bold text-sm hover:bg-background/90 transition-all active:scale-95 shadow-lg relative z-10 border border-signal/10"
                            >
                                Open New Session
                            </button>
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
