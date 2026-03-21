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

interface FloatingOrb {
  x: number;
  y: number;
  radius: number;
  hue: number;
  phase: number;
  speed: number;
  pulseSpeed: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
}

const goldColors = [
  { h: 45, s: 100, l: 70 },
  { h: 38, s: 90, l: 55 },
  { h: 50, s: 85, l: 65 },
  { h: 35, s: 95, l: 50 },
  { h: 280, s: 60, l: 60 }, // Purple accent
  { h: 200, s: 70, l: 55 }, // Blue accent
];

export const GlitterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const orbsRef = useRef<FloatingOrb[]>([]);
  const pulsesRef = useRef<PulseWave[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 5000);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
        });
      }
    };

    const createOrbs = () => {
      orbsRef.current = [];
      const orbCount = 5;
      for (let i = 0; i < orbCount; i++) {
        orbsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 80 + 40,
          hue: [43, 280, 200][Math.floor(Math.random() * 3)],
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.3 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const createShootingStar = () => {
      if (shootingStarsRef.current.length >= 3) return;
      
      const star: ShootingStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 100 + 80,
        speed: Math.random() * 15 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      };
      shootingStarsRef.current.push(star);
    };

    const createPulseWave = (x: number, y: number) => {
      if (pulsesRef.current.length >= 3) return;
      pulsesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 150 + 100,
        opacity: 0.6,
        hue: [43, 280, 200][Math.floor(Math.random() * 3)],
      });
    };

    const drawParticle = (particle: Particle) => {
      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5;
      const finalOpacity = particle.opacity * (0.3 + twinkle * 0.7);
      const color = particle.color;
      const lightness = color.l + twinkle * 20;

      // Mouse interaction - particles glow brighter near cursor
      const dx = particle.x - mouseRef.current.x;
      const dy = particle.y - (mouseRef.current.y + window.scrollY);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - dist / 150);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * (1 + mouseInfluence * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${lightness + mouseInfluence * 20}%, ${finalOpacity + mouseInfluence * 0.3})`;
      ctx.fill();

      if ((particle.size > 1.5 && twinkle > 0.7) || mouseInfluence > 0.3) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${lightness}%, ${(finalOpacity + mouseInfluence) * 0.2})`;
        ctx.fill();
      }
    };

    const drawFloatingOrb = (orb: FloatingOrb, time: number) => {
      const pulse = Math.sin(orb.phase + time * orb.pulseSpeed) * 0.3 + 0.7;
      const currentRadius = orb.radius * pulse;
      
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
      gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 60%, 0.15)`);
      gradient.addColorStop(0.5, `hsla(${orb.hue}, 60%, 50%, 0.08)`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawShootingStar = (star: ShootingStar) => {
      const progress = star.life / star.maxLife;
      const fadeOpacity = progress < 0.2 ? progress * 5 : progress > 0.7 ? (1 - progress) * 3.33 : 1;
      
      const endX = star.x - Math.cos(star.angle) * star.length;
      const endY = star.y + Math.sin(star.angle) * star.length;

      const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
      gradient.addColorStop(0, `hsla(60, 100%, 95%, ${fadeOpacity})`);
      gradient.addColorStop(0.2, `hsla(45, 100%, 70%, ${fadeOpacity * 0.8})`);
      gradient.addColorStop(0.5, `hsla(280, 80%, 60%, ${fadeOpacity * 0.5})`);
      gradient.addColorStop(0.8, `hsla(200, 70%, 55%, ${fadeOpacity * 0.3})`);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.stroke();

      // Glowing head
      const headGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 8);
      headGradient.addColorStop(0, `hsla(60, 100%, 95%, ${fadeOpacity})`);
      headGradient.addColorStop(0.5, `hsla(45, 100%, 70%, ${fadeOpacity * 0.5})`);
      headGradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = headGradient;
      ctx.fill();
    };

    const drawPulseWave = (pulse: PulseWave) => {
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${pulse.hue}, 70%, 60%, ${pulse.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      createPulseWave(e.clientX, e.clientY + window.scrollY);
    };

    const animate = (currentTime: number) => {
      // Throttle to ~30fps
      if (currentTime - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw floating orbs (background layer)
      orbsRef.current.forEach((orb) => {
        orb.x += Math.sin(orb.phase) * orb.speed;
        orb.y += Math.cos(orb.phase) * orb.speed * 0.5;
        orb.phase += 0.01;

        // Wrap around
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        drawFloatingOrb(orb, currentTime);
      });

      // Spawn shooting stars
      if (Math.random() < 0.005) {
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

      // Update and draw pulse waves
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        pulse.radius += 4;
        pulse.opacity *= 0.96;

        if (pulse.radius >= pulse.maxRadius || pulse.opacity < 0.01) return false;

        drawPulseWave(pulse);
        return true;
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.twinklePhase += particle.twinkleSpeed;

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
      createOrbs();
    };

    resizeCanvas();
    createParticles();
    createOrbs();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
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
