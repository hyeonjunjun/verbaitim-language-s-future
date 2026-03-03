import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Mic,
        step: "01",
        title: "Capture",
        subtitle: "Field Recording",
        description: "Record field audio from any device with high metadata fidelity. VerbAItim handles every format — from in-person sessions to remote community recordings.",
        image: "https://images.unsplash.com/photo-1555449742-1209b534433d?q=80&w=2670&auto=format&fit=crop"
    },
    {
        icon: RefreshCw,
        step: "02",
        title: "Instant Transcription",
        subtitle: "Allosaurus · ByT5",
        description: "Phonetic sequences are converted into standardized IPA and orthography in real time. The gap between speech and script is bridged in milliseconds — no prior language-specific training required.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
    },
    {
        icon: CheckCircle,
        step: "03",
        title: "Verify & Export",
        subtitle: "TextPA Validation",
        description: "Every generated transcription is verified against the original audio. Edit inline, annotate for archiving, and export to ELAN, CSV, or JSON — ready for research publication or classroom use.",
        image: "https://images.unsplash.com/photo-1614728525585-71be52055653?q=80&w=2574&auto=format&fit=crop"
    }
];

const FeatureShowcase = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-950 text-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                <motion.div style={{ x, opacity }} className="flex gap-10 pl-20 pr-20">
                    {/* Intro Card */}
                    <div className="flex flex-col justify-center min-w-[40vw] max-w-[40vw]">
                        <h2 className="text-sm font-mono text-sky-400 mb-4 tracking-widest uppercase">The Pipeline</h2>
                        <h3 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-6">
                            From <span className="text-slate-500">Silence</span> <br />
                            To <span className="text-sky-400">Syntax</span>.
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                            Three stages. Scroll to see how VerbAItim transforms a raw recording into structured, citable linguistic data.
                        </p>
                        <div className="flex items-center gap-2 mt-8 text-sm font-mono text-slate-500">
                            <ArrowRight className="animate-pulse" />
                            <span>Scroll to explore</span>
                        </div>
                    </div>

                    {/* Steps */}
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group min-w-[60vw] md:min-w-[40vw] h-[70vh] flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-colors hover:border-neutral-700"
                        >
                            {/* Background Image with Gradient Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 backdrop-blur-md font-mono text-sm">
                                        {step.step}
                                    </span>
                                    <step.icon className="text-slate-300" size={24} />
                                </div>

                                <h4 className="font-heading text-3xl font-bold mb-2 text-white">{step.title}</h4>
                                <p className="text-sky-400 font-mono text-xs uppercase tracking-widest mb-4">{step.subtitle}</p>

                                <p className="text-slate-300 leading-relaxed border-t border-white/10 pt-6">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureShowcase;
