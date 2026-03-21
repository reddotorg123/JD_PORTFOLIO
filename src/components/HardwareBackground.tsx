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
      const traceCount = 40;
      for (let i = 0; i < traceCount; i++) {
        tracesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          horizontal: Math.random() > 0.5,
        });
      }
    };

    const createBits = () => {
      bitsRef.current = [];
      const bitCount = 100;
      for (let i = 0; i < bitCount; i++) {
        bitsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: Math.random() > 0.5 ? "0" : "1",
          size: Math.random() * 10 + 8,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.2 + 0.1,
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(184, 134, 11, 0.05)";
      ctx.lineWidth = 1;
      const step = 50;

      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawTrace = (trace: Trace) => {
      const gradient = trace.horizontal
        ? ctx.createLinearGradient(trace.x, trace.y, trace.x + trace.length, trace.y)
        : ctx.createLinearGradient(trace.x, trace.y, trace.x, trace.y + trace.length);

      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, `rgba(184, 134, 11, ${trace.opacity})`);
      gradient.addColorStop(1, "transparent");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
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
      ctx.fillStyle = `rgba(184, 134, 11, ${bit.opacity})`;
      ctx.fillText(bit.char, bit.x, bit.y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();

      // Mouse Glow
      const mouseGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        300
      );
      mouseGradient.addColorStop(0, "rgba(184, 134, 11, 0.05)");
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
        
        // Interaction
        const dx = bit.x - mouseRef.current.x;
        const dy = bit.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          bit.opacity = 0.8;
          bit.char = Math.random() > 0.9 ? "@" : Math.random() > 0.5 ? "1" : "0";
        } else {
          bit.opacity = Math.max(0.1, bit.opacity - 0.01);
        }

        drawBit(bit);
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createTraces();
    createBits();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createTraces();
      createBits();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#050505" }}
    />
  );
};
