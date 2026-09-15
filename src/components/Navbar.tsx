"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { hasIntroStarted } from "@/lib/intro";
import { scrollToSection } from "@/lib/scrollTo";
import AnchorLink from "@/components/AnchorLink";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Programs", id: "programs" },
  { label: "Moments", id: "moments" },
  { label: "Contact", id: "contact" },
];

const mobileLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Founder", id: "founder" },
  { label: "Young Minds", id: "young-minds" },
  { label: "Women", id: "women" },
  { label: "Elders", id: "elders" },
  { label: "Programs", id: "programs" },
  { label: "How We Work", id: "experience" },
  { label: "Activities", id: "activities" },
  { label: "Moments", id: "moments" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Events", id: "events" },
  { label: "Contact", id: "contact" },
];

const SPY_IDS = [
  "home",
  "about",
  "founder",
  "young-minds",
  "women",
  "elders",
  "programs",
  "experience",
  "activities",
  "moments",
  "testimonials",
  "events",
  "contact",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [introStarted, setIntroStarted] = useState(() => hasIntroStarted());

  useEffect(() => {
    if (hasIntroStarted()) return;
    const handler = () => setIntroStarted(true);
    window.addEventListener("ssaranga:intro-started", handler);
    return () => window.removeEventListener("ssaranga:intro-started", handler);
  }, []);

  /* Scroll-spy: highlight the section currently in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const best = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a
        );
        setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const isActive = (id: string) => active === id;

  return (
    <>
      {/* ─── Desktop floating pill — light glassmorphism ─── */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 rounded-full px-2 py-1.5 border border-white/[0.8]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(201,244,246,0.85) 45%, rgba(240,250,253,0.92) 100%)",
          backdropFilter: "blur(22px) saturate(200%)",
          WebkitBackdropFilter: "blur(22px) saturate(200%)",
          boxShadow: [
            "0 10px 36px rgba(0,59,92,0.12)",
            "inset 0 1px 0 rgba(255,255,255,0.9)",
            "0 0 0 1px rgba(0,138,199,0.08)",
          ].join(", "),
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={introStarted ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: introStarted ? 0.8 : 0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Brand — SsaRanga */}
        <AnchorLink
          id="home"
          className="flex items-center pl-3 pr-2 py-1 group cursor-pointer"
          ariaLabel="SsaRanga — Home"
        >
          <span className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-moss/30">
            <Image
              src="/images/logo-main.jpeg"
              alt="SsaRanga"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span
            className="ml-3 text-deep-forest text-xl tracking-[0.08em] font-medium"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ಸಾರಂಗ · SsaRanga
          </span>
        </AnchorLink>

        {/* Divider */}
        <div className="w-px h-4 bg-ink/10 shrink-0 mx-0.5" />

        {/* Nav links */}
        {navLinks.map((link) => (
          <AnchorLink
            key={link.id}
            id={link.id}
            className={`label-caps text-[0.68rem] md:text-[0.72rem] px-4 lg:px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
              isActive(link.id)
                ? "text-white bg-moss shadow-[0_6px_20px_rgba(0,138,199,0.35)]"
                : "text-ink/70 hover:text-moss hover:bg-moss/10"
            }`}
          >
            {link.label}
          </AnchorLink>
        ))}
      </motion.div>

      {/* ─── Mobile floating pill — light glassmorphism ─── */}
      <motion.div
        className="fixed top-3 left-3 right-3 z-50 md:hidden flex items-center justify-between rounded-full px-3 py-2 border border-white/[0.8]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(201,244,246,0.9) 55%, rgba(240,250,253,0.94) 100%)",
          backdropFilter: "blur(22px) saturate(200%)",
          WebkitBackdropFilter: "blur(22px) saturate(200%)",
          boxShadow: [
            "0 10px 36px rgba(0,59,92,0.12)",
            "inset 0 1px 0 rgba(255,255,255,0.9)",
            "0 0 0 1px rgba(0,138,199,0.08)",
          ].join(", "),
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={introStarted ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: introStarted ? 0.8 : 0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnchorLink
          id="home"
          className="flex items-center pl-2 py-1 cursor-pointer"
          ariaLabel="SsaRanga — Home"
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-moss/30">
            <Image
              src="/images/logo-main.jpeg"
              alt="SsaRanga"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span
            className="ml-2.5 text-deep-forest text-lg tracking-[0.06em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SsaRanga
          </span>
        </AnchorLink>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-[110] w-9 h-9 flex flex-col items-center justify-center gap-[4px] rounded-full"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="block w-4 h-[1.5px] bg-deep-forest/80 rounded-full"
            animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-4 h-[1.5px] bg-deep-forest/80 rounded-full"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-4 h-[1.5px] bg-deep-forest/80 rounded-full"
            animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.div>

      {/* ─── Mobile full-screen menu — light ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-overlay-light flex flex-col items-center justify-center md:hidden overflow-y-auto py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col items-center gap-5">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={`${link.id}-${link.label}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`text-2xl transition-colors tracking-wide cursor-pointer ${
                      isActive(link.id)
                        ? "text-moss"
                        : "text-deep-forest/80 hover:text-moss"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}