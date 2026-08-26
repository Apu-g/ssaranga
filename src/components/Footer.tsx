"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/scrollTo";

const quickLinks = [
  { label: "Home", id: "top" },
  { label: "Programs", id: "programs" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="bg-deep-forest pt-16 pb-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Top row: brand + quick links */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
            <div className="relative w-44 h-[4.5rem]">
              <Image
                src="/images/logo-kannada.png"
                alt="SsaRanga"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <p
              className="text-gold/80 text-base italic font-light"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nurturing roots, strengthening minds, thriving in a dynamic
              world.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col items-center md:items-end gap-3">
            <span className="label-caps text-white/40 mb-1">Navigate</span>
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/70 hover:text-gold transition-colors duration-300 font-light cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        {/* Bottom */}
        <div className="text-center">
          <p className="text-white/35 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} SsaRanga — The Mind Spa. All
            rights reserved.
            <span className="mx-2 text-white/15">·</span>
            <span className="text-white/30">Bengaluru, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
