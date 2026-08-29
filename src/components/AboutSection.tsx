"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import MorphImage from "./MorphImage";

export default function AboutSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-deep-forest relative overflow-hidden" ref={sectionRef}>
      {/* Subtle botanical overlay */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/detail-botanical.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className={`text-center ${showHeader ? "mb-16" : "hidden"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-gold mb-4 block">
            The Founder
          </span>
          <h2 className="text-white">The Story Behind SsaRanga</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          {/* Founder portrait */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MorphImage
              src="/images/founder.png"
              alt="Sonia Sreeraj — Founder of SsaRanga"
              preset="portrait"
              parallax
            />

            {/* Name label */}
            <div className="mt-6 text-center">
              <p className="text-white text-xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
                Sonia Sreeraj
              </p>
              <p className="text-sage text-sm">Founder, SsaRanga</p>
            </div>

            {/* Signature-style element */}
            <div className="mt-4">
              <p
                className="text-gold/60 text-2xl italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Sonia
              </p>
            </div>
          </motion.div>

          {/* Story content */}
          <motion.div
            className="md:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/70 font-light leading-relaxed">
              Sonia Sreeraj is founder of SsaRanga, a space built with a simple
              vision — nurture minds, strengthen inner confidence, and help
              people face life with greater clarity, resilience, and purpose.
            </p>

            <p className="text-white/70 font-light leading-relaxed">
              With a B.Sc. and MBA in Marketing, Sonia brings 20+ years of
              professional experience as an Account Manager in multinational
              organisations. Her journey across service- and product-based
              companies has helped her work with people from diverse backgrounds,
              understand different perspectives, and build meaningful
              relationships.
            </p>

            <p className="text-white/70 font-light leading-relaxed">
              Beyond her corporate career, Sonia has developed a strong interest
              in yoga, spirituality, life coaching, personal growth, and holistic
              well-being. Her continuous learning through books, talks, podcasts,
              and life-coaching experiences has deepened her understanding of the
              human mind and emotional well-being.
            </p>

            <p className="text-white/70 font-light leading-relaxed">
              Sonia has a natural ability to listen, observe, and connect with
              people, especially children. She believes every child carries unique
              potential and, with right guidance, emotional support, and nurturing
              environment, can grow into a confident individual.
            </p>

            <p className="text-white/70 font-light leading-relaxed">
              This belief became foundation of SsaRanga — a space created to
              nurture young minds while also empowering women to discover their
              inner potential and giving elders a place where their experiences,
              thoughts, and stories are heard and valued.
            </p>

            {/* Vision card */}
            <div className="glass-dark rounded-2xl p-6 md:p-8 mt-8">
              <span className="label-caps text-gold/70 mb-3 block">
                Her Vision
              </span>
              <p
                className="text-white/80 text-lg md:text-xl italic font-light leading-relaxed"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;Create stronger minds, confident individuals, and a more
                supportive community.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
