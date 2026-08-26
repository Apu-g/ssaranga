"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/* Big display text that melts into focus as it scrolls into view.
   Drives the SVG filter primitives (blur / displacement) with GSAP,
   exactly like the OnScrollSVGFilterText reference. */

type Variant = "melt" | "turbulence" | "fractal";

const FILTER_IDS: Record<Variant, string> = {
  melt: "gooey-melt",
  turbulence: "gooey-turbulence",
  fractal: "gooey-fractal",
};

const START_VALUES: Record<Variant, { blur: number; scale: number }> = {
  melt: { blur: 45, scale: 0 },
  turbulence: { blur: 18, scale: 90 },
  fractal: { blur: 26, scale: 110 },
};

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: Variant;
  duration?: number;
  delay?: number;
}

export default function FilterText({
  children,
  as: Tag = "h2",
  className = "",
  variant = "turbulence",
  duration = 2,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const filterId = FILTER_IDS[variant];
      const feBlur = document.querySelector(`#${filterId} feGaussianBlur`);
      const feDisp = document.querySelector(`#${filterId} feDisplacementMap`);
      const start = START_VALUES[variant];

      el.style.filter = `url(#${filterId})`;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out", duration },
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });

        if (feBlur) {
          tl.fromTo(
            feBlur,
            { attr: { stdDeviation: start.blur } },
            { attr: { stdDeviation: 0 } },
            0
          );
        }
        if (feDisp && start.scale > 0) {
          tl.fromTo(
            feDisp,
            { attr: { scale: start.scale } },
            { attr: { scale: 0 } },
            0
          );
        }
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: duration * 0.55 }, 0);
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      el.style.filter = "";
    };
  }, [variant, duration, delay]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: "opacity, filter" }}>
      {children}
    </Tag>
  );
}
