import { Hexagon, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#050507] border-t border-white/10 text-xs font-tech text-neutral-400 relative z-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
            <Hexagon className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wider uppercase">
              JAGADISH.K
            </div>
            <div className="text-[10px] text-neutral-500 uppercase">
              Technical Head &amp; Founder
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-neutral-300">
          <a
            href="https://github.com/JAGADISH2006-DEV"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors uppercase tracking-wider text-[11px]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jagadish-k-583996351"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors uppercase tracking-wider text-[11px]"
          >
            LinkedIn
          </a>
          <a
            href="mailto:jagadish2k2006@gmail.com"
            className="hover:text-white transition-colors uppercase tracking-wider text-[11px]"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white transition-all ml-2"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
