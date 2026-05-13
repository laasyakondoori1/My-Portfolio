import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  FileText,
  ArrowRight,
  Lightbulb,
  Target,
  Sparkles,
  GraduationCap,
  Mail,
  ClipboardList,
  Brain,
  Code2,
  Search,
  FlaskConical,
  BookOpen,
  Github,
  Linkedin,
  Briefcase,
  Code,
} from "lucide-react";
import { Header } from "@/components/Header";
import { SpotlightButton } from "@/components/SpotlightButton";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { personalInfo, projects, roles } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kondoori Laasya Priya — AI & Full-Stack Developer" },
      { name: "description", content: personalInfo.tagline },
      { property: "og:title", content: "Kondoori Laasya Priya — AI & Full-Stack Developer" },
      { property: "og:description", content: personalInfo.tagline },
    ],
  }),
  component: Index,
});

function RoleRotator() {
  const [index, setIndex] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setIsAnimatingOut(false);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="role-word-wrap mb-4">
        <span
          className={`hero-role text-5xl md:text-7xl ${isAnimatingOut ? "role-out" : "role-in"}`}
        >
          {roles[index]}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 mb-10">
        {roles.map((_, i) => (
          <div
            key={i}
            className="dot-pill rounded-full"
            style={{
              height: "5px",
              width: i === index ? "28px" : "5px",
              background: i === index ? "#00d9ff" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </>
  );
}

function WorkflowBar() {
  const steps = [
    { label: "IDEA", icon: Lightbulb, color: "#eab308" },
    { label: "PLAN", icon: ClipboardList, color: "#f97316" },
    { label: "AI HELP", icon: Brain, color: "#a855f7" },
    { label: "CODE", icon: Code2, color: "#00d9ff", glowing: true },
    { label: "REVIEW", icon: Search, color: "#ec4899" },
    { label: "TEST", icon: FlaskConical, color: "#f43f5e" },
    { label: "LEARN", icon: BookOpen, color: "#ffffff" },
  ];

  return (
    <div className="flex items-center w-full justify-between">
      {steps.map((step, i) => (
        <React.Fragment key={step.label}>
          <motion.div
            className="flex flex-col items-center gap-2.5 min-w-[52px] cursor-pointer group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative"
              style={{
                background: `${step.color}0d`,
                border: `1px solid ${step.color}22`,
                boxShadow: step.glowing
                  ? `0 0 20px ${step.color}33, inset 0 0 10px ${step.color}11`
                  : "none",
              }}
            >
              {/* Optional glowing background block for active state */}
              {step.glowing && (
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${step.color}40 0%, transparent 70%)`,
                    filter: "blur(8px)",
                    zIndex: 0,
                  }}
                />
              )}
              <step.icon size={20} className="relative z-10" style={{ color: step.color }} />
            </div>
            <span
              className="text-white/30 text-[10px] tracking-wider whitespace-nowrap group-hover:text-white/65 transition-colors duration-200"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {step.label}
            </span>
          </motion.div>

          {/* Connector Line */}
          {i < steps.length - 1 && (
            <motion.div
              className="flex-1 h-px min-w-[8px] md:min-w-[24px]"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.5 }}
              style={{
                transformOrigin: "left",
                background: `linear-gradient(90deg, ${step.color}40, ${steps[i + 1].color}40)`,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16 w-full"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="hero-sub text-white/30 text-lg md:text-xl tracking-[0.25em] uppercase mb-4">
            Hello! I&apos;m
          </p>

          <h1 className="hero-name text-5xl md:text-7xl mb-2 leading-none tracking-tight">
            {personalInfo.name}
          </h1>

          <p className="hero-sub text-white/30 text-base md:text-xl tracking-wide mb-6">
            A passionate <span className="text-[#00d9ff]/70">Full-Stack</span> &amp;{" "}
            <span className="text-[#f59e0b]/70">ML</span> Developer
          </p>

          <RoleRotator />

          <p className="hero-sub text-white/35 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {personalInfo.tagline}
          </p>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <SpotlightButton href="mailto:laasyakondoori@gmail.com" color="#00d9ff">
              <FileText size={14} />
              Contact Me
            </SpotlightButton>

            <SpotlightButton to="/projects" color="#10b981">
              View Projects
              <ArrowRight size={14} />
            </SpotlightButton>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 px-6">
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10 text-center">
            <p className="text-white/25 text-xs tracking-[0.35em] uppercase mb-2 font-mono">
              Featured Work
            </p>
            <h2 className="hero-name text-3xl sm:text-4xl md:text-5xl">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <SpotlightButton to="/projects" color="#00d9ff">
              View All Projects <ArrowRight size={14} />
            </SpotlightButton>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-4xl mx-auto h-px bg-white/5"></div>

      {/* About Preview */}
      <section className="py-28 px-6">
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10 text-center">
            <p className="text-white/25 text-xs tracking-[0.35em] uppercase mb-2 font-mono">
              Who I Am
            </p>
            <h2 className="hero-name text-3xl sm:text-4xl md:text-5xl">About Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div
              className="rounded-2xl relative overflow-hidden select-none"
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.06)",
                minHeight: "200px",
                transition: "border-color .3s",
                cursor: "default",
              }}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 70% 60%, rgba(0,217,255,0.1) 0%, transparent 65%)",
                  }}
                ></div>
                <div className="relative flex items-center gap-1.5 text-white/30 text-xs font-mono">
                  <MapPin size={12} /> LOCATION · HOVER TO EXPLORE
                </div>
                <div className="relative">
                  <div className="text-white font-bold text-3xl mb-1.5 hero-name">INDIA</div>
                  <div className="text-white/35 text-xs mb-0.5 font-mono">
                    {personalInfo.coords}
                  </div>
                  <div className="text-white/25 text-xs font-mono">{personalInfo.timezone}</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,217,255,0.08) 0%, transparent 60%)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end z-20">
                  <span className="text-[#00d9ff]/60 text-[10px] font-mono">
                    INDIA · {personalInfo.timezone}
                  </span>
                  <span className="text-[#00d9ff]/35 text-[9px] font-mono">
                    {personalInfo.coords}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 flex flex-col justify-between gap-4"
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.06)",
                minHeight: "200px",
              }}
            >
              <div>
                <p className="text-white/20 text-xs tracking-widest mb-3 font-mono">/ ABOUT</p>
                <p className="text-white/60 text-sm leading-relaxed">{personalInfo.bio}</p>
              </div>
              <p className="text-white/15 text-xs italic border-t border-white/5 pt-4">
                &quot;Where tradition meets technology.&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className="rounded-xl p-4"
              style={{ background: "#a78bfa0d", border: "1px solid #a78bfa30" }}
            >
              <div className="text-xs font-bold tracking-widest mb-2 font-mono text-[#a78bfa]">
                GROWTH
              </div>
              <p className="text-xs leading-relaxed text-white/55">
                An explorer of systems, driven by curiosity and understanding.
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "#00d9ff0d", border: "1px solid #00d9ff30" }}
            >
              <div className="text-xs font-bold tracking-widest mb-2 font-mono text-[#00d9ff]">
                FOCUS
              </div>
              <p className="text-xs leading-relaxed text-white/55">
                Deep work on efficiency and precision in every layer built.
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "#f59e0b0d", border: "1px solid #f59e0b30" }}
            >
              <div className="text-xs font-bold tracking-widest mb-2 font-mono text-[#f59e0b]">
                CRAFT
              </div>
              <p className="text-xs leading-relaxed text-white/55">
                Discipline and dedication in every single line of code.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <SpotlightButton to="/about" color="#00d9ff">
              View Persona <ArrowRight size={14} />
            </SpotlightButton>
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section className="py-28 px-6">
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-16">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2 font-mono">
              Education & Work
            </p>
            <h2 className="hero-name text-4xl sm:text-5xl md:text-6xl">Experience</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
            {/* Left Column: Education */}
            <div className="relative pl-8">
              {/* Timeline Line */}
              <div className="absolute left-0 top-2 bottom-0 w-px bg-white/10" />
              {/* Timeline Dot */}
              <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-[#00d9ff] shadow-[0_0_10px_#00d9ff]" />

              <p className="text-[#00d9ff] font-mono text-sm mb-4 tracking-wider">
                {personalInfo.eduYears}
              </p>
              
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {personalInfo.degree}
              </h3>
              
              <p className="text-white/60 text-base mb-1">
                {personalInfo.university}
              </p>
              <p className="text-white/40 text-sm mb-8">
                {personalInfo.location}
              </p>

              {/* University Image */}
              <div 
                className="w-full h-48 sm:h-56 rounded-xl overflow-hidden relative group"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <img 
                  src="/anurag-university.png" 
                  alt="Anurag University Campus" 
                  className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <div className="text-white/60 font-mono text-[10px] tracking-widest transition-colors duration-500 group-hover:text-white">
                    CAMPUS AERIAL VIEW
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Experience */}
            <div 
              className="rounded-2xl p-8 relative overflow-hidden h-fit"
              style={{ background: "#0d0d0d", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6">
                <p className="text-[#f59e0b] font-mono text-xs tracking-widest uppercase">
                  RECENT INTERNSHIP
                </p>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#f59e0b]/30 bg-[#f59e0b]/10">
                  <Briefcase size={18} className="text-[#f59e0b]" />
                </div>
              </div>

              <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Web Developer Intern
              </h3>
              
              <p className="text-[#f59e0b] text-base font-medium mb-6">
                Elitceler Technologies
              </p>

              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Worked on projects from different clients all the way from frontend to research to backend and API integration, mainly on a government website for Malkajgiri Commissionerate, Hyderabad.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Frontend', 'Backend', 'API Integration', 'Research', 'Govt Projects', 'Web Dev'].map(skill => (
                  <span 
                    key={skill}
                    className="text-[#f59e0b] text-[11px] font-mono px-3 py-1.5 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Reach Out */}
      <section className="py-28 px-6">
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10 text-center">
            <p className="text-white/25 text-xs tracking-[0.35em] uppercase mb-2 font-mono">
              Skills · Workflow
            </p>
            <h2 className="hero-name text-3xl sm:text-4xl md:text-5xl">Reach Out</h2>
          </div>

          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(0,217,255,0.04) 0%, transparent 70%)",
              }}
            ></div>

            <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-6 relative z-10 font-mono">
              WORKFLOW
            </p>

            <div className="relative z-10 w-full flex justify-between items-center mb-8 overflow-x-auto pb-4 hide-scrollbar">
              <WorkflowBar />
            </div>

            <div
              className="mt-7 mb-6 h-px w-full relative z-10"
              style={{ background: "rgba(255,255,255,0.05)" }}
            ></div>

            <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-4 relative z-10 font-mono">
              Hit Me Up
            </p>

            <div className="flex items-center gap-3 flex-wrap relative z-10">
              <SpotlightButton
                href="mailto:laasyakondoori@gmail.com"
                color="#ea4335"
                style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700 }}
              >
                <Mail size={14} />
                Mail
              </SpotlightButton>

              <SpotlightButton
                href="https://github.com/laasyakondoori1"
                color="#ffffff"
                style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700 }}
              >
                <Github size={14} />
                GitHub
              </SpotlightButton>

              <SpotlightButton
                href="https://www.linkedin.com/in/laasya-kondoori-6b69b92a0/"
                color="#0a66c2"
                style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700 }}
              >
                <Linkedin size={14} />
                LinkedIn
              </SpotlightButton>

              <SpotlightButton
                href="https://leetcode.com/u/laasya_kondoori/"
                color="#f89f1b"
                style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700 }}
              >
                <Code size={14} />
                LeetCode
              </SpotlightButton>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
