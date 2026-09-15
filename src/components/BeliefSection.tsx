"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";

const beliefs = [
  "Every mind has potential.",
  "Every story has value.",
  "Every stage of life deserves space.",
];

export default function BeliefSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-cream relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] max-w-[90vw] max-h-[90vw] rounded-full bg-sage/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-moss mb-4 block">What We Believe</span>
          <FilterText as="h2" variant="turbulence" className="text-ink" duration={2.2}>
            Our beliefs shape everything we do
          </FilterText>
        </motion.div>

        {/* Three large statements */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief}
              className="glass-light rounded-3xl p-8 md:p-12 card-hover text-center"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="block text-5xl md:text-6xl font-light text-moss/20 select-none mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                0{i + 1}
              </span>
              <p
                className="text-ink text-xl md:text-2xl leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {belief}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="pull-quote text-center text-ink/70 max-w-3xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          At SsaRanga, we nurture the person within — not just the role they
          play in life.
        </motion.p>
      </div>
    </section>
  );
}