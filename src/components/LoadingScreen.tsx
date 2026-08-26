"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  INTRO_HOLD_MS,
  INTRO_TOTAL_MS,
  LOGO_FLIGHT_DELAY_MS,
  LOGO_FLIGHT_MS,
  hasIntroPlayed,
  markIntroPlayed,
  markIntroStarted,
} from "@/lib/intro";

interface Props {
  onStart: () => void;
  onComplete: () => void;
}

export default function LoadingScreen({ onStart, onComplete }: Props) {
  const [revealing, setRevealing] = useState(false);
  const [handedOff, setHandedOff] = useState(false);
  const [skip] = useState(() => hasIntroPlayed());
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoCircleRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const shimmerTrackRef = useRef<HTMLDivElement>(null);
  const shimmerBarRef = useRef<HTMLDivElement>(null);
  const ringARef = useRef<SVGCircleElement>(null);
  const ringBRef = useRef<SVGCircleElement>(null);
  const ringCRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (skip) {
      const raf = requestAnimationFrame(() => onComplete());
      return () => cancelAnimationFrame(raf);
    }
    markIntroPlayed();

    document.body.style.overflow = "hidden";

    let landT: ReturnType<typeof setTimeout>;
    let doneT: ReturnType<typeof setTimeout>;
    let ctx: { revert: () => void } | undefined;

    if (reduced) {
      const raf = requestAnimationFrame(() => setRevealing(true));
      doneT = setTimeout(() => {
        document.body.style.overflow = "";
        markIntroStarted();
        onComplete();
      }, 500);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(doneT);
        document.body.style.overflow = "";
      };
    }

    const startT = setTimeout(() => {
      onStart();
      markIntroStarted();
      setRevealing(true);

      (async () => {
        const { gsap } = await import("gsap");
        if (!logoContainerRef.current) return;

        const fromRect = logoContainerRef.current.getBoundingClientRect();
        const toEl = document.getElementById("hero-medallion");
        const toRect = toEl?.getBoundingClientRect();

        let dx = 0;
        let dy = 0;
        let dScale = 1;
        if (fromRect && toRect) {
          dx =
            toRect.left +
            toRect.width / 2 -
            (fromRect.left + fromRect.width / 2);
          dy =
            toRect.top +
            toRect.height / 2 -
            (fromRect.top + fromRect.height / 2);
          dScale = toRect.width / fromRect.width;
        }

        ctx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.fromTo(
            logoContainerRef.current,
            { opacity: 0, scale: 0.7 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "expo.out",
            },
            0
          );

          tl.fromTo(
            logoCircleRef.current,
            {
              boxShadow:
                "0 0 40px rgba(217,169,76,0.12), 0 30px 80px rgba(0,0,0,0.5)",
            },
            {
              boxShadow:
                "0 0 80px rgba(217,169,76,0.35), 0 30px 80px rgba(0,0,0,0.5)",
              duration: 1.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: Math.ceil(INTRO_HOLD_MS / 1400) + 1,
            },
            0
          );

          tl.fromTo(
            wordmarkRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
            0.5
          );

          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
            0.7
          );

          tl.fromTo(
            shimmerTrackRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power1.out" },
            0.9
          );
          tl.fromTo(
            shimmerBarRef.current,
            { x: "-120%" },
            {
              x: "260%",
              duration: 1.6,
              ease: "power1.inOut",
              repeat: Math.ceil(INTRO_HOLD_MS / 1600),
            },
            1.0
          );

          tl.fromTo(
            ringARef.current,
            { attr: { r: "8%" }, opacity: 0 },
            {
              attr: { r: "16%" },
              opacity: 0.5,
              duration: 1.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: Math.ceil(INTRO_HOLD_MS / 1500),
            },
            0.6
          );
          tl.fromTo(
            ringBRef.current,
            { attr: { r: "6%" }, opacity: 0 },
            {
              attr: { r: "12%" },
              opacity: 0.6,
              duration: 1.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: Math.ceil(INTRO_HOLD_MS / 1800),
            },
            0.8
          );
          tl.fromTo(
            ringCRef.current,
            { attr: { r: "4%" }, opacity: 0 },
            {
              attr: { r: "10%" },
              opacity: 0.4,
              duration: 1.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: Math.ceil(INTRO_HOLD_MS / 1300),
            },
            1.0
          );

          const revealStart = INTRO_HOLD_MS / 1000;

          tl.to(
            logoContainerRef.current,
            {
              x: dx,
              y: dy,
              scale: dScale,
              rotateX: 28,
              rotateY: -30,
              duration: LOGO_FLIGHT_MS / 1000,
              ease: "power3.inOut",
            },
            revealStart
          );

          tl.to(
            logoContainerRef.current,
            {
              rotateX: 0,
              rotateY: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            `>${-0.3 + LOGO_FLIGHT_MS / 1000}`
          );

          tl.to(
            logoContainerRef.current,
            { opacity: 0, duration: 0.25, ease: "power1.out" },
            `>-0.15`
          );

          tl.to(
            ringARef.current,
            {
              attr: { r: "38%" },
              opacity: 0,
              duration: 1.65,
              ease: "power2.out",
            },
            revealStart
          );
          tl.to(
            ringBRef.current,
            {
              attr: { r: "30%" },
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            revealStart + 0.07
          );
          tl.to(
            ringCRef.current,
            {
              attr: { r: "22%" },
              opacity: 0,
              duration: 1.3,
              ease: "power1.out",
            },
            revealStart + 0.14
          );

          tl.to(
            [wordmarkRef.current, subtitleRef.current],
            { opacity: 0, y: -18, duration: 0.4, ease: "power2.in" },
            revealStart + 0.05
          );

          tl.to(
            shimmerTrackRef.current,
            { opacity: 0, duration: 0.3, ease: "power1.out" },
            revealStart
          );
        });
      })();

      landT = setTimeout(
        () => setHandedOff(true),
        LOGO_FLIGHT_DELAY_MS + LOGO_FLIGHT_MS
      );
    }, INTRO_HOLD_MS);

    doneT = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, INTRO_TOTAL_MS);

    return () => {
      clearTimeout(startT);
      clearTimeout(landT);
      clearTimeout(doneT);
      ctx?.revert();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-700 ${
        revealing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Solid brand base */}
      <div className="absolute inset-0 bg-deep-forest" />

      {/* CSS gradient backdrop — smooth, no pixel artifacts */}
      <div className="absolute inset-0 loader-gradient-backdrop" />

      {/* SVG ripple rings */}
      {!reduced && (
        <svg className="absolute inset-0 h-full w-full">
          <circle
            ref={ringARef}
            cx="50%"
            cy="50%"
            r="0"
            fill="none"
            stroke="rgba(142,182,155,0.7)"
            strokeWidth="1.5"
          />
          <circle
            ref={ringBRef}
            cx="50%"
            cy="50%"
            r="0"
            fill="none"
            stroke="rgba(217,169,76,0.8)"
            strokeWidth="2"
          />
          <circle
            ref={ringCRef}
            cx="50%"
            cy="50%"
            r="0"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
        </svg>
      )}

      {/* Loader content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 [perspective:1200px]">
          {!handedOff && (
            <div
              ref={logoContainerRef}
              className="relative flex items-center justify-center [perspective:1200px]"
              style={{
                willChange: "transform, opacity",
              }}
            >
              <span className="loader-pulse" />
              <span className="loader-pulse loader-pulse-delayed" />

              <div className="absolute -inset-3 rounded-full border border-gold/40" />
              <div className="absolute -inset-3 rounded-full bg-gold/10 blur-xl" />

              <motion.div
                ref={logoCircleRef}
                className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/logo-main.jpeg"
                  alt="SsaRanga — The Mind Spa"
                  fill
                  sizes="224px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/20" />
              </motion.div>
            </div>
          )}

          <div className="flex flex-col items-center gap-3">
            <p
              ref={wordmarkRef}
              className="text-white text-3xl md:text-4xl font-light tracking-[0.28em] uppercase"
              style={{
                fontFamily: "var(--font-heading)",
                willChange: "opacity, transform",
              }}
            >
              SsaRanga
            </p>
            <p
              ref={subtitleRef}
              className="label-caps text-gold/90 tracking-[0.4em]"
              style={{ willChange: "opacity, transform" }}
            >
              The Mind Spa
            </p>

            <div
              ref={shimmerTrackRef}
              className="mt-4 w-40 h-[2px] rounded-full bg-white/10 overflow-hidden"
              style={{ willChange: "opacity" }}
            >
              <div
                ref={shimmerBarRef}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
