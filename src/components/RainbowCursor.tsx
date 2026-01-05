import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  life: number;
}

const rainbowColors = [
  "#ff0000", // Red
  "#ff7f00", // Orange
  "#ffff00", // Yellow
  "#00ff00", // Green
  "#0000ff", // Blue
  "#4b0082", // Indigo
  "#9400d3", // Violet
];

export const RainbowCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollParticles, setScrollParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const colorIndexRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          color: rainbowColors[colorIndexRef.current % rainbowColors.length],
          size: Math.random() * 12 + 8,
          life: 1,
        };

        colorIndexRef.current++;
        lastMousePos.current = { x: e.clientX, y: e.clientY };

        setParticles((prev) => [...prev.slice(-30), newParticle]);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = Math.abs(scrollY - lastScrollY.current);

      if (scrollDelta > 10) {
        const particleCount = Math.min(Math.floor(scrollDelta / 20), 5);
        const newParticles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
          newParticles.push({
            id: particleIdRef.current++,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            color: rainbowColors[colorIndexRef.current % rainbowColors.length],
            size: Math.random() * 20 + 10,
            life: 1,
          });
          colorIndexRef.current++;
        }

        lastScrollY.current = scrollY;
        setScrollParticles((prev) => [...prev.slice(-20), ...newParticles]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.05 }))
          .filter((p) => p.life > 0)
      );
      setScrollParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.03 }))
          .filter((p) => p.life > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Mouse trail particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size * particle.life,
            height: particle.size * particle.life,
            backgroundColor: particle.color,
            opacity: particle.life * 0.8,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: "all 0.1s ease-out",
          }}
        />
      ))}

      {/* Scroll particles */}
      {scrollParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-md"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size * particle.life,
            height: particle.size * particle.life,
            backgroundColor: particle.color,
            opacity: particle.life * 0.5,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};
