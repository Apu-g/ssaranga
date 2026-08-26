"use client";

import { useEffect, useId, useRef } from "react";

type Preset = "portrait" | "square" | "wide";

const PRESETS: Record<Preset, { vb: [number, number]; from: string; to: string }> = {
  portrait: {
    vb: [500, 750],
    from:
      "M 50 0 L 500 1 C 397.3 110.7 380.7 235.5 450 375.5 C 519.3 515.5 519.3 640.7 450 751 L 0 751 C 100.7 624.7 120.7 499.5 60 375.5 C -0.7 251.5 -4 126.3 50 0 Z",
    to: "M 0 0 L 450 1 C 508 97 508 221.8 450 375.5 C 392 529.2 408.7 654.3 500 751 L 50 751 C -6.7 600.3 -3.3 475.2 60 375.5 C 123.3 275.8 103.3 150.7 0 0 Z",
  },
  square: {
    vb: [600, 600],
    from:
      "M494.246 145.646c25 39 10.2 103.8-1.2 157.2-11.4 53.4-19.5 95.3-44.5 129.3-25 34-66.9 60.1-120.6 71.7-53.6 11.7-118.9 9-163.7-25-44.8-34-69.2-99.3-71.9-167.3-2.7-68 16.2-138.7 61-177.7 44.9-39 115.6-46.3 183.4-43.4 67.7 3 132.5 16.2 157.5 55.2",
    to: "M422.248 192.542c44.2 49.2 94.8 86.9 111.3 141.1 16.5 54.2-1.1 124.9-45.3 161.8-44.2 36.8-114.9 39.7-167.9 22.1-53.1-17.7-88.4-56-137.1-92.9-48.6-36.8-110.6-72.1-121.2-118.1-10.6-46 30.1-102.5 78.8-151.7 48.7-49.2 105.2-90.9 152.4-81.5 47.1 9.4 84.8 70 129 119.2",
  },
  wide: {
    vb: [1000, 715],
    from:
      "M 0 169 C 174 56.3 343.7 0 509 0 C 674.3 0 838 46.3 1000 169 L 1000 525 C 831.3 383 664.6 312 500 312 C 335.4 312 168.7 383 0 525 L 0 169 Z",
    to: "M 0 169 C 186.7 325 362.7 403 528 403 C 693.3 403 850.7 315 1000 169 L 1000 525 C 843.9 651.7 683.6 715 519 715 C 354.4 715 181.4 651.7 0 525 L 0 169 Z",
  },
};

const GRADIENTS: Record<Preset, string> = {
  portrait: "linear-gradient(135deg, #235347 0%, #163832 40%, #0B2B26 100%)",
  square: "linear-gradient(160deg, #8EB69B 0%, #235347 50%, #0B2B26 100%)",
  wide: "linear-gradient(120deg, #163832 0%, #235347 45%, #8EB69B 100%)",
};

interface Props {
  alt?: string;
  preset?: Preset;
  className?: string;
  parallax?: boolean;
}

export default function MorphImage({
  alt,
  preset = "portrait",
  className = "",
  parallax = false,
}: Props) {
  const rawId = useId();
  const clipId = `morph-${rawId.replace(/:/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  const { vb, from, to } = PRESETS[preset];

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.setAttribute("d", to);
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
          { attr: { d: from } },
          {
            attr: { d: to },
            ease: "none",
            scrollTrigger: {
              trigger: svg,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );

        if (parallax && rectRef.current) {
          gsap.fromTo(
            rectRef.current,
            { y: 20 },
            {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: svg,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
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
  }, [from, to, parallax]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${vb[0]} ${vb[1]}`}
      role="img"
      aria-label={alt}
      className={`block w-full h-auto overflow-visible ${className}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path ref={pathRef} d={from} />
        </clipPath>
        <linearGradient id={`${clipId}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#235347" />
          <stop offset="50%" stopColor="#163832" />
          <stop offset="100%" stopColor="#0B2B26" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect
          ref={rectRef}
          x="0"
          y="0"
          width={vb[0]}
          height={vb[1]}
          fill={`url(#${clipId}-grad)`}
        />
        {/* Decorative circles inside the morph shape */}
        <circle cx={vb[0] * 0.3} cy={vb[1] * 0.35} r={vb[0] * 0.12} fill="rgba(142,182,155,0.15)" />
        <circle cx={vb[0] * 0.7} cy={vb[1] * 0.6} r={vb[0] * 0.08} fill="rgba(217,169,76,0.1)" />
        <circle cx={vb[0] * 0.5} cy={vb[1] * 0.8} r={vb[0] * 0.06} fill="rgba(255,255,255,0.05)" />
      </g>
    </svg>
  );
}
