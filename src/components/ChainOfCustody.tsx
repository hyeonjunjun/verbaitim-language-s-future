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
    <section className="archive-surface py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="max-w-xl mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-sage-light/70 mb-3">
            Chain of Custody
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Every word links back to the speaker.
          </h2>
          <p className="text-sage-light/70 text-lg leading-relaxed">
            A verifiable archive where no transcription exists without its
            source recording.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-lg border border-sage-light/15 p-8 hover:border-sage-light/30 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-sage-light/10 text-sage-light mb-6">
                <f.icon size={20} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-sage-light/70">
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
