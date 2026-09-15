"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import PauseSection from "@/components/PauseSection";
import WaveSeparator from "@/components/WaveSeparator";
import BeliefSection from "@/components/BeliefSection";
import ThreeSpacesSection from "@/components/ThreeSpacesSection";
import AboutStorySection from "@/components/AboutStorySection";
import FounderSection from "@/components/FounderSection";
import PillarSection from "@/components/PillarSection";
import ProgramsSection from "@/components/ProgramsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import SpaGallerySection from "@/components/SpaGallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EventsSection from "@/components/EventsSection";
import HomeCtaBand from "@/components/HomeCtaBand";
import ContactSection from "@/components/ContactSection";
import {
  youngMindsConfig,
  womenConfig,
  eldersConfig,
} from "@/lib/pillars";

const INSTAGRAM_URL = "https://www.instagram.com/ssaranga_mindspa";

function MomentsCta() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-24">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-sage/25 blur-[100px] pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <p className="text-ink text-2xl md:text-3xl font-light leading-snug mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Behind every moment at SsaRanga, there is a story waiting to be told.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-moss text-white font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,138,199,0.45)] hover:-translate-y-0.5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
          </svg>
          See More Moments on Instagram
        </a>
      </div>
    </section>
  );
}

/* SsaRanga — single scrolling page following the SsaRanga content document.
   Each section is its own anchor; navigation buttons smooth-scroll to them. */

export default function Home() {
  const [introStarted, setIntroStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <LoadingScreen
          onStart={() => setIntroStarted(true)}
          onComplete={() => setIntroDone(true)}
        />
      )}

      <Hero started={introStarted} />

      <PauseSection />

      <WaveSeparator from="#F0FAFD" to="#C9F4F6" />

      <BeliefSection />

      <WaveSeparator from="#C9F4F6" to="#F0FAFD" flip />

      <ThreeSpacesSection />

      <AboutStorySection />

      <FounderSection />

      <PillarSection config={youngMindsConfig} />
      <PillarSection config={womenConfig} />
      <PillarSection config={eldersConfig} />

      <ProgramsSection />

      <ExperienceSection />

      <WaveSeparator from="#F0FAFD" to="#C9F4F6" />

      <ActivitiesSection />

      <WaveSeparator from="#C9F4F6" to="#F0FAFD" flip />

      <SpaGallerySection />

      <MomentsCta />

      <TestimonialsSection />

      <WaveSeparator from="#F0FAFD" to="#C9F4F6" />

      <EventsSection />

      <WaveSeparator from="#C9F4F6" to="#F0FAFD" flip />

      <HomeCtaBand />

      <ContactSection />
    </>
  );
}