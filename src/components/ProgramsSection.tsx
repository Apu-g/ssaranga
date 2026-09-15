"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";
import MorphImage from "./MorphImage";
import AnchorLink from "@/components/AnchorLink";

const programs = [
  {
    slug: "kids",
    name: "Young Minds",
    subtitle: "Discover • Express • Grow",
    format: "Workshops | Activity Sessions | Group Programs",
    desc: "Interactive experiences that nurture confidence, emotional awareness, communication and life skills.",
    image: "/images/kids1.jpeg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 30V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 18C18 18 14 13 14 9C14 5 16 4 18 4C20 4 22 5 22 9C22 13 18 18 18 18Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 30H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 22L18 24L24 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-moss",
    preset: "portrait" as const,
    cta: { label: "Explore Young Minds", id: "young-minds" },
  },
  {
    slug: "women",
    name: "Women — Rooted & Rising",
    subtitle: "Pause • Reflect • Reconnect • Rise",
    format: "Workshops | Group Sessions | Special Circles | One-to-One Sessions",
    desc: "Meaningful sessions designed to create space for self-reflection, confidence, connection and personal growth.",
    image: "/images/women1.jpeg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 6C12 10 10 16 14 22C16 26 18 30 18 30C18 30 20 26 22 22C26 16 24 10 18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 14V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 18L18 16L22 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-sage",
    preset: "wide" as const,
    cta: { label: "Explore Women's Programs", id: "women" },
  },
  {
    slug: "elders",
    name: "Elders",
    subtitle: "Connect • Share • Create • Celebrate",
    format: "Activity Sessions | Community Programs | Special Gatherings",
    desc: "Experiences that encourage connection, storytelling, creativity and meaningful engagement.",
    image: "/images/elders1.jpeg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 26C14 26 16 22 18 22C20 22 22 26 22 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 30C10 30 12 26 18 26C24 26 26 30 26 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-sage",
    preset: "portrait" as const,
    cta: { label: "Explore Elders Programs", id: "elders" },
  },
  {
    slug: "workshops",
    name: "Special Workshops",
    subtitle: "Theme-based, tailored experiences",
    format: "Schools · Communities · Apartments · Organisations · Special Groups",
    desc: "Theme-based workshops for schools, communities, apartments, organisations and special groups.",
    image: "/images/workshop.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 10C14 14 14 22 18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 10C22 14 22 22 18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-moss",
    preset: "portrait" as const,
    cta: { label: "View Upcoming Workshops", id: "events" },
  },
  {
    slug: "one-to-one",
    name: "One-to-One Sessions",
    subtitle: "A more personal and focused conversation",
    format: "Individual · Personal · Focused",
    desc: "For individuals who prefer a more personal and focused conversation.",
    image: "/images/one-to-one.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M12 18C12 18 14 12 18 12C22 12 24 18 24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 18V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    accent: "text-moss",
    preset: "wide" as const,
    cta: { label: "Enquire About a Session", id: "contact" },
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
              Programs designed around people
            </FilterText>
            <p className="text-ink/60 text-lg font-light max-w-2xl mx-auto mt-6">
              At SsaRanga, programs are designed around people, life stages and
              real experiences.
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
                      {program.format}
                    </span>
                  </div>

                  <FilterText
                    variant={VARIANTS[i % VARIANTS.length]}
                    className={`display-xl text-ink block`}
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

                  <motion.div
                    className="mt-7"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AnchorLink
                      id={program.cta.id}
                      className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-moss text-white font-semibold text-sm tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,138,199,0.45)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span className="relative z-10">{program.cta.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="cta-sheen" />
                    </AnchorLink>
                  </motion.div>
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