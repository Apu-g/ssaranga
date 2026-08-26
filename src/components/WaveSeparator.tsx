"use client";

import { useEffect, useRef } from "react";

/* Organic wave edge between two solid-colored sections.
   The path morphs on scroll (scrubbed) like the separators in
   OnScrollPathAnimations. `from` = color of the section above,
   `to` = fill color of the section below. */

const FLAT =
  "M0,6 C18,6 32,6 50,6 C68,6 82,6 100,6 L100,12 L0,12 Z";
const WAVE =
  "M0,7 C20,1.5 38,11 55,6 C72,1.5 86,10 100,4 L100,12 L0,12 Z";

export const WAVE_FLAT = FLAT;
export const WAVE_SHAPE = WAVE;

interface Props {
  from: string;
  to: string;
  flip?: boolean;
  className?: string;
}

export default function WaveSeparator({ from, to, flip = false, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.setAttribute("d", WAVE);
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
        gsap.fromTo(
          path,
          { attr: { d: FLAT } },
          {
            attr: { d: WAVE },
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative w-full leading-[0] ${className}`}
      style={{ background: from }}
    >
      <svg
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        className="block w-full h-[clamp(48px,8vw,110px)] overflow-visible"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path ref={pathRef} d={FLAT} fill={to} />
      </svg>
    </div>
  );
}
