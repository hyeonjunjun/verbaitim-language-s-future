import { Container, Section } from "@/design-system/Layout";
import { Text } from "@/design-system/Typography";
import { Link } from "react-router-dom";
import WaveformLogo from "./WaveformLogo";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <WaveformLogo size={28} />
              <span className="font-display font-bold text-xl tracking-tight text-foreground italic">Verb<span className="text-primary font-sans not-italic">AI</span>tim</span>
            </div>
            <Text variant="body" className="max-w-xs text-sm italic font-serif leading-relaxed text-muted-foreground">
              An ethical AI platform built with linguists and governed by communities.
              <br /><br />
              Open Research. <br />
              Community Managed.
            </Text>
          </div>

          {/* Sitemap Columns */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-6 text-card-foreground">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#linguists" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">For Linguists</a></li>
              <li><a href="#learners" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">For Learners</a></li>
              <li><a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#join" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Beta Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-6 text-card-foreground">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Methodology</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Ethics Codex</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-6 text-card-foreground">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Journal</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Scholar Portal</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
          <div>
            © 2026 VerbAItim Initiative. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary font-bold transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary font-bold transition-colors">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
