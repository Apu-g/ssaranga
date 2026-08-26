"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import SectionBreak from "@/components/SectionBreak";
import WhoIsItFor from "@/components/WhoIsItFor";
import ProgramsSection from "@/components/ProgramsSection";
import OffersSection from "@/components/OffersSection";
import JourneySection from "@/components/JourneySection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import WaveSeparator from "@/components/WaveSeparator";

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

      <WhySection />

      <SectionBreak
        variant="sage"
        quote="Creating a positive space where children can pause, reflect and grow."
        fromColor="#0B2B26"
        toColor="#FAFAF7"
      />

      <WhoIsItFor />

      <ProgramsSection />

      <WaveSeparator from="#FAFAF7" to="#0B2B26" />

      <OffersSection />

      <WaveSeparator from="#0B2B26" to="#DAF1DE" />

      <JourneySection />

      <WaveSeparator from="#DAF1DE" to="#0B2B26" />

      <AboutSection />

      <SectionBreak
        variant="forest"
        quote="Calm mind · Clear thought · Confident growth"
        fromColor="#0B2B26"
        toColor="#0B2B26"
      />

      <ContactSection />
    </>
  );
}
