import { GraduationCap, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const DualCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="paths" className="py-24 md:py-32 bg-background">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            Two Paths, One Mission
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Choose your journey.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic */}
          <div className="relative rounded-lg border border-border bg-card p-10 md:p-12 flex flex-col justify-between hover:border-primary/40 transition-colors">
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-accent text-accent-foreground mb-6">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                For Academic Research
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                PhDs &amp; Professors
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Integrate VerbAItim into your fieldwork methodology. Export
                IPA-aligned corpora, cite verifiable audio provenance in
                publications, and accelerate phonological analysis.
              </p>
            </div>
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity self-start"
            >
              Request Academic Access
            </a>
          </div>

          {/* Community */}
          <div className="relative rounded-lg border border-secondary/30 bg-clay-light p-10 md:p-12 flex flex-col justify-between hover:border-secondary/60 transition-colors">
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-secondary/15 text-secondary mb-6">
                <Heart size={24} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                For Language Revitalization
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Students &amp; Elders
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Empower your community to learn from heritage speakers. Generate
                pronunciation exercises grounded in real recordings, with full
                community control over access.
              </p>
            </div>
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity self-start"
            >
              Start a Community Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
