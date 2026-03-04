import { Search, Bell, Mic, FileText, MessageSquarePlus, Send, Archive, Home, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const LinguistDashboard = () => {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-foreground font-body pb-20 md:pb-0">
            {/* Top Bar */}
            <header className="px-6 pt-12 pb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-display text-primary text-sm font-bold tracking-wide">VerbAItim</div>
                        <h1 className="text-3xl font-semibold mt-1 text-card-foreground">Field Linguist</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/learner" className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-full hover:bg-primary/20 transition-colors">
                            Switch to Learner
                        </Link>
                        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Container */}
            <main className="px-6 space-y-8 max-w-3xl mx-auto md:mx-0 md:px-8">

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search sessions, recordings..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-border/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center justify-center py-6 px-2 bg-primary text-primary-foreground rounded-2xl shadow-sm hover:bg-primary/90 transition-transform active:scale-95">
                        <Mic size={24} className="mb-2" />
                        <span className="text-sm font-medium">Record audio</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-6 px-2 bg-white text-card-foreground border border-border/50 rounded-2xl hover:bg-muted/50 transition-transform active:scale-95">
                        <FileText size={24} className="mb-2 text-primary" />
                        <span className="text-sm font-medium">Field notes</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-6 px-2 bg-white text-card-foreground border border-border/50 rounded-2xl hover:bg-muted/50 transition-transform active:scale-95">
                        <MessageSquarePlus size={24} className="mb-2 text-primary" />
                        <span className="text-sm font-medium">Elicit</span>
                    </button>
                </div>

                {/* Your workflow */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-lg">Your workflow</h2>
                        <button className="text-primary text-sm font-medium">View all</button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "Record", desc: "Capture audio & IPA transcription", pct: 68, color: "bg-primary", icon: <Mic size={18} className="text-primary" /> },
                            { title: "Transcribe & assign", desc: "AI + human review of values", pct: 42, color: "bg-sage", icon: <FileText size={18} className="text-sage" /> },
                            { title: "Archive & publish", desc: "Send finalized data to learners", pct: 15, color: "bg-clay", icon: <Archive size={18} className="text-clay" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-border/50">
                                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-muted/50`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-xs font-bold ${item.color.replace('bg-', 'text-')}`}>{item.pct}%</span>
                                    <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Publish CTA */}
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-sage text-sage-foreground rounded-2xl font-bold shadow-sm hover:bg-sage/90 transition-all">
                    <Send size={18} />
                    Publish to Learner Portal
                </button>

                {/* Pending review */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-lg">Pending review</h2>
                        <span className="text-primary text-sm font-medium">3 sessions</span>
                    </div>

                    <div className="space-y-4 bg-white border border-border/50 rounded-2xl p-4">
                        {[
                            { time: "14:30", title: "Kinship terms with María", meta: "Mixtec • 23 min • IPA review needed", color: "bg-primary" },
                            { time: "10:15", title: "Plant names (field walk)", meta: "Mixtec • 45 min • Ready to publish", color: "bg-sage" },
                            { time: "09:00", title: "Narrative: Origin story", meta: "Zapotec • 18 min • Transcribing...", color: "bg-ochre" },
                        ].map((sess, i) => (
                            <div key={i} className="flex items-start gap-4 p-2 relative">
                                <div className="w-12 pt-1 font-semibold text-card-foreground text-sm shrink-0">{sess.time}</div>
                                <div className={`absolute left-[3.5rem] top-2 bottom-2 w-1 rounded-full ${sess.color}`} />
                                <div className="pl-6 pb-2 border-b border-border/30 last:border-0 flex-1">
                                    <h3 className="font-semibold text-card-foreground text-[15px]">{sess.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">{sess.meta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Bottom Navigation (Mobile) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-2 pb-safe flex justify-between items-center md:hidden">
                {[
                    { icon: Home, label: "Home", active: true },
                    { icon: Mic, label: "Record", active: false },
                    { icon: Archive, label: "Archive", active: false },
                    { icon: MoreHorizontal, label: "More", active: false },
                ].map((item, i) => (
                    <button key={i} className={`flex flex-col items-center gap-1 p-2 ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                        {item.active ? (
                            <div className="bg-primary text-white p-2 rounded-full -mt-2"><item.icon size={20} /></div>
                        ) : (
                            <item.icon size={20} />
                        )}
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default LinguistDashboard;
