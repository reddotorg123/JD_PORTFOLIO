import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "MEDIGLOVE – Offline Hospital Emergency IoT Ecosystem",
    description:
      "An offline-first hospital IoT architecture engineered for ICUs and wards, enabling deterministic low-latency emergency alerts, real-time vitals monitoring, and accountable nurse–doctor response workflows without internet dependency.",
    features: [
       "ESP32 SoftAP-based patient unit acting as a local emergency server",
    "Multi-device ecosystem: Patient Unit, Nurse Pager, Doctor Pager",
    "Emergency-priority connection locking to prevent reconnect instability",
    "Real-time vitals monitoring (HR, SpO₂, Body Temp, Environmental Data)",
    "Custom HTTP API (/data, /clear, /assist, /arrival) using JSON communication",
    "Traceable nurse acknowledgment & doctor arrival logging with stored names",
    ],
    tags: [ "ESP32","ESP8266","Embedded C","Offline IoT","HTTP Server","MAX30102","Real-Time Systems",],
  },
  {
  title: "PCDB – 360° Pipeline Crack Detection Robot",
  description:
    "A 360-degree ultrasonic pipeline inspection robot using Pulse–Echo NDT principles to detect internal cracks in real time, process echo-time variations via ESP32, and transmit structural health data for remote monitoring.",

  features: [
    "Ultrasonic Pulse–Echo based non-destructive crack detection (ASME/ISO compliant principle)",
    "360° rotating probe mounted on circular frame for full pipeline surface coverage",
    "ESP32-based signal acquisition and echo time-of-flight analysis",
    "Crack detection via early echo reflection & amplitude variation mapping",
    "Real-time alert system with location display and buzzer warning",
    "IoT-enabled data transmission for remote monitoring dashboard",
  ],

  tags: [
    "ESP32","Ultrasonic NDT","Robotics","Signal Processing","IoT Monitoring","Non-Destructive Testing",],
  },
  {
  title: "Dynamic Spectrum Allocation – 4G/5G ML Simulation Platform",
  description:
    "A machine learning-powered simulation dashboard for dynamic spectrum allocation in 4G/5G networks, predicting congestion states using Random Forest and optimizing band utilization in real time.",

  features: [
    "Multi-cell spectrum allocation simulation with configurable band and traffic parameters",
    "Random Forest-based congestion prediction using band load and capacity features",
    "Real-time throughput, fairness, and utilization monitoring dashboard",
    "Alert generation for proactive congestion management",
    "Dynamic reallocation logic for optimized network efficiency",
    "Exportable simulation data for performance analysis and model tuning",
  ],

  tags: ["Python","Machine Learning","Random Forest","4G/5G Networks","Streamlit Dashboard","Data Visualization",],
}
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
