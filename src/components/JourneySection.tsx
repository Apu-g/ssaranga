"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    title: "Pause",
    desc: "Create a peaceful space to slow down.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="10" y="8" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="8" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Relax",
    desc: "Release pressure and settle the mind.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M8 20C8 20 12 14 16 14C20 14 24 20 24 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 24C6 24 10 18 16 18C22 18 26 24 26 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 6V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Reflect",
    desc: "Notice thoughts, feelings and choices.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Grow",
    desc: "Build clarity, confidence and positive habits.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 26V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 14C16 14 12 10 12 7C12 4 14 3 16 3C18 3 20 4 20 7C20 10 16 14 16 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 20C16 20 10 18 8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 22C16 22 22 20 24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 26H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Shine",
    desc: "Carry these strengths into everyday life.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 24V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 16H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 16H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 7.5L10.3 10.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21.7 21.7L24.5 24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 24.5L10.3 21.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21.7 10.3L24.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center shrink-0 w-[15rem] sm:w-[17rem]"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="glass-light rounded-2xl p-5 sm:p-6 card-hover w-full mb-5">
        <div className="text-moss mb-3 flex justify-center">{step.icon}</div>
        <h3 className="text-ink text-lg sm:text-xl mb-1.5">{step.title}</h3>
        <p className="text-ink/60 text-sm font-light leading-relaxed">{step.desc}</p>
      </div>
      <div className="w-3.5 h-3.5 rounded-full border-2 border-gold/50 bg-cream flex items-center justify-center mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
      </div>
      <span className="label-caps text-sage text-[0.55rem]">Step {index + 1}</span>
      </motion.div>
    );
}

export default function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Double the array for seamless loop
  const doubled = [...steps, ...steps];

  return (
    <section ref={ref} className="bg-cream relative pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center mb-8 md:mb-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
      >
        <span className="label-caps text-moss mb-3 block">The SsaRanga Journey</span>
        <h2 className="text-ink mb-2">A simple path from pause to growth</h2>
        <p className="text-ink/55 text-sm md:text-base font-light">Pause &rarr; awareness &rarr; growth</p>
      </motion.div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-5 md:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
        >
          {doubled.map((step, i) => (
            <StepCard key={`${step.title}-${i}`} step={step} index={i % steps.length} />
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="text-center mt-8 md:mt-10 px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6, ease }}
      >
        <div className="inline-block px-5 py-2.5 md:px-7 md:py-3 rounded-xl bg-moss/10 border border-sage/20">
          <p className="pull-quote text-ink/65 text-sm md:text-lg">
            Every child deserves a space to breathe, think, learn and grow.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
