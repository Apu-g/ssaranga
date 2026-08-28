"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { scrollToSection } from "@/lib/scrollTo";
import { hasIntroStarted } from "@/lib/intro";

const navLinks = [
  { label: "Home", id: "top" },
  { label: "Programs", id: "programs" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const SECTION_IDS = ["top", "programs", "about", "contact"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("top");
  const [introStarted, setIntroStarted] = useState(() => hasIntroStarted());

  useEffect(() => {
    if (hasIntroStarted()) return;
    const handler = () => setIntroStarted(true);
    window.addEventListener("ssaranga:intro-started", handler);
    return () => window.removeEventListener("ssaranga:intro-started", handler);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      id === "top" ? document.getElementById("home") : document.getElementById(id)
    );
    if (!sections.some(Boolean)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id === "home" ? "top" : entry.target.id;
            setActive(id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    setActive(id);
    scrollToSection(id);
  };

  return (
    <>
      {/* ─── Desktop floating pill nav — neumorphism + glassmorphism ─── */}
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 rounded-full px-2 py-1.5 border border-white/[0.08]"
        style={{
          background: "linear-gradient(135deg, rgba(35,83,71,0.35) 0%, rgba(22,56,50,0.5) 60%, rgba(11,43,38,0.6) 100%)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          boxShadow: [
            "0 8px 32px rgba(0,0,0,0.3)",
            "inset 0 1px 0 rgba(255,255,255,0.16)",
            "inset 0 -1px 0 rgba(0,0,0,0.15)",
            "0 0 0 1px rgba(233,247,236,0.14)",
          ].join(", "),
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={introStarted ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: introStarted ? 0.8 : 0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Kannada logo — larger inside narrower pill */}
        <button
          onClick={() => go("top")}
          className="flex items-center pl-3 pr-2 py-1 group cursor-pointer"
          aria-label="Back to top"
        >
          <span className="relative h-14 md:h-16 w-44 md:w-52 shrink-0">
            <Image
              src="/images/logo-kannada.png"
              alt="ಸಾರಂಗ — SsaRanga"
              fill
              sizes="240px"
              className="object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              priority
            />
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 shrink-0 mx-0.5" />

        {/* Nav links */}
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => go(link.id)}
            className={`label-caps text-[0.68rem] md:text-[0.72rem] px-4 lg:px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
              active === link.id
                ? "text-gold bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                : "text-white/65 hover:text-gold hover:bg-white/[0.05]"
            }`}
          >
            {link.label}
</button>
      ))}
      </motion.div>

      {/* ─── Mobile floating pill — neumorphism + glassmorphism ─── */}
      <motion.div
        className="fixed top-3 left-3 right-3 z-50 md:hidden flex items-center justify-between rounded-full px-3 py-2 border border-white/[0.08]"
        style={{
          background: "linear-gradient(135deg, rgba(35,83,71,0.38) 0%, rgba(22,56,50,0.5) 60%, rgba(11,43,38,0.6) 100%)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          boxShadow: [
            "0 8px 32px rgba(0,0,0,0.3)",
            "inset 0 1px 0 rgba(255,255,255,0.16)",
            "inset 0 -1px 0 rgba(0,0,0,0.15)",
            "0 0 0 1px rgba(233,247,236,0.14)",
          ].join(", "),
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={introStarted ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: introStarted ? 0.8 : 0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <button onClick={() => go("top")} className="flex items-center pl-2 py-1 cursor-pointer" aria-label="Back to top">
          <span className="relative h-11 w-44 shrink-0">
            <Image
              src="/images/logo-kannada.png"
              alt="ಸಾರಂಗ — SsaRanga"
              fill
              sizes="176px"
              className="object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              priority
            />
          </span>
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-[110] w-9 h-9 flex flex-col items-center justify-center gap-[4px] rounded-full"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="block w-4 h-[1.5px] bg-white/90 rounded-full"
            animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-4 h-[1.5px] bg-white/90 rounded-full"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-4 h-[1.5px] bg-white/90 rounded-full"
            animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.div>

      {/* ─── Mobile full-screen menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-overlay flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`text-3xl transition-colors tracking-wide cursor-pointer ${
                      active === link.id ? "text-gold" : "text-white/90 hover:text-gold"
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
