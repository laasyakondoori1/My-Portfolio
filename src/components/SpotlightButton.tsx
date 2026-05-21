import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LiquidCanvas } from "./LiquidCanvas";

interface SpotlightButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SpotlightButton({
  children,
  to,
  href,
  color = "#00d9ff",
  className = "",
  style = {},
}: SpotlightButtonProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [magneticX, setMagneticX] = useState(0);
  const [magneticY, setMagneticY] = useState(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const relativeX = clientX - left;
    const relativeY = clientY - top;
    mouseX.set(relativeX);
    mouseY.set(relativeY);
    
    // Magnetic pull calculation
    setMagneticX((relativeX - width / 2) * 0.15);
    setMagneticY((relativeY - height / 2) * 0.15);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setMagneticX(0);
    setMagneticY(0);
  }

  const innerContent = (
    <>
      <LiquidCanvas color={color} isHovered={isHovered} />
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: "12%",
          right: "12%",
          height: "35%",
          background: "linear-gradient(to bottom,rgba(255,255,255,0.18) 0%,transparent 100%)",
          borderRadius: "100px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[100px] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              ${color}25,
              transparent 80%
            )
          `,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[100px] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              60px circle at ${mouseX}px ${mouseY}px,
              ${color}99,
              transparent 80%
            )
          `,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "7px",
          transition: "color 0.3s ease",
          color: isHovered ? "#ffffff" : color,
        }}
      >
        {children}
      </span>
    </>
  );

  const buttonStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: style.padding || "12px 28px",
    borderRadius: "100px",
    border: `1px solid ${color}45`,
    background: `${color}0D`,
    cursor: "pointer",
    overflow: "hidden",
    fontFamily: "DM Sans, sans-serif",
    fontSize: style.fontSize || "13px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    textDecoration: "none",
    transition:
      "transform 0.2s cubic-bezier(.34,1.56,.64,1), border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
    ...style,
  };

  if (to) {
    return (
      <Link to={to} className="inline-block relative">
        <motion.div
          className={className}
          style={{ ...buttonStyle, x: magneticX, y: magneticY }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={{ x: magneticX, y: magneticY }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          {innerContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <div className="inline-block relative">
      <motion.a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
        style={{ ...buttonStyle, x: magneticX, y: magneticY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ x: magneticX, y: magneticY }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {innerContent}
      </motion.a>
    </div>
  );
}
