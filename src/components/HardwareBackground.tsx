import { useEffect, useRef } from "react";

interface Trace {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  horizontal: boolean;
}

interface Bit {
  x: number;
  y: number;
  char: string;
  size: number;
  speed: number;
  opacity: number;
}

export const HardwareBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tracesRef = useRef<Trace[]>([]);
  const bitsRef = useRef<Bit[]>([]);
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

    const createTraces = () => {
      tracesRef.current = [];
      const traceCount = 35;
      for (let i = 0; i < traceCount; i++) {
        tracesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 1.5 + 0.8,
          opacity: Math.random() * 0.15 + 0.05,
          horizontal: Math.random() > 0.5,
        });
      }
    };

    const createBits = () => {
      bitsRef.current = [];
      const bitCount = 60;
      for (let i = 0; i < bitCount; i++) {
        bitsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: Math.random() > 0.5 ? "0" : "1",
          size: Math.random() * 8 + 7,
          speed: Math.random() * 0.4 + 0.2,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const step = 50;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
    };

    const drawTrace = (trace: Trace) => {
      const gradient = trace.horizontal
        ? ctx.createLinearGradient(trace.x, trace.y, trace.x + trace.length, trace.y)
        : ctx.createLinearGradient(trace.x, trace.y, trace.x, trace.y + trace.length);

      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${trace.opacity})`);
      gradient.addColorStop(1, "transparent");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(trace.x, trace.y);
      if (trace.horizontal) {
        ctx.lineTo(trace.x + trace.length, trace.y);
      } else {
        ctx.lineTo(trace.x, trace.y + trace.length);
      }
      ctx.stroke();
    };

    const drawBit = (bit: Bit) => {
      ctx.font = `${bit.size}px monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${bit.opacity})`;
      ctx.fillText(bit.char, bit.x, bit.y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();

      // Subtle mouse light
      const mouseGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        250
      );
      mouseGradient.addColorStop(0, "rgba(255, 255, 255, 0.03)");
      mouseGradient.addColorStop(1, "transparent");
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      tracesRef.current.forEach((trace) => {
        if (trace.horizontal) {
          trace.x += trace.speed;
          if (trace.x > canvas.width) trace.x = -trace.length;
        } else {
          trace.y += trace.speed;
          if (trace.y > canvas.height) trace.y = -trace.length;
        }
        drawTrace(trace);
      });

      bitsRef.current.forEach((bit) => {
        bit.y += bit.speed;
        if (bit.y > canvas.height) bit.y = -20;
        drawBit(bit);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createTraces();
    createBits();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createTraces();
      createBits();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#08080a" }}
    />
  );
};
