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
const REVEAL_S = 1.15;

/* Premium spa/nature photos cycling slowly behind the loader */
const LOADER_PHOTOS = [
  "/images/leaves-texture.jpg",
  "/images/detail-calm.jpg",
  "/images/hero-bg.jpg",
];

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
  const loaderContentRef = useRef<HTMLDivElement>(null);

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
        if (!logoContainerRef.current || !loaderContentRef.current) return;

        /* ── Measure the 3D flight target: hero medallion slot ── */
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

          /* ── HOLD PHASE: logo entrance + SVG ring pulses ── */
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

          // Subtle breathing glow on the logo circle during hold
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

          // Wordmark fade in
          tl.fromTo(
            wordmarkRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
            0.5
          );

          // Subtitle fade in
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
            0.7
          );

          // Shimmer bar reveal
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

          // SVG rings: gentle pulsing glow during hold phase
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

          /* ── REVEAL PHASE: logo flies to hero + rings expand + dissolve ── */
          const revealStart = INTRO_HOLD_MS / 1000;

          // Logo 3D flight to hero medallion
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

          // Settle rotation back to 0 on landing
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

          // Logo fades slightly as it lands (hero takes over)
          tl.to(
            logoContainerRef.current,
            { opacity: 0, duration: 0.25, ease: "power1.out" },
            `>-0.15`
          );

          // Rings: stop pulsing, expand outward and fade
          tl.to(
            ringARef.current,
            {
              attr: { r: "38%" },
              opacity: 0,
              duration: REVEAL_S + 0.5,
              ease: "power2.out",
            },
            revealStart
          );
          tl.to(
            ringBRef.current,
            {
              attr: { r: "30%" },
              opacity: 0,
              duration: REVEAL_S + 0.35,
              ease: "power2.out",
            },
            revealStart + 0.07
          );
          tl.to(
            ringCRef.current,
            {
              attr: { r: "22%" },
              opacity: 0,
              duration: REVEAL_S + 0.15,
              ease: "power1.out",
            },
            revealStart + 0.14
          );

          // Wordmark and subtitle fade away
          tl.to(
            [wordmarkRef.current, subtitleRef.current],
            { opacity: 0, y: -18, duration: 0.4, ease: "power2.in" },
            revealStart + 0.05
          );

          // Shimmer fades
          tl.to(
            shimmerTrackRef.current,
            { opacity: 0, duration: 0.3, ease: "power1.out" },
            revealStart
          );
        });
      })();

      // Hand the logo off to the hero at the exact landing frame
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
      className={`fixed inset-0 z-[9999] transition-opacity duration-700 ease-in-out ${revealing ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      {/* ── Solid brand base: guarantees zero flash before photos/shader load ── */}
      <div className="absolute inset-0 bg-deep-forest" />

      {/* ── Premium spa/nature photo backdrop, slow Ken Burns + crossfade ── */}
      <div className="absolute inset-0">
        {LOADER_PHOTOS.map((src, i) => (
          <div
            key={src}
            className="loader-photo absolute inset-0"
            style={{ animationDelay: `${i * 4.5}s` }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="ken-burns object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/75 via-deep-forest/60 to-deep-forest/85" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* ── SVG ripple rings ── */}
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

      {/* ── Loader content ── */}
      <div ref={loaderContentRef} className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 [perspective:1200px]">
          {/* Logo medallion — GSAP flies it in 3D to land on the hero */}
          {!handedOff && (
            <div
              ref={logoContainerRef}
              className="relative flex items-center justify-center [perspective:1200px]"
              style={{
                willChange: "transform, opacity",
              }}
            >
              {/* Pulsing rings around logo during hold */}
              <span className="loader-pulse" />
              <span className="loader-pulse loader-pulse-delayed" />

              {/* Gold halo (matches hero medallion for seamless handoff) */}
              <div className="absolute -inset-3 rounded-full border border-gold/40" />
              <div className="absolute -inset-3 rounded-full bg-gold/10 blur-xl" />

              {/* Logo circle — glow animated by GSAP timeline */}
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

          {/* Wordmark + shimmer — fades away as the reveal begins */}
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
