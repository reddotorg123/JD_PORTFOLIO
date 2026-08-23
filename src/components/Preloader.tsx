import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon } from "lucide-react";

export const Preloader = ({ onLoaded }: { onLoaded?: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onLoaded) onLoaded();
          }, 350);
          return 100;
        }

        // Variable speed increments for realistic loader feel
        const jump = Math.floor(Math.random() * 14) + 4;
        const next = Math.min(prev + jump, 100);

        if (next < 30) {
          setStatusText("INITIALIZING SYSTEM ARCHITECTURE...");
        } else if (next < 65) {
          setStatusText("LOADING SENSORS & EMBEDDED TELEMETRY...");
        } else if (next < 90) {
          setStatusText("CALIBRATING 3D CORES & PERSPECTIVE...");
        } else {
          setStatusText("SYSTEM READY • WELCOME");
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-12 bg-[#08080a] text-white id-grid-bg select-none overflow-hidden"
        >
          {/* Top Brand Indicator */}
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Hexagon className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold text-white tracking-widest uppercase">
                JAGADISH.K
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
              PORTFOLIO // 2026
            </span>
          </div>

          {/* Centerpiece: Glowing Hexagon Logo & Giant Percentage Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-20 h-20 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center text-white mb-6 shadow-[0_0_50px_rgba(255,255,255,0.08)] backdrop-blur-md"
            >
              <Hexagon className="w-10 h-10 stroke-[1.5]" />
            </motion.div>

            {/* Giant Smooth Progress Counter */}
            <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tight leading-none">
              {progress}
              <span className="text-2xl sm:text-4xl text-neutral-500 font-tech ml-1">
                %
              </span>
            </div>

            {/* Status Subtitle */}
            <motion.div
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs sm:text-sm text-neutral-400 mt-4 tracking-widest uppercase"
            >
              {statusText}
            </motion.div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-xl mx-auto space-y-2">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-white rounded-full shadow-[0_0_15px_#ffffff]"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              <span>LOADING SYSTEM CORES</span>
              <span>{progress === 100 ? "LAUNCHING" : "INITIALIZING"}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
