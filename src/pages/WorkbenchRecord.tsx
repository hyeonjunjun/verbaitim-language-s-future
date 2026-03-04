import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, ShieldCheck, Tag, Square, Bookmark, Wand2, Loader2, Play } from "lucide-react";
import { useAudioStore } from "@/hooks/useAudioStore";

const BAR_COUNT = 30;

const WorkbenchRecord = () => {
    const navigate = useNavigate();
    const { loadAudioFile, transcribe, isTranscribing, sessions } = useAudioStore();

    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [barAmplitudes, setBarAmplitudes] = useState<number[]>(Array(BAR_COUNT).fill(10));
    const [liveTranscript, setLiveTranscript] = useState("");

    // Recording refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    interimTranscript += event.results[i][0].transcript;
                }
                setLiveTranscript(interimTranscript);
            };
            recognitionRef.current = recognition;
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
            }
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { }
            }
        };
    }, []);

    // Visualizer animation
    useEffect(() => {
        if (!isRecording) return;
        const interval = setInterval(() => {
            setBarAmplitudes(Array.from({ length: BAR_COUNT }, () => Math.max(4, Math.random() * 40)));
        }, 100);
        return () => clearInterval(interval);
    }, [isRecording]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const file = new File([audioBlob], `recording_${new Date().getTime()}.webm`, { type: 'audio/webm' });

                // Load into store and transcribe
                loadAudioFile(file);
                await transcribe("Mixtec"); // Hardcode Mixtec for prototype

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            setLiveTranscript("");

            if (recognitionRef.current) {
                try { recognitionRef.current.start(); } catch (e) { console.error(e) }
            }

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);

        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { }
            }
            setBarAmplitudes(Array(BAR_COUNT).fill(10)); // Reset visualizer
        }
    };

    // Watch for new sessions being created so we can navigate to the editor
    useEffect(() => {
        if (!isTranscribing && !isRecording && recordingTime > 0) {
            // Transcription likely just finished
            const latestSession = sessions[0];
            if (latestSession) {
                navigate(`/workbench/editor/${latestSession.id}`);
            }
        }
    }, [isTranscribing, isRecording, recordingTime, sessions, navigate]);


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-foreground font-body pb-10">
            {/* Top Bar */}
            <header className="px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-[#FDFCFB] z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground font-medium">
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="font-semibold text-lg text-card-foreground">Recording</h1>
                <button className="w-10 h-10 flex items-center justify-end text-foreground">
                    <MoreVertical size={20} />
                </button>
            </header>

            <main className="px-6 space-y-6 max-w-3xl mx-auto">
                {/* Consent Banner */}
                <div className="flex items-center justify-center gap-2 py-2.5 px-4 bg-sage/10 text-sage rounded-xl font-medium text-sm w-full mx-auto">
                    <ShieldCheck size={16} />
                    Consent granted - Community-owned
                </div>

                {/* Metadata List */}
                <div className="space-y-3 px-2">
                    <div className="flex justify-between items-center text-[15px]">
                        <span className="text-muted-foreground">Language</span>
                        <span className="font-semibold text-card-foreground">Mixtec (San Juan)</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                        <span className="text-muted-foreground">Speaker</span>
                        <span className="font-semibold text-card-foreground">María López</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                        <span className="text-muted-foreground">Session type</span>
                        <span className="font-semibold text-card-foreground">Elicitation</span>
                    </div>
                </div>

                {/* Recording Card (Main UI) */}
                <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col items-center">
                    <div className="text-5xl font-semibold tracking-tight text-card-foreground mb-4">
                        {formatTime(recordingTime)}
                    </div>

                    <div className="flex items-center gap-2 text-destructive font-medium mb-10 h-6">
                        {isRecording ? (
                            <>
                                <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
                                Recording...
                            </>
                        ) : isTranscribing ? (
                            <div className="flex items-center gap-2 text-primary">
                                <Loader2 size={16} className="animate-spin" />
                                Transcribing audio...
                            </div>
                        ) : (
                            <span className="text-muted-foreground">Ready to record</span>
                        )}
                    </div>

                    {/* Waveform visualizer */}
                    <div className="h-12 w-full flex items-center justify-center gap-[3px] mb-12">
                        {barAmplitudes.map((height, i) => (
                            <div
                                key={i}
                                className={`w-1.5 rounded-full transition-all duration-100 ${isRecording ? (i % 3 === 0 ? 'bg-[#C46B44]' : 'bg-[#E5D7CC]') : 'bg-muted'}`}
                                style={{
                                    height: `${isRecording ? height : 10}px`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-8">
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FDFCFB] border border-border/50 text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50" disabled={isTranscribing}>
                            <Tag size={20} />
                        </button>

                        {!isRecording ? (
                            <button onClick={startRecording} disabled={isTranscribing} className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                                <Play size={24} className="fill-current ml-1" />
                            </button>
                        ) : (
                            <button onClick={stopRecording} className="w-16 h-16 flex items-center justify-center rounded-full bg-destructive text-white shadow-lg hover:scale-95 transition-transform">
                                <Square size={24} className="fill-current" />
                            </button>
                        )}

                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FDFCFB] border border-border/50 text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50" disabled={isTranscribing}>
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>

                {/* Live Transcription Section */}
                {isRecording && (
                    <div className="pt-2 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-lg text-card-foreground">Live transcription + IPA</h2>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">
                                <Wand2 size={12} />
                                AI-assisted
                            </div>
                        </div>

                        {/* Switcher Toggle */}
                        <div className="bg-white border border-border/50 rounded-lg p-1 flex mb-6 shadow-sm w-fit">
                            <button className="flex-1 py-1.5 px-4 text-xs font-bold text-card-foreground">IPA transcription</button>
                            <div className="flex">
                                <button className="bg-primary text-white rounded-md py-1.5 px-4 text-xs font-bold shadow-sm">Real-time</button>
                                <button className="py-1.5 px-4 text-xs font-bold text-muted-foreground hover:text-foreground">Post-rec</button>
                            </div>
                        </div>

                        {/* Transcription Stream */}
                        <div className="bg-white border border-border/50 rounded-2xl p-5 shadow-sm min-h-[120px]">
                            {liveTranscript ? (
                                <p className="text-[17px] font-medium text-card-foreground leading-relaxed animate-in fade-in">
                                    {liveTranscript}
                                </p>
                            ) : (
                                <div className="flex items-center justify-center h-20 text-muted-foreground text-sm font-medium animate-pulse">
                                    Listening to audio stream...
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default WorkbenchRecord;
