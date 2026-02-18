import { Link2, Shield, FileAudio } from "lucide-react";
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
    <section className="relative py-24 md:py-32 bg-[#020617] text-slate-300">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="max-w-xl mb-16">
          <p className="text-sm font-mono tracking-widest uppercase text-sky-500 mb-3">
            Chain of Custody
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
            Every word links back to the speaker.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-sky-500/30 pl-6">
            A verifiable archive where no transcription exists without its
            source recording.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/5 bg-white/5 p-8 hover:bg-white/10 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <f.icon size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChainOfCustody;
