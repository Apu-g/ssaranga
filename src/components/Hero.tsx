"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  STAGE_LOGO_LAND,
  STAGE_KANNADA,
  STAGE_TAGLINE,
} from "@/lib/intro";

const easeFlip = [0.22, 1, 0.36, 1] as const;

export default function Hero({ started }: { started: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const raf = requestAnimationFrame(() => setStage(3));
      return () => cancelAnimationFrame(raf);
    }
    const timings = [STAGE_LOGO_LAND, STAGE_KANNADA, STAGE_TAGLINE];
    const timers = timings.map((t, i) => setTimeout(() => setStage(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;
    const initGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !heroRef.current || !bgRef.current) return;
      ctx = gsap.context(() => {
        gsap.to(bgRef.current, {
          yPercent: 18,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    };
    initGsap();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-dvh min-h-[480px] max-h-[1100px] flex items-center justify-center overflow-hidden"
    >
      {/* ─── Background ─── */}
      <div ref={bgRef} className="absolute inset-[-6%] will-change-transform">
        <div className="absolute inset-0 ken-burns">
          <Image src="/images/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-deep-forest/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/80 via-transparent to-deep-forest" />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-gold/[0.07] blur-[120px] pointer-events-none" />
      </div>

      {/* ─── Center content ─── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-14 md:pt-16 pb-16 md:pb-20">
        {/* Medallion logo — large, enhanced, always visible */}
        <div
          id="hero-medallion"
          className="relative mb-6 md:mb-8 flex items-center justify-center"
        >
          {/* Outer decorative ring */}
          <div className="absolute -inset-5 rounded-full border border-white/[0.06]" />
          <div className="absolute -inset-5 rounded-full border border-gold/[0.08]" />

          {/* Logo circle */}
          <motion.div
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-[15rem] md:h-[15rem] lg:w-[17rem] lg:h-[17rem] rounded-full overflow-hidden"
            style={{
              boxShadow: [
                "0 0 40px rgba(0,0,0,0.4)",
                "0 0 80px rgba(0,0,0,0.25)",
                "0 30px 80px rgba(0,0,0,0.5)",
                "inset 0 1px 0 rgba(255,255,255,0.1)",
              ].join(", "),
            }}
          >
            <Image
              src="/images/logo-main.jpeg"
              alt="SsaRanga — The Mind Spa"
              fill
              priority
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 240px, 272px"
              className="object-cover"
            />
            {/* Subtle glass sheen */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.12] via-transparent to-black/[0.12]" />
          </motion.div>
        </div>

        {/* Kannada wordmark */}
        <div className="flex justify-center [perspective:1200px]">
          <motion.div
            className="relative w-80 sm:w-[26rem] md:w-[34rem] lg:w-[38rem] aspect-[1046/456] drop-shadow-[0_14px_35px_rgba(0,0,0,0.5)] origin-top"
            initial={{ opacity: 0, y: 28, rotateX: -48, scale: 0.92 }}
            animate={stage >= 2 ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: easeFlip }}
            style={{ transformPerspective: 1200 }}
          >
            <Image
              src="/images/logo.png"
              alt="ಸಾರಂಗ — SsaRanga"
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 416px, (max-width: 1024px) 544px, 608px"
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-5"
          initial={{ opacity: 0, y: 18 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
          <h1
            className="text-gold text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Mind Spa
          </h1>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        initial={{ opacity: 0 }}
        animate={stage >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-white/40 text-[0.6rem] tracking-[0.35em] uppercase label-caps">Scroll</span>
        <div className="w-px h-6 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-gold to-transparent rounded-full"
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
