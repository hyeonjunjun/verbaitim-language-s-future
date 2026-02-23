import { Container } from "@/design-system/Layout";
import { Text } from "@/design-system/Typography";
import { Link } from "react-router-dom";
import WaveformLogo from "./WaveformLogo";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo - The Academic Mark */}
        <Link to="/" className="flex items-center gap-3 group">
          <WaveformLogo size={24} />
          <span className="font-display font-semibold text-xl tracking-tight text-foreground">VerbAItim</span>
        </Link>

        {/* Navigation - Scholarly Links */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: "The Problem", href: "#problem" },
            { name: "For Linguists", href: "#linguists" },
            { name: "For Learners", href: "#learners" },
            { name: "How It Works", href: "#how-it-works" }
          ].map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-signal transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA - Warm Interaction */}
        <Link to="/workbench" className="hidden md:flex items-center justify-center px-6 py-2 bg-signal text-white hover:bg-signal/90 transition-all rounded-full text-sm font-medium shadow-sm active:scale-95">
          Enter Workbench
        </Link>

        {/* Mobile Menu Placeholder */}
        <button className="md:hidden text-sm font-medium px-4 py-2 border border-border rounded-full hover:bg-secondary transition-colors">Menu</button>
      </Container>
    </header>
  );
};

export default Navbar;
