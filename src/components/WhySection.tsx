"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";

const cards = [
  {
    title: "Relax the mind",
    description:
      "Create a soothing environment that helps children slow down and release everyday stress.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C24 4 10 14 10 26C10 34 16 40 24 44C32 40 38 34 38 26C38 14 24 4 24 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 16V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 22C20 20 22 22 24 20C26 22 28 20 30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Build emotional balance",
    description:
      "Support children in understanding emotions and responding in healthy, positive ways.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 24C16 24 20 30 24 30C28 30 32 24 32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 34V40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Think clearly",
    description:
      "Encourage thoughtful choices, clarity of thought and positive decision-making.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 36C14 36 16 28 24 28C32 28 34 36 34 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12L24 6L30 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 6V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18L18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 18L30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 24H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 24H38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="why" className="section-padding relative overflow-hidden bg-deep-forest" ref={sectionRef}>
      {/* Photo background with deep-green contrast overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/leaves-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-deep-forest/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-pine/50 to-deep-forest" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section intro */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-gold mb-4 block">
            Why SsaRanga
          </span>
          <FilterText variant="turbulence" className="text-white mb-6" duration={2.2}>
            The Mind Spa
          </FilterText>
          <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
            Creating a positive space where children can pause, reflect and
            grow.
          </p>
        </motion.div>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-dark glass-sheen rounded-3xl p-8 md:p-10 card-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="w-20 h-20 mb-7 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sage/25 to-transparent border border-white/10 text-sage">
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl text-white mb-4">
                {card.title}
              </h3>
              <p className="text-white/75 font-light leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="pull-quote text-center text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.6,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          &ldquo;The focus is not just relaxation — it is learning to grow with
          calmness, clarity and confidence.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
