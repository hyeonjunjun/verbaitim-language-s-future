import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import WaveSurfer from "wavesurfer.js";

// ── Types ────────────────────────────────────────────────────────────

interface WaveformPlayerProps {
    audioUrl: string | null;
    onTimeUpdate?: (currentTime: number) => void;
    onReady?: (duration: number) => void;
    onPlay?: () => void;
    onPause?: () => void;
    className?: string;
}

export interface WaveformPlayerHandle {
    play: () => void;
    pause: () => void;
    playPause: () => void;
    seekTo: (progress: number) => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    isPlaying: () => boolean;
}

// ── Component ────────────────────────────────────────────────────────

const WaveformPlayer = forwardRef<WaveformPlayerHandle, WaveformPlayerProps>(
    ({ audioUrl, onTimeUpdate, onReady, onPlay, onPause, className }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const wavesurferRef = useRef<WaveSurfer | null>(null);

        // Expose imperative controls
        useImperativeHandle(ref, () => ({
            play: () => wavesurferRef.current?.play(),
            pause: () => wavesurferRef.current?.pause(),
            playPause: () => wavesurferRef.current?.playPause(),
            seekTo: (progress: number) =>
                wavesurferRef.current?.seekTo(progress),
            getCurrentTime: () =>
                wavesurferRef.current?.getCurrentTime() ?? 0,
            getDuration: () =>
                wavesurferRef.current?.getDuration() ?? 0,
            isPlaying: () =>
                wavesurferRef.current?.isPlaying() ?? false,
        }));

        // Initialize WaveSurfer
        const initWaveSurfer = useCallback(() => {
            if (!containerRef.current) return;

            // Destroy previous instance
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
                wavesurferRef.current = null;
            }

            // Read CSS variable for signal color
            const computedStyle = getComputedStyle(document.documentElement);
            const signalHSL = computedStyle.getPropertyValue("--signal").trim();
            const waveColor = signalHSL
                ? `hsl(${signalHSL} / 0.4)`
                : "rgba(200, 150, 80, 0.4)";
            const progressColor = signalHSL
                ? `hsl(${signalHSL})`
                : "rgba(200, 150, 80, 1)";
            const cursorColor = signalHSL
                ? `hsl(${signalHSL})`
                : "rgba(200, 150, 80, 1)";

            const ws = WaveSurfer.create({
                container: containerRef.current,
                waveColor,
                progressColor,
                cursorColor,
                cursorWidth: 2,
                barWidth: 2,
                barGap: 1,
                barRadius: 2,
                height: "auto",
                normalize: true,
                interact: true,
                hideScrollbar: true,
                fillParent: true,
            });

            // Event listeners
            ws.on("ready", () => {
                onReady?.(ws.getDuration());
            });

            ws.on("timeupdate", (currentTime: number) => {
                onTimeUpdate?.(currentTime);
            });

            ws.on("play", () => onPlay?.());
            ws.on("pause", () => onPause?.());

            wavesurferRef.current = ws;
            return ws;
        }, [onTimeUpdate, onReady, onPlay, onPause]);

        // Load audio when URL changes
        useEffect(() => {
            if (!audioUrl) {
                if (wavesurferRef.current) {
                    wavesurferRef.current.destroy();
                    wavesurferRef.current = null;
                }
                return;
            }

            const ws = initWaveSurfer();
            if (ws) {
                ws.load(audioUrl);
            }

            return () => {
                if (wavesurferRef.current) {
                    wavesurferRef.current.destroy();
                    wavesurferRef.current = null;
                }
            };
        }, [audioUrl, initWaveSurfer]);

        // ── Empty state SVG (no audio loaded) ────────────────────────
        if (!audioUrl) {
            return (
                <div className={`relative flex items-center justify-center ${className || ""}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--signal),0.05)_0%,transparent_70%)]" />
                    <svg
                        className="w-full h-40 px-10 opacity-30"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,50 Q20,20 40,50 T80,50 T120,20 T160,80 T200,50 L250,50 Q300,10 350,50 T450,50 T550,90 T650,10 L1000,50"
                            fill="none"
                            stroke="hsl(var(--signal))"
                            strokeWidth="2"
                            opacity="0.3"
                        />
                    </svg>
                    <p className="absolute text-xs text-muted-foreground/40 font-mono uppercase tracking-widest">
                        No audio loaded
                    </p>
                </div>
            );
        }

        return (
            <div className={`relative ${className || ""}`}>
                {/* Subtle radial glow behind waveform */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--signal),0.05)_0%,transparent_70%)] pointer-events-none" />
                {/* WaveSurfer container */}
                <div
                    ref={containerRef}
                    className="w-full h-full px-4"
                />
            </div>
        );
    }
);

WaveformPlayer.displayName = "WaveformPlayer";

export default WaveformPlayer;
