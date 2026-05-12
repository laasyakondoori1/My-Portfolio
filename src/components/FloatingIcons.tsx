import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function FloatingIcons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Mouse tracking for parallax hover effect
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 based on screen center
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Setup particles
    const numParticles = 250; // Optimized count for smooth 60fps on all devices
    const spiralArms = 4;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      const arm = i % spiralArms;
      const radius = 20 + Math.pow(Math.random(), 1.5) * 600; // Exponential distribution, denser at center
      const angle =
        (arm * (Math.PI * 2)) / spiralArms + radius * 0.005 + (Math.random() * 0.8 - 0.4);

      const size = Math.random() > 0.9 ? 2.5 : Math.random() > 0.5 ? 1.5 : 1;
      const opacity = Math.random() * 0.6 + 0.2;
      const isCyan = Math.random() > 0.7;

      particles.push({
        radius,
        baseAngle: angle,
        size,
        opacity,
        isCyan,
        speed: (Math.random() * 0.5 + 0.5) * 0.001, // individual slight speed variance
      });
    }

    const render = () => {
      // Smoothly interpolate mouse position for fluid parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Ensure canvas is correctly sized
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Draw solid background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      time += 0.5;

      const centerX = width / 2;
      const centerY = height / 2;

      // Apply subtle parallax shift to center
      const parallaxX = centerX - currentMouseX * 40;
      const parallaxY = centerY - currentMouseY * 40;

      // We don't use clearRect because we fill the whole background with solid color, which is faster.
      // We also don't use glow filters because they are extremely slow on canvas!
      // Instead, we just draw slightly larger, lower-opacity circles for glow.

      // Pre-calculate global rotation
      const globalRotation = time * 0.002;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Calculate current angle
        const currentAngle = p.baseAngle + globalRotation + time * p.speed;

        // Calculate position
        const x = parallaxX + Math.cos(currentAngle) * p.radius;
        const y = parallaxY + Math.sin(currentAngle) * p.radius;

        // Skip drawing if outside viewport
        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

        // Pulsing opacity
        const currentOpacity = p.opacity + Math.sin(time * 0.05 + i) * 0.2;
        const clampedOpacity = Math.max(0.1, Math.min(1, currentOpacity));

        const r = p.isCyan ? 0 : 255;
        const g = p.isCyan ? 217 : 255;
        const b = p.isCyan ? 255 : 255;

        // Draw particle
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
        ctx.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size);

        // Draw glow for larger particles
        if (p.size > 1.5) {
          const glowSize = p.size * 5;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${clampedOpacity * 0.15})`;
          ctx.fillRect(x - glowSize / 2, y - glowSize / 2, glowSize, glowSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
      {/* Canvas handles background and particles natively for 60fps */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Space Bubbles are still DOM since they are large and few */}
      {/* Added parallax to bubbles using framer-motion is fine, but since we are optimizing, 
          let's just leave their slow keyframes, it's very performant. */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10b981]/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d9ff]/[0.02] rounded-full blur-[120px]"></div>

      <motion.div
        className="absolute w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        style={{ top: "20%", right: "25%" }}
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full border border-[#00d9ff]/10 bg-[#00d9ff]/[0.01] backdrop-blur-sm"
        style={{ top: "30%", right: "15%" }}
        animate={{ y: [0, -30, 0], x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-[#10b981]/10 bg-[#10b981]/[0.02] backdrop-blur-sm"
        style={{ bottom: "30%", left: "20%" }}
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
