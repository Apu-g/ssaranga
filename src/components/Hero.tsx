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
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const raf = requestAnimationFrame(() => setStage(4));
      return () => cancelAnimationFrame(raf);
    }
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
          yPercent: 16,
          scale: 1.06,
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
      className="relative h-dvh min-h-[660px] max-h-[1100px] grid grid-rows-[auto_1fr_auto] overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #8DDFEA 0%, #C9F4F6 45%, #F0FAFD 100%)",
      }}
    >
      {/* ─── Background ─── */}
      <div ref={bgRef} className="absolute inset-[-6%] will-change-transform">
        <div className="absolute inset-0 ken-burns">
          <Image src="/images/spa-gallery/1.jpg" alt="" fill priority sizes="100vw" className="object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-white/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-white/30 to-paper" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-sage/[0.25] blur-[120px] pointer-events-none" />
      </div>

      {/* ─── Top spacer — clears the floating navbar ─── */}
      <div className="relative z-10 h-[68px] md:h-[88px] lg:h-[96px]" aria-hidden="true" />

      {/* ─── Center content — vertically centered between navbar & scroll ─── */}
      <div className="relative z-10 w-full flex items-center justify-center px-6">
        <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Medallion logo */}
          <div
            id="hero-medallion"
            className="relative mb-6 md:mb-7 flex items-center justify-center"
          >
            <div className="absolute -inset-5 rounded-full border border-primary/15" />
            <div className="absolute -inset-5 rounded-full border border-sage/40" />

            <motion.div
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-[15rem] lg:h-[15rem] rounded-full overflow-hidden"
              animate={stage >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.9, ease: easeFlip }}
              style={{
                boxShadow: [
                  "0 0 40px rgba(141,223,234,0.35)",
                  "0 0 80px rgba(141,223,234,0.2)",
                  "0 30px 80px rgba(0,59,92,0.22)",
                  "inset 0 1px 0 rgba(255,255,255,0.5)",
                ].join(", "),
              }}
            >
              <Image
                src="/images/logo-main.jpeg"
                alt="SsaRanga — The Mind Spa"
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
            </motion.div>
          </div>

          {/* Kannada wordmark + SsaRanga */}
          <div className="flex flex-col items-center [perspective:1200px]">
            <motion.div
              className="relative origin-top flex flex-col items-center"
              initial={{ opacity: 0, y: 28, rotateX: -48, scale: 0.92 }}
              animate={stage >= 2 ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{ duration: 1, ease: easeFlip }}
              style={{ transformPerspective: 1200 }}
            >
              <span
                className="text-ink/80 text-sm tracking-[0.35em] uppercase label-caps mb-1"
              >
                The Mind Spa · ಸಾರಂಗ
              </span>
              <h1
                className="text-ink text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                SsaRanga
              </h1>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-5"
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-moss/60" />
            <h2 className="text-moss text-lg sm:text-xl md:text-2xl font-medium tracking-wide">
              Nurture Within • Grow Beyond
            </h2>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-moss/60" />
          </motion.div>

          {/* Subtext + description */}
          <motion.div
            className="mt-5 max-w-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-ink/75 text-base md:text-lg font-light leading-relaxed">
              A space to pause, connect, reflect and grow.
            </p>
            <p className="text-ink/60 text-sm md:text-base font-light leading-relaxed mt-4">
              At SsaRanga, we believe that meaningful growth begins from within. We
              create safe, welcoming spaces where young minds, women and elders
              can express themselves, discover their strengths and navigate
              life&apos;s changing journeys with greater confidence and clarity.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnchorLink
              id="programs"
              className="group relative inline-flex items-center px-8 py-3.5 rounded-full bg-moss text-white font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,138,199,0.45)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative z-10">Explore SsaRanga</span>
              <span className="cta-sheen" />
            </AnchorLink>
            <AnchorLink
              id="contact"
              className="inline-flex items-center px-8 py-3.5 rounded-full border border-ink/25 glass-light text-ink font-medium tracking-wide hover:border-moss hover:text-moss transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Connect With Us
            </AnchorLink>
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll indicator — own reserved row, never overlaps ─── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 pb-7"
        initial={{ opacity: 0 }}
        animate={stage >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-ink/40 text-[0.6rem] tracking-[0.35em] uppercase label-caps">Scroll</span>
        <div className="w-px h-6 bg-moss/20 rounded-full overflow-hidden">
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