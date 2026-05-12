import React, { useEffect, useRef } from "react";

const orbitingSkills = [
  { slug: "python", name: "Python" },
  { slug: "coffeescript", name: "Java" },
  { slug: "c", name: "C" },
  { slug: "n8n", name: "N8N" },
  { slug: "tensorflow", name: "TensorFlow" },
  { slug: "scikitlearn", name: "Scikit-learn" },
  { slug: "pandas", name: "Pandas" },
  { slug: "numpy", name: "NumPy" },
  { slug: "git", name: "Git" },
  { slug: "opencv", name: "OpenCV" },
  { slug: "apachehadoop", name: "Big Data" },
  { slug: "githubactions", name: "CI/CD" },
];

export function CanvasGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveringIconRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const numPoints = 600;
    const globeRadius = 140;
    const points: { x: number; y: number; z: number }[] = [];

    // Fibonacci sphere distribution for uniform points
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({ x, y, z });
    }

    // Generate random stable positions for the orbiting icons
    const iconPositions = orbitingSkills.map((_, i) => {
      const y = 1 - (i / (orbitingSkills.length - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i * 5;

      return {
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
      };
    });

    let dragStartX = 0;
    let dragStartY = 0;
    let currentRotationX = 0.4;
    let currentRotationY = 0;
    let targetRotationX = 0.4;
    let targetRotationY = 0;
    let isDragging = false;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;

      targetRotationY += dx * 0.005;
      targetRotationX += dy * 0.005;

      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const render = () => {
      currentRotationX += (targetRotationX - currentRotationX) * 0.1;
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      
      // Auto-rotation when not dragging and not hovering an icon
      if (!isDragging && !isHoveringIconRef.current) {
        targetRotationY += 0.002;
      }

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 300;

      for (let i = 0; i < numPoints; i++) {
        const p = points[i];

        // Apply Y rotation
        let x1 = p.x * Math.cos(currentRotationY) - p.z * Math.sin(currentRotationY);
        let z1 = p.x * Math.sin(currentRotationY) + p.z * Math.cos(currentRotationY);
        let y1 = p.y;

        // Apply X rotation
        let y2 = y1 * Math.cos(currentRotationX) - z1 * Math.sin(currentRotationX);
        let z2 = y1 * Math.sin(currentRotationX) + z1 * Math.cos(currentRotationX);
        let x2 = x1;

        // Perspective projection
        const zCamera = z2 * globeRadius + 300;

        if (zCamera <= 0) continue;

        const scale = focalLength / zCamera;
        const projectedX = centerX + x2 * globeRadius * scale;
        const projectedY = centerY + y2 * globeRadius * scale;

        // Z-depth calculation for opacity and size
        const normalizedDepth = (z2 + 1) / 2;

        const opacity = Math.max(0.05, 0.9 * normalizedDepth);
        const size = Math.max(0.5, 2.5 * normalizedDepth);

        ctx.fillStyle = `rgba(0, 217, 255, ${opacity})`;
        ctx.fillRect(projectedX - size / 2, projectedY - size / 2, size, size);
      }

      // Update DOM Icons
      const iconOrbitRadius = globeRadius * 1.35;
      for (let i = 0; i < orbitingSkills.length; i++) {
        const p = iconPositions[i];
        const el = iconRefs.current[i];
        if (!el) continue;

        let x1 = p.x * Math.cos(currentRotationY) - p.z * Math.sin(currentRotationY);
        let z1 = p.x * Math.sin(currentRotationY) + p.z * Math.cos(currentRotationY);
        let y1 = p.y;

        let y2 = y1 * Math.cos(currentRotationX) - z1 * Math.sin(currentRotationX);
        let z2 = y1 * Math.sin(currentRotationX) + z1 * Math.cos(currentRotationX);
        let x2 = x1;

        const zCamera = z2 * iconOrbitRadius + 300; 
        if (zCamera <= 0) {
          el.style.opacity = "0";
          continue; 
        }

        const scale = focalLength / zCamera;
        const projectedX = centerX + x2 * iconOrbitRadius * scale;
        const projectedY = centerY + y2 * iconOrbitRadius * scale;
        
        const normalizedDepth = (z2 + 1) / 2; 
        const opacity = Math.max(0.1, normalizedDepth * 1.2);
        const elementScale = Math.max(0.4, scale * 1.1);

        el.style.transform = `translate3d(${projectedX}px, ${projectedY}px, 0) scale(${elementScale}) translate(-50%, -50%)`;
        el.style.opacity = opacity.toString();
        el.style.zIndex = Math.round(normalizedDepth * 100).toString();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center flex-col select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        style={{ touchAction: "none" }}
      />
      
      {/* Icon Overlay Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {orbitingSkills.map((skill, index) => (
          <div
            key={skill.slug}
            ref={(el) => (iconRefs.current[index] = el)}
            className="absolute top-0 left-0 will-change-transform pointer-events-auto cursor-pointer flex flex-col items-center justify-center group/icon"
            style={{ transformOrigin: "0 0" }}
            onMouseEnter={() => (isHoveringIconRef.current = true)}
            onMouseLeave={() => (isHoveringIconRef.current = false)}
          >
            {/* The animated scaling container */}
            <div className="relative flex items-center justify-center w-12 h-12 transition-transform duration-300 ease-out group-hover/icon:scale-[1.3]">
              {/* Intense ambient glow on hover */}
              <div className="absolute inset-0 bg-[#00d9ff] opacity-0 group-hover/icon:opacity-30 blur-xl rounded-full transition-opacity duration-300" />
              
              {/* The sharp SVG icon */}
              <img
                src={`https://cdn.simpleicons.org/${skill.slug}/00d9ff`}
                alt={skill.name}
                className="w-7 h-7 relative z-10 drop-shadow-[0_0_8px_rgba(0,217,255,0.4)] group-hover/icon:drop-shadow-[0_0_16px_rgba(0,217,255,0.8)] transition-all duration-300 group-hover/icon:brightness-125"
                draggable={false}
              />
            </div>
            
            {/* Tooltip Name Label */}
            <div className="absolute top-full mt-2 px-3 py-1 rounded-md bg-[#0a0a0a]/90 border border-[#00d9ff]/30 text-[#00d9ff] text-[10px] font-bold tracking-widest whitespace-nowrap opacity-0 -translate-y-2 pointer-events-none transition-all duration-300 group-hover/icon:opacity-100 group-hover/icon:translate-y-0 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {skill.name.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 flex items-center gap-2 text-xs font-medium text-white/40 pointer-events-none z-30">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <span>Drag to rotate</span>
      </div>
    </div>
  );
}
