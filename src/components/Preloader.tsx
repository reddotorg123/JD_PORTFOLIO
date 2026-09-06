import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon } from "lucide-react";
import idCardImg from "@/assets/id-card.png";

// Persistent global image cache so decoded bitmaps stay in memory and never re-request or flicker
const portfolioAssetCache = new Map<string, HTMLImageElement>();

const CRITICAL_IMAGES = [
  idCardImg,
  "/id-card.png",
  "/products/reddot-preview.png",
  "/products/sem-preview.png",
  "/products/habit-preview.png",
  "/achievements/IMG_20260716_095911.jpg",
  "/achievements/IMG_20260217_173130.jpg",
  "/achievements/IMG_20260302_132602.jpg",
  "/achievements/20260109_115905AMByGPSMapCamera.jpg",
  "/achievements/IMG_20260209_133858_1.jpg",
  "/achievements/IMG_20250921_190450.jpg",
  "/achievements/IMG_20250823_151650.jpg",
  "/achievements/IMG_20251010_182659.jpg",
];

export const Preloader = ({ onLoaded }: { onLoaded?: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const totalItems = CRITICAL_IMAGES.length + 2; // images + window load + fonts

    const updateProgress = () => {
      if (isCancelled) return;
      loadedCount++;
      const percent = Math.min(Math.round((loadedCount / totalItems) * 100), 100);
      setProgress(percent);

      if (percent < 30) {
        setStatusText("INITIALIZING ARCHITECTURE...");
      } else if (percent < 70) {
        setStatusText("DECODING ALL IMAGES & ARCHIVES...");
      } else if (percent < 95) {
        setStatusText("CALIBRATING 3D PERSPECTIVE...");
      } else {
        setStatusText("ALL ASSETS LOADED • SYSTEM READY");
      }

      if (loadedCount >= totalItems) {
        setTimeout(() => {
          if (!isCancelled) {
            setIsFinished(true);
            if (onLoaded) onLoaded();
          }
        }, 350);
      }
    };

    // Preload and decode an image into GPU texture cache
    const preloadImage = async (src: string) => {
      if (portfolioAssetCache.has(src)) {
        updateProgress();
        return;
      }

      const img = new Image();
      img.src = src;
      portfolioAssetCache.set(src, img);

      try {
        if ("decode" in img) {
          await img.decode();
        } else if (!img.complete) {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
      } catch {
        // Continue even if one decode fails
      }
      updateProgress();
    };

    // 1. Preload and decode all critical images
    CRITICAL_IMAGES.forEach((src) => {
      preloadImage(src);
    });

    // 2. Wait for document fonts
    if (document.fonts) {
      document.fonts.ready.then(updateProgress).catch(updateProgress);
    } else {
      updateProgress();
    }

    // 3. Wait for full window load
    if (document.readyState === "complete") {
      updateProgress();
    } else {
      window.addEventListener("load", updateProgress, { once: true });
    }

    // Fallback safety timeout so it never hangs indefinitely
    const safetyTimer = setTimeout(() => {
      if (isCancelled) return;
      setProgress(100);
      setStatusText("SYSTEM READY");
      setTimeout(() => {
        if (!isCancelled) {
          setIsFinished(true);
          if (onLoaded) onLoaded();
        }
      }, 250);
    }, 3500);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
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
                className="h-full bg-white rounded-full shadow-[0_0_15px_#ffffff] transition-all duration-150"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              <span>LOADING ALL IMAGES &amp; DOM</span>
              <span>{progress === 100 ? "COMPLETE" : `${progress}%`}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
