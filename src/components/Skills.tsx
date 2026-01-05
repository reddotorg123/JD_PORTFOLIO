import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Cpu, Cloud, PenTool, Monitor, Wrench } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Programming",
    skills: ["Python", "C", "C++ (Basics)", "Embedded C"],
  },
  {
    icon: Cpu,
    title: "Embedded & IoT",
    skills: ["Arduino IDE", "Blynk", "Firebase IoT", "ESP8266/ESP32"],
  },
  {
    icon: Cloud,
    title: "Cloud & Backend",
    skills: ["AWS", "Firebase", "Real-time Databases"],
  },
  {
    icon: PenTool,
    title: "Design & Simulation",
    skills: ["Tinkercad", "Circuit Designer", "LabVIEW", "PCB Design", "Proteus"],
  },
  {
    icon: Monitor,
    title: "Operating Systems",
    skills: ["Kali Linux", "Ubuntu", "Windows"],
  },
  {
    icon: Wrench,
    title: "Other Skills",
    skills: [
      "Circuit Analysis",
      "Signal Processing",
      "VLSI Basics",
      "Technical Documentation",
    ],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-gradient-gold">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A diverse toolkit spanning embedded systems, software development,
            and cloud technologies
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="glass-dark rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
