import React, { useEffect, useRef } from "react";

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
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Setup particles
    const numParticles = 180; 
    const particles: any[] = [];
    
    // UI fragments
    const fragments: any[] = [];
    for (let i = 0; i < 20; i++) {
        fragments.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            w: Math.random() * 50 + 10,
            h: Math.random() * 4 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    for (let i = 0; i < numParticles; i++) {
      const z = Math.random() * 3 + 1; // Depth: 1 (front) to 4 (back)
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: z,
        baseSize: (Math.random() > 0.8 ? 2.5 : Math.random() > 0.5 ? 1.5 : 1) / z,
        opacity: Math.random() * 0.5 + 0.2,
        isCyan: Math.random() > 0.6,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        targetX: 0,
        targetY: 0,
        isOrb: Math.random() > 0.95
      });
    }

    // Ripple array
    const ripples: any[] = [];

    // Ambient glow pulse
    let pulseOpacity = 0;
    let pulseDir = 0.005;
    let pulseX = window.innerWidth / 2;
    let pulseY = window.innerHeight / 2;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Dark background with trailing effect
      ctx.fillStyle = "rgba(5, 5, 8, 0.4)";
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      // Draw grid with atmospheric fog fade
      ctx.lineWidth = 1;
      const gridSize = 40;
      const offsetX = (mouseX * 0.02) % gridSize;
      const offsetY = (mouseY * 0.02) % gridSize;
      
      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
          const distFromCenterX = Math.abs(x - width / 2) / (width / 2);
          const opacity = Math.max(0, 0.03 * (1 - distFromCenterX * 1.5));
          ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(x + offsetX, 0);
          ctx.lineTo(x + offsetX, height);
          ctx.stroke();
      }
      for (let y = -gridSize; y < height + gridSize; y += gridSize) {
          const distFromCenterY = Math.abs(y - height / 2) / (height / 2);
          const opacity = Math.max(0, 0.03 * (1 - distFromCenterY * 1.5));
          ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(0, y + offsetY);
          ctx.lineTo(width, y + offsetY);
          ctx.stroke();
      }

      // Volumetric Fog / Moving Light Beams
      const fogGrad1 = ctx.createRadialGradient(width/4 + Math.sin(time*2)*100, height/3 + Math.cos(time*1.5)*100, 0, width/4, height/3, 600);
      fogGrad1.addColorStop(0, "rgba(0, 217, 255, 0.03)");
      fogGrad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = fogGrad1;
      ctx.fillRect(0, 0, width, height);
      
      const fogGrad2 = ctx.createRadialGradient(width*0.7 + Math.cos(time*2)*100, height*0.6 + Math.sin(time*1.5)*100, 0, width*0.7, height*0.6, 600);
      fogGrad2.addColorStop(0, "rgba(16, 185, 129, 0.02)"); // Subtle green/teal fog
      fogGrad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = fogGrad2;
      ctx.fillRect(0, 0, width, height);

      // Holographic flickers / UI fragments
      ctx.fillStyle = "rgba(0, 217, 255, 0.15)";
      fragments.forEach(f => {
          f.y += f.speed;
          if (f.y > height) {
              f.y = -10;
              f.x = Math.random() * width;
          }
          if (Math.random() > 0.95) {
             ctx.fillRect(f.x, f.y, f.w, f.h);
          }
      });

      // Ambient pulse
      pulseOpacity += pulseDir;
      if (pulseOpacity > 0.12 || pulseOpacity < 0) {
          pulseDir *= -1;
          if (pulseOpacity < 0) {
              pulseX = Math.random() * width;
              pulseY = Math.random() * height;
          }
      }
      const grad = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 300);
      grad.addColorStop(0, `rgba(0, 217, 255, ${Math.max(0, pulseOpacity)})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Interactive ripples
      if (isMoving && Math.random() > 0.7) {
          ripples.push({ x: mouseX, y: mouseY, radius: 0, alpha: 0.4 });
      }
      isMoving = false;

      for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 2.5;
          r.alpha -= 0.015;
          if (r.alpha <= 0) {
              ripples.splice(i, 1);
              continue;
          }
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 217, 255, ${r.alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
      }

      // Particles
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Parallax depth based movement
        const parallaxX = (mouseX - width/2) * 0.05 / p.z;
        const parallaxY = (mouseY - height/2) * 0.05 / p.z;

        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (Repel and Attract)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
           const force = (180 - dist) / 180;
           // If mostly cyan, repel. If mostly white, attract slightly.
           if (p.isCyan) {
               p.x -= dx * force * 0.06;
               p.y -= dy * force * 0.06;
           } else {
               p.x += dx * force * 0.03;
               p.y += dy * force * 0.03;
           }
           
           // Glow connection line
           ctx.beginPath();
           ctx.moveTo(p.x + parallaxX, p.y + parallaxY);
           ctx.lineTo(mouseX, mouseY);
           ctx.strokeStyle = `rgba(0, 217, 255, ${force * 0.15})`;
           ctx.lineWidth = 0.5;
           ctx.stroke();
        }

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const renderX = p.x + parallaxX;
        const renderY = p.y + parallaxY;

        const currentOpacity = p.opacity + Math.sin(time * 5 + i) * 0.2;
        const clampedOpacity = Math.max(0.1, Math.min(1, currentOpacity));

        const r = p.isCyan ? 0 : 255;
        const g = p.isCyan ? 217 : 255;
        const b = p.isCyan ? 255 : 255;

        if (p.isOrb) {
            const orbGrad = ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, p.baseSize * 15);
            orbGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${clampedOpacity * 0.3})`);
            orbGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(renderX, renderY, p.baseSize * 15, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
            ctx.fillRect(renderX, renderY, p.baseSize, p.baseSize);
            
            // Draw neural lines between close particles
            for (let j = i + 1; j < numParticles; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = dx2 * dx2 + dy2 * dy2;
                
                if (dist2 < 4500 && Math.abs(p.z - p2.z) < 1.5) { // Connect if close
                    const mouseDist1 = Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2));
                    const mouseDist2 = Math.sqrt(Math.pow(mouseX - p2.x, 2) + Math.pow(mouseY - p2.y, 2));
                    
                    // Illuminate neural lines near cursor
                    const nearCursor = (mouseDist1 < 250 || mouseDist2 < 250);
                    const lineOpacity = nearCursor ? (1 - dist2 / 4500) * 0.3 : (1 - dist2 / 4500) * 0.08;
                    
                    ctx.beginPath();
                    ctx.moveTo(renderX, renderY);
                    ctx.lineTo(p2.x + parallaxX, p2.y + parallaxY);
                    ctx.strokeStyle = `rgba(0, 217, 255, ${lineOpacity})`;
                    ctx.lineWidth = nearCursor ? 1 : 0.5;
                    
                    // Electric pulses traveling on neural lines
                    if (nearCursor) {
                        ctx.setLineDash([5, 15]);
                        ctx.lineDashOffset = -time * 50; // Travelling effect
                    } else {
                        ctx.setLineDash([]);
                    }
                    
                    ctx.stroke();
                    ctx.setLineDash([]); // Reset dash for other drawings
                }
            }
        }
      }

      // Draw cursor glow
      const cursorGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 250);
      cursorGrad.addColorStop(0, "rgba(0, 217, 255, 0.08)");
      cursorGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = cursorGrad;
      ctx.fillRect(0, 0, width, height);

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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00d9ff]/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[120px]"></div>
    </div>
  );
}
