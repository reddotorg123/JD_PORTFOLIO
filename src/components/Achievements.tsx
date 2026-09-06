import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Featured polaroid moments on desk
const polaroids = [
  {
    id: "p1",
    src: "/achievements/IMG_20260716_095911.jpg",
    caption: "24h Hackathon Championship Trophy",
    venue: "Kalasalingam University",
    prize: "₹10,000",
    initial: { x: -280, y: -40, rotate: -10 },
  },
  {
    id: "p2",
    src: "/achievements/IMG_20260217_173130.jpg",
    caption: "36h National Sprint 2nd Place",
    venue: "New Prince College",
    prize: "₹12,000",
    initial: { x: -120, y: -80, rotate: 6 },
  },
  {
    id: "p3",
    src: "/achievements/IMG_20260302_132602.jpg",
    caption: "WINNER - TN IMPACT Summit",
    venue: "Sona College of Tech",
    prize: "₹5,000",
    initial: { x: 80, y: -50, rotate: -7 },
  },
  {
    id: "p4",
    src: "/achievements/20260109_115905AMByGPSMapCamera.jpg",
    caption: "Grand Project Expo 1st Place",
    venue: "Velammal Engg College",
    prize: "₹4,000",
    initial: { x: 260, y: -30, rotate: 10 },
  },
  {
    id: "p5",
    src: "/achievements/IMG_20260209_133858_1.jpg",
    caption: "1st Prize Robotics & Sensors",
    venue: "RMD Engineering College",
    prize: "₹1,500",
    initial: { x: -210, y: 100, rotate: 8 },
  },
  {
    id: "p6",
    src: "/achievements/IMG_20250921_190450.jpg",
    caption: "Hackfest Runner-Up Podium",
    venue: "Chettinad Tech",
    prize: "₹10,000",
    initial: { x: -30, y: 110, rotate: -10 },
  },
  {
    id: "p7",
    src: "/achievements/IMG_20250823_151650.jpg",
    caption: "24h Winner + Internship Offer",
    venue: "VIT University",
    prize: "Internship Offer",
    initial: { x: 150, y: 90, rotate: 5 },
  },
  {
    id: "p8",
    src: "/achievements/IMG_20251010_182659.jpg",
    caption: "Tech Expo Champion Trophy",
    venue: "Saveetha Engg College",
    prize: "₹4,000",
    initial: { x: 300, y: 100, rotate: -12 },
  },
];

// Stickers on desk
const deskStickers = [
  { id: "cam", icon: Camera, label: "HACKATHON MOMENTS", bg: "bg-white text-black", initial: { x: -160, y: -130, rotate: -18 } },
  { id: "trophy", icon: Trophy, label: "16x CHAMPION", bg: "bg-[#181820] text-white border-white/20", initial: { x: 210, y: -120, rotate: 15 } },
  { id: "github", label: "@JAGADISH2006-DEV", bg: "bg-[#121218] text-neutral-300 border-white/10", initial: { x: -330, y: 40, rotate: -8 } },
  { id: "founder", label: "REDDOT FOUNDER", bg: "bg-white/10 text-white border-white/20", initial: { x: 330, y: 50, rotate: 10 } },
];

// Complete list of all 16+ verified hackathons & competitions
const fullAwardsList = [
  { place: "1st", title: "Winner – 24-Hour Hackathon", venue: "Vellore Institute of Technology (VIT)", prize: "Internship Offer", year: "2025" },
  { place: "2nd", title: "Second Place – 36-Hour National Hackathon", venue: "New Prince College of Engineering", prize: "₹12,000", year: "2026" },
  { place: "2nd", title: "Second Place – 24-Hour Hackathon", venue: "Kalasalingam University", prize: "₹10,000", year: "2026" },
  { place: "2nd", title: "Second Place – Hackfest 2025", venue: "Chettinad College of Engineering", prize: "₹10,000", year: "2025" },
  { place: "WINNER", title: "State Champion – TN IMPACT Summit", venue: "Sona College of Engineering", prize: "₹5,000", year: "2026" },
  { place: "1st", title: "First Place – Enginuity National Fest", venue: "Gojan School of Technology", prize: "₹5,000", year: "2025" },
  { place: "2nd", title: "Second Place – Tech Summit", venue: "New Horizon College, Bangalore", prize: "₹5,000", year: "2025" },
  { place: "1st", title: "First Place – Grand Project Expo", venue: "Velammal Engineering College", prize: "₹4,000", year: "2026" },
  { place: "1st", title: "First Place – Tech Project Expo", venue: "Saveetha College of Engineering", prize: "₹4,000", year: "2025" },
  { place: "2nd", title: "Second Place – 12-Hour Hackathon", venue: "Sriram Institute of Technology", prize: "₹3,000", year: "2025" },
  { place: "2nd", title: "Second Place – Project Expo", venue: "Kalasalingam University", prize: "₹3,000", year: "2026" },
  { place: "1st", title: "First Place – Ideation Sprint", venue: "Velammal Institute of Technology", prize: "₹2,500", year: "2025" },
  { place: "1st", title: "First Place – Paper Presentation", venue: "Aalim College of Engineering", prize: "₹2,000", year: "2025" },
  { place: "1st", title: "First Place – Robotics Project Expo", venue: "RMD College of Engineering", prize: "₹1,500", year: "2026" },
  { place: "2nd", title: "Second Place – Paper Presentation", venue: "RMD College of Engineering", prize: "₹1,000", year: "2025" },
  { place: "2nd", title: "Second Place – Project Expo", venue: "Aalim College of Engineering", prize: "₹1,000", year: "2025" },
];

