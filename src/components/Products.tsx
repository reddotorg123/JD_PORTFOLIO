import { ExternalLink, Paperclip } from "lucide-react";

const dossierProducts = [
  {
    id: "reddot",
    tabLabel: "_REDDOT_01",
    tabPosition: "left-6 sm:left-10",
    topOffset: "top-24 sm:top-28",
    zIndex: 10,
    classification: "Multimodal AI & IoT Platform",
    role: "Founder & Technical Head",
    year: "2026",
    status: "Live Platform",
    categoryTab: "AI & IoT",
    number: "01",
    headline: "BUILDING MULTIMODAL AI AGENTS THAT ACTUALLY CONTROL HARDWARE.",
    leftText:
      "Most AI tools stop at chatbot text. REDDOT.AI was designed around a different principle: an AI that bridges cloud intelligence with physical microcontrollers, zero-latency voice telemetry, and hardware automation.",
    problemStatement:
      "Hardware engineers face fragmentation connecting LLMs with IoT fleets. REDDOT.AI provides unified voice streaming, ESP32 telemetry bridges, and deterministic workflow pipelines.",
    handwrittenNote: "Deterministic voice loops & sub-85ms hardware telemetry.",
    founderPhoto: "/achievements/IMG_20260716_095911.jpg",
    previewImg: "/products/reddot-preview.png",
    link: "#contact",
    buttonLabel: "CASE STUDY",
    folderBg: "bg-[#161622]",
  },
  {
    id: "sem",
    tabLabel: "_SEMPRO_02",
    tabPosition: "left-36 sm:left-48",
    topOffset: "top-28 sm:top-32",
    zIndex: 20,
    classification: "Student Academic Performance Suite",
    role: "Lead Architect & Developer",
    year: "2025–2026",
    status: "Live SaaS (1,000+ Users)",
    categoryTab: "EdTech",
    number: "02",
    headline: "RE-ENGINEERING STUDENT PRODUCTIVITY FOR 1,000+ ENGINEERS.",
    leftText:
      "Manual GPA calculation and exam tracking cause friction during semester prep. SEM PRO provides deterministic credit analytics, dynamic timetable generation, and milestone tracking without server latency.",
    problemStatement:
      "Students spend hours manually computing weighted semester credits across grading schemas. SEM PRO calculates precision CGPA projections and syllabus roadmaps instantly.",
    handwrittenNote: "Instant GPA forecasting without server overhead.",
    founderPhoto: "/achievements/20260109_115905AMByGPSMapCamera.jpg",
    previewImg: "/products/sem-preview.png",
    link: "https://sem-pro.vercel.app",
    buttonLabel: "CASE STUDY",
    folderBg: "bg-[#14141c]",
  },
  {
    id: "habit",
    tabLabel: "_HABIT_03",
    tabPosition: "left-64 sm:left-84",
    topOffset: "top-32 sm:top-36",
    zIndex: 30,
    classification: "Gamified Discipline & Streak Analytics",
    role: "Product Designer & Engineer",
    year: "2025",
    status: "Live Web App",
    categoryTab: "Analytics",
    number: "03",
    headline: "DESIGNING A GAMIFIED DISCIPLINE ENGINE WITH HEATMAP ANALYTICS.",
    leftText:
      "Traditional habit apps fail users because of boring checklists. HABIT introduces cyber-minimalist streak multipliers, level progression, and consistency heatmaps that make self-discipline rewarding.",
    problemStatement:
      "Daily habit adherence decays without immediate visual feedback. HABIT uses interactive streak matrices and progress algorithms to drive higher daily retention.",
    handwrittenNote: "Visualizing daily momentum through dark minimalist UI.",
    founderPhoto: "/achievements/IMG_20260217_173130.jpg",
    previewImg: "/products/habit-preview.png",
    link: "https://habit-tk.vercel.app",
    buttonLabel: "CASE STUDY",
    folderBg: "bg-[#181824]",
  },
];

