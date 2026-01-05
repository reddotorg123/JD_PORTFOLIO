import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const GlitterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight * 3
      );
    };

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 800);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.9 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      if (!ctx) return;

      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5;
      const finalOpacity = particle.opacity * (0.4 + twinkle * 0.6);

      // Golden color palette
      const goldColors = [
        { h: 45, s: 100, l: 70 },  // Bright gold
        { h: 38, s: 90, l: 55 },   // Deep gold
        { h: 50, s: 85, l: 65 },   // Light gold
        { h: 35, s: 95, l: 50 },   // Orange gold
      ];

      const colorIndex = Math.floor(particle.twinklePhase) % goldColors.length;
      const color = goldColors[colorIndex];
      const lightness = color.l + twinkle * 25;

      // Main particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * (0.8 + twinkle * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${lightness}%, ${finalOpacity})`;
      ctx.fill();

      // Glow effect
      if (particle.size > 1.2 || twinkle > 0.7) {
        const glowSize = particle.size * (2 + twinkle * 2);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize
        );
        gradient.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${lightness + 10}%, ${finalOpacity * 0.6})`);
        gradient.addColorStop(0.5, `hsla(${color.h}, ${color.s}%, ${lightness}%, ${finalOpacity * 0.2})`);
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Star sparkle for brightest particles
      if (twinkle > 0.85 && particle.size > 1.5) {
        ctx.strokeStyle = `hsla(${color.h}, 100%, 80%, ${finalOpacity * 0.8})`;
        ctx.lineWidth = 0.5;
        const sparkleSize = particle.size * 3;
        
        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(particle.x - sparkleSize, particle.y);
        ctx.lineTo(particle.x + sparkleSize, particle.y);
        ctx.stroke();
        
        // Vertical line
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y - sparkleSize);
        ctx.lineTo(particle.x, particle.y + sparkleSize);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Subtle drift movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction - particles near mouse glow brighter
        const scrollY = window.scrollY;
        const dx = mouseRef.current.x - particle.x;
        const dy = (mouseRef.current.y + scrollY) - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const intensity = 1 - distance / 200;
          particle.opacity = Math.min(1, particle.opacity + intensity * 0.05);
        } else {
          particle.opacity = Math.max(0.3, particle.opacity - 0.01);
        }

        // Twinkle animation
        particle.twinklePhase += particle.twinkleSpeed;

        // Wrap around edges
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};
