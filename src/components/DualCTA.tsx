import { GraduationCap, Heart, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const DualCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="paths" className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-sm font-mono tracking-widest uppercase text-sky-500 mb-3">
            Mission Parameters
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Choose your trajectory.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-10 md:p-12 flex flex-col justify-between hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 mb-8 border border-sky-500/20 group-hover:scale-110 transition-transform duration-500">
                <GraduationCap size={28} />
              </div>
              <h3 className="font-heading text-3xl font-bold text-white mb-2">
                Academic Research
              </h3>
              <p className="text-sm font-mono text-sky-400/80 mb-6 uppercase tracking-wider">
                PhDs &amp; Institutes
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Integrate VerbAItim into your fieldwork methodology. Export
                IPA-aligned corpora, cite verifiable audio provenance in
                publications, and accelerate phonological analysis.
              </p>
            </div>
            <a
              href="#cta"
              className="relative z-10 inline-flex items-center gap-2 text-white font-bold hover:text-sky-400 transition-colors group-hover:translate-x-2 transition-transform duration-300"
            >
              Request Access <ArrowRight size={16} />
            </a>
          </div>

          {/* Community */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-10 md:p-12 flex flex-col justify-between hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                <Heart size={28} />
              </div>
              <h3 className="font-heading text-3xl font-bold text-white mb-2">
                Language Revitalization
              </h3>
              <p className="text-sm font-mono text-orange-400/80 mb-6 uppercase tracking-wider">
                Communities &amp; Elders
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Empower your community to learn from heritage speakers. Generate
                pronunciation exercises grounded in real recordings, with full
                community control over access.
              </p>
            </div>
            <a
              href="#cta"
              className="relative z-10 inline-flex items-center gap-2 text-white font-bold hover:text-orange-400 transition-colors group-hover:translate-x-2 transition-transform duration-300"
            >
              Start Project <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