export const Achievements = () => {
  const deskRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof polaroids[0] | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
    setSelectedPhoto(polaroids[index]);
  };

  const nextLightbox = () => {
    const next = (lightboxIdx + 1) % polaroids.length;
    setLightboxIdx(next);
    setSelectedPhoto(polaroids[next]);
  };

  const prevLightbox = () => {
    const prev = (lightboxIdx - 1 + polaroids.length) % polaroids.length;
    setLightboxIdx(prev);
    setSelectedPhoto(polaroids[prev]);
  };

  return (
    <section id="achievements" className="py-20 relative bg-[#08080a] border-t border-white/10 id-grid-bg">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-neutral-400 font-tech text-xs font-bold tracking-widest uppercase mb-1">
            WHEN I&apos;M HACKING &amp; WINNING
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white max-w-2xl mx-auto">
            This is where my mind wanders around, between hardware circuits and surreal innovations
          </h2>
          <p className="text-neutral-500 font-tech text-xs mt-1 uppercase tracking-wider">
            Drag polaroids &amp; stickers • Click any photo to zoom
          </p>
        </div>

        {/* High Performance Interactive Polaroid Desk */}
        <div
          ref={deskRef}
          className="w-full h-[480px] sm:h-[540px] rounded-3xl bg-[#101015] border border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center mb-12 select-none"
        >
          {/* Central Stats Badge */}
          <div className="absolute z-10 pointer-events-none text-center px-6 py-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 shadow-2xl">
            <span className="text-[10px] text-neutral-400 font-tech font-bold tracking-widest uppercase block">
              16+ AWARDS &amp; WINS
            </span>
            <div className="text-2xl font-display font-black text-white">
              ₹1,69,000+ Prize Money
            </div>
          </div>

          {/* Draggable Polaroids */}
          {polaroids.map((p, i) => (
            <motion.div
              key={p.id}
              drag
              dragConstraints={deskRef}
              dragElastic={0.12}
              whileHover={{ scale: 1.08, zIndex: 45, cursor: "grab" }}
              whileDrag={{ scale: 1.15, zIndex: 60, cursor: "grabbing" }}
              initial={{ x: p.initial.x, y: p.initial.y, rotate: p.initial.rotate }}
              onClick={() => openLightbox(i)}
              className="absolute w-36 sm:w-44 p-2 bg-[#14141a] rounded-xl border border-white/15 shadow-2xl cursor-pointer group"
            >
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black mb-1.5 relative">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                />
                <div className="absolute top-1 right-1 p-1 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3 h-3" />
                </div>
              </div>

              <div className="px-1 text-center">
                <p className="font-handwriting text-xs sm:text-sm text-neutral-200 leading-tight line-clamp-1">
                  {p.caption}
                </p>
                <p className="text-[8px] sm:text-[9px] font-tech text-neutral-400 tracking-wider uppercase mt-0.5">
                  {p.prize}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Stickers */}
          {deskStickers.map((s) => (
            <motion.div
              key={s.id}
              drag
              dragConstraints={deskRef}
              dragElastic={0.12}
              whileHover={{ scale: 1.12, zIndex: 50, cursor: "grab" }}
              whileDrag={{ scale: 1.2, zIndex: 65, cursor: "grabbing" }}
              initial={{ x: s.initial.x, y: s.initial.y, rotate: s.initial.rotate }}
              className={`absolute px-3.5 py-1.5 rounded-full font-tech font-bold text-[11px] shadow-lg tracking-wider flex items-center gap-1.5 border border-white/20 uppercase ${s.bg}`}
            >
              {s.icon && <s.icon className="w-3 h-3" />}
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Complete 16+ Verified Awards Record Table */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-neutral-400 font-tech text-xs font-bold uppercase tracking-widest block mb-1">
                COMPREHENSIVE RECORD
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                All 16+ Hackathon &amp; Expo Victories
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-tech font-bold text-white block">
                7 First Places • 9 Podiums
              </span>
              <span className="text-[10px] text-neutral-500 font-tech uppercase">
                Active Record 2025–2026
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {fullAwardsList.map((w, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#121216] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-tech font-bold px-2 py-0.5 rounded bg-white/10 text-white uppercase border border-white/10">
                      {w.place}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-tech">
                      {w.year}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-display line-clamp-1 mb-1">
                    {w.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-tech line-clamp-1 mb-2">
                    {w.venue}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-tech font-bold text-white">
                  <span className="text-[10px] text-neutral-500 font-normal uppercase">Prize</span>
                  <span>{w.prize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121216] border border-white/20 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/70 border border-white/20 text-neutral-300 hover:text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[16/10] bg-black rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  loading="eager"
                  decoding="sync"
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={prevLightbox}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextLightbox}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-handwriting text-white text-lg">
                    {selectedPhoto.caption}
                  </h4>
                  <p className="text-xs font-tech text-neutral-400">
                    {selectedPhoto.venue}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-tech text-neutral-500">
                    Photo {lightboxIdx + 1} of {polaroids.length}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-white/10 text-white border border-white/20 font-tech font-bold text-xs">
                    {selectedPhoto.prize}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
