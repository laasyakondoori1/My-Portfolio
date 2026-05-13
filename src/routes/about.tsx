import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/SpotlightCard";
import {
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Brain,
  Database,
  Wrench,
  Code,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { personalInfo, skills } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kondoori Laasya Priya" },
      { name: "description", content: personalInfo.bio },
      { property: "og:title", content: "About — Kondoori Laasya Priya" },
      { property: "og:description", content: personalInfo.bio },
    ],
  }),
  component: AboutPage,
});

const skillIcons = [Code2, Brain, Database, Wrench];

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "laasyakondoori@gmail.com",
    href: "mailto:laasyakondoori@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+91 79811 *****", href: "tel:+917981173765" },
  { icon: Linkedin, label: "LinkedIn", value: "laasya-kondoori", href: "https://www.linkedin.com/in/laasya-kondoori-6b69b92a0/" },
  { icon: Github, label: "GitHub", value: "laasyakondoori1", href: "https://github.com/laasyakondoori1" },
  { icon: Code, label: "LeetCode", value: "laasya_kondoori", href: "https://leetcode.com/u/laasya_kondoori/" },
];

function AboutPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <section className="py-28 px-6">
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10 text-center">
            <p className="text-white/25 text-xs tracking-[0.35em] uppercase mb-2 font-mono">
              Who I Am
            </p>
            <h1 className="hero-name text-4xl sm:text-6xl">Persona</h1>
          </div>
        </motion.div>
      </section>

      {/* Bio + Education */}
      <section className="px-6 pb-24">
        <motion.div
          className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <h2 className="mb-6 text-2xl font-bold hero-name">Hi, I&apos;m Laasya</h2>
            <p
              className="mb-6 text-sm leading-relaxed text-white/60"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-white/40">
                <MapPin size={10} className="mr-1.5 inline text-[#00d9ff]" />
                Hyderabad, India
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-white/40">
                Anurag University · 2028
              </span>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold hero-name">Education</h2>
            <div
              className="rounded-2xl p-6 h-fit"
              style={{ background: "#0d0d0d", border: "1px solid rgba(0,217,255,0.18)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    <GraduationCap size={24} className="text-[#00d9ff]" />
                  </div>
                  <div>
                    <h3
                      className="text-white font-semibold text-lg"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {personalInfo.university}
                    </h3>
                    <p
                      className="text-[#00d9ff] text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {personalInfo.degree}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 font-mono text-xs text-white/40">{personalInfo.eduYears}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="px-6 pb-24">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold hero-name">Skills &amp; Tech</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([category, items], i) => {
              const Icon = skillIcons[i % skillIcons.length];
              return (
                <div
                  key={category}
                  className="rounded-2xl p-6"
                  style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <Icon size={14} className="text-[#00d9ff]" />
                    </div>
                    <h3 className="font-mono text-xs font-bold tracking-widest text-white/70 uppercase">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-white/50 transition-colors hover:border-[#00d9ff]/40 hover:text-[#00d9ff]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Find Me On */}
      <section className="px-6 pb-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold hero-name">Find me on</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((social, i) => (
              <SpotlightCard
                key={social.label}
                href={social.href}
                className="transition-all"
                color="#00d9ff"
              >
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <social.icon
                    size={20}
                    className="text-white/30 group-hover:text-[#00d9ff] transition-colors"
                  />
                </div>
                <p
                  className="font-bold text-white mb-1 relative z-10"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {social.label}
                </p>
                <p className="truncate font-mono text-[10px] text-[#00d9ff]/70 relative z-10">
                  {social.value}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
