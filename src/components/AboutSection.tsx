"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";
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
          {/* Founder portrait — morphs from rectangle into an organic shape
              while scrolling, with a gentle parallax drift */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MorphImage
              src="/images/founder.jpg"
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
            className="md:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pull quote — liquid fractal filter-text moment */}
            <FilterText
              as="blockquote"
              variant="fractal"
              duration={2.4}
              className="pull-quote text-white/85 text-center max-w-xl mx-auto"
            >
              &ldquo;To nurture the roots and make them strong enough to face a
              super-dynamic, vibrant world.&rdquo;
            </FilterText>

            {/* Story paragraphs */}
            <div className="space-y-5 text-white/70 font-light leading-relaxed">
              <p>
                Sonia Sreeraj is the founder of SsaRanga, a space created with a simple
                yet meaningful vision — to nurture minds, strengthen inner confidence,
                and help people face an ever-changing and challenging world with greater
                clarity and resilience.
              </p>

              <p>
                With a B.Sc. and MBA in Marketing, Sonia brings over 20 years of
                professional experience as an Account Manager in a multinational
                organisation. Her career journey across both service-based and
                product-based organisations has given her the opportunity to work with
                and understand people from diverse backgrounds, personalities and walks
                of life. Building relationships, coordinating with different kinds of
                people, and understanding their perspectives have been an important part
                of her professional journey.
              </p>

              <p>
                Beyond her corporate career, Sonia has developed a deep personal interest
                in yoga, spirituality, life coaching and holistic well-being. She regularly
                explores books, podcasts, talks and learning resources related to
                spirituality, life coaching, personal growth and healing. She has also
                attended life coaching sessions, which have further strengthened her
                interest in understanding the human mind and emotional well-being.
              </p>

              <p>
                One of Sonia&apos;s natural strengths is her ability to observe, listen
                and understand people, particularly the thoughts and emotions of
                children. She believes that every child has unique potential, and that
                the right guidance, emotional support and nurturing environment can help
                young minds grow with confidence. This belief became the foundation for
                SsaRanga.
              </p>

              <p>
                She started SsaRanga with a vision to nurture young minds at their roots
                and help them become stronger, more confident and better prepared to face
                the dynamic world around them. At the same time, she believes that women
                and elders have their own unique strengths, experiences and stories that
                deserve to be recognised and respected.
              </p>

              <p>
                Through SsaRanga, she hopes to create a supportive space where women can
                discover and strengthen their inner potential, while elders can feel heard,
                valued and comfortable expressing their thoughts and experiences.
              </p>
            </div>

            {/* Vision card */}
            <div className="glass-dark rounded-2xl p-6 md:p-8 mt-8">
              <span className="label-caps text-gold/70 mb-3 block">
                Her Vision
              </span>
              <p
                className="text-white/80 text-lg md:text-xl italic font-light leading-relaxed"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;When we strengthen the mind at its roots, we create the
                foundation for a more confident, compassionate and resilient
                life.&rdquo;
              </p>
            </div>

            {/* Personal note */}
            <p className="text-white/55 text-sm font-light italic">
              For Sonia, SsaRanga is more than a programme — it is an attempt to
              create a space where people can pause, connect, reflect, grow and
              rediscover their inner strength.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
