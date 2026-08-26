"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WAVE_FLAT } from "./WaveSeparator";

interface Props {
  image: string;
  alt: string;
  quote?: string;
  /** Color of the section above — rendered as a wave edge overlapping the photo */
  fromColor?: string;
  /** Color of the section below — rendered as a wave edge at the bottom */
  toColor?: string;
}

export default function SectionBreak({ image, alt, quote, fromColor, toColor }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pathTopRef = useRef<SVGPathElement>(null);
  const pathBotRef = useRef<SVGPathElement>(null);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="relative h-64 md:h-80">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-forest/50" />

        {quote && (
          <div className="absolute inset-0 flex items-center justify-center px-6 py-16">
            <motion.p
              className="pull-quote text-white/80 text-center max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {quote}
            </motion.p>
          </div>
        )}

        {/* Wave edges morphing on scroll */}
        <ScrollWaves
          containerRef={ref}
          topRef={pathTopRef}
          bottomRef={pathBotRef}
          fromColor={fromColor}
          toColor={toColor}
        />
      </div>
    </div>
  );
}

function ScrollWaves({
  containerRef,
  topRef,
  bottomRef,
  fromColor,
  toColor,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  topRef: React.RefObject<SVGPathElement | null>;
  bottomRef: React.RefObject<SVGPathElement | null>;
  fromColor?: string;
  toColor?: string;
}) {
  const hasWaves = Boolean(fromColor || toColor);

  useEffect(() => {
    if (!hasWaves) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (fromColor && topRef.current) topRef.current.setAttribute("d", WAVE_SHAPE_FLIP);
      if (toColor && bottomRef.current) bottomRef.current.setAttribute("d", WAVE_SHAPE);
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (fromColor && topRef.current) {
          gsap.fromTo(
            topRef.current,
            { attr: { d: WAVE_FLAT } },
            {
              attr: { d: WAVE_SHAPE_FLIP },
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        }
        if (toColor && bottomRef.current) {
          gsap.fromTo(
            bottomRef.current,
            { attr: { d: WAVE_FLAT } },
            {
              attr: { d: WAVE_SHAPE },
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        }
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [hasWaves, fromColor, toColor, containerRef, topRef, bottomRef]);

  if (!fromColor && !toColor) return null;

  return (
    <>
      {fromColor && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 right-0 w-full h-[clamp(36px,6vw,84px)] overflow-visible"
          style={{ transform: "scaleY(-1)" }}
        >
          <path ref={topRef} d={WAVE_FLAT} fill={fromColor} />
        </svg>
      )}
      {toColor && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 right-0 w-full h-[clamp(36px,6vw,84px)] overflow-visible"
        >
          <path ref={bottomRef} d={WAVE_FLAT} fill={toColor} />
        </svg>
      )}
    </>
  );
}

const WAVE_SHAPE = "M0,7 C20,1.5 38,11 55,6 C72,1.5 86,10 100,4 L100,12 L0,12 Z";
const WAVE_SHAPE_FLIP = "M0,5 C22,10.5 40,1 57,6 C74,10.5 88,2 100,8 L100,12 L0,12 Z";
