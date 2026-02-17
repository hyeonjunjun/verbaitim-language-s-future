import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [email, setEmail] = useState("");

  return (
    <footer id="cta" className="bg-muted border-t border-border py-16 md:py-20">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 md:px-10 fade-in-up ${isVisible ? "visible" : ""}`}
      >
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Info */}
          <div>
            <a href="/" className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Verb<span className="text-primary">AI</span>tim
            </a>
            <p className="text-muted-foreground text-sm mt-4 max-w-sm leading-relaxed">
              A verifiable pipeline from raw field audio to IPA to language
              learning. Built with integrity for field linguists and heritage
              communities.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              Stay in the loop
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get updates on new features, research publications, and community
              stories.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                required
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VerbAItim. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
