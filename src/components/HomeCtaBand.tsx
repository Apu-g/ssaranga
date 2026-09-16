"use client";

import { motion } from "framer-motion";
import AnchorLink from "@/components/AnchorLink";

export default function HomeCtaBand() {
  return (
    <section
      id="join"
      className="section-padding relative overflow-hidden bg-paper"
    >
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[720px] max-h-[720px] rounded-full bg-sage/30 blur-[110px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-5 inline-block">
          <span className="label-caps text-moss block">
            An Invitation
          </span>
        </div>
        <h2 className="text-ink mb-6 text-3xl sm:text-4xl md:text-5xl font-normal">
          Your journey deserves a space.
        </h2>
        <p className="text-ink/80 text-lg sm:text-xl font-light mb-8 max-w-xl mx-auto leading-relaxed">
          Maybe that space begins with a conversation. Maybe with a story.
          Maybe with a pause. Maybe it begins at SsaRanga.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnchorLink
            id="contact"
            className="group relative inline-flex items-center px-9 py-3.5 rounded-full bg-moss text-white font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,138,199,0.45)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="relative z-10">Begin Your SsaRanga Journey</span>
            <span className="cta-sheen" />
          </AnchorLink>
          <AnchorLink
            id="founder"
            className="inline-flex items-center px-9 py-3.5 rounded-full border border-moss/30 glass-light text-ink font-medium tracking-wide hover:border-moss hover:text-moss transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Discover Our Story
          </AnchorLink>
        </div>
      </motion.div>
    </section>
  );
}