"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MorphImage from "./MorphImage";
import FilterText from "./FilterText";
import { scrollToSection } from "@/lib/scrollTo";

export interface PillarConfig {
  id: string;
  programSlug: string;
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
}

export default function PillarSection({ config }: { config: PillarConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ssaranga:select-program", { detail: config.programSlug })
      );
    }
    scrollToSection("programs");
  };

  return (
    <section
      id={config.id}
      ref={ref}
      className="section-padding bg-paper relative overflow-hidden"
    >
      {/* Ambient background blur */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] max-w-[92vw] max-h-[92vw] rounded-full bg-sage/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Focused Photo 1 with signature wavy morphing frame */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]">
              {/* Outer decorative ambient glow */}
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-moss/20 via-sage/25 to-cream/40 blur-xl opacity-70 pointer-events-none" />
              <MorphImage
                src={config.image}
                alt={config.imageAlt}
                preset="portrait"
                parallax
              />
            </div>
          </motion.div>

          {/* Right Column: Heading, Narrative, Chips & Approach Highlights */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-3">
              <span className="label-caps text-moss block">
                {config.kicker}
              </span>
            </div>
            <FilterText as="h2" variant="melt" className="text-ink mb-4" duration={1.1}>
              {config.heading}
            </FilterText>

            <p className="text-ink/80 font-light leading-relaxed text-base sm:text-lg mb-6">
              {config.intro}
            </p>

            {/* Chips Box: What We Nurture / Explore */}
            <div className="mb-6 rounded-2xl glass-light p-4 sm:p-5 border border-moss/15">
              <span className="label-caps text-moss text-xs block mb-3 font-semibold">
                {config.chipsTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {config.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-moss/20 text-ink/80 text-xs sm:text-sm font-medium shadow-xs"
                  >
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" className="text-moss" aria-hidden="true">
                      <path d="M3 10.5L8 15L17 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Approach takeaway */}
            <div className="mb-7 pl-4 border-l-2 border-moss/40 space-y-1">
              <p className="text-moss text-xs font-semibold uppercase tracking-wider">
                {config.approachTitle}
              </p>
              <p className="text-ink/70 text-sm font-light leading-relaxed">
                {config.approachRows[0]}
              </p>
              {config.approachHighlight && (
                <p className="text-moss font-medium text-sm sm:text-base italic pt-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {config.approachHighlight}
                </p>
              )}
            </div>

            {/* Direct CTA -> navigates to this domain's program */}
            <div>
              <a
                href="#programs"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-moss text-white font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:bg-deep-forest hover:shadow-[0_10px_35px_rgba(0,138,199,0.35)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="relative z-10">{config.ctaLabel}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="cta-sheen" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}