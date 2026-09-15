"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";
import AnchorLink from "@/components/AnchorLink";

const spaces = [
  {
    id: "young-minds",
    emoji: "🌱",
    title: "Young Minds",
    desc: "Helping children and young people build emotional awareness, confidence, communication and life skills.",
    cta: "Explore Young Minds",
    image: "/images/kids1.jpeg",
    alt: "Young minds at SsaRanga",
  },
  {
    id: "women",
    emoji: "🌸",
    title: "Women — Rooted & Rising",
    desc: "A space for women to pause, reconnect, reflect and move forward with renewed confidence.",
    cta: "Explore Women",
    image: "/images/women1.jpeg",
    alt: "Women's circle at SsaRanga",
  },
  {
    id: "elders",
    emoji: "🌼",
    title: "Elders",
    desc: "A meaningful space where experiences, stories, creativity and wisdom can be shared and celebrated.",
    cta: "Explore Elders",
    image: "/images/elders1.jpeg",
    alt: "Elders sharing stories at SsaRanga",
  },
];

export default function ThreeSpacesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="spaces" ref={ref} className="section-padding bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-caps text-moss mb-4 block">Our Three Spaces</span>
          <FilterText as="h2" variant="melt" className="text-ink" duration={2.2}>
            Three journeys, one SsaRanga
          </FilterText>
          <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink/60">
            Young Minds, Women and Elders — connecting generations, one story at
            a time.
          </p>
        </motion.div>

        {/* Three pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {spaces.map((space, i) => (
            <motion.article
              key={space.title}
              className="group relative overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-card)] ring-1 ring-moss/10 card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-6 text-4xl drop-shadow select-none" aria-hidden="true">
                  {space.emoji}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <h3 className="text-ink text-2xl mb-3">{space.title}</h3>
                <p className="text-ink/65 font-light leading-relaxed mb-6 text-sm md:text-base">
                  {space.desc}
                </p>
                <AnchorLink
                  id={space.id}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-moss/10 text-moss font-semibold text-sm transition-all duration-300 hover:bg-moss hover:text-white hover:-translate-y-0.5 cursor-pointer"
                >
                  {space.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </AnchorLink>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}