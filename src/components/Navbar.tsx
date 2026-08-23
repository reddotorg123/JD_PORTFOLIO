import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08080a]/95 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Personal Brand Logo Box (No REDDOT in Header) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
            <Hexagon className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-wider text-white uppercase leading-none">
              JAGADISH.K
            </span>
            <span className="text-[9px] font-tech text-neutral-400 tracking-widest uppercase">
              PORTFOLIO
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#products" className="hover:text-white transition-colors">
            Products
          </a>
          <a href="#tools" className="hover:text-white transition-colors">
            Tools
          </a>
          <a href="#achievements" className="hover:text-white transition-colors">
            Moments
          </a>
          <a
            href="/Jagadish_K_Resume_2026.pdf"
            download="Jagadish_K_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Resume
          </a>

          {/* Contact Pill */}
          <a
            href="#contact"
            className="px-6 py-2 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider transition-all hover:bg-neutral-200 hover:scale-105"
          >
            CONTACT
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute top-full left-0 right-0 bg-[#0c0c10]/98 backdrop-blur-2xl border-b border-white/10 md:hidden p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">
                  About
                </a>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">
                  Projects
                </a>
                <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">
                  Products
                </a>
                <a href="#tools" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">
                  Tools
                </a>
                <a href="#achievements" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">
                  Moments
                </a>
                <a
                  href="/Jagadish_K_Resume_2026.pdf"
                  download="Jagadish_K_Resume_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-white text-black text-center font-bold text-xs uppercase tracking-wider mt-2"
                >
                  CONTACT
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
