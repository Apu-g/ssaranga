"use client";

import { motion } from "framer-motion";
import FilterText from "./FilterText";

const steps = [
  {
    step: "01",
    name: "Connect",
    desc: "We begin by creating a comfortable and welcoming environment.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
        <circle cx="13" cy="13" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="25" cy="15" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 30C6 24 9 22 13 22C17 22 20 24 22 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M23 24C26 24 28 25 30 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    name: "Explore",
    desc: "Through conversations and activities, we explore thoughts, emotions, experiences and possibilities.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 8C14 12 14 24 18 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 8C22 12 22 24 18 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 18H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    name: "Reflect",
    desc: "Participants get an opportunity to pause and understand what they discover.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 12V18L23 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "04",
    name: "Express",
    desc: "We encourage authentic expression through words, creativity, stories and interaction.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
        <path d="M8 26C8 22 12 20 16 20C20 20 24 22 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 10V20M31 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "05",
    name: "Grow",
    desc: "The experience becomes a stepping stone towards greater awareness and confidence.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
        <path d="M18 4C18 4 18 14 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 8C14 8 10 11 10 16C10 22 14 26 18 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 8C22 8 26 11 26 16C26 22 22 26 18 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 28V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 32H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function Connector() {
  return (
    <svg
      className="hidden xl:block text-moss/30 absolute top-8 left-1/2 transform -translate-x-1/2"
      width="120"
      height="2"
      viewBox="0 0 120 2"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 1H120"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ExperienceSection() {
  return (
    <section className="section-padding bg-paper relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[44rem] h-[30rem] max-w-[96vw] rounded-full bg-sage/15 blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            className="label-caps text-moss mb-5 block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            How SsaRanga Works
          </motion.span>
          <FilterText as="h2" variant="melt" className="text-ink mb-5">
            The SsaRanga Experience
          </FilterText>
          <p className="text-ink/60 text-lg font-light max-w-xl mx-auto">
            There is no single formula for growth. Our experiences follow a
            simple journey.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-6 md:grid-cols-3 xl:grid-cols-5">
          <Connector />
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="glass-light rounded-3xl p-7 md:p-8 card-hover relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease }}
            >
              <span
                className="label-caps text-moss/40 mb-2 block"
                aria-hidden="true"
              >
                {step.step}
              </span>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-2xl bg-moss/10 border border-moss/20 flex items-center justify-center text-moss">
                  {step.icon}
                </span>
                <h3 className="text-ink text-xl">{step.name}</h3>
              </div>
              <p className="text-ink/60 text-sm font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="text-center text-moss text-lg md:text-xl mt-14"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.5, duration: 0.7, ease }}
        >
          Every experience is a step towards greater awareness and confidence.
        </motion.p>
      </div>
    </section>
  );
}