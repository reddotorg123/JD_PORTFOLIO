import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import profilePhoto from "@/assets/profile-photo.jpeg";
import { useEffect, useState } from "react";
import { HardwareInfographic } from "./HardwareInfographic";

const typewriterRoles = [
  "Creative Technologist",
  "IoT & Embedded Systems Expert",
  "Full-Stack Developer",
  "Hardware-Software Architect"
];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = typewriterRoles[roleIndex];
      const typed = isDeleting
        ? currentRole.substring(0, displayText.length - 1)
        : currentRole.substring(0, displayText.length + 1);

      setDisplayText(typed);

      if (!isDeleting && typed === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typed === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % typewriterRoles.length);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight uppercase"
            >
              JAGADISH <span className="text-gradient-gold">K</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white font-medium mb-8 h-12 uppercase"
            >
              {displayText}<span className="animate-pulse bg-primary w-[3px] h-full inline-block ml-1">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground max-w-lg mb-10 text-lg leading-relaxed"
            >
              Electronics & Communication Engineer specializing in IoT, Embedded
              Systems, and VLSI. Passionate about transforming innovative ideas
              into impactful solutions through hardware-software integration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button variant="gold" size="lg" className="rounded-2xl px-8 h-14 text-base font-bold shadow-gold-lg hover:scale-105 transition-transform" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-base font-bold border-gold-500/30 hover:bg-gold-500/10 hover:border-gold-500/50 transition-all text-white" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-6 items-center"
            >
              {[
                { icon: Github, link: "https://github.com", label: "GitHub" },
                { icon: Linkedin, link: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, link: "mailto:jagadish2k2006@gmail.com", label: "Email" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="group relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gold-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300">
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-gold-400 transition-colors" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image Upgrade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Hardware-themed Animated Background */}
              <HardwareInfographic />
              
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl animate-pulse" />
              
              {/* Main image container with premium styling */}
              <div className="relative z-10 w-80 h-80 md:w-[450px] md:h-[450px] rounded-[60px] md:rounded-[100px] overflow-hidden border-[6px] border-white/5 p-4 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm group-hover:border-gold-500/30 transition-all duration-700 hover:rotate-2">
                <div className="w-full h-full rounded-[45px] md:rounded-[85px] overflow-hidden relative">
                  <img
                    src={profilePhoto}
                    alt="Jagadish K - Creative Technologist"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  {/* Subtle inner shadow/gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="group flex flex-col items-center gap-3">
            <div className="w-8 h-12 rounded-full border-2 border-white/10 flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold-500"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
