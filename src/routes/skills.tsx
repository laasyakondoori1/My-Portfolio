import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CanvasGlobe } from "@/components/CanvasGlobe";
import { skills } from "@/lib/data";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Technical Expertise | Kondoori Laasya Priya" },
      { name: "description", content: "Technical skills and expertise of Kondoori Laasya Priya." },
    ],
  }),
  component: Skills,
});

// Map standard skill names to SimpleIcons slugs
const getIconSlug = (name: string) => {
  const normalized = name.toLowerCase().trim();
  const map: Record<string, string> = {
    c: "c",
    "c++": "cplusplus",
    "c#": "csharp",
    java: "coffeescript", // Proxy for java since it was removed
    "prompt engineering": "openai", // Proxy icon
    n8n: "n8n",
    tensorflow: "tensorflow",
    "scikit-learn": "scikitlearn",
    nlp: "dialogflow", // Proxy
    ml: "databricks", // Proxy
    "deep learning": "keras", // Proxy
    "data warehousing": "snowflake", // Proxy
    pandas: "pandas",
    numpy: "numpy",
    matplotlib: "plotly", // Plotly/Matplotlib proxy
    git: "git",
    opencv: "opencv",
    "ci/cd": "githubactions",
    "big data": "apachehadoop",
  };

  return map[normalized] || normalized.replace(/[^a-z0-9]/g, "");
};

// Descriptions for the categories
const categoryDescriptions: Record<string, string> = {
  "Programming & Core CS":
    "Core concepts that underpin everything — applied across problem-solving, development, and system design.",
  "AI / ML & GenAI":
    "Architecting intelligent systems, training models, and engineering prompts for next-generation applications.",
  "Data & Analytics":
    "Processing, analyzing, and visualizing complex datasets to extract meaningful insights.",
  Tools:
    "The supporting toolchain for version control, deployment, and robust software engineering.",
};

function Skills() {
  const categories = Object.keys(skills);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full flex flex-col items-center"
            >
              <div className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 mb-4">
                EXPERTISE
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                Technical Expertise
              </h1>

              {/* 3D Interactive Globe */}
              <div className="w-full max-w-md mx-auto mb-12">
                <CanvasGlobe />
              </div>
            </motion.div>
          </section>

          {/* Categories Tab Group */}
          <section className="w-full max-w-4xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative overflow-hidden text-xs sm:text-sm font-semibold tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-[#00d9ff] border-[#00d9ff]/40 bg-[#00d9ff]/10 shadow-[0_0_12px_rgba(0,217,255,0.15)]"
                        : "text-white/40 border-white/10 bg-transparent hover:text-white/70 hover:border-white/20"
                    } border-[0.8px]`}
                  >
                    {category}
                  </button>
                );
              })}
            </motion.div>

            {/* Skill Card */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full bg-white/[0.03] border-[0.8px] border-[#00d9ff]/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md"
                >
                  <div className="mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-white/90">
                        {activeCategory}
                      </h2>
                      <div className="text-[10px] font-mono tracking-wider text-[#00d9ff]/70 bg-[#00d9ff]/10 px-3 py-1 rounded-full border border-[#00d9ff]/20">
                        {skills[activeCategory as keyof typeof skills].length} SKILLS
                      </div>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
                      {categoryDescriptions[activeCategory]}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-3">
                    {skills[activeCategory as keyof typeof skills].map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="group flex items-center gap-2.5 px-4 py-2 rounded-xl border-[0.8px] border-white/10 bg-transparent transition-all duration-300 hover:border-[#00d9ff]/60 hover:bg-[#00d9ff]/[0.05] hover:shadow-[0_0_12px_rgba(0,217,255,0.12)] cursor-default"
                      >
                        <img
                          src={`https://cdn.simpleicons.org/${getIconSlug(skill)}/888888`}
                          alt={skill}
                          className="w-4 h-4 opacity-70 group-hover:opacity-0 absolute transition-opacity duration-300"
                        />
                        <img
                          src={`https://cdn.simpleicons.org/${getIconSlug(skill)}/00d9ff`}
                          alt={skill}
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="w-4 h-4 relative" /> {/* Spacer for absolute images */}
                        <span className="text-xs font-mono text-white/55 transition-colors duration-300 group-hover:text-[#00d9ff]">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
