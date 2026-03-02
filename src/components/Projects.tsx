import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "TESTlove – First Offline Based Emergency Alert System",
    description:
      "An innovative IoT-enabled glove designed to assist patients with limited mobility and provide real-time health monitoring capabilities for caregivers and medical professionals.",
    features: [
      "Advanced gesture detection using flex sensors for intuitive patient communication",
      "Real-time heart rate, SpO₂, and temperature monitoring with MAX30102 sensor",
      "IoT-enabled emergency alert system with Firebase cloud integration",
      "Live health dashboard for remote monitoring by healthcare providers",
    ],
    tags: ["Arduino Nano", "ESP8266", "Flex Sensors", "MAX30102", "Firebase"],
  },
  {
    title: "AirAware – Air Quality Monitoring & Forecast System",
    description:
      "A comprehensive environmental monitoring solution designed specifically for rural and semi-urban regions to track and predict air quality conditions.",
    features: [
      "Real-time temperature and humidity monitoring with DHT11 sensor",
      "Cloud-based data logging using Firebase for historical analysis",
      "Intelligent alert system for hazardous air quality conditions",
      "Predictive analysis for air quality forecasting",
      "Tailored solution for underserved rural and semi-urban communities",
    ],
    tags: ["ESP8266", "DHT11", "Firebase", "Web Dashboard"],
  },
  {
    title: "Dynamic Spectrum Allocation (4G/5G Simulation)",
    description:
      "A machine learning-powered simulation platform for optimizing spectrum allocation in modern cellular networks with real-time congestion prediction.",
    features: [
      "Multi-cell spectrum simulation for 4G and 5G network scenarios",
      "Machine learning-based congestion prediction using Random Forest algorithm",
      "Interactive heatmaps for visualizing spectrum utilization",
      "Real-time gauges and throughput trend analysis",
      "Automated alert system for network optimization",
    ],
    tags: ["Python", "Streamlit", "Random Forest (ML)", "Data Visualization"],
  },
  {
    title: "Battery Management & Smart Control System",
    description:
      "An intelligent battery management solution focused on sustainability, featuring smart charging protocols and automated device control.",
    features: [
      "Smart charging with automatic 80% cutoff for battery longevity",
      "Timer-based automation for scheduled charging and device control",
      "Multi-device control capability for home automation integration",
      "Focus on sustainability and e-waste reduction through optimal battery usage",
      "Fully simulated and tested using Proteus design software",
    ],
    tags: ["Embedded C", "Arduino", "Proteus Simulation"],
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions bridging hardware and software for real-world
            impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass-dark rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group"
            >
              <h3 className="text-xl font-display font-semibold text-primary mb-3 group-hover:text-gradient-gold transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {project.description}
              </p>

              <ul className="space-y-2 mb-6">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
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
