import { useState } from "react";
import Magnetic from "./ui/Magnetic";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer id="cta" className="bg-[#020617] border-t border-white/10 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          {/* Info */}
          <div>
            <a href="/" className="font-heading text-2xl font-bold tracking-tight text-white mb-6 block">
              Verb<span className="text-sky-400">AI</span>tim
            </a>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Constructing the digital infrastructure for linguistic preservation.
              <br />
              <span className="text-sm font-mono text-slate-600 mt-4 block">EST. 2025 // SINGAPORE</span>
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-white mb-4">
              Initialize Connection
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Receive transmission logs, research updates, and system alerts.
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
                placeholder="researcher@institute.edu"
                required
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors"
              />
              <Magnetic>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 text-sm font-bold hover:bg-sky-400 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </Magnetic>
            </form>
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} VERBAITIM SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-500 hover:text-white transition-colors font-mono uppercase tracking-widest">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
