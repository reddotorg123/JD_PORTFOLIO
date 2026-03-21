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
              href="/Jagadish_K_CV.pdf" 
              download="Jagadish_K_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-colors text-sm font-bold tracking-wider uppercase md:border-l md:border-border md:pl-6"
            >
              Download Resume
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/JAGADISH2006-DEV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jagadish-k-583996351"
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
