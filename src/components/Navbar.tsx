import { Container } from "@/design-system/Layout";
import { Text } from "@/design-system/Typography";
import { Link } from "react-router-dom";
import WaveformLogo from "./WaveformLogo";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo - The Organic Mark */}
        <Link to="/" className="flex items-center gap-3 group">
          <WaveformLogo size={28} />
          <span className="font-display font-bold text-xl tracking-tight text-foreground italic">Verb<span className="text-primary font-sans not-italic">AI</span>tim</span>
        </Link>

        {/* Navigation - Scholarly Links */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: "The Problem", href: "#problem" },
            { name: "For Linguists", href: "#linguists" },
            { name: "For Learners", href: "#learners" },
            { name: "How It Works", href: "#how-it-works" }
          ].map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA - Warm Interaction */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/learner/select" className="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
            Learner Hub
          </Link>
          <Link to="/workbench" className="flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full text-sm font-bold shadow-sm active:scale-95">
            Enter Workbench
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="md:hidden text-sm font-medium px-4 py-2 border border-border rounded-full hover:bg-secondary transition-colors">Menu</button>
      </Container>
    </header>
  );
};

export default Navbar;

