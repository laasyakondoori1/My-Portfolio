import { useEffect, useRef } from "react";

interface LiquidCanvasProps {
  color: string;
  isHovered: boolean;
}

export function LiquidCanvas({ color, isHovered }: LiquidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track state in refs so the animation loop always reads the latest values without re-mounting
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let currentLevel = isHoveredRef.current ? 1 : 0;
    let isAnimating = true;

    const render = () => {
      // Always read latest target from the ref
      const targetLevel = isHoveredRef.current ? 1 : 0;
      currentLevel += (targetLevel - currentLevel) * 0.1;

      // Drop out of the loop if empty AND not hovered to save extreme amounts of CPU
      if (currentLevel < 0.01 && !isHoveredRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isAnimating = false;
        return; 
      }

      time += 0.05;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const waveHeight = 8;
      const waveLength = width / 2;

      const baseHeight = height - height * 1.2 * currentLevel + waveHeight;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 2) {
        const y = baseHeight + Math.sin((x / waveLength) * Math.PI * 2 + time) * waveHeight;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      let r = 0, g = 217, b = 255;
      if (color.startsWith("#")) {
        const hex = color.replace("#", "");
        if (hex.length === 6) {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        }
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 2) {
        const y = baseHeight + Math.sin((x / waveLength) * Math.PI * 2 + time + Math.PI) * (waveHeight * 0.8) - 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    // Kickstart the render loop once on mount
    render();

    // The trick to restarting the loop if it died:
    // we attach a fast check interval or just use a proxy. 
    // Actually, setInterval is very lightweight and guarantees restart.
    const watchDog = setInterval(() => {
      if (isHoveredRef.current && !isAnimating) {
        isAnimating = true;
        render();
      }
    }, 50);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(watchDog);
    };
  }, [color]); // Dependency array ONLY includes color, so it never unmounts on hover!

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        borderRadius: "100px",
        pointerEvents: "none",
      }}
    />
  );
}
