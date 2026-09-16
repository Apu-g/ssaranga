"use client";

import { useEffect, useRef, useId, useState, type ElementType, type ReactNode } from "react";

/* Big display text that melts into focus as it scrolls into view.
   Drives individual SVG filter primitives (blur / displacement) with GSAP,
   replaying smoothly in both scroll directions with snappy, reduced duration. */

type Variant = "melt" | "turbulence" | "fractal";

const START_VALUES: Record<Variant, { blur: number; scale: number }> = {
  melt: { blur: 32, scale: 0 },
  turbulence: { blur: 14, scale: 60 },
  fractal: { blur: 20, scale: 75 },
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
  duration = 1.1,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const rawId = useId();
  const filterId = `filter-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}-${variant}`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const feBlur = blurRef.current;
      const feDisp = dispRef.current;
      const start = START_VALUES[variant];

      el.style.filter = `url(#${filterId})`;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out", duration },
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "restart play restart play",
            once: false,
          },
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
        tl.fromTo(el, { opacity: 0.2 }, { opacity: 1, duration: duration * 0.45 }, 0);
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [mounted, filterId, variant, duration, delay]);

  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="absolute pointer-events-none"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          {variant === "melt" && (
            <filter id={filterId}>
              <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation="0" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 13 -6"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          )}

          {variant === "turbulence" && (
            <filter id={filterId}>
              <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation="0" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 12 -4"
                result="goo"
              />
              <feTurbulence
                type="turbulence"
                baseFrequency="1"
                numOctaves="1"
                seed="2"
                result="noise"
              />
              <feDisplacementMap ref={dispRef} in="goo" in2="noise" scale="0" result="displacement" />
              <feComposite in="SourceGraphic" in2="displacement" operator="atop" />
            </filter>
          )}

          {variant === "fractal" && (
            <filter id={filterId}>
              <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation="0" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 15 -8"
                result="goo"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.1 0.5"
                numOctaves="5"
                seed="2"
                result="noise"
              />
              <feDisplacementMap ref={dispRef} in="goo" in2="noise" scale="0" result="displacement" />
              <feComposite in="SourceGraphic" in2="displacement" operator="atop" />
            </filter>
          )}
        </defs>
      </svg>

      <Tag ref={ref} className={className} style={{ willChange: "opacity, filter" }}>
        {children}
      </Tag>
    </>
  );
}
