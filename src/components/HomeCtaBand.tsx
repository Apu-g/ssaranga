"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/scrollTo";

export default function HomeCtaBand() {
  return (
    <section className="section-padding relative overflow-hidden bg-deep-forest">
      {/* Gold ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[720px] max-h-[720px] rounded-full bg-gold/[0.06] blur-[110px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="label-caps text-gold mb-5 block">Your Next Step</span>
        <h2 className="text-white mb-6">
          Ready to give your child
          <br className="hidden md:block" /> the space to grow?
        </h2>
        <p className="text-white/65 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
          Explore our programs or reach out — registrations for the first
          cohort are now open.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("programs")}
            className="group relative inline-flex items-center px-9 py-3.5 rounded-full bg-gold text-deep-forest font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(217,169,76,0.45)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="relative z-10">Explore Programs</span>
            <span className="cta-sheen" />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center px-9 py-3.5 rounded-full border border-white/25 glass-dark text-white font-medium tracking-wide hover:border-gold/60 hover:text-gold transition-all duration-300 cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </motion.div>
    </section>
  );
}
