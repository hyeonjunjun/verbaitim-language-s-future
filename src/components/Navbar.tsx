import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}
      >
        <div className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-xl border border-white/10 rounded-full pr-2 pl-6 py-2 mx-4 md:mx-auto" : ""}`}>

          <a href="/" className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Verb<span className="text-sky-400">AI</span>tim
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {['Technology', 'Researchers', 'Communities'].map((item) => (
              <Magnetic key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  {item}
                </a>
              </Magnetic>
            ))}

            <Magnetic>
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-sm font-bold hover:bg-sky-400 transition-colors"
              >
                Start Documenting
              </a>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white rounded-full p-2 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-light text-slate-300">
              {['Technology', 'Researchers', 'Communities'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 pb-4"
                >
                  {item}
                </a>
              ))}
              <a
                href="#cta"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-sky-500 text-white px-5 py-4 text-lg font-bold"
                onClick={() => setOpen(false)}
              >
                Start Documenting
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
