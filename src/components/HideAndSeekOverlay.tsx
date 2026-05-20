import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHideAndSeek } from "@/hooks/useHideAndSeek";

export function HideAndSeekOverlay() {
  const active = useHideAndSeek();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[10001]"
        >
          {/* Main dark overlay with vision hole */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 20%, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 0.98) 100%)`,
            }}
          />
          {/* Subtle neon glow ring around the vision radius */}
          <div 
            className="absolute inset-0 opacity-60 mix-blend-screen"
            style={{
               background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 40%, rgba(0, 217, 255, 0.15) 50%, transparent 60%)`
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
