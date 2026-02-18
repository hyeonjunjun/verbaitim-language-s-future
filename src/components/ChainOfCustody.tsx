import { Link2, Shield, FileAudio, Lock, Database, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: FileAudio,
    title: "Original Recordings Preserved",
    description:
      "Every phonetic symbol traces back to a timestamped segment of the original field recording.",
  },
  {
    icon: Link2,
    title: "Immutable Provenance Chain",
    description:
      "Each transformation — phone recognition, grapheme conversion, assessment — is logged and versioned.",
  },
  {
    icon: Shield,
    title: "Community Sovereignty",
    description:
      "Heritage communities retain ownership. Access controls ensure data never leaves without consent.",
  },
];

const ChainOfCustody = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-32 bg-[#020617] text-white overflow-hidden border-t border-white/5">

      {/* Archive Grid Background - Global Utility */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: Manifesto */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Restricted Access // Archive Mode</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-[0.9]">
              Data Sovereignty <br />
              <span className="text-slate-500">is Non-Negotiable.</span>
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
              In the era of extractive AI, VerbAItim ensures that heritage communities retain full ownership of their linguistic data. Our "Chain of Custody" protocol cryptographically links every generated phoneme back to its original speaker consent form.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <Lock className="text-slate-500 mb-2" size={20} />
                <h4 className="font-bold text-sm text-slate-300">Encrypted Storage</h4>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <Database className="text-slate-500 mb-2" size={20} />
                <h4 className="font-bold text-sm text-slate-300">Local-First</h4>
              </div>
            </div>
          </div>

          {/* Right: Diagram */}
          <div className="relative p-10 bg-[#0a0a0a]/50 border border-white/5 rounded-2xl backdrop-blur-md shadow-2xl">
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-slate-700">FIG. 1.0</div>

            <div className="space-y-8 relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-sky-500/20 via-purple-500/20 to-emerald-500/20" />

              {/* Node 1 */}
              <div className="flex gap-6 items-center group">
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-slate-600 transition-colors group-hover:border-sky-500/50 group-hover:text-sky-500">
                  <FileAudio size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-slate-500 uppercase tracking-wider group-hover:text-sky-400 transition-colors">01. Source</h4>
                  <p className="text-sm text-slate-400">Field Recording (WAV)</p>
                </div>
              </div>

              {/* Node 2 */}
              <div className="flex gap-6 items-center group">
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-slate-600 transition-colors group-hover:border-purple-500/50 group-hover:text-purple-500">
                  <Link2 size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-slate-500 uppercase tracking-wider group-hover:text-purple-400 transition-colors">02. Transformation</h4>
                  <p className="text-sm text-slate-400">Allosaurus Inference Link</p>
                </div>
              </div>

              {/* Node 3 */}
              <div className="flex gap-6 items-center group">
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-slate-600 transition-colors group-hover:border-emerald-500/50 group-hover:text-emerald-500">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-slate-500 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">03. Custody</h4>
                  <p className="text-sm text-slate-400">Community Access Token</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChainOfCustody;
