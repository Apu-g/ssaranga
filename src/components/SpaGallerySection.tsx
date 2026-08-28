"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";

const SPA_IMAGES = [
  "/images/spa-gallery/1.jpg",
  "/images/spa-gallery/2.jpg",
  "/images/spa-gallery/3.jpg",
  "/images/spa-gallery/4.jpg",
  "/images/spa-gallery/5.jpg",
];

const ease = [0.16, 1, 0.3, 1] as const;

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const groupImages = [...SPA_IMAGES, ...SPA_IMAGES];
  return (
    <div className="spa-marquee-row">
      <div className={`spa-marquee-track ${reverse ? "reverse" : ""}`}>
        {[0, 1].map((track) => (
          <div key={track} className="spa-marquee-group">
            {groupImages.map((src, i) => (
              <div
                key={`${track}-${i}`}
                className="group relative aspect-[4/3] w-60 sm:w-72 md:w-[24rem] shrink-0 overflow-hidden rounded-3xl bg-moss/10 ring-1 ring-ink/5 shadow-[var(--shadow-card)]"
              >
                <Image
                  src={src}
                  alt="Inside SsaRanga — The Mind Spa"
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 384px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SpaGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="spa-gallery"
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
          Inside The Mind Spa
        </span>
        <FilterText as="h2" variant="melt" className="text-ink" duration={2.2}>
          A glimpse of the calm
        </FilterText>
        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink/60">
          Every corner is designed to help you slow down, breathe and feel at
          ease.
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
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </motion.div>
    </section>
  );
}