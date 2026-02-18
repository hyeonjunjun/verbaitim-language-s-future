import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const IPA_SYMBOLS = [
    'ə', 'ʃ', 'θ', 'ŋ', 'ʒ', 'dʒ', 'tʃ', 'ð',
    'b', 'd', 'g', 'p', 't', 'k', 'm', 'n',
    'æ', 'ɑ', 'ɛ', 'ɪ', 'i', 'ɔ', 'u', 'ʊ', 'ʌ',
    'ɾ', 'ʔ', 'ʍ', 'h', 'j', 'w', 'l', 'ɹ'
];

const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const [symbols, setSymbols] = useState<{ char: string, x: number, y: number, r: number }[]>([]);

    useEffect(() => {
        // Generate random positions for symbols
        const newSymbols = Array.from({ length: 50 }).map(() => ({
            char: IPA_SYMBOLS[Math.floor(Math.random() * IPA_SYMBOLS.length)],
            x: (Math.random() - 0.5) * 100, // vw
            y: (Math.random() - 0.5) * 100, // vh
            r: Math.random() * 360
        }));
        setSymbols(newSymbols);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out the loader
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        // 1. Symbols float in randomly
        tl.fromTo(".ipa-particle",
            { opacity: 0, scale: 0 },
            { opacity: 0.6, scale: 1, duration: 1, stagger: 0.02, ease: "back.out(1.7)" }
        );

        // 2. Symbols coalesce to center
        tl.to(".ipa-particle", {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.1,
            duration: 1.5,
            ease: "power4.in",
            stagger: 0.01
        });

        // 3. Reveal Logo
        tl.fromTo(logoRef.current,
            { opacity: 0, scale: 0.8, letterSpacing: "1rem" },
            { opacity: 1, scale: 1, letterSpacing: "-0.05em", duration: 1.5, ease: "expo.out" },
            "-=1" // Overlap with coalescence
        );

        // 4. Hold
        tl.to({}, { duration: 0.5 });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#fdfbf7] flex items-center justify-center overflow-hidden">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-50 mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
            />

            {/* Particles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {symbols.map((s, i) => (
                    <div
                        key={i}
                        className="ipa-particle absolute font-serif text-slate-400 text-2xl select-none"
                        style={{ transform: `translate(${s.x}vw, ${s.y}vh) rotate(${s.r}deg)` }}
                    >
                        {s.char}
                    </div>
                ))}
            </div>

            {/* Central Logo */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 ref={logoRef} className="font-heading text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter opacity-0">
                    VerbAItim
                </h1>
                <div className="mt-4 h-1 w-0 bg-slate-900 animate-expand" /> {/* Simple progress bar placeholder */}
            </div>
        </div>
    );
};

export default Loader;
