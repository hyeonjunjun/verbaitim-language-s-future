import { Shell, Section } from "@/design-system/Layout";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import WorkbenchPreview from "@/components/WorkbenchPreview";

const Index = () => {
  return (
    <Shell>
      <Navbar />
      <Hero />
      <Manifesto />
      <WorkbenchPreview />

      {/* Footer Placeholder */}
      <Section className="py-12 border-t border-border">
        <div className="text-center text-xs text-muted-foreground">© 2026 VerbAItim Institute</div>
      </Section>
    </Shell>
  );
};

export default Index;
