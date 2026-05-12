import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Kondoori Laasya Priya" },
      { name: "description", content: "Selected works in AI, ML, and full-stack development." },
      { property: "og:title", content: "Projects — Kondoori Laasya Priya" },
      {
        property: "og:description",
        content: "Selected works in AI, ML, and full-stack development.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <section className="px-4 pt-28 pb-12">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs tracking-widest text-primary"
          >
            PORTFOLIO
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-4xl font-bold text-foreground sm:text-6xl"
          >
            Selected Works
          </motion.h1>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
