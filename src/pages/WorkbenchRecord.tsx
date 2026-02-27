import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WorkbenchLayout from "@/layouts/WorkbenchLayout";
import { Headline, Text } from "@/design-system/Typography";
import { Mic, Square, ShieldCheck, Settings2, Languages, UserCircle, Tag, FileAudio, BookOpen, RotateCcw } from "lucide-react";
import { useAudioStore } from "@/hooks/useAudioStore";

const WorkbenchRecord = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [showPostAction, setShowPostAction] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("ipa");

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const { loadAudioFile, transcribe } = useAudioStore();

    // Timer logic for UI purposes
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            setRecordingTime(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    // Cleanup tracks on unmount
    useEffect(() => {
        return () => {
            if (isRecording && mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [isRecording]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], `Session_${Date.now()}.webm`, { type: 'audio/webm' });

                // Add to audio store
                loadAudioFile(file);
                // Auto-transcribe using the currently selected language
                transcribe(selectedLanguage);

                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            setShowPostAction(false);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setShowPostAction(true);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <WorkbenchLayout>
            <div className="p-4 md:p-8 w-full max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">
                {/* Header Metadata (Screen 1 style) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <Headline as="h1" className="text-2xl font-display text-foreground">New Recording</Headline>

                    {/* Consent status indicator */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-sage/10 text-sage rounded-full border border-sage/20 shadow-sm w-fit">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Consent Granted · Community Owned</span>
                    </div>
                </div>

                {/* Metadata Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                    <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground/60 flex items-center gap-1"><Languages size={10} /> Language</label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
                        >
                            <option value="ipa">Universal (IPA)</option>
                            <option value="que">Quechua</option>
                            <option value="lkt">Lakota</option>
                            <option value="mri">Māori</option>
                        </select>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground/60 flex items-center gap-1"><UserCircle size={10} /> Contributor</label>
                        <input type="text" placeholder="Enter name..." defaultValue="María P." className="bg-transparent text-sm font-semibold text-foreground focus:outline-none placeholder:text-muted-foreground/40" />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground/60 flex items-center gap-1"><Tag size={10} /> Session Type</label>
                        <select className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer">
                            <option>Free Narrative</option>
                            <option>Elicitation</option>
                            <option>Interview</option>
                        </select>
                    </div>
                </div>

                {/* Primary Recording Interface */}
                <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-3xl shadow-sm mb-8 relative overflow-hidden">
                    {/* Background pulse effect when recording */}
                    {isRecording && (
                        <>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-signal/20 rounded-full blur-3xl animate-ping" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-signal/10 rounded-full blur-3xl animate-pulse delay-75" />
                        </>
                    )}

                    <div className="relative z-10 flex flex-col items-center">
                        <Text className={`text-6xl font-mono font-bold tracking-tighter mb-8 transition-colors ${isRecording ? 'text-signal drop-shadow-[0_0_12px_rgba(var(--signal),0.4)]' : 'text-foreground'}`}>
                            {formatTime(recordingTime)}
                        </Text>

                        {/* Record / Stop Button */}
                        <button
                            onClick={() => {
                                if (isRecording) {
                                    stopRecording();
                                } else {
                                    startRecording();
                                }
                            }}
                            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-4 ${isRecording
                                ? 'bg-background border-signal text-signal hover:bg-signal/10 scale-95'
                                : 'bg-signal border-background text-signal-foreground hover:scale-105 hover:shadow-signal/30'
                                }`}
                        >
                            {isRecording ? <Square size={32} className="fill-current" /> : <Mic size={40} className="ml-1" />}
                        </button>

                        <p className="mt-6 text-sm font-medium text-muted-foreground uppercase tracking-widest">
                            {isRecording ? 'Recording active...' : 'Tap to Record'}
                        </p>
                    </div>

                    {/* Audio visualizer skeleton */}
                    <div className="w-full max-w-md h-12 flex items-center justify-center gap-1 mt-8 opacity-40">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 rounded-full transition-all duration-75 ${isRecording ? 'bg-signal' : 'bg-muted-foreground/30'}`}
                                style={{
                                    height: isRecording ? `${Math.max(10, Math.random() * 40 + 8)}px` : '4px',
                                    opacity: isRecording ? Math.random() * 0.5 + 0.5 : 0.5
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Live Transcription Feed Skeleton */}
                <div className="flex-1 bg-card/50 border border-border rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-display font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                            <Settings2 size={14} /> Live Transcription
                        </h3>
                        {isRecording && <span className="text-[10px] font-bold text-signal animate-pulse flex items-center gap-1"><span className="w-1.5 h-1.5 bg-signal rounded-full" /> Streaming</span>}
                    </div>

                    <div className="flex-1 flex flex-col justify-end space-y-3 relative overflow-hidden">
                        {/* Fade mask at top */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />

                        {/* Shows post-action modal when recording is stopped, otherwise shows the feed */}
                        {showPostAction ? (
                            <div className="h-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 z-20">
                                <h4 className="text-xl font-display font-bold text-foreground mb-6">Session Captured</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                                    <button
                                        onClick={() => navigate("/workbench/editor")}
                                        className="bg-card border border-border p-4 flex flex-col items-center gap-3 rounded-xl hover:border-signal/50 hover:bg-signal/5 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-signal/10 text-signal flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FileAudio size={20} />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-sm text-foreground">Review</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Corrections</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => navigate("/workbench/notes")}
                                        className="bg-card border border-border p-4 flex flex-col items-center gap-3 rounded-xl hover:border-signal/50 hover:bg-signal/5 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-signal/10 text-signal flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <BookOpen size={20} />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-sm text-foreground">Notes</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Context</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowPostAction(false);
                                            // Optional: reset audio store
                                            useAudioStore.getState().clearAudio();
                                        }}
                                        className="bg-card border border-border p-4 flex flex-col items-center gap-3 rounded-xl hover:border-signal/50 hover:bg-signal/5 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-background border border-border text-muted-foreground flex items-center justify-center group-hover:text-signal transition-colors">
                                            <RotateCcw size={18} />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-sm text-foreground">Discard</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Record New</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Mock segments */}
                                <div className="p-3 rounded-lg border border-border bg-background/50 opacity-40 translate-y-2">
                                    <p className="font-mono text-sm text-muted-foreground">kwinʃ...</p>
                                </div>
                                <div className="p-4 rounded-xl border border-border bg-background shadow-sm hover:border-signal/30 transition-colors group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground">00:12 - 00:15</span>
                                        <span className="text-[10px] bg-sage/10 text-sage px-2 py-0.5 rounded-full font-bold border border-sage/20">✅ Verified</span>
                                    </div>
                                    <p className="font-mono text-lg text-foreground mb-1">kwinʃa tu nuu</p>
                                    <p className="text-sm text-muted-foreground/80 italic">There was a man...</p>
                                </div>
                                {isRecording && (
                                    <div className="p-4 rounded-xl border border-signal/30 bg-signal/5 animate-pulse">
                                        <span className="text-[10px] font-bold uppercase text-signal flex items-center gap-2 mb-1">
                                            <div className="w-3 h-3 border-2 border-signal border-t-transparent rounded-full animate-spin" />
                                            Processing
                                        </span>
                                        <p className="font-mono text-lg text-foreground/50">waiting for signal...</p>
                                    </div>
                                )}
                                {!isRecording && (
                                    <div className="h-full flex items-center justify-center">
                                        <p className="text-sm text-muted-foreground italic tracking-wide">Transcription feed will appear here.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </WorkbenchLayout>
    );
};

export default WorkbenchRecord;
