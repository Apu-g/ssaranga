"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FilterText from "./FilterText";

const testimonials = [
  {
    quote:
      "My daughter looks forward to every session. She's calmer, more confident, and actually enjoys reflecting on her day now.",
    name: "Priya M.",
    role: "Parent of a 10-year-old",
  },
  {
    quote:
      "SsaRanga gave my son a space he truly trusts. He talks about what he learns there without being asked — that's when I know it's working.",
    name: "Arjun K.",
    role: "Parent of a 12-year-old",
  },
  {
    quote:
      "I used to feel nervous before exams. Now I pause, breathe, and think clearly. The Mind Spa taught me how to stay calm.",
    name: "Meera S.",
    role: "Student, Age 14",
  },
  {
    quote:
      "The workshops are unlike anything else out there. It's not therapy, it's not school — it's a safe, warm space where kids just… grow.",
    name: "Lakshmi R.",
    role: "Parent of an 8-year-old",
  },
  {
    quote:
      "After each session I feel lighter. Like someone helped me sort through all the thoughts in my head without judging me.",
    name: "Vikram D.",
    role: "Student, Age 15",
  },
  {
    quote:
      "We've seen a real change in how our daughter handles frustration. She pauses before reacting now — a skill most adults haven't mastered.",
    name: "Ananya T.",
    role: "Parent of a 9-year-old",
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
          Words from Our Community
        </span>
        <FilterText as="h2" variant="melt" className="text-ink" duration={2.2}>
          Real stories, real growth
        </FilterText>
        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink/60">
          Hear from the parents and young minds who have experienced the
          SsaRanga difference.
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
    </section>
  );
}
