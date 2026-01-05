import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Languages } from "lucide-react";

const infoCards = [
  {
    icon: GraduationCap,
    title: "B.E – Electronics & Communication",
    subtitle: "Velammal Institute of Technology",
  },
  {
    icon: Calendar,
    title: "Class of 2027",
    subtitle: "Expected Graduation",
  },
  {
    icon: MapPin,
    title: "Chennai, India",
    subtitle: "Location",
  },
  {
    icon: Languages,
    title: "Languages",
    subtitle: "English • Tamil • Telugu",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-gradient-gold">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate engineer on a mission to bridge the gap between
            hardware innovation and software intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-dark rounded-2xl p-8 relative overflow-hidden group">
              {/* Bio glitter effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1 h-1 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: `hsl(${40 + Math.random() * 20}, 100%, ${60 + Math.random() * 30}%)`,
                      boxShadow: `0 0 ${4 + Math.random() * 6}px hsl(45, 100%, 70%)`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  />
                ))}
              </div>
              <h3 className="text-xl font-display font-semibold text-primary mb-4 relative z-10">
                Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 relative z-10">
                I'm a driven Electronics & Communication Engineering student
                with a strong foundation in IoT, Embedded Systems, and VLSI
                design. My expertise lies in bridging hardware intelligence with
                modern software solutions to create innovative, real-world
                applications.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 relative z-10">
                With multiple hackathon wins under my belt and hands-on industry
                experience, I've demonstrated my ability to conceptualize,
                design, and deliver impactful projects in healthcare technology,
                environmental monitoring, and telecommunications.
              </p>
              <p className="text-muted-foreground leading-relaxed relative z-10">
                I'm passionate about leveraging technology for sustainability
                and healthcare innovation, constantly seeking opportunities to
                apply my skills to solve pressing global challenges through
                creative engineering solutions.
              </p>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-dark rounded-xl p-6 hover:border-primary/50 transition-colors duration-300"
              >
                <card.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-1">
                  {card.title}
                </h4>
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
