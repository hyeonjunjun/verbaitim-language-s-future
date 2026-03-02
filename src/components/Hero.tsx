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

      {/* Subtle Academic Background Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-signal/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-signal/5 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center">

          {/* Academic Label */}


          {/* The Statement Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Headline as="h1" className="mb-8 text-foreground leading-[1.05]">
              Where Language Comes <br />
              <span className="text-signal italic serif-italic">Back to Life.</span>
            </Headline>
          </motion.div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Text variant="lead" className="text-foreground/90">
              Document faster. Teach sooner. Learn now.<br></br> An ethical AI platform built with linguists and governed by communities.
            </Text>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="#join"
              className="px-8 py-4 bg-signal text-white rounded-full font-medium hover:bg-signal/90 transition-all shadow-lg shadow-signal/20 active:scale-95 leading-none"
            >
              Join the Beta
            </a>
            <a href="#how-it-works" className="group flex items-center gap-2 py-2 text-foreground font-medium hover:text-signal transition-colors leading-none">
              See How It Works
              <span className="inline-block transition-transform group-hover:translate-y-1"><ArrowDown size={18} /></span>
            </a>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  );
};

export default Hero;
