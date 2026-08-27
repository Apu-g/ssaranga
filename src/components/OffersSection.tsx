"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const offers = [
  {
    num: "01",
    title: "Stress relief",
    desc: "A calm setting to help children step away from pressure and reset.",
  },
  {
    num: "02",
    title: "Emotional well-being",
    desc: "Activities and guidance that encourage emotional awareness and balance.",
  },
  {
    num: "03",
    title: "Confidence",
    desc: "A positive environment that helps children trust themselves and their abilities.",
  },
  {
    num: "04",
    title: "Positive decision-making",
    desc: "Developing the habit of pausing, thinking and choosing thoughtfully.",
  },
  {
    num: "05",
    title: "Personal growth",
    desc: "Building everyday skills that support learning, relationships and life.",
  },
];

export default function OffersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-deep-forest relative overflow-hidden" ref={sectionRef}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/leaves-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-pine/60 to-deep-forest" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-gold mb-4 block">
            What We Offer
          </span>
          <h2 className="text-white mb-6">
            What the Mind Spa
            <br />
            Experience Offers
          </h2>
          <p className="text-white/70 text-lg max-w-xl font-light">
            A structured, supportive experience designed around the child&apos;s
            overall well-being.
          </p>
        </motion.div>

        {/* Two-column numbered glass cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-16">
          {offers.map((item, i) => (
            <motion.div
              key={item.num}
              className="glass-dark glass-sheen rounded-2xl p-6 md:p-7 group card-hover"
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex gap-5">
                <span
                  className="text-gold/70 text-4xl font-light leading-none select-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.num}
                </span>
                <div>
                  <h3 className="text-white text-xl mb-2 transition-colors duration-300 group-hover:text-gold-soft">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing pill badge */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-3 px-8 py-3 rounded-full glass-dark">
            <span className="text-sage text-sm">Calm mind</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="text-sage text-sm">Clear thought</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="text-sage text-sm">Confident child</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
