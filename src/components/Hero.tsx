"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";
import {
  STAGE_LOGO_LAND,
  STAGE_KANNADA,
  STAGE_TAGLINE,
  STAGE_CTA,
} from "@/lib/intro";

const easeFlip = [0.22, 1, 0.36, 1] as const;

export default function Hero({ started }: { started: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  // Default stage to 4 to guarantee instant visibility on load/reload/skip, while supporting smooth progressive enhancement
  const [stage, setStage] = useState(4);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(4);
      return;
    }
    setStage(1);
    const timings = [STAGE_LOGO_LAND, STAGE_KANNADA, STAGE_TAGLINE, STAGE_CTA];
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
          yPercent: 14,
          scale: 1.05,
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
      className="relative min-h-[100dvh] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #8DDFEA 0%, #C9F4F6 40%, #F0FAFD 100%)",
      }}
    >
      {/* ─── Background ─── */}
      <div ref={bgRef} className="absolute inset-[-6%] will-change-transform pointer-events-none">
        <div className="absolute inset-0 ken-burns">
          {/* Desktop background */}
          <Image
            src="/images/desktopbackground.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover hidden sm:block"
            aria-hidden="true"
          />
          {/* Mobile background */}
          <Image
            src="/images/phonebackground.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover block sm:hidden"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-white/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-white/35 to-paper" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-sage/25 blur-[120px]" />
      </div>

      {/* ─── Top spacing for fixed Navbar ─── */}
      <div className="h-4 sm:h-8" aria-hidden="true" />

      {/* ─── Center content ─── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Medallion Logo with breathing concentric glowing rings */}
        <div
          id="hero-medallion"
          className="relative mb-5 sm:mb-6 flex items-center justify-center"
        >
          {/* Outer glowing pulsing concentric rings */}
          <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-sage/40 animate-pulse pointer-events-none" />
          <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-moss/20 pointer-events-none" />
          <div className="absolute -inset-1 rounded-full bg-sage/20 blur-lg pointer-events-none" />

          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={stage >= 1 ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeFlip }}
            style={{
              boxShadow: [
                "0 0 35px rgba(141,223,234,0.45)",
                "0 0 70px rgba(141,223,234,0.25)",
                "0 20px 60px rgba(0,59,92,0.2)",
                "inset 0 1px 0 rgba(255,255,255,0.6)",
              ].join(", "),
            }}
          >
            <Image
              src="/images/logo-main.jpeg"
              alt="SsaRanga — The Mind Spa"
              fill
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 208px"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
          </motion.div>
        </div>

        {/* Kannada Wordmark + SsaRanga Title */}
        <div className="flex flex-col items-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeFlip }}
          >
            <span className="label-caps text-moss text-xs sm:text-sm tracking-[0.3em] uppercase mb-1">
              The Mind Spa · ಸಾರಂಗ
            </span>
            <h1
              className="text-ink text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.02em] leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              SsaRanga
            </h1>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-moss/50" />
          <h2 className="text-moss text-base sm:text-lg md:text-2xl font-medium tracking-wide">
            Nurture Within • Grow Beyond
          </h2>
          <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-moss/50" />
        </motion.div>

        {/* Narrative & Description */}
        <motion.div
          className="mt-4 sm:mt-5 max-w-xl px-2"
          initial={{ opacity: 0, y: 15 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-ink/80 text-base sm:text-lg font-light leading-relaxed">
            A space to pause, connect, reflect and grow.
          </p>
          <p className="text-ink/65 text-xs sm:text-sm md:text-base font-light leading-relaxed mt-2.5 sm:mt-3">
            At SsaRanga, we believe that meaningful growth begins from within. We
            create safe, welcoming spaces where young minds, women and elders
            can express themselves, discover their strengths and navigate life&apos;s
            changing journeys with greater confidence and clarity.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-7 w-full sm:w-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnchorLink
            id="programs"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-moss text-white font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,138,199,0.45)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="relative z-10">Explore SsaRanga</span>
            <span className="cta-sheen" />
          </AnchorLink>
          <AnchorLink
            id="contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-moss/30 glass-light text-ink font-medium text-sm tracking-wide hover:border-moss hover:text-moss transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Connect With Us
          </AnchorLink>
        </motion.div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1.5 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-ink/40 text-[0.6rem] tracking-[0.35em] uppercase label-caps">Scroll</span>
        <div className="w-px h-5 bg-moss/20 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-moss to-transparent rounded-full"
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}