"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* ── Meet the Founder ── */}
      <section ref={ref} className="section-padding bg-paper">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          {/* Portrait */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)] ring-1 ring-moss/10">
              <Image
                src="/images/founder.jpeg"
                alt="Sonia Sreeraj — Founder of SsaRanga"
                width={900}
                height={1150}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
            <div className="mt-6 text-center">
              <p className="text-ink text-xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
                Sonia Sreeraj
              </p>
              <p className="text-moss text-sm">Founder, SsaRanga</p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-moss mb-4 block">Meet the Founder</span>
            <FilterText as="h2" variant="melt" className="text-ink mb-6" duration={2}>
              Curiosity led to a deeper question
            </FilterText>
            <div className="space-y-5 text-ink/65 font-light leading-relaxed">
              <p>
                With a background in BSc – Pharmacognosy and an MBA in Marketing
                and around two decades of professional experience across service
                and product-based organisations, Sonia has spent years
                interacting with people from different backgrounds and
                perspectives.
              </p>
              <p>
                Over time, one thing became especially meaningful to her — the
                opportunity to understand people, listen to their stories and
                recognise the potential within them.
              </p>
              <p>
                Her interest in personal growth, spirituality, life learning and
                understanding the human mind gradually led to a deeper question:
              </p>
              <p className="text-moss font-medium text-lg">
                Can we create a space where people feel heard, understood and
                encouraged to grow?
              </p>
              <p>That thought became SsaRanga.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Founder's Message ── */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] max-w-[92vw] max-h-[92vw] rounded-full bg-sage/20 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            className="label-caps text-moss mb-6 block text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            Founder&apos;s Message
          </motion.span>

          <motion.div
            className="glass-light rounded-[2rem] p-8 md:p-12 card-hover"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg className="mb-6 h-10 w-10 text-moss/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.3 5.2C7.5 7.1 5 10.5 5 14.5c0 2.8 1.8 5 4 5s3.5-1.8 3.5-4-1.6-4-3.5-4c-.4 0-.8.1-1.2.2C7.8 8.3 9.4 6.5 11.3 5.2zm10 0C17.5 7.1 15 10.5 15 14.5c0 2.8 1.8 5 4 5s3.5-1.8 3.5-4-1.6-4-3.5-4c-.4 0-.8.1-1.2.2C17.8 8.3 19.4 6.5 21.3 5.2z" />
            </svg>
            <div className="space-y-5 text-ink/70 font-light leading-relaxed text-base md:text-lg">
              <p>
                SsaRanga began as a thought that quietly lived in my heart.
              </p>
              <p>
                In a world that is constantly moving, I felt there was a need
                for a space where we could simply pause, breathe, reflect and
                reconnect with ourselves.
              </p>
              <p>
                I have always believed that every person carries something
                beautiful within them — a story, a strength, an experience, a
                dream or a possibility waiting to be discovered.
              </p>
              <p>
                SsaRanga is my humble effort to create that space. A space where
                young minds can discover their strengths, women can reconnect
                with themselves, and elders can share their wisdom, stories and
                experiences.
              </p>
              <p className="text-moss font-medium">
                My vision is simple: to nurture what is within us, so that we
                can grow beyond what we thought was possible.
              </p>
              <p>
                I welcome you to SsaRanga — not just as a program, but as a
                journey of connection, reflection and growth.
              </p>
              <p className="text-ink/90">
                With warmth,
                <br />
                <span className="text-moss">Sonia Sreeraj</span>
                <br />
                <span className="text-ink/50 text-sm">Founder, SsaRanga</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}