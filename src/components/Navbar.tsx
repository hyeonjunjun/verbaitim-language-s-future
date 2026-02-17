import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <a href="/" className="font-heading text-xl font-semibold tracking-tight text-foreground">
          Verb<span className="text-primary">AI</span>tim
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#pipeline" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Technology
          </a>
          <a href="#paths" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Researchers
          </a>
          <a href="#paths" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Communities
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Documenting
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 flex flex-col gap-4">
          <a href="#pipeline" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
            Technology
          </a>
          <a href="#paths" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
            For Researchers
          </a>
          <a href="#paths" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
            For Communities
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Start Documenting
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
