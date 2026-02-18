import { GraduationCap, Heart, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const DualCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="paths" className="py-24 md:py-32 bg-[#020617] relative overflow-hidden border-t border-white/5">
      {/* Background Grid - Global Utility */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-3">
            Mission Parameters
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Choose your trajectory.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic */}
          <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-10 md:p-12 flex flex-col justify-between hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 backdrop-blur-sm">

            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-slate-300 mb-8 border border-white/10 group-hover:scale-110 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-500">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Academic Research
              </h3>
              <p className="text-xs font-mono text-slate-500 mb-6 uppercase tracking-wider">
                PhDs &amp; Institutes
              </p>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                Integrate VerbAItim into your fieldwork methodology. Export
                IPA-aligned corpora, cite verifiable audio provenance in
                publications, and accelerate phonological analysis.
              </p>
            </div>
            <a
              href="#cta"
              className="relative z-10 inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group-hover:translate-x-1 transition-transform duration-300 text-sm"
            >
              Request Access <ArrowRight size={14} />
            </a>
          </div>

          {/* Community */}
          <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-10 md:p-12 flex flex-col justify-between hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 backdrop-blur-sm">

            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-slate-300 mb-8 border border-white/10 group-hover:scale-110 group-hover:text-orange-400 group-hover:border-orange-500/20 transition-all duration-500">
                <Heart size={24} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Language Revitalization
              </h3>
              <p className="text-xs font-mono text-slate-500 mb-6 uppercase tracking-wider">
                Communities &amp; Elders
              </p>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                Empower your community to learn from heritage speakers. Generate
                pronunciation exercises grounded in real recordings, with full
                community control over access.
              </p>
            </div>
            <a
              href="#cta"
              className="relative z-10 inline-flex items-center gap-2 text-white font-medium hover:text-orange-400 transition-colors group-hover:translate-x-1 transition-transform duration-300 text-sm"
            >
              Start Project <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
