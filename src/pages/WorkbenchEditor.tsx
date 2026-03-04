import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit2, Play, Check, AlertTriangle, Users, Download } from "lucide-react";
import { useAudioStore } from "@/hooks/useAudioStore";
import { exportSession } from "@/lib/exportSession";
import type { ExportFormat } from "@/lib/exportSession";
import { useState } from "react";

const WorkbenchEditor = () => {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const { sessions, updateSegment, defaultExport } = useAudioStore();

    // If no sessionId param, fall back to most recent session
    const session = sessionId
        ? sessions.find((s) => s.id === sessionId)
        : sessions[0];

    // For prototype simplicity, we'll keep a local state of whether the context editor is open
    const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
    const [contextInput, setContextInput] = useState("");

    const handleExportSession = () => {
        if (!session) return;
        exportSession(session, defaultExport as ExportFormat);
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">No sessions yet</h2>
                    <p className="text-muted-foreground mb-4">Record and transcribe your first session to review it here.</p>
                    <button onClick={() => navigate('/workbench/record')} className="px-4 py-2 bg-primary text-white rounded-lg font-bold">Start Recording</button>
                </div>
            </div>
        );
    }

    const handleMeaningChange = (segmentId: string, value: string) => {
        updateSegment(segmentId, { meaning: value });
    };

    const handleContextSave = (segmentId: string) => {
        updateSegment(segmentId, { culturalContext: contextInput });
        setEditingSegmentId(null);
        setContextInput("");
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-foreground font-body pb-10">
            {/* Top Bar */}
            <header className="px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-[#FDFCFB] z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground font-medium">
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="font-semibold text-lg text-card-foreground">Session Review</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExportSession}
                        title="Export session as JSON"
                        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                    >
                        <Download size={18} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-end text-foreground">
                        <Edit2 size={18} />
                    </button>
                </div>
            </header>

            <main className="px-6 space-y-8 max-w-3xl mx-auto">
                {/* Meta Card */}
                <div className="bg-white rounded-3xl p-6 border border-border/50 shadow-sm">
                    <h2 className="text-xl font-bold text-card-foreground mb-2 break-all">{session.fileName}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        {new Date(session.createdAt).toLocaleDateString()} • {Math.round(session.durationSeconds)}s • {session.language}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${session.avgConfidence < 85 ? 'bg-ochre/10 text-ochre' : 'bg-primary/10 text-primary'}`}>
                            {session.avgConfidence < 85 ? 'Review needed' : 'Verified'}
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-sage/10 text-sage text-xs font-bold rounded-md">
                            <Check size={12} /> Consented
                        </span>
                    </div>
                </div>

                {/* Audio Player (Mock UI) */}
                <div className="flex items-center gap-4 px-2">
                    <button className="w-12 h-12 shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md shadow-primary/20">
                        <Play size={20} className="fill-current ml-1" />
                    </button>
                    <span className="text-sm font-semibold tracking-tight">00:00</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-primary rounded-full" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground tracking-tight">{Math.round(session.durationSeconds)}s</span>
                    <button className="px-3 py-1 bg-white border border-border/50 rounded-lg text-xs font-bold shadow-sm hover:bg-muted/50">
                        1x
                    </button>
                </div>

                {/* Main Transcript Segment */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-bold text-lg">IPA Transcription</h3>
                        <span className="text-sm text-muted-foreground font-medium">{session.segments.length} segments</span>
                    </div>

                    <div className="space-y-6">
                        {session.segments.map((segment) => (
                            <div key={segment.id} className="bg-white border border-border/50 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-bold text-muted-foreground">{segment.time}</span>
                                    <span className="text-xs font-bold text-primary">{segment.speaker}</span>
                                </div>
                                <div className="text-[15px] text-[#4A8DB7] italic mb-3">
                                    {segment.ipa || "No IPA generated"}
                                </div>

                                {/* Edit meaning directly for Learner consumption */}
                                <input
                                    type="text"
                                    value={segment.meaning}
                                    onChange={(e) => handleMeaningChange(segment.id, e.target.value)}
                                    placeholder="Add English translation..."
                                    className="w-full text-[14px] text-card-foreground font-medium mb-4 bg-transparent border-b border-border focus:border-primary focus:outline-none transition-colors pb-1"
                                />

                                <div className="flex items-center gap-2">
                                    {segment.confidence > 85 ? (
                                        <span className="flex items-center gap-1 px-2 py-1 bg-sage/10 text-sage text-[11px] font-bold rounded-md">
                                            <Check size={12} /> Verified
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 px-2 py-1 bg-ochre/10 text-ochre text-[11px] font-bold rounded-md">
                                            <AlertTriangle size={12} /> Low confidence
                                        </span>
                                    )}
                                </div>

                                {/* Custom Cultural Context specific to this segment */}
                                <div className="mt-4 pt-4 border-t border-border/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-xs text-card-foreground flex items-center gap-1"><Users size={12} className="text-primary" /> Cultural context</h4>
                                        {editingSegmentId !== segment.id && !segment.culturalContext && (
                                            <button onClick={() => setEditingSegmentId(segment.id)} className="text-primary text-xs font-bold hover:underline">
                                                + Add Note
                                            </button>
                                        )}
                                    </div>

                                    {editingSegmentId === segment.id ? (
                                        <div className="mt-2">
                                            <textarea
                                                value={contextInput}
                                                onChange={(e) => setContextInput(e.target.value)}
                                                placeholder="Add ethnographic notes. This will be visible to learners in the community app."
                                                className="w-full bg-muted/30 border border-border/50 rounded-lg p-2 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px]"
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button onClick={() => setEditingSegmentId(null)} className="text-xs font-bold text-muted-foreground px-3 py-1.5 rounded-md hover:bg-muted/50">Cancel</button>
                                                <button onClick={() => handleContextSave(segment.id)} className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-md">Save Context</button>
                                            </div>
                                        </div>
                                    ) : segment.culturalContext ? (
                                        <div className="bg-muted/20 rounded-lg p-3 relative group">
                                            <p className="text-[13px] text-card-foreground leading-relaxed">
                                                {segment.culturalContext}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setContextInput(segment.culturalContext || "");
                                                    setEditingSegmentId(segment.id);
                                                }}
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white border border-border/50 shadow-sm rounded-md"
                                            >
                                                <Edit2 size={10} className="text-muted-foreground" />
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WorkbenchEditor;
