import { useEffect, useRef } from "react";

const rainbowColors = [
  "hsl(0, 100%, 60%)",    // Red
  "hsl(30, 100%, 55%)",   // Orange
  "hsl(60, 100%, 50%)",   // Yellow
  "hsl(120, 100%, 45%)",  // Green
  "hsl(240, 100%, 60%)",  // Blue
  "hsl(275, 100%, 50%)",  // Indigo
  "hsl(300, 100%, 55%)",  // Violet
];

interface Particle {
  x: number;
  y: number;
  color: string;
  size: number;
  life: number;
}

export const RainbowCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });
  const colorIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 8 && particlesRef.current.length < 20) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          color: rainbowColors[colorIndexRef.current % rainbowColors.length],
          size: Math.random() * 8 + 6,
          life: 1,
        });
        colorIndexRef.current++;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life -= 0.04;
        
        if (particle.life <= 0) return false;

        const currentSize = particle.size * particle.life;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(")", `, ${particle.life * 0.7})`).replace("hsl", "hsla");
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ background: "transparent" }}
    />
  );
};
