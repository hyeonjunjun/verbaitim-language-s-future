import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import IPAGlobe from './IPAGlobe';
import Magnetic from './ui/Magnetic';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <IPAGlobe />
      </div>

      {/* HUD Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none border-[0.5px] border-slate-800/30 m-4 rounded-3xl" />
      <div className="absolute top-10 left-10 z-10 flex gap-2 text-[10px] items-center font-mono text-slate-500 uppercase tracking-widest">
        <div className="w-2 h-2 bg-sky-500/50 rounded-full animate-pulse" />
        <span>System Status: Online</span>
      </div>
      <div className="absolute bottom-10 right-10 z-10 text-[10px] font-mono text-slate-600 uppercase tracking-widest text-right">
        <p>Coordinates: {new Date().getFullYear()}.{new Date().getMonth()}</p>
        <p>Pipeline: Active</p>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md text-xs font-mono text-sky-400 mb-6 uppercase tracking-wider">
            Project Verbatim
          </span>
        </motion.div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 leading-[0.9]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              The Future
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block text-sky-500/90"
            >
              Is Spoken
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          A verifiable pipeline from raw field audio to IPA to language learning.
          <br className="hidden md:block" />
          Restoring the wisdom of the past with the intelligence of the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Magnetic>
            <a
              href="#pipeline"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-medium transition-transform active:scale-95"
            >
              <span className="relative z-10">Explore Pipeline</span>
              <div className="absolute inset-0 rounded-full bg-sky-300 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="#whitepaper"
              className="inline-flex items-center justify-center px-8 py-4 text-white hover:text-sky-300 transition-colors font-medium relative"
            >
              Read Whitepaper
              <span className="absolute bottom-3 left-8 right-8 h-[1px] bg-sky-500/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
