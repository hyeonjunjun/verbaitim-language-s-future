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
                end: "+=3000",
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        tl.fromTo(".wb-step-1", { opacity: 0.5, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });
        tl.to(".wb-step-1", { opacity: 0, scale: 0.8, duration: 1 });
        tl.fromTo(".wb-step-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "<");
        tl.fromTo(".wb-ipa-token",
            { opacity: 0, y: 20, rotationX: 90 },
            { opacity: 1, y: 0, rotationX: 0, stagger: 0.1, duration: 1 }
        );
        tl.to(".wb-step-2", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });
        tl.fromTo(".wb-step-3", { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1 }, "<");
        tl.to(".wb-script-text", { textShadow: "0 0 20px hsla(var(--primary), 0.8), 0 0 40px hsla(var(--primary), 0.4)", color: "hsl(var(--foreground))", duration: 1 });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen bg-background flex flex-col items-center justify-center overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)]" />

            <div ref={trackRef} className="relative z-10 w-full max-w-4xl px-6 text-center">

                {/* Step 1: Raw Audio */}
                <div className="wb-step-1 absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-2xl shadow-primary/20">
                        <AudioLines size={40} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-mono text-muted-foreground mb-2">Stage 01: Capture</h3>
                    <p className="text-muted-foreground">Raw acoustic data ingested from field recordings.</p>
                    <div className="mt-12 flex items-center gap-1 h-16">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="w-2 bg-primary/50 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                    </div>
                </div>

                {/* Step 2: Phonetic Analysis */}
                <div className="wb-step-2 absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-2xl shadow-clay/20">
                        <Wand2 size={40} className="text-clay" />
                    </div>
                    <h3 className="text-2xl font-mono text-muted-foreground mb-2">Stage 02: Analysis</h3>
                    <p className="text-muted-foreground">Allosaurus model identifies phonemes.</p>
                    <div className="mt-12 flex gap-4 text-4xl font-serif text-foreground">
                        {['ð', 'ə', ' ', 'f', 'ju', 'tʃ', 'ə', 'ɹ'].map((char, i) => (
                            <span key={i} className="wb-ipa-token inline-block bg-secondary px-3 py-1 rounded-lg border border-border">{char}</span>
                        ))}
                    </div>
                </div>

                {/* Step 3: Orthographic Conversion */}
                <div className="wb-step-3 absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-2xl shadow-sage/20">
                        <FileText size={40} className="text-sage" />
                    </div>
                    <h3 className="text-2xl font-mono text-muted-foreground mb-2">Stage 03: Synthesis</h3>
                    <p className="text-muted-foreground">ByT5 generates standardized orthography.</p>
                    <div className="mt-12">
                        <span className="wb-script-text font-display text-6xl md:text-8xl font-bold text-foreground/30 tracking-tight transition-all duration-500">
                            The Future
                        </span>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-sage">
                            <div className="w-2 h-2 bg-sage rounded-full animate-pulse" />
                            Confidence Score: 99.8%
                        </div>
                    </div>
                </div>

            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <div className="w-2 h-2 rounded-full bg-clay/50" />
                <div className="w-2 h-2 rounded-full bg-sage/50" />
            </div>

        </section>
    );
};

export default Workbench;

