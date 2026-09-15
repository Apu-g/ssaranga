"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";
import AnchorLink from "@/components/AnchorLink";

export interface PillarConfig {
  id: string;
  kicker: string;
  heading: string;
  intro: string;
  chipsTitle: string;
  chips: string[];
  approachTitle: string;
  approachRows: string[];
  approachHighlight?: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
}

export default function PillarSection({ config }: { config: PillarConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* ── Intro + image ── */}
      <section id={config.id} ref={ref} className="section-padding bg-paper">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)] ring-1 ring-moss/10">
              <Image
                src={config.image}
                alt={config.imageAlt}
                width={1100}
                height={1400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>
            {config.secondaryImage && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[config.secondaryImage, config.image].map((src, i) => (
                  <div key={`${src}-${i}`} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={src}
                      alt={config.imageAlt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-moss mb-4 block">{config.kicker}</span>
            <FilterText as="h2" variant="melt" className="text-ink mb-6" duration={2}>
              {config.heading}
            </FilterText>
            <p className="text-ink/65 font-light leading-relaxed text-base md:text-lg">
              {config.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── What we nurture / explore / create space for ── */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] max-w-[90vw] max-h-[90vw] rounded-full bg-sage/20 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps text-moss mb-4 block">
              {config.chipsTitle}
            </span>
            <FilterText as="h2" variant="turbulence" className="text-ink" duration={2}>
              What we nurture
            </FilterText>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {config.chips.map((chip, i) => (
              <motion.span
                key={chip}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper border border-moss/15 text-ink/80 text-sm md:text-base font-light shadow-[var(--shadow-card)] card-hover"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-moss" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10.5L8 15L17 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {chip}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our approach ── */}
      <section className="section-padding bg-paper">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="label-caps text-moss mb-4 block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            {config.approachTitle}
          </motion.span>
          <FilterText as="h2" variant="melt" className="text-ink mb-7" duration={2}>
            Engaged, not lectured
          </FilterText>

          <div className="space-y-5 text-ink/65 font-light leading-relaxed text-base md:text-lg">
            {config.approachRows.map((row, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {row}
              </motion.p>
            ))}
          </div>

          {config.approachHighlight && (
            <motion.p
              className="text-moss text-xl md:text-2xl mt-8"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {config.approachHighlight}
            </motion.p>
          )}

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <AnchorLink
              id="programs"
              className="group relative inline-flex items-center gap-2 px-9 py-4 rounded-full bg-moss text-white font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,138,199,0.45)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative z-10">{config.ctaLabel}</span>
              <span className="cta-sheen" />
            </AnchorLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}