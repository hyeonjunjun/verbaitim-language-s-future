import { useState, useRef } from "react";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import {
    Play,
    Pause,
    Settings,
    Mic,
    Wand2,
    FileText,
    ChevronDown,
    Layers,
    Sparkles,
    Save,
    Download,
    Plus,
    Users
} from "lucide-react";

const WorkbenchEditor = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Mock data for the annotation grid
    const annotations = [
        { id: 1, time: "00:01:23", speaker: "EF_01", text: "Hau, mitákuyepi.", ipa: "haʊ miˈtakuˌjepi", meaning: "Hello, my relatives.", conf: 98 },
        { id: 2, time: "00:01:45", speaker: "EF_02", text: "Čhaŋté waštéya napéčhiyuzape.", ipa: "tʃʰãˈte waˈʃteja naˈpetʃʰijuˌzape", meaning: "I shake your hands with a good heart.", conf: 92 },
        { id: 3, time: "00:02:10", speaker: "EF_01", text: "Tókša akhé waŋčhíyaŋkiŋ kte.", ipa: "ˈtokʃa aˈkʰe wãˈtʃʰijãkĩ kte", meaning: "I will see you again soon.", conf: 99 },
    ];

    return (
        <WorkbenchLayout>
            <div className="h-full flex flex-col overflow-hidden">
                {/* Editor Toolbar */}
                <div className="h-12 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 transition-colors duration-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border">
                            <button className="p-1 px-2 hover:bg-accent/50 rounded flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors">
                                <Layers size={14} className="text-muted-foreground" /> Layers
                            </button>
                            <button className="p-1 px-2 bg-signal/15 text-signal rounded flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider border border-signal/30 shadow-inner">
                                <Mic size={14} /> Editor
                            </button>
                        </div>
                        <div className="h-4 w-px bg-border mx-2" />
                        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/60">
                            <span className="text-foreground/80 font-bold tracking-tighter">Lakota_Interview_01</span>
                            <span className="mx-2">/</span>
                            <span className="italic">Layer: Phonemic_Draft_04</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-signal text-white rounded-lg text-xs font-bold hover:bg-signal/90 transition-all active:scale-95 shadow-lg shadow-signal/20">
                            <Save size={14} /> Save Changes
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-accent/50 transition-all">
                            <Download size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-accent/50 transition-all">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* The Workspace Grid */}
                <div className="flex-1 flex min-h-0">
                    {/* Main Stage (Timeline + Annotations) */}
                    <div className="flex-1 flex flex-col min-w-0 border-r border-white/5 overflow-hidden">

                        {/* Timeline / Waveform View */}
                        <div className="h-64 bg-background/50 border-b border-border relative flex flex-col overflow-hidden shrink-0 transition-colors">
                            <div className="flex-1 relative flex items-center justify-center bg-card shadow-inner">
                                {/* Visual Audio Grid */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--signal),0.05)_0%,transparent_70%)]" />

                                {/* Fake Waveform */}
                                <svg className="w-full h-40 px-10 opacity-80" viewBox="0 0 1000 100" preserveAspectRatio="none">
                                    <path
                                        d="M0,50 Q20,20 40,50 T80,50 T120,20 T160,80 T200,50 L250,50 Q300,10 350,50 T450,50 T550,90 T650,10 L1000,50"
                                        fill="none"
                                        stroke="url(#wave-gradient)"
                                        strokeWidth="2"
                                        className="drop-shadow-[0_0_8px_rgba(var(--signal),0.3)]"
                                    />
                                    <defs>
                                        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="hsl(var(--signal))" />
                                            <stop offset="50%" stopColor="hsl(35 80% 60%)" />
                                            <stop offset="100%" stopColor="hsl(var(--signal))" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Playhead */}
                                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-signal shadow-[0_0_12px_hsl(var(--signal)/0.5)] z-20">
                                    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-signal rounded-sm rotate-45" />
                                </div>

                                {/* Region Highlighting */}
                                <div className="absolute top-0 bottom-0 left-[10%] right-[60%] bg-signal/5 border-x border-signal/20 z-10" />
                            </div>

                            {/* Playback Controls */}
                            <div className="h-14 bg-card border-t border-border flex items-center px-6 gap-6 shrink-0 transition-colors">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-10 h-10 rounded-full bg-signal text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-signal/30"
                                    >
                                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                                    </button>
                                    <div className="font-mono text-xs text-muted-foreground font-bold tracking-tighter">00:01:23 / 00:15:42</div>
                                </div>

                                <div className="flex-1 flex items-center gap-3 max-w-sm">
                                    <Settings size={14} className="text-muted-foreground" />
                                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full w-2/3 bg-signal/60 rounded-full" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 bg-background/50 px-2.5 py-1.5 rounded-lg border border-border font-mono text-[10px] text-muted-foreground">
                                    <span className="text-signal uppercase font-bold">Speed:</span> 1.0x <ChevronDown size={10} />
                                </div>
                            </div>
                        </div>

                        {/* Annotation Grid */}
                        <div className="flex-1 overflow-y-auto bg-background/20 transition-colors">
                            <table className="w-full border-collapse">
                                <thead className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border shadow-sm z-20">
                                    <tr className="text-left py-2">
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border w-24">Timestamp</th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border w-24">Speaker</th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border">IPA Transcription</th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-r border-border">English Translation</th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-20">Conf.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {annotations.map((row) => (
                                        <tr key={row.id} className="border-b border-border/50 group hover:bg-accent/30 focus-within:bg-accent/40 transition-colors">
                                            <td className="px-6 py-5 font-mono text-xs text-muted-foreground border-r border-border/50">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${row.conf > 95 ? 'bg-sage' : row.conf > 85 ? 'bg-signal/60' : 'bg-ochre'}`} />
                                                    {row.time}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-xs text-foreground/80 border-r border-border/50">{row.speaker}</td>
                                            <td className="px-6 py-5 border-r border-border/50">
                                                <div className="font-serif text-lg text-foreground mb-1">{row.ipa}</div>
                                                <div className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-muted-foreground transition-colors italic">Draft 04 / Auto-Generated</div>
                                            </td>
                                            <td className="px-6 py-5 border-r border-border/50">
                                                <input
                                                    type="text"
                                                    defaultValue={row.meaning}
                                                    className="w-full bg-transparent border border-transparent rounded-md px-2 py-1 -mx-2 -my-1 text-muted-foreground hover:border-border/80 focus:border-signal/40 focus:bg-background/50 focus:text-foreground focus:outline-none focus:ring-1 focus:ring-signal/20 text-sm italic font-reading transition-all"
                                                />
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col items-center">
                                                    <span className={`text-[10px] font-mono font-bold mb-1 ${row.conf > 95 ? 'text-sage' : row.conf > 85 ? 'text-muted-foreground' : 'text-ochre'}`}>{row.conf}%</span>
                                                    <div className="w-10 h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
                                                        <div className={`h-full rounded-full transition-all ${row.conf > 95 ? 'bg-sage' : row.conf > 85 ? 'bg-signal/60' : 'bg-ochre'}`} style={{ width: `${row.conf}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-signal/5 border-b border-border">
                                        <td className="px-6 py-12 text-center" colSpan={5}>
                                            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-signal/15 border border-signal/20 rounded-xl text-xs font-bold text-signal hover:bg-signal/20 transition-all shadow-inner">
                                                <Plus className="animate-pulse" size={14} /> Add Segment
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* AI / Inspector Sidebar */}
                    <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden shrink-0 transition-colors">
                        <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">AI Inspector</h3>
                            <Sparkles size={14} className="text-signal" />
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Contextual Suggestions */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-semibold mb-4 text-foreground/80">
                                    <Wand2 size={14} className="text-signal" /> Phonetic Suggestions
                                </h4>
                                <div className="space-y-3">
                                    {[{ sug: 'haʊ', pct: 99 }, { sug: 'hɑːʊ', pct: 94 }, { sug: 'haw', pct: 89 }].map((item, i) => (
                                        <div key={i} className="p-3 bg-background/50 border border-border/50 rounded-xl hover:border-signal/30 transition-all cursor-pointer group shadow-sm">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-serif text-lg text-foreground">{item.sug}</span>
                                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${item.pct > 95 ? 'bg-sage/15 text-sage' : item.pct > 90 ? 'bg-signal/15 text-signal' : 'bg-ochre/15 text-ochre'}`}>{item.pct}%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-[8px] uppercase tracking-widest text-muted-foreground/40 font-bold italic">Replacement for index 0</div>
                                                <button className="text-[9px] text-signal font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity hover:underline underline-offset-2">Apply</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ByT5 Transformation */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-semibold mb-4 text-foreground/80">
                                    <FileText size={14} className="text-signal/80" /> ByT5 Synthesis
                                </h4>
                                <div className="p-4 bg-gradient-to-br from-signal/15 to-signal/5 border border-signal/20 rounded-xl shadow-inner relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--signal),0.08)_0%,transparent_60%)]" />
                                    <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider italic relative z-10">Predicted Orthography</p>
                                    <p className="font-display text-xl text-foreground mb-4 italic relative z-10">Hau, mitákuyepi.</p>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sage/15 text-sage">99.8%</span>
                                            <span className="text-[10px] text-muted-foreground/70">confidence</span>
                                        </div>
                                        <button className="text-[10px] text-signal font-bold uppercase px-2.5 py-1 rounded-md bg-signal/10 hover:bg-signal/20 transition-colors">Commit</button>
                                    </div>
                                </div>
                            </div>

                            {/* Speaker Analysis */}
                            <div className="p-6 bg-background/30 border border-border rounded-2xl shadow-sm">
                                <h4 className="text-xs font-semibold mb-4 text-foreground/80 font-mono tracking-tighter">Speaker: EF_01</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-signal/15 border border-signal/20 flex items-center justify-center text-signal shadow-inner">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">Elder Female 01</p>
                                        <p className="text-[10px] text-muted-foreground/80 uppercase font-mono italic">Lakota Dialect: Western</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full w-4/5 bg-signal" />
                                    </div>
                                    <p className="text-[8px] text-muted-foreground/50 text-center uppercase tracking-[0.2em] font-bold">Vocal Signature Matched</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchEditor;
