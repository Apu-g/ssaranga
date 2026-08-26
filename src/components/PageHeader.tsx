"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FilterText from "./FilterText";

interface Props {
  kicker: string;
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHeader({ kicker, title, subtitle, image = "/images/detail-botanical.jpg" }: Props) {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden bg-deep-forest">
      {/* Photo backdrop with deep overlay for contrast */}
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-deep-forest/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/60 via-transparent to-deep-forest" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.span
          className="label-caps text-gold mb-5 block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {kicker}
        </motion.span>
        <FilterText
          as="h1"
          variant="melt"
          duration={2.2}
          className="text-white mb-6"
        >
          {title}
        </FilterText>
        {subtitle && (
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
