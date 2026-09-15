"use client";

import { motion } from "framer-motion";
import FilterText from "./FilterText";

const activities = [
  {
    icon: "📖",
    title: "Storytelling",
    desc: "Stories that create conversations and meaningful reflections.",
  },
  {
    icon: "🎨",
    title: "Creative Expression",
    desc: "Activities that allow thoughts and feelings to be expressed creatively.",
  },
  {
    icon: "💬",
    title: "Conversations",
    desc: "Open and meaningful discussions.",
  },
  {
    icon: "🧩",
    title: "Interactive Activities",
    desc: "Games and experiences that make learning enjoyable.",
  },
  {
    icon: "🌱",
    title: "Reflection",
    desc: "Simple exercises to encourage self-awareness.",
  },
  {
    icon: "🤝",
    title: "Connection",
    desc: "Creating opportunities to connect with others and share experiences.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ActivitiesSection() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] max-w-[94vw] max-h-[94vw] rounded-full bg-sage/20 blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <motion.span
            className="label-caps text-moss mb-5 block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            Activities
          </motion.span>
          <FilterText as="h2" variant="turbulence" className="text-ink mb-5">
            What happens at SsaRanga?
          </FilterText>
          <p className="text-ink/60 text-lg font-light max-w-xl mx-auto">
            SsaRanga is not about sitting and listening to a lecture. It is
            about experiencing. Depending on the program, sessions may include:
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              className="glass-light rounded-3xl p-8 card-hover"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease }}
            >
              <div className="w-14 h-14 rounded-2xl bg-moss/10 border border-moss/20 flex items-center justify-center text-3xl mb-5">
                <span aria-hidden="true">{activity.icon}</span>
              </div>
              <h3 className="text-ink text-xl mb-3">{activity.title}</h3>
              <p className="text-ink/60 text-sm font-light leading-relaxed">
                {activity.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}