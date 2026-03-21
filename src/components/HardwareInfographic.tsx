import { motion } from "framer-motion";
import { Cpu, Wifi, Zap, CircuitBoard, Microchip, Layers, Activity, Radio } from "lucide-react";

const nodes = [
  { icon: Cpu, x: "15%", y: "15%", delay: 0 },
  { icon: Wifi, x: "85%", y: "20%", delay: 0.5 },
  { icon: Zap, x: "10%", y: "80%", delay: 1 },
  { icon: CircuitBoard, x: "90%", y: "75%", delay: 1.5 },
  { icon: Microchip, x: "50%", y: "5%", delay: 2 },
  { icon: Layers, x: "50%", y: "95%", delay: 2.5 },
  { icon: Activity, x: "5%", y: "50%", delay: 3 },
  { icon: Radio, x: "95%", y: "50%", delay: 3.5 },
];

const TraceLine = ({ d, delay, duration = 4 }: { d: string; delay: number; duration?: number }) => (
  <g>
    {/* Base Trace Path */}
    <motion.path
      d={d}
      fill="none"
      stroke="url(#goldGradient)"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
    {/* Animated Data Packet (moving dot) */}
    <motion.circle
      r="2"
      fill="hsl(var(--gold-400))"
      filter="url(#glow)"
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{ offsetDistance: "100%", opacity: [0, 1, 0] }}
      transition={{
        duration: duration / 1.5,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      style={{ offsetPath: `path("${d.replace(/,/g, ' ')}")` }}
    />
  </g>
);

export const HardwareInfographic = () => {
  return (
    <div className="absolute inset-[-80px] z-0 opacity-100 transition-opacity duration-1000 scale-125">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--gold-300))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--gold-500))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--gold-700))" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Circular Traces */}
        <TraceLine d="M 200,30 A 170,170 0 1,1 199,30" delay={0} duration={6} />
        <TraceLine d="M 200,60 A 140,140 0 1,0 201,60" delay={2} duration={5} />
        
        {/* Complex Circuit Branches */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 200 + Math.cos(rad) * 190;
          const y2 = 200 + Math.sin(rad) * 190;
          return (
            <TraceLine 
              key={i}
              d={`M 200,200 L ${x2},${y2}`} 
              delay={i * 0.5} 
              duration={4}
            />
          );
        })}

        {/* Diagonal Cross-Traces */}
        <TraceLine d="M 50,50 L 350,350" delay={1} duration={8} />
        <TraceLine d="M 350,50 L 50,350" delay={3} duration={8} />
      </svg>

      {/* Radial Scanning Sweep */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "conic-gradient(from 0deg, transparent, hsl(var(--gold-500) / 0.1), transparent 30%)" }}
      />

      {/* Floating Hardware Nodes - Orbital Motion */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.8, 0.3], 
            scale: [0.9, 1.2, 0.9],
            x: [0, Math.sin(i) * 20, 0],
            y: [0, Math.cos(i) * 20, 0],
          }}
          transition={{ 
            duration: 5 + Math.random() * 2, 
            repeat: Infinity, 
            delay: node.delay 
          }}
          style={{ left: node.x, top: node.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 border border-gold-500/30 backdrop-blur-xl shadow-gold shadow-sm hover:scale-125 transition-transform group"
        >
          <div className="relative">
            <node.icon className="w-6 h-6 text-gold-500 transition-colors group-hover:text-white" />
            <div className="absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
          </div>
        </motion.div>
      ))}

      {/* Central Interactive Power Hub */}
      <div className="absolute inset-x-1/4 inset-y-1/4 rounded-full bg-gold-400/5 blur-[100px] animate-pulse" />
    </div>
  );
};
