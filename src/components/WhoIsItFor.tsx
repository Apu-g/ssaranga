"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const childrenPoints = [
  "Relax and manage everyday stress",
  "Build emotional balance",
  "Develop clarity of thought",
  "Make thoughtful, positive decisions",
  "Grow in confidence",
];

const parentsPoints = [
  "Give children a supportive environment",
  "Encourage healthy emotional growth",
  "Help them develop confidence",
  "Offer constructive relaxation and guidance",
  "Be part of a positive growth journey",
];

export default function WhoIsItFor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-paper" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-moss mb-4 block">
            Who Is It For
          </span>
          <h2 className="text-ink mb-6">
            A meaningful opportunity for children,
            <br className="hidden md:block" />
            with parents as supportive partners.
          </h2>
        </motion.div>

        {/* Two-column split card */}
        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg mb-16">
          {/* For Children — Light card */}
          <motion.div
            className="bg-cream-warm p-10 md:p-14"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-moss mb-6 block">
              For Children
            </span>
            <h3 className="text-ink text-2xl mb-8">
              Building strong foundations
            </h3>
            <ul className="space-y-4">
              {childrenPoints.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-ink/75 font-light"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <path
                      d="M10 3C10 3 5 7 5 12C5 15 7 17 10 19C13 17 15 15 15 12C15 7 10 3 10 3Z"
                      stroke="#235347"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Parents — Dark card */}
          <motion.div
            className="bg-pine p-10 md:p-14"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-gold/90 mb-6 block">
              For Parents
            </span>
            <h3 className="text-white text-2xl mb-8">
              Supporting the journey
            </h3>
            <ul className="space-y-4">
              {parentsPoints.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-white/80 font-light"
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <path
                      d="M10 3C10 3 5 7 5 12C5 15 7 17 10 19C13 17 15 15 15 12C15 7 10 3 10 3Z"
                      stroke="#D9A94C"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          className="pull-quote text-center text-ink/70 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Together, we can help children feel calm, think clearly and shine with
          confidence.
        </motion.p>
      </div>
    </section>
  );
}
