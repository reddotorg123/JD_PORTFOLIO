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
  color: { h: number; s: number; l: number };
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const goldColors = [
  { h: 45, s: 100, l: 70 },
  { h: 38, s: 90, l: 55 },
  { h: 50, s: 85, l: 65 },
  { h: 35, s: 95, l: 50 },
];

export const GlitterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      );
    };

    const createParticles = () => {
      // Reduced particle count for better performance
      const particleCount = Math.floor((canvas.width * canvas.height) / 4000);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
        });
      }
    };

    const createShootingStar = () => {
      if (shootingStarsRef.current.length >= 2) return; // Limit shooting stars
      
      const star: ShootingStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 12 + 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 50 + 30,
      };
      shootingStarsRef.current.push(star);
    };

    const drawParticle = (particle: Particle) => {
      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5;
      const finalOpacity = particle.opacity * (0.3 + twinkle * 0.7);
      const color = particle.color;
      const lightness = color.l + twinkle * 20;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${lightness}%, ${finalOpacity})`;
      ctx.fill();

      // Simplified glow for larger particles only
      if (particle.size > 1.5 && twinkle > 0.8) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${lightness}%, ${finalOpacity * 0.3})`;
        ctx.fill();
      }
    };

    const drawShootingStar = (star: ShootingStar) => {
      const progress = star.life / star.maxLife;
      const fadeOpacity = progress < 0.2 ? progress * 5 : progress > 0.7 ? (1 - progress) * 3.33 : 1;
      
      const endX = star.x - Math.cos(star.angle) * star.length;
      const endY = star.y + Math.sin(star.angle) * star.length;

      const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
      gradient.addColorStop(0, `hsla(60, 100%, 95%, ${fadeOpacity})`);
      gradient.addColorStop(0.3, `hsla(45, 100%, 70%, ${fadeOpacity * 0.7})`);
      gradient.addColorStop(0.6, `hsla(280, 80%, 60%, ${fadeOpacity * 0.4})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();

      // Simple head glow
      ctx.beginPath();
      ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(60, 100%, 90%, ${fadeOpacity})`;
      ctx.fill();
    };

    const animate = (currentTime: number) => {
      // Throttle to ~30fps for better performance
      if (currentTime - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn shooting stars less frequently
      if (Math.random() < 0.003) {
        createShootingStar();
      }

      // Update and draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.life++;

        if (star.life >= star.maxLife) return false;

        drawShootingStar(star);
        return true;
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.twinklePhase += particle.twinkleSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
