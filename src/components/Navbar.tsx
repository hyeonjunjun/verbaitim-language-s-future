import { Container } from "@/design-system/Layout";
import { Text } from "@/design-system/Typography";
import { Link } from "react-router-dom"; // Assuming standard routing, or just <a> for now

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo - The Institute Mark */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-foreground" /> {/* Abstract Mark */}
          <span className="font-display font-semibold text-lg tracking-tight">VerbAItim</span>
        </div>

        {/* Navigation - Minimal Text links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Manifesto", "Technology", "Provenance", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* CTA - Technical/Monospaced */}
        <button className="hidden md:flex items-center justify-center px-4 py-2 border border-border bg-card hover:bg-secondary transition-colors text-xs font-mono uppercase tracking-wider">
          [ Request_Data ]
        </button>

        {/* Mobile Menu Placeholder - keeping it simple for now */}
        <button className="md:hidden text-sm font-medium">Menu</button>
      </Container>
    </header>
  );
};

export default Navbar;
