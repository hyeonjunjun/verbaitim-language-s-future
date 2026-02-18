import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Section, Container } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div ref={containerRef} className="relative h-screen min-h-[800px] w-full flex flex-col justify-center overflow-hidden border-b border-border">

      {/* Background Grid - Stays fixed mostly */}
      <div className="absolute inset-0 bg-grid-paper opacity-50 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div style={{ opacity, scale, y }} className="max-w-6xl">
          {/* Meta Label */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-12 bg-signal" />
            <Text variant="caption" className="text-signal font-semibold">
              Linguistic Preservation Initiative 2026
            </Text>
          </div>

          {/* The Statement Headline */}
          <Headline as="h1" className="mb-8">
            The future of language <br />
            is <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal to-blue-600">verifiable</span> data.
          </Headline>

          {/* Subtext */}
          <div className="max-w-xl">
            <Text variant="lead">
              We build the open-source infrastructure for indigenous language revitalization.
              Structured archives, immutable provenance, and community sovereignty.
            </Text>
          </div>

        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-0 right-0 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Text variant="caption" className="text-[10px]">Scroll to Explore</Text>
          <ArrowDown className="animate-bounce" size={16} />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
