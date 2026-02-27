import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { BookOpen, Camera, Link as LinkIcon, Bold, Italic, List, CheckCircle2, Calendar, FileAudio, Plus, UserCircle } from "lucide-react";
import { useAudioStore } from "@/hooks/useAudioStore";

const WorkbenchNotes = () => {
    const navigate = useNavigate();
    const { fileName, segments } = useAudioStore();
    return (
        <WorkbenchLayout>
            <div className="p-4 md:p-8 w-full max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">

                {/* Header Metadata (Screen 4 style) */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div className="flex-1">
                        <input
                            type="text"
                            defaultValue="Plant names — field walk"
                            className="text-3xl font-display font-bold text-foreground bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full mb-2 placeholder:text-muted-foreground/40"
                            placeholder="Note Title..."
                        />
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> Oct 24, 2026</span>
                            <span className="flex items-center gap-1.5"><UserCircle size={14} /> María P., Dr. Aris</span>
                        </div>
                    </div>

                    {/* Status badges */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="px-3 py-1.5 bg-card border border-border rounded-full text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm">
                            Field Notes
                        </span>
                        <span className="px-3 py-1.5 bg-sage/10 text-sage border border-sage/20 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <CheckCircle2 size={12} /> Completed
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content: Observations */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-[500px]">
                            {/* Rich text toolbar mock */}
                            <div className="bg-muted/30 border-b border-border p-3 flex items-center gap-2">
                                <button className="p-1.5 rounded-md hover:bg-background text-foreground transition-colors"><Bold size={16} /></button>
                                <button className="p-1.5 rounded-md hover:bg-background text-foreground transition-colors"><Italic size={16} /></button>
                                <button className="p-1.5 rounded-md hover:bg-background text-foreground transition-colors"><List size={16} /></button>
                                <div className="w-px h-4 bg-border mx-2" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Observations</span>
                            </div>

                            <textarea
                                className="flex-1 w-full bg-transparent p-6 text-sm text-foreground focus:outline-none resize-none leading-relaxed placeholder:text-muted-foreground/40"
                                placeholder="Start typing ethnobotanical observations..."
                                defaultValue="Walking with María near the eastern ridge. She pointed out several medicinal herbs that are becoming scarce due to changing rainfall patterns.

Notable terms discussed:
• yita yuku (wild flower)
• yutnu Ndute (water tree / willow)
• ñuku (herb/weed)

She mentioned that 'yutnu Ndute' is specifically used to treat fevers when prepared as a tea, but it must be harvested before sunrise."
                            />
                        </div>
                    </div>

                    {/* Sidebar: Media & Links */}
                    <div className="space-y-6">

                        {/* Photos Gallery */}
                        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-display font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                                    <Camera size={14} className="text-muted-foreground" /> Photos <span className="text-muted-foreground font-mono text-xs">(3)</span>
                                </h3>
                                <button className="text-signal hover:bg-signal/10 p-1.5 rounded-lg transition-colors">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {/* Mock photo thumbnails */}
                                <div className="aspect-square bg-muted rounded-xl border border-border overflow-hidden relative group cursor-pointer">
                                    <img src="/placeholder.svg" alt="plant" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="aspect-square bg-muted rounded-xl border border-border overflow-hidden relative group cursor-pointer">
                                    <img src="/placeholder.svg" alt="landscape" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="aspect-square bg-muted rounded-xl border border-border overflow-hidden relative group cursor-pointer">
                                    <div className="w-full h-full bg-background flex items-center justify-center">
                                        <Camera size={20} className="text-muted-foreground/30" />
                                    </div>
                                </div>
                                <button className="aspect-square bg-background border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:text-signal hover:border-signal/50 hover:bg-signal/5 transition-all">
                                    <Plus size={20} className="mb-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Add</span>
                                </button>
                            </div>
                        </div>

                        {/* Linked Recordings */}
                        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-display font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                                    <LinkIcon size={14} className="text-muted-foreground" /> Linked Media
                                </h3>
                                <button className="text-signal hover:bg-signal/10 p-1.5 rounded-lg transition-colors">
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {fileName ? (
                                    <div
                                        onClick={() => navigate('/workbench/editor')}
                                        className="group bg-background border border-border rounded-xl p-3 flex gap-3 items-center hover:border-signal/40 transition-colors cursor-pointer"
                                    >
                                        <div className="h-10 w-10 shrink-0 bg-signal/10 text-signal rounded-lg flex items-center justify-center">
                                            <FileAudio size={18} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-bold text-foreground truncate group-hover:text-signal transition-colors">{fileName}</p>
                                            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">{segments.length} segments • Linked</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground italic px-2">No active session linked.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchNotes;
