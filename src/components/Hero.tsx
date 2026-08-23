import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import idCardImg from "@/assets/id-card.png";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt values for 3D Lanyard ID Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const cardX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden id-grid-bg bg-[#08080a] pt-24 pb-8 select-none"
    >
      {/* Subtle Monochrome Ambient Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      {/* Main Hero Content */}
      <div className="container mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center relative z-10 my-auto">
        {/* Giant Background Typography & Surrounding Labels */}
        <div className="relative w-full flex items-center justify-between">
          {/* Left Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-0 max-w-[200px]"
          >
            <div className="text-white font-tech text-xs tracking-widest font-bold uppercase mb-1">
              (TECHNICAL HEAD)
            </div>
            <div className="text-neutral-400 font-tech text-xs uppercase tracking-wider">
              FOUNDER &amp; ARCHITECT
            </div>
          </motion.div>

          {/* Giant Oversized Typography Behind Card */}
          <div className="w-full text-center overflow-hidden pointer-events-none py-10">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[14vw] md:text-[17vw] font-display font-black text-white/90 leading-none tracking-tight uppercase select-none whitespace-nowrap"
            >
              JAGADISH.K
            </motion.h1>
          </div>

          {/* Right Tagline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-0 max-w-[220px] text-right"
          >
            <span className="text-white font-tech text-xs tracking-wider font-bold uppercase leading-relaxed block">
              HARDWARE ARCHITECT &amp; EMBEDDED SYSTEMS
            </span>
          </motion.div>
        </div>

        {/* Centerpiece: Hanging 3D Lanyard ID Badge (Compact & Sleek Sizing) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: cardX,
              transformStyle: "preserve-3d",
            }}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
            className="relative pointer-events-auto cursor-grab active:cursor-grabbing perspective-1000"
          >
            {/* Lanyard Neck Strap */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-6 h-40 bg-[#141418] border-x border-white/10 shadow-2xl flex flex-col items-center justify-end z-0">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#222228] to-[#121216] opacity-90" />
              {/* Metallic Badge Clip */}
              <div className="w-8 h-6 bg-gradient-to-b from-[#4a4a54] to-[#25252e] rounded-t-md border border-white/20 shadow-md flex items-center justify-center -mb-2">
                <div className="w-3 h-1 rounded-full bg-black/90" />
              </div>
            </div>

            {/* Badge Container Frame */}
            <div className="w-[210px] sm:w-[245px] md:w-[265px] aspect-[1/1.56] rounded-[22px] bg-[#121216] p-2 border-[3px] border-[#25252e] shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative overflow-hidden backdrop-blur-xl group">
              {/* Top Clip Hole cutout */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-[#08080a] border border-white/15 z-30" />

              {/* ID Card Image */}
              <div className="w-full h-full rounded-[16px] overflow-hidden relative shadow-inner bg-black">
                <img
                  src={idCardImg}
                  alt="Jagadish K - Technical Head & Founder"
                  className="w-full h-full object-cover object-center filter contrast-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between text-neutral-400 font-tech text-xs z-20 pt-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center font-bold text-white">
            01
          </span>
        </div>

        <a
          href="#about"
          className="w-10 h-10 rounded-full border border-white/15 hover:border-white hover:bg-white/5 flex items-center justify-center text-white transition-colors group"
        >
          <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </a>

        <div className="text-right">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
            TECHNICAL HEAD &amp; FOUNDER
          </span>
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            JAGADISH.K • 2026
          </span>
        </div>
      </div>
    </section>
  );
};
