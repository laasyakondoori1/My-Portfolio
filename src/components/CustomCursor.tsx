import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99997,
          willChange: "transform",
          background: "radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 65%)",
          filter: "blur(4px)",
          transform: `translate(${position.x - 50}px, ${position.y - 50}px) scale(${isHovering ? 1.5 : 1})`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          backdropFilter: "blur(4px) saturate(150%)",
          WebkitBackdropFilter: "blur(4px) saturate(150%)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 12px rgba(0,217,255,0.06)",
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.5 : 1})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "7px",
            left: "9px",
            width: "10px",
            height: "3px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.40)",
            filter: "blur(1.5px)",
            transform: "rotate(-20deg)",
          }}
        />
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
          background: "rgba(0,217,255,0.9)",
          boxShadow: "0 0 6px rgba(0,217,255,0.6)",
          transform: `translate(${position.x - 3}px, ${position.y - 3}px) scale(${isHovering ? 0 : 1})`,
          transition: "transform 0.05s linear",
        }}
      />
    </>
  );
}
