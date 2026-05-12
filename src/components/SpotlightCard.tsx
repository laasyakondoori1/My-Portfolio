import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  color?: string;
}

export function SpotlightCard({
  children,
  href,
  className = "",
  color = "#00d9ff",
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const innerContent = (
    <>
      {/* Background glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              160px circle at ${mouseX}px ${mouseY}px,
              ${color}12,
              transparent 80%
            )
          `,
        }}
      />
      {/* Border glow mask on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              ${color}80,
              transparent 80%
            )
          `,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Default static border */}
      <div
        className="absolute inset-0 rounded-xl border pointer-events-none transition-colors duration-300 z-0"
        style={{ borderColor: isHovered ? "transparent" : "rgba(255,255,255,0.06)" }}
      ></div>

      <div className="relative z-20 w-full h-full">{children}</div>
    </>
  );

  const baseStyle: React.CSSProperties = {
    position: "relative",
    background: "#0d0d0d",
    border: "1px solid transparent", // handeld by the inner div
    overflow: "hidden",
  };

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`group block rounded-xl p-5 ${className}`}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <div
      className={`group rounded-xl p-5 ${className}`}
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {innerContent}
    </div>
  );
}
