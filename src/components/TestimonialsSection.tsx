"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";

const ease = [0.16, 1, 0.3, 1] as const;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper py-20 md:py-28"
    >
      {/* Header */}
      <motion.div
        className="mb-14 md:mb-20 px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
      >
        <span className="label-caps text-moss mb-4 block">
          What People Say
        </span>
        <FilterText as="h2" variant="melt" className="text-ink" duration={2.2}>
          Stories from our community
        </FilterText>
        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink/60">
          Personal stories of growth, pause and connection — shared as they
          arrive, with permission.
        </p>
      </motion.div>

      {/* Madhavi's Featured Feedback Card */}
      <motion.div
        className="mx-auto max-w-2xl px-6 mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease }}
      >
        <div className="relative glass-light glass-sheen rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-moss/10">
          {/* Decorative quote mark */}
          <svg
            className="mb-5 h-10 w-10 text-moss/40"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11.3 5.2C7.5 7.1 5 10.5 5 14.5c0 2.8 1.8 5 4 5s3.5-1.8 3.5-4-1.6-4-3.5-4c-.4 0-.8.1-1.2.2C7.8 8.3 9.4 6.5 11.3 5.2zm10 0C17.5 7.1 15 10.5 15 14.5c0 2.8 1.8 5 4 5s3.5-1.8 3.5-4-1.6-4-3.5-4c-.4 0-.8.1-1.2.2C17.8 8.3 19.4 6.5 21.3 5.2z" />
          </svg>

          <p className="text-ink/80 text-base sm:text-lg font-light leading-relaxed mb-8">
            This experience brings a wonderful sense of relaxation and happiness. It makes me feel positive and refreshed, helping me take my mind off everyday stress. There is a unique feeling of peace and joy that stays with me even afterwards. Overall, it is a truly refreshing and uplifting experience.
          </p>

          {/* Author row */}
          <div className="flex items-center gap-4 border-t border-moss/10 pt-5">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-moss/20 shrink-0 bg-sage/20 flex items-center justify-center">
              <span className="text-moss font-semibold text-lg">M</span>
            </div>
            <div>
              <span className="label-caps text-moss block font-semibold">Madhavi</span>
              <span className="text-ink/50 text-xs font-light mt-0.5 block">1-on-1 Session · SsaRanga</span>
            </div>
            {/* Verified badge */}
            <div className="ml-auto flex items-center gap-1.5 text-xs text-moss/70 font-light">
              <svg className="w-4 h-4 text-moss" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>Shared with permission</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Honest note */}
      <motion.p
        className="mx-auto mt-4 max-w-xl px-6 text-center text-sm font-light text-ink/45"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        We share feedback only with the person&apos;s permission. Have you been
        part of a SsaRanga experience? We&apos;d love to hear how it felt.
      </motion.p>
    </section>
  );
}
