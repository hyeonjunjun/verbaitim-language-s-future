import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Container } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { ArrowDown } from 'lucide-react';
import IPAGrid from './IPAGrid';


const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background pt-28 pb-12 md:pt-32 md:pb-24">

      {/* Subtle Organic Background Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.14] overflow-hidden">
        <div className="absolute top-[10%] -right-1/4 w-[900px] h-[900px] bg-primary/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-sage/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <Container className="relative z-10">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center">

          {/* The Statement Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Headline as="h1" className="mb-6 text-card-foreground leading-[1.05] tracking-tight text-5xl md:text-7xl">
              Where Language <br />
              Comes <span className="text-primary italic font-serif">Back to Life.</span>
            </Headline>
          </motion.div>

          {/* Subtext + tagline stacked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto mb-2"
          >
            <Text variant="lead" className="text-foreground/90">
              An ethical AI platform built with linguists and governed by communities.
            </Text>
          </motion.div>

          {/* Sub-tagline flush under subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="mb-12"
          >
            <Text className="text-muted-foreground text-base italic serif-italic">
              Spend less time formatting. More time analyzing.
            </Text>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <a
              href="#join"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 leading-none w-full sm:w-auto text-lg flex items-center justify-center relative overflow-hidden group"
            >
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 transition-opacity" />
              <span className="relative z-10">Join the Beta</span>
            </a>
            <a href="#how-it-works" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-sm border border-border/60 text-card-foreground font-bold rounded-2xl hover:bg-white hover:border-border transition-all w-full sm:w-auto text-lg">
              See How It Works
              <span className="inline-block transition-transform group-hover:translate-y-1 text-primary"><ArrowDown size={18} /></span>
            </a>
          </motion.div>

          {/* Product Visual — Workbench Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="mt-16 mx-auto max-w-4xl"
          >
            <div className="relative">
              {/* Browser chrome mock */}
              <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl border border-border/60 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-300/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-300/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-300/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[11px] font-mono text-muted-foreground/60">verbaitim.com/workbench</span>
                </div>
              </div>
              {/* Dashboard preview */}
              <div className="bg-white/70 backdrop-blur-sm rounded-b-2xl border border-t-0 border-border/60 p-4 md:p-6 shadow-2xl shadow-primary/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {([
                    { label: "Sessions", val: "3", sub: "RECORDED" },
                    { label: "Segments", val: "15", sub: "TRANSCRIBED" },
                    { label: "Confidence", val: "88%", sub: "AVG IPA" },
                    { label: "Audio", val: "<1h", sub: "LOGGED" },
                  ] as const).map((s) => (
                    <div key={s.label} className="bg-background/80 rounded-xl p-3 border border-border/30">
                      <p className="text-[9px] font-bold tracking-widest text-muted-foreground/60 uppercase">{s.sub}</p>
                      <p className="text-2xl font-display font-bold text-card-foreground mt-1">{s.val}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {([
                    { file: "mixtec_greetings.wav", lang: "MIXTEC", segs: "6 segments" },
                    { file: "mixtec_market.wav", lang: "MIXTEC", segs: "5 segments" },
                    { file: "lakota_kinship.wav", lang: "LAKOTA", segs: "4 segments" },
                  ] as const).map((r) => (
                    <div key={r.file} className="bg-background/60 rounded-xl p-3 border border-border/20">
                      <p className="text-xs font-bold text-card-foreground truncate">{r.file}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{r.lang} · {r.segs}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Subtle glow behind the mockup */}
              <div className="absolute -inset-8 -z-10 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent rounded-3xl blur-2xl" />
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  );
};

export default Hero;
