import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Hero = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" aria-hidden="true" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-6">
            For Field Linguists
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
            The wisdom of the past,{" "}
            <span className="italic text-primary">powered by the future.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
            A verifiable pipeline from raw field audio to IPA to language
            learning. Every transcription links back to the original heritage
            speaker recording.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity"
            >
              Start Documenting
            </a>
            <a
              href="#pipeline"
              className="inline-flex items-center justify-center rounded-lg border border-border text-foreground px-8 py-3.5 text-base font-semibold hover:bg-muted transition-colors"
            >
              See the Pipeline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
