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
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background">

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

        </motion.div>
      </Container>
    </div>
  );
};

export default Hero;
