import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
  scope?: string;
}

const colors = [
  "#00d9ff", // cyan
  "#f59e0b", // saffron
  "#a78bfa", // purple
  "#10b981", // emerald
  "#ef4444", // red
  "#3b82f6", // blue
];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const color = colors[index % colors.length];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="proj-card rounded-2xl relative flex flex-col group overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ background: "#0d0d0d", border: "1px solid transparent" }}
    >
      {/* Background radial glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              160px circle at ${mouseX}px ${mouseY}px,
              ${color}12,
              transparent 80%
            )
          `,
        }}
      />
      {/* Border gradient mask on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
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
        className="absolute inset-0 rounded-2xl border pointer-events-none transition-colors duration-300 group-hover:border-transparent"
        style={{ borderColor: `${color}18` }}
      ></div>

      <div className="p-5 flex flex-col gap-3 relative z-10 h-full">
        <div className="flex justify-between items-start">
          <div className="w-8 h-0.5 rounded-full" style={{ background: color }}></div>
          {project.year && (
            <span className="font-mono text-[10px] tracking-widest text-white/30">
              {project.year}
            </span>
          )}
        </div>

        <h3
          className="text-white font-semibold text-lg"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {project.title}
        </h3>

        <p
          className="text-white/40 text-sm leading-relaxed flex-1"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: `${color}08`,
                color: `${color}90`,
                border: `1px solid ${color}18`,
                fontFamily: "DM Mono, monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {project.scope && (
          <p
            className="text-white/30 text-xs mt-2 pt-3 border-t border-white/5"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <span className="font-mono font-bold" style={{ color: color }}>
              SCOPE
            </span>{" "}
            · {project.scope}
          </p>
        )}
      </div>
    </div>
  );
}
