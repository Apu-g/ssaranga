"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import MorphImage from "./MorphImage";
import FilterText from "./FilterText";

const mission = [
  "Self-awareness",
  "Emotional expression",
  "Confidence",
  "Creativity",
  "Communication",
  "Connection",
  "Reflection",
  "Lifelong growth",
];

const nameMeaning = [
  { line: "Light like the Sun." },
  { line: "Strength like Śārṅga." },
  { line: "Harmony like music." },
  { line: "Wisdom to discover what already lies within." },
];

export default function AboutStorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <>
      {/* ── Story ── */}
      <section id="about" ref={ref} className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-paper">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <MorphImage
                  src="/images/simplethought.jpeg"
                  alt="Born from a simple thought — SsaRanga"
                  preset="wide"
                  parallax
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 glass-light rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-lg border border-moss/15 z-10"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <span className="label-caps text-moss text-xs block">Since its first moment</span>
                <span className="text-ink font-light text-base sm:text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  Every story matters.
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4">
                <span className="label-caps text-moss block">
                  About SsaRanga
                </span>
              </div>
              <FilterText as="h2" variant="melt" className="text-ink mb-6" duration={1.1}>
                Born from a simple thought
              </FilterText>
              <div className="space-y-5 text-ink/80 font-light leading-relaxed text-base md:text-lg">
                <p>
                  SsaRanga was born from a simple thought:{" "}
                  <em className="text-moss font-normal">
                    What if we created a space where people could simply pause
                    and be themselves?
                  </em>
                </p>
                <p>
                  A space without judgement. A space where thoughts could be
                  expressed, stories could be shared and strengths could be
                  discovered.
                </p>
                <p>
                  SsaRanga brings together experiences designed to nurture the
                  mind, emotions, confidence, creativity and connection of
                  people across different stages of life.
                </p>
                <p>
                  We believe that growth doesn&apos;t always begin with a big
                  change.
                </p>
                <p className="text-moss font-semibold text-lg">
                  Sometimes, it begins with a small conversation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why the Name ── */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-cream relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] max-w-[90vw] max-h-[90vw] rounded-full bg-sage/20 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-4 inline-block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps text-moss block">
              Why the Name SsaRanga?
            </span>
          </motion.div>
          <FilterText as="h2" variant="turbulence" className="text-ink mb-10" duration={1.1}>
            Light · Strength · Harmony · Wisdom
          </FilterText>
          <div className="grid sm:grid-cols-2 gap-5">
            {nameMeaning.map((item, i) => (
              <motion.div
                key={item.line}
                className="glass-light rounded-2xl p-6 md:p-8 card-hover border border-moss/15"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block text-moss/30 text-4xl font-light mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  0{i + 1}
                </span>
                <p className="text-ink text-lg md:text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.line}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision + Mission ── */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-paper">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Vision card */}
          <motion.div
            className="rounded-[2rem] p-8 md:p-12 overflow-hidden relative bg-gradient-to-br from-sage/40 via-cream to-paper glass-light border border-moss/20 shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-sage/40 blur-3xl pointer-events-none" />
            <div className="mb-4">
              <span className="label-caps text-moss block">
                Our Vision
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-light leading-snug text-ink" style={{ fontFamily: "var(--font-heading)" }}>
              To nurture the roots within, so every individual can grow stronger
              and move forward with confidence.
            </p>
          </motion.div>

          {/* Mission card */}
          <motion.div
            className="glass-light rounded-[2rem] p-8 md:p-12 border border-moss/20 shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4">
              <span className="label-caps text-moss block">
                Our Mission
              </span>
            </div>
            <h3 className="text-ink text-xl mb-6">
              To create meaningful experiences that encourage:
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {mission.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-moss/25 text-moss text-xs sm:text-sm font-semibold shadow-xs"
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 10.5L8 15L17 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section id="philosophy" className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-cream relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-sage/25 blur-[110px] pointer-events-none" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 inline-block">
            <span className="label-caps text-moss block">
              Our Philosophy
            </span>
          </div>
          <p className="text-moss text-2xl md:text-4xl mb-6 font-medium" style={{ fontFamily: "var(--font-heading)" }}>
            Nurture Within • Grow Beyond
          </p>
          <p className="text-ink/80 text-lg font-light leading-relaxed max-w-xl mx-auto">
            When we nurture what is within us, we become better prepared to
            understand ourselves, connect with others and face the world around
            us.
          </p>
        </motion.div>
      </section>
    </>
  );
}