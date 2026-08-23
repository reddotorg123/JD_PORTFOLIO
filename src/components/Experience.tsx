import { motion } from "framer-motion";

const experiences = [
  {
    role: "VLSI Chip Intern",
    org: "Onesys Infotech Solutions",
    period: "Sep 2025 — Present",
    location: "Chennai, India",
    type: "Work",
    desc: "Digital logic synthesis, embedded testbench integration, timing closure, and semiconductor RTL workflows.",
    tags: ["VLSI Design", "Embedded C", "RTL Verification"],
  },
  {
    role: "B.E. Electronics & Communication",
    org: "Velammal Institute of Technology",
    period: "2023 — 2027",
    location: "Chennai, India",
    type: "Education",
    desc: "Specializing in IoT architecture, embedded microcontrollers, signal processing, and lead 16x hackathon team.",
    tags: ["IoT Systems", "Microcontrollers", "DSP"],
  },
  {
    role: "Higher Secondary (1st Group - Science)",
    org: "St. Mary's HR Sec School",
    period: "2022 — 2023",
    location: "Chennai, India",
    type: "Education",
    desc: "Mathematics, Physics, Chemistry, Computer Science with distinction.",
    tags: ["Advanced Math", "Physics", "CS"],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 relative bg-[#08080a] border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-12">
          <span className="text-neutral-400 font-tech text-xs font-bold uppercase tracking-widest block mb-1">
            CAREER &amp; EDUCATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            TIMELINE
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-tech text-neutral-400 mb-3">
                  <span className="text-white font-bold">{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  {exp.role}
                </h3>
                <p className="text-xs font-semibold text-neutral-300 font-tech mb-3">
                  {exp.org}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {exp.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-tech rounded bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {t}
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
