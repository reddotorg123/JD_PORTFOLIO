import { useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Layers, Database } from "lucide-react";

// Monochrome Tool Bubbles matching ID Card palette (charcoal, slate, silver, pure white)
const tools = [
  { id: "esp32", name: "ESP32", bg: "#1a1a20", border: "#ffffff", color: "#ffffff", size: "w-24 h-24 sm:w-28 sm:h-28", initial: { x: -280, y: 30 } },
  { id: "arduino", name: "Arduino", bg: "#141418", border: "#a1a1aa", color: "#e4e4e7", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: -160, y: 70 } },
  { id: "python", name: "Python", bg: "#1f1f26", border: "#ffffff", color: "#ffffff", size: "w-24 h-24 sm:w-30 sm:h-30", initial: { x: -40, y: 0 } },
  { id: "cpp", name: "C / C++", bg: "#16161c", border: "#a1a1aa", color: "#e4e4e7", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: 80, y: 50 } },
  { id: "embeddedc", name: "Embedded C", bg: "#1c1c24", border: "#d4d4d8", color: "#ffffff", size: "w-22 h-22 sm:w-26 sm:h-26", initial: { x: 200, y: 10 } },
  { id: "proteus", name: "Proteus", bg: "#14141a", border: "#71717a", color: "#d4d4d8", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: 310, y: 60 } },
  { id: "kali", name: "Kali Linux", bg: "#181820", border: "#a1a1aa", color: "#e4e4e7", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: -220, y: -40 } },
  { id: "firebase", name: "Firebase", bg: "#16161d", border: "#d4d4d8", color: "#ffffff", size: "w-22 h-22 sm:w-26 sm:h-26", initial: { x: -100, y: -60 } },
  { id: "aws", name: "AWS Cloud", bg: "#1a1a22", border: "#a1a1aa", color: "#e4e4e7", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: 40, y: -50 } },
  { id: "react", name: "React", bg: "#1e1e28", border: "#ffffff", color: "#ffffff", size: "w-22 h-22 sm:w-28 sm:h-28", initial: { x: 160, y: -60 } },
  { id: "typescript", name: "TypeScript", bg: "#15151c", border: "#a1a1aa", color: "#e4e4e7", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: 280, y: -30 } },
  { id: "git", name: "Git & GitHub", bg: "#181820", border: "#71717a", color: "#d4d4d8", size: "w-20 h-20 sm:w-24 sm:h-24", initial: { x: -30, y: 90 } },
];

const skillDomains = [
  {
    icon: Cpu,
    title: "Embedded & IoT",
    skills: "ESP32, SoftAP, Arduino, MAX30102, NDT Probes, I2C/SPI",
  },
  {
    icon: Layers,
    title: "Hardware & CAD",
    skills: "Proteus Simulation, Tinkercad, LabVIEW, PCB Layout, VLSI RTL",
  },
  {
    icon: Terminal,
    title: "Languages & ML",
    skills: "Embedded C, C++, Python, Random Forest, TypeScript, React",
  },
  {
    icon: Database,
    title: "Cloud & Protocols",
    skills: "REST JSON APIs, SoftAP Mesh, Firebase, AWS, WebSockets",
  },
];

export const Skills = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="tools" className="py-20 relative bg-[#08080a] border-t border-white/10 overflow-hidden id-grid-bg">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="text-neutral-400 font-tech text-xs font-bold tracking-widest uppercase mb-1">
            CLICK &amp; DRAG
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            My tools to play around with and create magic!
          </h2>
          <p className="text-neutral-500 font-tech text-xs mt-1.5 uppercase tracking-wider">
            Grab, fling, and bounce the tool spheres
          </p>
        </div>

        {/* Unified Monochrome Interactive Physics Playground */}
        <div
          ref={constraintsRef}
          className="w-full h-[400px] sm:h-[440px] rounded-3xl bg-[#101015] border border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center mb-12 select-none"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
              whileHover={{ scale: 1.15, cursor: "grab", zIndex: 30 }}
              whileDrag={{ scale: 1.25, cursor: "grabbing", zIndex: 50 }}
              initial={{ x: tool.initial.x, y: tool.initial.y }}
              style={{
                backgroundColor: tool.bg,
                borderColor: tool.border,
                color: tool.color,
              }}
              className={`absolute rounded-full ${tool.size} flex flex-col items-center justify-center text-center p-3 shadow-xl font-tech font-bold text-xs sm:text-sm border transition-shadow`}
            >
              <span className="leading-tight pointer-events-none">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Concise 4-Column Domain Strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillDomains.map((domain) => (
            <div
              key={domain.title}
              className="p-5 rounded-2xl bg-[#121216] border border-white/10"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center mb-3">
                <domain.icon className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">
                {domain.title}
              </h4>
              <p className="text-xs text-neutral-400 font-tech leading-relaxed">
                {domain.skills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
