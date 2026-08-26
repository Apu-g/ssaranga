"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";
import MorphImage from "./MorphImage";

const programs = [
  {
    slug: "kids",
    name: "SsaRanga Kids",
    subtitle: "Little Roots",
    ages: "Ages 8–18",
    desc: "Confidence, emotional awareness and communication — helping young minds slow down, release stress and grow with clarity.",
    image: "/images/kids-program.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 30V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 18C18 18 14 13 14 9C14 5 16 4 18 4C20 4 22 5 22 9C22 13 18 18 18 18Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 30H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 22L18 24L24 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-sage",
    preset: "portrait" as const,
  },
  {
    slug: "women",
    name: "SsaRanga Women",
    subtitle: "Rising Roots",
    ages: "Ages 18+",
    desc: "Self-awareness, confidence, balance and personal growth — a supportive space for women to strengthen their inner potential.",
    image: "/images/women-program.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 6C12 10 10 16 14 22C16 26 18 30 18 30C18 30 20 26 22 22C26 16 24 10 18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 14V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 18L18 16L22 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-gold",
    preset: "wide" as const,
  },
  {
    slug: "elders",
    name: "SsaRanga Elders",
    subtitle: "Golden Roots",
    ages: "Ages 55+",
    desc: "Connection, engagement, purpose and joyful living — honouring the stories, strengths and experiences of elders.",
    image: "/images/elders-program.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 26C14 26 16 22 18 22C20 22 22 26 22 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 30C10 30 12 26 18 26C24 26 26 30 26 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-moss",
    preset: "portrait" as const,
  },
  {
    slug: "one-to-one",
    name: "SsaRanga One-to-One",
    subtitle: "Personal Sessions",
    ages: "Individual",
    desc: "Personalised guidance and reflection — quiet, focused sessions shaped entirely around the individual.",
    image: "/images/one-to-one.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M12 18C12 18 14 12 18 12C22 12 24 18 24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 18V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    accent: "text-sage",
    preset: "wide" as const,
  },
  {
    slug: "workshops",
    name: "SsaRanga Workshops",
    subtitle: "Open Sessions",
    ages: "All ages",
    desc: "Focused, themed group workshops on specific skills and topics — open sessions for shared learning and growth.",
    image: "/images/workshop.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 10C14 14 14 22 18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 10C22 14 22 22 18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-gold",
    preset: "portrait" as const,
  },
];

const VARIANTS = ["melt", "turbulence", "fractal", "turbulence", "melt"] as const;

export default function ProgramsSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="section-padding bg-paper" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-8 md:mb-12">
            <motion.span
              className="label-caps text-moss mb-5 block"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Programs
            </motion.span>
            <FilterText
              variant="melt"
              className="display-lg text-ink block"
              duration={2.2}
            >
              Five programs, one philosophy
            </FilterText>
            <p className="text-ink/60 text-lg font-light max-w-xl mx-auto mt-6">
              Calm, clarity, and confidence at every stage of life.
            </p>
          </div>
        )}

        {/* Showcase rows — one per program */}
        {programs.map((program, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={program.slug}
              className="grid md:grid-cols-12 gap-10 md:gap-14 items-center py-14 md:py-24 border-b border-moss/10 last:border-b-0"
            >
              {/* Copy */}
              <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className={`${program.accent}`}>{program.icon}</span>
                    <span className="label-caps text-moss bg-moss/10 border border-moss/20 px-3 py-1 rounded-full text-xs">
                      {program.ages}
                    </span>
                  </div>

                  <FilterText
                    variant={VARIANTS[i % VARIANTS.length]}
                    className={`display-xl text-ink block ${program.accent.replace("text-", "hover:text-")}`}
                    duration={2.1}
                    delay={i * 0.05}
                  >
                    {program.name}
                  </FilterText>

                  <motion.p
                    className="text-2xl md:text-3xl italic mt-3 mb-6 text-moss/80"
                    style={{ fontFamily: "var(--font-heading)" }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {program.subtitle}
                  </motion.p>

                  <motion.p
                    className="text-ink/65 font-light leading-relaxed max-w-xl text-base md:text-lg"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {program.desc}
                  </motion.p>
                </motion.div>
              </div>

              {/* Morphing photo */}
              <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                <MorphImage
                  src={program.image}
                  alt={program.name}
                  preset={program.preset}
                  parallax
                />
              </div>
            </article>
          );
        })}

        {/* Workshops anchor */}
        <div id="workshops" className="h-0" />
      </div>
    </section>
  );
}
