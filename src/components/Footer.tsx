import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Jagadish K. Made with</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </div>
            <a 
              href="/resume.pdf" 
              download="Jagadish_K_Resume.pdf"
              className="text-primary/70 hover:text-primary transition-colors text-sm font-bold tracking-wider uppercase border-l border-border pl-6 hidden md:block"
            >
              Download Resume
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:jagadish2k2006@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
