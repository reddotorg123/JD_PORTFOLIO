import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const workExperience = [
  {
    period: "September 2025 – Present",
    title: "VLSI Chip Intern",
    company: "Onesys Infotech Solutions – Chennai",
    points: [
      "Gaining hands-on exposure to semiconductor and VLSI design workflows",
      "Working on embedded systems integration for industry-grade applications",
      "Collaborating on industry-oriented problem solving and chip design methodologies",
      "Learning advanced fabrication processes and design verification techniques",
    ],
  },
];

const education = [
  {
    period: "2023 – 2027",
    title: "B.E – Electronics and Communication Engineering",
    institution: "Velammal Institute of Technology",
    description:
      "Pursuing core ECE curriculum with specialization in IoT and Embedded Systems",
  },
  {
    period: "2022 – 2023",
    title: "Higher Secondary (1st Group)",
    institution: "St. Mary's HR Sec School, Perambur",
    description:
      "Completed higher secondary education with focus on Science and Mathematics",
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Experience & <span className="text-gradient-gold">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold">
                Work Experience
              </h3>
            </div>

            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-dark rounded-2xl p-6 border-l-4 border-primary"
                >
                  <span className="text-sm text-primary font-medium">
                    {exp.period}
                  </span>
                  <h4 className="text-xl font-semibold mt-2 mb-1">
                    {exp.title}
                  </h4>
                  <p className="text-muted-foreground mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-dark rounded-2xl p-6 border-l-4 border-accent"
                >
                  <span className="text-sm text-accent font-medium">
                    {edu.period}
                  </span>
                  <h4 className="text-xl font-semibold mt-2 mb-1">
                    {edu.title}
                  </h4>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
