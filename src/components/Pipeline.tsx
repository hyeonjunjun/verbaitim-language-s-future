import { Mic, RefreshCw, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    icon: Mic,
    step: "01",
    title: "Capture",
    subtitle: "Universal Phone Recognition",
    tech: "Allosaurus",
    description:
      "Record heritage speakers in the field. Our pipeline uses Allosaurus for universal phone recognition — no language-specific model needed.",
  },
  {
    icon: RefreshCw,
    step: "02",
    title: "Convert",
    subtitle: "Zero-shot P2G",
    tech: "ByT5",
    description:
      "Convert IPA transcriptions into practical orthography using ByT5's zero-shot phoneme-to-grapheme conversion. Works across any writing system.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Confirm",
    subtitle: "Pronunciation Assessment",
    tech: "TextPA",
    description:
      "Validate learner pronunciation against the original recordings with TextPA, ensuring fidelity to heritage speaker intent.",
  },
];

const Pipeline = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pipeline" className="py-24 md:py-32 bg-background">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="max-w-xl mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            The Pipeline
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Three steps from speech to literacy.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Each stage is powered by state-of-the-art NLP models and every
            output links back to the original audio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group relative rounded-lg border border-border bg-card p-8 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-accent text-accent-foreground">
                  <s.icon size={20} />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Step {s.step}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-1">
                {s.title}
              </h3>
              <p className="text-sm font-medium text-primary mb-4">
                {s.subtitle} via{" "}
                <span className="font-semibold">{s.tech}</span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
