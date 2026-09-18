"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MorphImage from "./MorphImage";
import FilterText from "./FilterText";

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const [showFullMessage, setShowFullMessage] = useState(false);

  return (
    <section id="founder" ref={ref} className="section-padding bg-paper relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-sage/25 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-cream/60 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait Column — With Signature Wavy Morph Frame on scroll */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-moss/25 via-sage/30 to-cream/50 blur-xl opacity-75 pointer-events-none" />

              <MorphImage
                src="/images/founder.jpeg?v=2"
                alt="Sonia Sreeraj — Founder of SsaRanga"
                preset="portrait"
                parallax
              />

              {/* Floating identity pill */}
              <div className="mt-3 glass-light rounded-2xl p-3.5 text-center shadow-md border border-moss/15">
                <p className="text-ink text-lg font-medium leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  Sonia Sreeraj
                </p>
                <p className="text-moss text-xs font-semibold uppercase tracking-wider mt-0.5">
                  Founder, SsaRanga
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio & Vision Column */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-3">
              <span className="label-caps text-moss block">
                Meet the Founder
              </span>
            </div>
            <FilterText as="h2" variant="melt" className="text-ink mb-5" duration={1.1}>
              Thought led to a deeper question
            </FilterText>

            <div className="space-y-4 text-ink/75 font-light leading-relaxed text-base md:text-lg">
              <p>
                With a background in BSc – Pharmacognosy and an MBA in Marketing, accompanied by around two decades of professional experience across service and product-based organisations, Sonia has spent years interacting with people from diverse perspectives and walks of life.
              </p>
              <p>
                Over time, one purpose became especially meaningful to her: the opportunity to truly understand people, listen to their stories, and recognise the profound potential waiting within them.
              </p>
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cream/80 to-paper border border-moss/20 my-2">
                <p className="text-moss font-medium text-base sm:text-lg italic" style={{ fontFamily: "var(--font-heading)" }}>
                  &ldquo;Can we create a space where people feel heard, understood and encouraged to grow?&rdquo;
                </p>
                <p className="text-ink/60 text-xs mt-1">That quiet thought in the heart became SsaRanga.</p>
              </div>
            </div>

            {/* Founder's Message Card — Integrated seamlessly */}
            <div className="mt-5 rounded-2xl glass-light p-5 sm:p-6 border border-moss/15 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="label-caps text-moss text-xs block mb-1">Founder&apos;s Message</span>
                  <p className="text-ink text-sm sm:text-base font-light italic leading-relaxed text-ink/80">
                    &ldquo;:A thought . A dream. A journey.&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => setShowFullMessage(!showFullMessage)}
                  className="shrink-0 text-xs px-3.5 py-1.5 rounded-full bg-moss/10 text-moss hover:bg-moss hover:text-white transition-colors duration-200 font-medium cursor-pointer"
                  aria-expanded={showFullMessage}
                >
                  {showFullMessage ? "Read Less" : "Read Full Message"}
                </button>
              </div>

              <AnimatePresence>
                {showFullMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-moss/10 space-y-3 text-sm text-ink/70 font-light leading-relaxed"
                  >
                    <p>
                      I have always believed that every person carries something beautiful within them — a story, a strength, an experience, a dream or a possibility waiting to be discovered.
                    </p>
                    <p>
                      SsaRanga is my humble effort to create that space. A space where young minds can discover their strengths, women can reconnect with themselves, and elders can share their wisdom, stories and experiences.
                    </p>
                    <p className="text-moss font-medium">
                      My vision is simple: to nurture what is within us, so that we can grow beyond what we thought was possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}