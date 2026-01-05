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

export const GlitterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
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

    const createShootingStar = () => {
      const star: ShootingStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 100 + 80,
        speed: Math.random() * 15 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      };
      shootingStarsRef.current.push(star);
    };

    const drawParticle = (particle: Particle) => {
      if (!ctx) return;

      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5;
      const finalOpacity = particle.opacity * (0.4 + twinkle * 0.6);

      const goldColors = [
        { h: 45, s: 100, l: 70 },
        { h: 38, s: 90, l: 55 },
        { h: 50, s: 85, l: 65 },
        { h: 35, s: 95, l: 50 },
      ];

      const colorIndex = Math.floor(particle.twinklePhase) % goldColors.length;
      const color = goldColors[colorIndex];
      const lightness = color.l + twinkle * 25;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * (0.8 + twinkle * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${lightness}%, ${finalOpacity})`;
      ctx.fill();

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

      if (twinkle > 0.85 && particle.size > 1.5) {
        ctx.strokeStyle = `hsla(${color.h}, 100%, 80%, ${finalOpacity * 0.8})`;
        ctx.lineWidth = 0.5;
        const sparkleSize = particle.size * 3;
        
        ctx.beginPath();
        ctx.moveTo(particle.x - sparkleSize, particle.y);
        ctx.lineTo(particle.x + sparkleSize, particle.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y - sparkleSize);
        ctx.lineTo(particle.x, particle.y + sparkleSize);
        ctx.stroke();
      }
    };

    const drawShootingStar = (star: ShootingStar) => {
      if (!ctx) return;

      const progress = star.life / star.maxLife;
      const fadeOpacity = progress < 0.2 ? progress * 5 : progress > 0.7 ? (1 - progress) * 3.33 : 1;
      
      const endX = star.x - Math.cos(star.angle) * star.length;
      const endY = star.y + Math.sin(star.angle) * star.length;

      // Rainbow gradient for shooting star
      const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
      gradient.addColorStop(0, `hsla(60, 100%, 95%, ${fadeOpacity})`);
      gradient.addColorStop(0.2, `hsla(45, 100%, 70%, ${fadeOpacity * 0.9})`);
      gradient.addColorStop(0.4, `hsla(30, 100%, 60%, ${fadeOpacity * 0.7})`);
      gradient.addColorStop(0.6, `hsla(280, 80%, 60%, ${fadeOpacity * 0.5})`);
      gradient.addColorStop(0.8, `hsla(200, 80%, 50%, ${fadeOpacity * 0.3})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.stroke();

      // Star head glow
      const headGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 8);
      headGradient.addColorStop(0, `hsla(60, 100%, 100%, ${fadeOpacity})`);
      headGradient.addColorStop(0.5, `hsla(45, 100%, 80%, ${fadeOpacity * 0.5})`);
      headGradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = headGradient;
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn shooting stars randomly
      if (Math.random() < 0.008) {
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

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

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

        particle.twinklePhase += particle.twinkleSpeed;

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
