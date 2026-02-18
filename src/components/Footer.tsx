import { Container, Section } from "@/design-system/Layout";
import { Text } from "@/design-system/Typography";
import { Link } from "react-router-dom"; // Or just use <a> tags if no router setup

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-5 w-5 bg-foreground" />
              <span className="font-display font-semibold text-lg tracking-tight">VerbAItim</span>
            </div>
            <Text variant="caption" className="max-w-xs">
              The Institute for Digital Linguistic Preservation.
              <br /><br />
              100% Open Source.<br />
              Community Owned.
            </Text>
          </div>

          {/* Sitemap Columns */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider mb-6 text-foreground">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">The Workbench</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Data Sovereignty</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Integration Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider mb-6 text-foreground">Institute</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Manifesto</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Grants & Funding</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider mb-6 text-foreground">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Discord</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Twitter / X</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-signal transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div>
            © 2026 VerbAItim Institute. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
