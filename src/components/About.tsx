import { motion } from "framer-motion";
import { Cpu, Bot, Trophy, MapPin, GraduationCap, Languages } from "lucide-react";

const quickPillars = [
  {
    icon: Cpu,
    title: "Offline IoT & Edge Systems",
    desc: "Zero-dependency local SoftAP servers, telemetry & deterministic alert loops.",
  },
  {
    icon: Bot,
    title: "Robotics & Signal Processing",
    desc: "Pulse-Echo ultrasonic NDT crawlers, ToF crack detection & embedded drivers.",
  },
  {
    icon: Trophy,
    title: "Hackathon Champion & Founder",
    desc: "16+ national & state-level victories; founder at REDDOT engineering suite.",
  },
];

const fastFacts = [
  { icon: GraduationCap, label: "Education", value: "B.E. ECE — Velammal (2027)" },
  { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India" },
  { icon: Languages, label: "Languages", value: "English • Tamil • Telugu" },
];

export const About = () => {
  return (
    <section id="about" className="py-20 relative bg-[#08080a] border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-neutral-400 font-tech text-xs font-bold uppercase tracking-widest block mb-1">
              TECHNICAL HEAD &amp; FOUNDER
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              JAGADISH K
            </h2>
          </div>
          <p className="text-neutral-400 text-sm font-tech max-w-md">
            Electronics &amp; Communication Engineer specializing in offline-first IoT architectures, robotics NDT, and autonomous platforms.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {quickPillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-white/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1.5">
                {p.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Facts Strip */}
        <div className="grid sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0e0e12] border border-white/5 text-xs font-tech">
          {fastFacts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-white">
                <fact.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">
                  {fact.label}
                </span>
                <span className="text-white font-semibold">
                  {fact.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
