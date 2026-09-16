"use client";

import { useEffect, useId, useRef } from "react";

/* Photo inside an SVG clip-path that morphs from a soft organic curve into a wavy
   fluid shape while scrolling through the viewport (scrubbed), with an
   optional gentle parallax drift. */

type Preset = "portrait" | "square" | "wide";

const PRESETS: Record<Preset, { vb: [number, number]; from: string; to: string }> = {
  portrait: {
    vb: [500, 650],
    from:
      "M 25 35 C 130 -10, 260 50, 380 5 C 430 -8, 470 15, 485 30 C 515 180, 445 320, 510 460 C 535 520, 475 600, 475 630 C 380 665, 260 610, 140 660 C 80 675, 35 640, 20 625 C -10 480, 55 330, -5 190 C -20 110, 10 50, 25 35 Z",
    to:
      "M 20 20 C 130 50, 260 -10, 380 35 C 430 50, 470 10, 480 25 C 450 190, 525 330, 455 470 C 435 530, 500 610, 480 635 C 370 610, 250 665, 130 615 C 70 600, 30 645, 15 635 C 50 470, -15 320, 45 180 C 60 100, 5 40, 20 20 Z",
  },
  square: {
    vb: [600, 600],
    from:
      "M 30 35 C 160 -10, 320 55, 460 10 C 520 -5, 570 18, 580 35 C 610 180, 535 310, 600 440 C 625 500, 570 570, 565 580 C 440 620, 300 560, 160 615 C 90 630, 40 595, 25 575 C -10 440, 65 300, -5 170 C -20 95, 15 45, 30 35 Z",
    to:
      "M 25 20 C 160 50, 320 -10, 460 40 C 520 50, 570 10, 575 25 C 545 170, 620 310, 550 450 C 530 510, 590 580, 575 585 C 430 560, 290 620, 150 565 C 80 550, 35 595, 20 585 C 55 430, -15 290, 50 160 C 65 85, 10 30, 25 20 Z",
  },
  wide: {
    vb: [900, 600],
    from:
      "M 30 35 C 240 -10, 480 55, 700 10 C 790 -5, 860 18, 875 35 C 910 180, 830 310, 900 440 C 930 500, 870 570, 865 580 C 680 620, 460 560, 240 615 C 140 630, 60 595, 30 575 C -10 440, 70 300, -5 170 C -20 95, 15 45, 30 35 Z",
    to:
      "M 25 20 C 240 50, 480 -10, 700 40 C 790 50, 860 10, 870 25 C 835 170, 920 310, 845 450 C 820 510, 890 580, 875 585 C 670 560, 440 620, 230 565 C 130 550, 55 595, 25 585 C 60 430, -15 290, 55 160 C 70 85, 10 30, 25 20 Z",
  },
};

interface Props {
  src: string;
  alt: string;
  preset?: Preset;
  className?: string;
  parallax?: boolean;
}

export default function MorphImage({
  src,
  alt,
  preset = "portrait",
  className = "",
  parallax = false,
}: Props) {
  const rawId = useId();
  const clipId = `morph-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

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

        if (parallax) {
          gsap.fromTo(
            svg,
            { yPercent: 4 },
            {
              yPercent: -4,
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
    <div className={`relative overflow-visible w-full ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${vb[0]} ${vb[1]}`}
        role="img"
        aria-label={alt}
        className="block w-full h-auto drop-shadow-[0_18px_40px_rgba(0,59,92,0.12)] transition-transform duration-500 hover:scale-[1.02]"
        style={{ willChange: "transform" }}
      >
        <defs>
          <clipPath id={clipId}>
            <path ref={pathRef} d={from} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <image
            href={src}
            x="0"
            y="0"
            width={vb[0]}
            height={vb[1]}
            preserveAspectRatio={preset === "portrait" ? "xMidYMin slice" : "xMidYMid slice"}
          />
        </g>
      </svg>
    </div>
  );
}
