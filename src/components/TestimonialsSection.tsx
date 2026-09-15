"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";

const testimonials = [
  {
    quote: "A beautiful space to pause and reflect.",
    name: "A visitor",
    role: "SsaRanga Community",
  },
  {
    quote: "The session created meaningful conversations.",
    name: "A participant",
    role: "SsaRanga Community",
  },
  {
    quote:
      "My child really enjoyed the activities and came back with so much enthusiasm.",
    name: "A parent",
    role: "SsaRanga Community",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <div className="testimonial-card shrink-0 w-[20rem] sm:w-[22rem] md:w-[26rem]">
      <div className="glass-light glass-sheen rounded-3xl p-7 md:p-9 card-hover h-full flex flex-col">
        <svg
          className="mb-4 h-8 w-8 text-gold/50"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M11.3 5.2C7.5 7.1 5 10.5 5 14.5c0 2.8 1.8 5 4 5s3.5-1.8 3.5-4-1.6-4-3.5-4c-.4 0-.8.1-1.2.2C7.8 8.3 9.4 6.5 11.3 5.2zm10 0C17.5 7.1 15 10.5 15 14.5c0 2.8 1.8 5 4 5s3.5-1.8 3.5-4-1.6-4-3.5-4c-.4 0-.8.1-1.2.2C17.8 8.3 19.4 6.5 21.3 5.2z" />
        </svg>
        <p className="pull-quote text-ink/75 leading-snug mb-6 flex-1">
          {testimonial.quote}
        </p>
        <div className="border-t border-moss/10 pt-4">
          <span className="label-caps text-moss block">{testimonial.name}</span>
          <span className="text-ink/45 text-xs font-light mt-1 block">
            {testimonial.role}
          </span>
        </div>
      </div>
    </div>
  );
}

function TestimonialRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className="testimonial-marquee-row">
      <div className={`testimonial-marquee-track ${reverse ? "reverse" : ""}`}>
        {[0, 1].map((track) => (
          <div key={track} className="testimonial-marquee-group">
            {doubled.map((t, i) => (
              <TestimonialCard key={`${track}-${i}`} testimonial={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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

      {/* Marquee rows — full-bleed with edge fades */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.9, ease }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-32" />

        <div className="space-y-6 md:space-y-8">
          <TestimonialRow />
          <TestimonialRow reverse />
        </div>
      </motion.div>

      {/* Honest note */}
      <motion.p
        className="mx-auto mt-12 max-w-xl px-6 text-center text-sm font-light text-ink/45"
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
