import { Link, useLocation } from "@tanstack/react-router";
import { useState, MouseEvent } from "react";
import { Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";

const navItems = [
  { label: "PROJECTS", to: "/projects" },
  { label: "CREDENTIALS", to: "/credentials" },
  { label: "ABOUT", to: "/about" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-4xl">
      <div
        className="relative rounded-2xl group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow tracking the cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useMotionTemplate`
              radial-gradient(
                120px circle at ${mouseX}px ${mouseY}px,
                rgba(0,217,255,0.55),
                transparent 80%
              )
            `,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        {/* Static breath glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,217,255,0.15), transparent 70%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        ></div>

        <nav className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between relative z-10">
          <Link
            to="/"
            className="text-xl font-bold text-[#00d9ff] cyan-glow"
            style={{ fontFamily: "Comfortaa, cursive" }}
          >
            laasyapriya.dev
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="relative overflow-hidden p-2 rounded-xl transition-colors duration-200 mr-2 bg-[#00d9ff]/15 text-[#00d9ff]"
            >
              <Home size={16} />
            </Link>
            <div className="w-px h-4 bg-white/10 mr-3"></div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative overflow-hidden text-xs font-semibold tracking-wider px-3 py-1.5 rounded-xl transition-colors duration-200 ${
                    isActive ? "text-[#00d9ff]" : "text-white/70 hover:text-[#00d9ff]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={16} className="text-white" />
              ) : (
                <Menu size={16} className="text-white" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 top-16 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.6px] transition-colors ${
                  location.pathname === item.to
                    ? "text-[#00d9ff]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
