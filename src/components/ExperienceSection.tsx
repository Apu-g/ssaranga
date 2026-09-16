"use client";

import { motion } from "framer-motion";
import FilterText from "./FilterText";

const steps = [
  {
    step: "01",
    name: "Connect",
    tagline: "Building Safety",
    desc: "We begin by creating a comfortable, welcoming, and judgment-free environment where everyone feels safe to be themselves.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="15" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 30C6 24 9 22 13 22C17 22 20 24 22 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M23 24C26 24 28 25 30 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    name: "Explore",
    tagline: "Discovering Thoughts",
    desc: "Through guided conversations and playful activities, we explore emotions, real-world experiences, and untapped possibilities.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M18 8C14 12 14 24 18 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 8C22 12 22 24 18 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 18H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    name: "Reflect",
    tagline: "Pausing Within",
    desc: "Participants get a deliberate opportunity to slow down, absorb new perspectives, and understand what they have discovered.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M18 12V18L23 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "04",
    name: "Express",
    tagline: "Authentic Voice",
    desc: "We encourage open expression through storytelling, creative arts, reflective writing, and meaningful group dialogue.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M8 26C8 22 12 20 16 20C20 20 24 22 24 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M26 10V20M31 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "05",
    name: "Grow",
    tagline: "Moving Forward",
    desc: "Every experience becomes a lasting stepping stone toward greater inner clarity, resilience, empathy, and confidence.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 4C18 4 18 14 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 8C14 8 10 11 10 16C10 22 14 26 18 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 8C22 8 26 11 26 16C26 22 22 26 18 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 28V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 32H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-paper relative overflow-hidden">
      {/* Ambient background glowing circles */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[50rem] h-[32rem] max-w-[96vw] rounded-full bg-sage/20 blur-[130px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[28rem] h-[28rem] rounded-full bg-cream/50 blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            className="mb-3 inline-block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="label-caps text-moss block">
              How SsaRanga Works
            </span>
          </motion.div>
          <FilterText as="h2" variant="melt" className="text-ink mb-4" duration={1.1}>
            The SsaRanga Experience
          </FilterText>
          <p className="text-ink/80 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            There is no single rigid formula for growth. Our sessions unfold across a natural, supportive five-stage journey.
          </p>
        </div>

        {/* Desktop Process Timeline Layout (5 balanced interconnected cards) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 xl:gap-6 relative">
          {/* Connecting gradient rail behind cards */}
          <div className="absolute top-[38px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-moss/20 via-moss/50 to-moss/20 pointer-events-none z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative z-10 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease }}
            >
              {/* Step indicator node */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-moss shadow-md flex items-center justify-center text-moss font-bold text-sm ring-4 ring-moss/10 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
              </div>

              {/* Card content */}
              <div className="glass-light rounded-[2rem] p-6 h-full flex flex-col items-center text-center border border-moss/15 shadow-[0_10px_30px_rgba(0,59,92,0.06)] hover:shadow-[0_20px_50px_rgba(0,138,199,0.18)] hover:-translate-y-2 hover:border-moss/40 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-moss/15 to-sage/30 text-moss flex items-center justify-center mb-4 ring-1 ring-moss/20">
                  {step.icon}
                </div>
                <h3 className="text-ink text-xl font-normal mb-1">{step.name}</h3>
                <span className="label-caps text-moss/80 text-[0.65rem] font-semibold mb-3">
                  {step.tagline}
                </span>
                <p className="text-ink/70 text-xs sm:text-sm font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Vertical Timeline Layout (Clean, continuous connected rail) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6">
          {/* Vertical continuous line */}
          <div className="absolute top-4 bottom-4 left-[21px] sm:left-[25px] w-[2px] bg-gradient-to-b from-moss/20 via-moss/50 to-moss/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative flex items-start gap-4 sm:gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
            >
              {/* Step indicator node on the timeline rail */}
              <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-moss shadow-sm flex items-center justify-center text-moss font-bold text-xs sm:text-sm ring-4 ring-moss/10 z-10">
                {step.step}
              </div>

              {/* Card */}
              <div className="flex-1 glass-light rounded-2xl p-5 sm:p-6 border border-moss/15 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-xl bg-moss/10 text-moss shrink-0">
                    {step.icon}
                  </span>
                  <div>
                    <h3 className="text-ink text-lg sm:text-xl font-normal leading-tight">
                      {step.name}
                    </h3>
                    <span className="label-caps text-moss text-[0.65rem]">
                      {step.tagline}
                    </span>
                  </div>
                </div>
                <p className="text-ink/70 text-sm font-light leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing summary quote banner */}
        <motion.div
          className="mt-14 md:mt-18 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          <div className="inline-flex items-center px-6 py-3.5 rounded-full bg-cream/70 border border-moss/20 shadow-xs">
            <p
              className="text-ink text-base sm:text-lg font-light italic"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Every experience is a deliberate step towards greater self-awareness, empathy, and confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}