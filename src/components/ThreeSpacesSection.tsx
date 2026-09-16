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
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section id="spaces" ref={ref} className="section-padding bg-paper relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[32rem] max-w-[94vw] rounded-full bg-sage/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-3 inline-block">
            <span className="label-caps text-moss block">
              Our Three Spaces
            </span>
          </div>
          <FilterText as="h2" variant="melt" className="text-ink mb-4" duration={1.1}>
            Three journeys, one SsaRanga
          </FilterText>
          <p className="mx-auto mt-3 max-w-xl text-base sm:text-lg font-light text-ink/75 leading-relaxed">
            Young Minds, Women and Elders — connecting generations, one story at a time.
          </p>
        </motion.div>

        {/* Three pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {spaces.map((space, i) => (
            <motion.article
              key={space.title}
              className="group relative overflow-hidden rounded-[2rem] bg-white/90 border border-moss/15 shadow-[0_12px_40px_rgba(0,59,92,0.08)] card-hover flex flex-col justify-between"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-cream">
                  <Image
                    src={space.image}
                    alt={space.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/20 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-moss/20 shadow-xs flex items-center gap-1.5">
                    <span className="text-xl select-none" aria-hidden="true">
                      {space.emoji}
                    </span>
                    <span className="text-[0.7rem] font-semibold text-moss uppercase tracking-wider label-caps">
                      Space {i + 1}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                  <h3 className="text-ink text-xl sm:text-2xl font-medium mb-3">{space.title}</h3>
                  <p className="text-ink/75 font-light leading-relaxed text-sm sm:text-base">
                    {space.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                <AnchorLink
                  id={space.id}
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-moss/10 text-moss font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-moss hover:text-white hover:shadow-[0_8px_25px_rgba(0,138,199,0.3)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{space.cta}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
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