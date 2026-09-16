"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";

export default function PauseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-paper"
    >
      {/* Soft floating organic shape behind the text */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[46rem] max-w-[90vw] max-h-[90vw] rounded-full bg-sage/20 blur-[90px] pointer-events-none"
        animate={{ y: [-16, 16, -16], x: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          className="mb-4 inline-block"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-moss block">
            A Little Pause
          </span>
        </motion.div>

        <FilterText
          as="h2"
          variant="melt"
          className="text-ink mb-6"
          duration={1.1}
        >
          A Little Pause Can Change a Lot
        </FilterText>

        <motion.div
          className="mx-auto max-w-[640px] space-y-5 text-ink/80 font-light text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            Life moves quickly. Between responsibilities, expectations and
            constant change, we often forget to pause and listen to ourselves.
          </p>
          <p className="text-moss font-semibold text-lg">SsaRanga is a space for that pause.</p>
          <p>
            Through conversations, activities, storytelling, reflection,
            creativity and interactive experiences, we encourage people to
            reconnect with themselves and discover what lies within.
          </p>
        </motion.div>
      </div>
    </section>
  );
}