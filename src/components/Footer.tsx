"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/scrollTo";
import InstagramIcon from "@/components/InstagramIcon";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 3.2c-7.06 0-12.8 5.738-12.8 12.8 0 2.267.6 4.474 1.735 6.415L3.2 28.8l6.575-1.7a12.77 12.77 0 0 0 6.23 1.582h.006c7.057 0 12.795-5.738 12.795-12.798 0-3.42-1.33-6.633-3.748-9.05A12.72 12.72 0 0 0 16.004 3.2zm0 23.436h-.005a10.62 10.62 0 0 1-5.408-1.482l-.388-.23-3.99 1.032 1.065-3.89-.253-.39a10.59 10.59 0 0 1-1.626-5.655c0-5.874 4.78-10.653 10.656-10.653 2.846 0 5.52 1.11 7.53 3.124a10.58 10.58 0 0 1 3.118 7.53c0 5.874-4.78 10.654-10.65 10.657zm5.84-7.976c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.506-.16-.72.16-.213.32-.826 1.04-1.013 1.254-.186.213-.373.24-.693.08-.32-.16-1.35-.497-2.572-1.586-.95-.849-1.594-1.897-1.78-2.218-.187-.32-.02-.492.14-.654.143-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55-.186-.008-.4-.01-.613-.01-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.457 4.823.763.33 1.36.526 1.823.673.767.246 1.464.213 2.016.13.615-.094 1.893-.774 2.16-1.52.267-.747.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
  );
}

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
        <div className="flex flex-col items-center gap-5 mb-8">
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/ssaranga_mindspa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SsaRanga on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/9180168155"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with SsaRanga on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
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
