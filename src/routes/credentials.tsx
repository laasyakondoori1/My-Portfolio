import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Award, Star, CheckCircle, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { achievements, activities } from "@/lib/data";

export const Route = createFileRoute("/credentials")({
  head: () => ({
    meta: [
      { title: "Credentials — Kondoori Laasya Priya" },
      { name: "description", content: "Achievements, hackathon wins, and leadership activities." },
      { property: "og:title", content: "Credentials — Kondoori Laasya Priya" },
      {
        property: "og:description",
        content: "Achievements, hackathon wins, and leadership activities.",
      },
    ],
  }),
  component: CredentialsPage,
});

const iconMap = [Trophy, Award, Star, CheckCircle];

function CredentialsPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <section className="px-4 pt-28 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs tracking-widest text-primary"
          >
            ACHIEVEMENTS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-4xl font-bold text-foreground sm:text-6xl"
          >
            My Credentials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-mono text-sm text-muted-foreground"
          >
            {achievements.length} achievements · {activities.length} activities
          </motion.p>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative border-l-2 border-border pl-8">
            {achievements.map((ach, i) => {
              const Icon = iconMap[i % iconMap.length];
              return (
                <motion.div
                  key={ach.event}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                    <div className="mb-2 flex items-center gap-3">
                      <Icon size={16} className="text-primary" />
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-primary">
                        {ach.title}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{ach.event}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership & Activities */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Leadership & Activities</h2>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {activities.map((activity, i) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {activity}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
