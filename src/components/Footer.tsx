"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import InstagramIcon from "@/components/InstagramIcon";
import AnchorLink from "@/components/AnchorLink";
import { scrollToSection } from "@/lib/scrollTo";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 3.2c-7.06 0-12.8 5.738-12.8 12.8 0 2.267.6 4.474 1.735 6.415L3.2 28.8l6.575-1.7a12.77 12.77 0 0 0 6.23 1.582h.006c7.057 0 12.795-5.738 12.795-12.798 0-3.42-1.33-6.633-3.748-9.05A12.72 12.72 0 0 0 16.004 3.2zm0 23.436h-.005a10.62 10.62 0 0 1-5.408-1.482l-.388-.23-3.99 1.032 1.065-3.89-.253-.39a10.59 10.59 0 0 1-1.626-5.655c0-5.874 4.78-10.653 10.656-10.653 2.846 0 5.52 1.11 7.53 3.124a10.58 10.58 0 0 1 3.118 7.53c0 5.874-4.78 10.654-10.65 10.657zm5.84-7.976c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.506-.16-.72.16-.213.32-.826 1.04-1.013 1.254-.186.213-.373.24-.693.08-.32-.16-1.35-.497-2.572-1.586-.95-.849-1.594-1.897-1.78-2.218-.187-.32-.02-.492.14-.654.143-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55-.186-.008-.4-.01-.613-.01-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.457 4.823.763.33 1.36.526 1.823.673.767.246 1.464.213 2.016.13.615-.094 1.893-.774 2.16-1.52.267-.747.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white pt-16 pb-12 px-6 border-t border-moss/30"
      style={{
        background: "linear-gradient(180deg, #003B5C 0%, #002236 100%)",
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[38rem] h-[38rem] rounded-full bg-moss/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[38rem] h-[38rem] rounded-full bg-sage/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Feature Spotlight: Founder & Brand Mission */}
        <div className="rounded-3xl p-6 sm:p-8 mb-14 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Logo & Vision */}
            <div className="lg:col-span-5 flex flex-col items-start gap-3">
              <AnchorLink id="home" className="flex items-center gap-3.5 group cursor-pointer">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-sage/40 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo-main.jpeg"
                    alt="SsaRanga Logo"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <span className="text-white text-2xl font-light tracking-[0.06em] block" style={{ fontFamily: "var(--font-heading)" }}>
                    SsaRanga · <span className="text-sage text-xl font-normal">ಸಾರಂಗ</span>
                  </span>
                  <span className="text-sage/80 text-xs tracking-widest uppercase label-caps">
                    The Mind Spa
                  </span>
                </div>
              </AnchorLink>
              <p className="text-cream/80 text-sm font-light leading-relaxed max-w-md mt-1">
                A sanctuary designed for all generations to pause, express, reflect, and discover what lies within. Nurture Within • Grow Beyond.
              </p>
            </div>

            {/* Founder Spotlight with Cropped Photo */}
            <div className="lg:col-span-4 flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden ring-2 ring-sage/30 shadow-md">
                <Image
                  src="/images/founder.jpeg"
                  alt="Sonia Sreeraj — Founder"
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <p className="text-white text-sm font-medium leading-none">
                    Sonia Sreeraj
                  </p>
                </div>
                <p className="text-sage text-xs font-light mt-0.5">Founder, SsaRanga</p>
                <p className="text-white/60 text-xs font-light italic truncate mt-1">
                  &ldquo;Every story matters. Every mind has potential.&rdquo;
                </p>
              </div>
            </div>

            {/* Social Connect Icons */}
            <div className="lg:col-span-3 flex lg:justify-end items-center gap-3">
              <a
                href="https://www.instagram.com/ssaranga_mindspa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-11 w-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sage hover:bg-moss hover:text-white hover:border-moss transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/9180168155"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="h-11 w-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href="mailto:ssarangamindspa@gmail.com"
                aria-label="Email"
                className="h-11 w-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sage hover:bg-moss hover:text-white hover:border-moss transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Structured 4-Column Navigation Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14 text-sm">
          {/* Col 1: About & Story */}
          <div>
            <h4 className="label-caps text-sage mb-4 text-xs font-semibold tracking-wider">
              About SsaRanga
            </h4>
            <ul className="space-y-2.5 font-light text-cream/75">
              <li>
                <AnchorLink id="home" className="hover:text-sage transition-colors duration-200">
                  Home & Overview
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="founder" className="hover:text-sage transition-colors duration-200">
                  Meet Founder Sonia Sreeraj
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="founder" className="hover:text-sage transition-colors duration-200">
                  Founder&apos;s Message
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="about" className="hover:text-sage transition-colors duration-200">
                  Why the Name SsaRanga?
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="about" className="hover:text-sage transition-colors duration-200">
                  Vision & Philosophy
                </AnchorLink>
              </li>
            </ul>
          </div>

          {/* Col 2: Three Spaces & Programs */}
          <div>
            <h4 className="label-caps text-sage mb-4 text-xs font-semibold tracking-wider">
              Programs & Spaces
            </h4>
            <ul className="space-y-2.5 font-light text-cream/75">
              <li>
                <AnchorLink id="young-minds" className="hover:text-sage transition-colors duration-200">
                  🌱 Young Minds Program
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="women" className="hover:text-sage transition-colors duration-200">
                  🌸 Women — Rooted & Rising
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="elders" className="hover:text-sage transition-colors duration-200">
                  🌼 Elders — Every Story Matters
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="programs" className="hover:text-sage transition-colors duration-200">
                  ✨ Special Theme Workshops
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="programs" className="hover:text-sage transition-colors duration-200">
                  🌿 One-to-One Mind Spa Sessions
                </AnchorLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Experience & Activities */}
          <div>
            <h4 className="label-caps text-sage mb-4 text-xs font-semibold tracking-wider">
              Experience & Gatherings
            </h4>
            <ul className="space-y-2.5 font-light text-cream/75">
              <li>
                <AnchorLink id="experience" className="hover:text-sage transition-colors duration-200">
                  How SsaRanga Works (5 Steps)
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="activities" className="hover:text-sage transition-colors duration-200">
                  Mind Spa Activities
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="moments" className="hover:text-sage transition-colors duration-200">
                  SsaRanga Moments Gallery
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="events" className="hover:text-sage transition-colors duration-200">
                  Upcoming Community Events
                </AnchorLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Registration */}
          <div>
            <h4 className="label-caps text-sage mb-4 text-xs font-semibold tracking-wider">
              Connect With Us
            </h4>
            <div className="space-y-3 font-light text-cream/75 text-xs sm:text-sm">
              <p className="flex items-center gap-2">
                <span className="text-sage">📍</span>
                <span>Bengaluru, Karnataka, India</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sage">📞</span>
                <a href="tel:+9180168155" className="hover:text-sage transition-colors">
                  +91 9180168155
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sage">✉️</span>
                <a href="mailto:ssarangamindspa@gmail.com" className="hover:text-sage transition-colors break-all">
                  ssarangamindspa@gmail.com
                </a>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-moss hover:bg-sage hover:text-deep-forest text-white text-xs font-semibold transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>Send an Enquiry</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8" />

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50 font-light">
          <p>
            &copy; {new Date().getFullYear()} SsaRanga (The Mind Spa). All Rights Reserved.
          </p>
          <p className="italic text-sage/70 font-normal" style={{ fontFamily: "var(--font-heading)" }}>
            Nurture Within • Grow Beyond
          </p>
          <button
            onClick={() => scrollToSection("top")}
            className="inline-flex items-center gap-1.5 text-cream/70 hover:text-sage transition-colors duration-200 cursor-pointer"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}