export const Products = () => {
  return (
    <section id="products" className="py-20 relative bg-[#08080a] border-t border-white/10 id-grid-bg">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-neutral-400 font-tech text-xs font-bold uppercase tracking-widest block mb-1">
              SAAS &amp; VENTURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              PROJECT DOSSIERS
            </h2>
          </div>
          <p className="text-neutral-400 text-xs font-tech uppercase tracking-wider">
            Scroll to watch folders stack and overlay
          </p>
        </div>

        {/* Sticky Stacking Scroll Track */}
        <div className="relative pb-64 space-y-48">
          {dossierProducts.map((p, idx) => (
            <div
              key={p.id}
              style={{ zIndex: p.zIndex }}
              className={`sticky ${p.topOffset} select-none`}
            >
              {/* Folder Top Tab */}
              <div className="relative w-full h-8">
                <div
                  className={`absolute ${p.tabPosition} top-0 px-5 py-1.5 rounded-t-xl bg-[#1e1e28] border-t border-x border-white/20 font-mono text-[11px] font-bold text-white uppercase tracking-widest shadow-2xl flex items-center gap-1.5`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>{p.tabLabel}</span>
                </div>
              </div>

              {/* Compact Folder Card Surface */}
              <div
                className={`relative rounded-b-2xl rounded-tr-2xl ${p.folderBg} border border-white/20 p-4 sm:p-6 shadow-[0_35px_100px_rgba(0,0,0,0.98)] overflow-hidden transition-all duration-300 hover:border-white/40`}
              >
                {/* Metallic Top Binder Clip */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30 hidden sm:flex flex-col items-center">
                  <div className="w-8 h-6 bg-gradient-to-b from-[#4a4a58] to-[#202028] rounded-t-md border border-white/30 shadow-md flex items-center justify-center">
                    <div className="w-3 h-1.5 rounded-full bg-black" />
                  </div>
                </div>

                {/* 2-Page Layout inside Compact Folder */}
                <div className="grid md:grid-cols-12 gap-5 sm:gap-6 items-stretch pt-2">
                  {/* Left Page: Spiral Notebook Sheet */}
                  <div className="md:col-span-5 relative bg-[#e4e6ea] text-[#121216] rounded-xl p-4 sm:p-5 shadow-xl flex flex-col justify-between overflow-hidden border border-black/10">
                    {/* Spiral Notebook Ring Holes */}
                    <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-between py-4 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full bg-[#181822] shadow-inner border border-black/20"
                        />
                      ))}
                    </div>

                    {/* Clipped Photo & Paperclip */}
                    <div className="pl-4 mb-2.5 flex items-start justify-between">
                      <div className="relative">
                        <div className="absolute -top-3 -left-1.5 z-20 text-[#333]">
                          <Paperclip className="w-4 h-4 rotate-45" />
                        </div>
                        <div className="w-11 h-13 bg-white p-0.5 rounded shadow -rotate-6 border border-black/20 overflow-hidden">
                          <img
                            src={p.founderPhoto}
                            alt="Jagadish K"
                            loading="eager"
                            decoding="sync"
                            className="w-full h-full object-cover filter grayscale contrast-125 pointer-events-none"
                          />
                        </div>
                      </div>
                      <span className="font-mono text-[8px] font-bold text-neutral-500 uppercase tracking-wider bg-black/5 px-1.5 py-0.5 rounded">
                        CASE BRIEF
                      </span>
                    </div>

                    {/* Headline & Body */}
                    <div className="pl-4 space-y-1.5">
                      <h3 className="font-mono font-black text-xs sm:text-sm text-[#0a0a0e] leading-snug uppercase tracking-tight">
                        {p.headline}
                      </h3>
                      <p className="font-sans text-[10px] sm:text-[11px] text-neutral-700 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {p.leftText}
                      </p>
                    </div>

                    {/* Launch / Case Study Button */}
                    <div className="pl-4 pt-3">
                      <a
                        href={p.link}
                        target={p.link.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#202028] hover:bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
                      >
                        <span>{p.buttonLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Right Page: Specification Brief & Product Screenshot */}
                  <div className="md:col-span-7 relative bg-[#f2f3f5] text-[#1a1a22] rounded-xl p-4 sm:p-5 shadow-xl flex flex-col justify-between overflow-hidden border border-black/10">
                    {/* Index Bookmark Tab on Top Right */}
                    <div className="absolute top-0 right-6 bg-[#22222e] text-white px-3 py-1 rounded-b-lg shadow font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border-b border-x border-white/20">
                      <span>{p.categoryTab}</span>
                      <span className="text-neutral-400">{p.number}</span>
                    </div>

                    {/* 3-Hole Binder Punch along left margin */}
                    <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-8 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full bg-[#181822] shadow-inner"
                        />
                      ))}
                    </div>

                    {/* Typewritten Metadata & Problem Statement */}
                    <div className="pl-4 pr-12 space-y-1.5 font-mono text-[9px] sm:text-[10px] text-neutral-800">
                      <div className="text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-wider border-b border-black/10 pb-1">
                        CASE STUDY BRIEF — {p.classification}
                        <br />
                        Role: {p.role} • Status: {p.status}
                      </div>

                      <div>
                        <span className="font-bold uppercase block text-[8px] sm:text-[9px] text-neutral-600 mb-0.5">
                          PROBLEM STATEMENT
                        </span>
                        <p className="font-sans text-[10px] sm:text-[11px] text-neutral-700 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {p.problemStatement}
                        </p>
                      </div>
                    </div>

                    {/* Polaroid Frame with Product Screenshot */}
                    <div className="pl-4 pt-2">
                      <div className="bg-white p-2 rounded-xl shadow-lg border border-black/15 -rotate-1 hover:rotate-0 transition-transform duration-300">
                        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-black mb-1 shadow-inner border border-black/10">
                          <img
                            src={p.previewImg}
                            alt={p.headline}
                            loading="eager"
                            decoding="sync"
                            className="w-full h-full object-cover object-top filter contrast-105 pointer-events-none"
                          />
                        </div>
                        <p className="font-handwriting text-xs text-neutral-800 text-center">
                          &ldquo;{p.handwrittenNote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
