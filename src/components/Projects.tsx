import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bot, Radio, BatteryCharging, Github, Layers, X } from "lucide-react";
import { Button } from "./ui/button";

type Project = {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  specs: {
    mcu: string;
    sensors: string;
    protocols: string;
    impact: string;
  };
  githubUrl: string;
};

const projects: Project[] = [
  {
    id: "mediglove",
    title: "MEDIGLOVE",
    category: "Healthcare IoT",
    subtitle: "Offline Emergency IoT Ecosystem",
    summary: "Deterministic, zero-latency emergency alerting & vitals telemetry (HR, SpO₂) via standalone ESP32 SoftAP server without internet reliance.",
    icon: Activity,
    tags: ["ESP32", "SoftAP Server", "MAX30102", "Embedded C"],
    specs: {
      mcu: "ESP32 Dual-Core (240MHz) + ESP8266 Pagers",
      sensors: "MAX30102 PPG & DS18B20 Temp Probe",
      protocols: "802.11 SoftAP, REST JSON APIs (/data, /clear)",
      impact: "Sub-85ms emergency alert response in hospital dead zones.",
    },
    githubUrl: "https://github.com/JAGADISH2006-DEV",
  },
  {
    id: "pcdb",
    title: "PCDB ROBOT",
    category: "Robotics & NDT",
    subtitle: "360° Ultrasonic Crack Detector",
    summary: "Autonomous pipeline crawler utilizing ASME/ISO Pulse-Echo ultrasonic ToF signal acquisition via ESP32 to detect internal fractures in real time.",
    icon: Bot,
    tags: ["Ultrasonic NDT", "ESP32", "Signal Processing", "Pulse-Echo"],
    specs: {
      mcu: "ESP32 High-Speed ADC & Timer Capture",
      sensors: "Ultrasonic Transducers (NDT Probes) + Encoders",
      protocols: "ESP-NOW Real-time Link, I2C / SPI Bus",
      impact: "Detected micro-cracks (<0.5mm) non-destructively in pipelines.",
    },
    githubUrl: "https://github.com/JAGADISH2006-DEV",
  },
  {
    id: "spectrum",
    title: "SPECTRUM ML",
    category: "AI & 4G/5G Telecom",
    subtitle: "Dynamic Spectrum Allocation Platform",
    summary: "Machine Learning simulation platform utilizing Random Forest to predict cell congestion states and dynamically rebalance 4G/5G frequency bands.",
    icon: Radio,
    tags: ["Python", "Random Forest", "4G/5G", "Streamlit"],
    specs: {
      mcu: "Python ML Core (Scikit-Learn, NumPy, Pandas)",
      sensors: "RF Base Station Telemetry (SINR, RSRP, CQI)",
      protocols: "WebSockets & Streamlit Reactive Engine",
      impact: "Improved simulated network throughput by 34%.",
    },
    githubUrl: "https://github.com/JAGADISH2006-DEV",
  },
  {
    id: "bms",
    title: "SMART BMS",
    category: "Power Electronics",
    subtitle: "Battery Longevity & Automated Cutoff",
    summary: "Intelligent battery charging controller with automated 80% cutoff, thermal protection, and scheduled multi-load switching to reduce e-waste.",
    icon: BatteryCharging,
    tags: ["Embedded C", "Arduino", "Proteus Simulation", "Power BMS"],
    specs: {
      mcu: "ATmega328P / Arduino Nano Microcontroller",
      sensors: "ACS712 Current Sensor & Precision Divider",
      protocols: "ADC Analog Sampling & PWM Actuation",
      impact: "Extends lithium battery cycle life by up to 2.5x.",
    },
    githubUrl: "https://github.com/JAGADISH2006-DEV",
  },
];

export const Projects = () => {
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative bg-[#08080a] border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-neutral-400 font-tech text-xs font-bold uppercase tracking-widest block mb-1">
              ENGINEERED HARDWARE &amp; CODE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-neutral-400 text-xs font-tech uppercase tracking-wider">
            4 Flagship Systems • Click Specs for Architecture
          </p>
        </div>

        {/* 2x2 Clean Project Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-7 rounded-2xl bg-[#121216] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-neutral-400">
                      {p.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-tech text-neutral-500 uppercase">
                    Verified Prototype
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-neutral-200 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs font-semibold text-neutral-300 font-tech mb-3">
                  {p.subtitle}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-sans">
                  {p.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-tech rounded bg-white/5 text-neutral-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl h-9 text-xs font-tech font-bold uppercase tracking-wider border-white/15 hover:border-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
                    onClick={() => setActiveModal(p)}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Architecture Specs
                  </Button>
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Specs Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121216] border border-white/20 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/10 text-white">
                  <activeModal.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-tech text-neutral-400 font-bold uppercase">
                    {activeModal.category}
                  </span>
                  <h3 className="text-xl font-display font-black text-white">
                    {activeModal.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                {activeModal.summary}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 font-tech">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Core MCU</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{activeModal.specs.mcu}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Sensors / Probes</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{activeModal.specs.sensors}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Protocols</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{activeModal.specs.protocols}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Impact Metric</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{activeModal.specs.impact}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex gap-1">
                  {activeModal.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[9px] font-tech rounded bg-white/5 text-neutral-400">
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs bg-white text-black hover:bg-neutral-200"
                  onClick={() => setActiveModal(null)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
