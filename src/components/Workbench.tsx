import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AudioLines, Wand2, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Workbench = () => {
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000", // Long scroll distance for storytelling
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the section
                anticipatePin: 1
            }
        });

        // Initial State: Only Waveform visible
        // Stage 1: Waveform "plays" (scales up/down or moves)
        tl.fromTo(".wb-step-1", { opacity: 0.5, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });

        // Transition 1 -> 2: Waveform fades out, IPA fades in
        tl.to(".wb-step-1", { opacity: 0, scale: 0.8, duration: 1 });
        tl.fromTo(".wb-step-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "<");

        // Stage 2: IPA tokens "assemble"
        tl.fromTo(".wb-ipa-token",
            { opacity: 0, y: 20, rotationX: 90 },
            { opacity: 1, y: 0, rotationX: 0, stagger: 0.1, duration: 1 }
        );

        // Transition 2 -> 3: IPA fades out, Script (ByT5) fades in
        tl.to(".wb-step-2", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });
        tl.fromTo(".wb-step-3", { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1 }, "<");

        // Stage 3: Confidence Glow
        tl.to(".wb-script-text", { textShadow: "0 0 20px rgba(56, 189, 248, 0.8), 0 0 40px rgba(56, 189, 248, 0.4)", color: "#ffffff", duration: 1 });


    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden">

            {/* Background Grid - Global Utility */}
            <div className="absolute inset-0 bg-grid-white opacity-20" />

            <div ref={trackRef} className="relative z-10 w-full max-w-4xl px-6 text-center">

                {/* Step 1: Raw Audio */}
                <div className="wb-step-1 absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 shadow-2xl shadow-sky-900/20">
                        <AudioLines size={40} className="text-sky-500" />
                    </div>
                    <h3 className="text-2xl font-mono text-slate-400 mb-2">Stage 01: Capture</h3>
                    <p className="text-slate-500">Raw acoustic data ingested from field recordings.</p>
                    {/* Visual Representation */}
                    <div className="mt-12 flex items-center gap-1 h-16">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="w-2 bg-sky-500/50 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                    </div>
                </div>

                {/* Step 2: Phonetic Analysis */}
                <div className="wb-step-2 absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 shadow-2xl shadow-purple-900/20">
                        <Wand2 size={40} className="text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-mono text-slate-400 mb-2">Stage 02: Analysis</h3>
                    <p className="text-slate-500">Allosaurus model identifies phonemes.</p>
                    <div className="mt-12 flex gap-4 text-4xl font-serif text-slate-200">
                        {['ð', 'ə', ' ', 'f', 'ju', 'tʃ', 'ə', 'ɹ'].map((char, i) => (
                            <span key={i} className="wb-ipa-token inline-block bg-neutral-800/50 px-3 py-1 rounded-lg border border-neutral-700">{char}</span>
                        ))}
                    </div>
                </div>

                {/* Step 3: Orthographic Conversion */}
                <div className="wb-step-3 absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 shadow-2xl shadow-indigo-900/20">
                        <FileText size={40} className="text-indigo-500" />
                    </div>
                    <h3 className="text-2xl font-mono text-slate-400 mb-2">Stage 03: Synthesis</h3>
                    <p className="text-slate-500">ByT5 generates standardized orthography.</p>
                    <div className="mt-12">
                        <span className="wb-script-text font-heading text-6xl md:text-8xl font-bold text-slate-700 tracking-tight transition-all duration-500">
                            The Future
                        </span>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-green-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Confidence Score: 99.8%
                        </div>
                    </div>
                </div>

            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500/50" />
                <div className="w-2 h-2 rounded-full bg-purple-500/50" />
                <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
            </div>

        </section>
    );
};

export default Workbench;
