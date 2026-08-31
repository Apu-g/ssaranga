"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";

const TESTIMONIALS_ROW_1 = [
  {
    text: "My daughter was anxious about school, but after just three sessions at SsaRanga she started sleeping better and her teachers noticed the change. The space feels like a warm hug — calm, safe, and truly healing.",
    author: "Priya Sharma",
    role: "Parent",
  },
  {
    text: "I enrolled in the women's wellness program expecting guided meditation. What I found was a complete shift in how I handle stress. Sonia and her team create something rare — a space where vulnerability becomes strength.",
    author: "Ananya Krishnamurthy",
    role: "Program Participant",
  },
  {
    text: "At 72, I thought mindfulness was for the young. SsaRanga proved me wrong. The elder sessions are gentle, unhurried, and deeply restorative. I look forward to every visit now.",
    author: "Ramesh Iyer",
    role: "Elder Wellness",
  },
  {
    text: "After months of burnout, I needed more than a vacation. The children's program caught my eye, but the adult sessions changed my life. I leave every session feeling lighter and more focused.",
    author: "Deepak Nair",
    role: "Corporate Professional",
  },
];

const TESTIMONIALS_ROW_2 = [
  {
    text: "I recommend SsaRanga to every parent I meet. The way they connect with children through mindfulness — no screens, no pressure, just presence — is exactly what our kids need today.",
    author: "Lakshmi Venkatesh",
    role: "Educator",
  },
  {
    text: "The moment you walk in, the noise of the world fades. It's not just the aesthetics — it's the intention behind every detail. SsaRanga has mastered the art of creating genuine calm.",
    author: "Arjun Rao",
    role: "Architect & Wellness Enthusiast",
  },
  {
    text: "My wife and I attended a couples' session together. We rediscovered something we'd been too busy to notice — each other. SsaRanga doesn't just calm the mind, it opens the heart.",
    author: "Vikram & Meera Joshi",
    role: "Couples Program",
  },
];

function TestimonialCard({
  text,
  author,
  role,
}: {
  text: string;
  author: string;
  role: string;
}) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">&ldquo;{text}&rdquo;</p>
      <div className="testimonial-author-block">
        <span className="testimonial-author">{author}</span>
        <span className="testimonial-role">{role}</span>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof TESTIMONIALS_ROW_1;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="testimonial-marquee-row">
      <div className={`testimonial-marquee-track ${reverse ? "reverse" : ""}`}>
        {[0, 1].map((track) => (
          <div key={track} className="testimonial-marquee-group">
            {doubled.map((item, i) => (
              <TestimonialCard key={`${track}-${i}`} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper py-20 md:py-28"
    >
      {/* Header */}
      <motion.div
        className="mb-14 md:mb-20 px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="label-caps text-moss mb-4 block">Testimonials</span>
        <FilterText as="h2" variant="melt" className="text-ink" duration={2.2}>
          Words that warm our hearts
        </FilterText>
        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink/60">
          Hear from the families and individuals who have found their calm with
          us.
        </p>
      </motion.div>

      {/* Marquee rows — full-bleed with edge fades */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-32" />

        <div className="space-y-6 md:space-y-8">
          <MarqueeRow items={TESTIMONIALS_ROW_1} />
          <MarqueeRow items={TESTIMONIALS_ROW_2} reverse />
        </div>
      </motion.div>
    </section>
  );
}
