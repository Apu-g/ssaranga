"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const programOptions = [
  "SsaRanga Kids (8–18)",
  "SsaRanga Women (18+)",
  "SsaRanga Elders (55+)",
  "SsaRanga One-to-One",
  "SsaRanga Workshops",
  "General Enquiry",
];

export default function ContactSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    program: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate form submission (replace with actual endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("sent");

    // Reset after 3 seconds
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", contact: "", program: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-deep-forest" ref={sectionRef}>
      {/* Photo background with deep-green contrast overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/detail-calm.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-deep-forest/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest via-pine/50 to-deep-forest" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        {showHeader && (
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-gold mb-4 block">Get In Touch</span>
            <h2 className="text-white mb-6">Begin the Journey with SsaRanga</h2>

            {/* Registration badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/15 border border-gold/40 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="label-caps text-gold text-xs">
                Registrations are now open!
              </span>
            </div>

            <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
              If you are looking for a meaningful relaxation and guidance program
              for your child, I warmly invite you to explore this opportunity and
              be part of this new journey.
            </p>
          </motion.div>
        )}

        {/* Contact card — dark glass over photo */}
        <motion.div
          className="glass-dark glass-sheen rounded-[2rem] p-8 md:p-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-8">
            <p className="text-white/75 font-light">
              For details &amp; enrollment — Please contact me
            </p>
          </div>

          {formState === "sent" ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M8 16L14 22L24 10"
                    stroke="#8EB69B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-white text-xl mb-2">Thank you!</h3>
              <p className="text-white/60 font-light">
                We&apos;ll be in touch soon to begin your journey.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-white/70 mb-2 font-medium"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-ink/10 text-ink placeholder:text-ink/30 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone / Email */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm text-white/70 mb-2 font-medium"
                >
                  Phone or Email
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-ink/10 text-ink placeholder:text-ink/30 transition-all duration-300"
                  placeholder="Your phone number or email"
                />
              </div>

              {/* Program interest */}
              <div>
                <label
                  htmlFor="program"
                  className="block text-sm text-white/70 mb-2 font-medium"
                >
                  Program Interest
                </label>
                <select
                  id="program"
                  required
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-ink/10 text-ink transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238EB69B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                  }}
                >
                  <option value="">Select a program</option>
                  {programOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-white/70 mb-2 font-medium"
                >
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-ink/10 text-ink placeholder:text-ink/30 transition-all duration-300 resize-none"
                  placeholder="Tell us a bit about what you're looking for..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full py-3.5 rounded-full bg-gold text-deep-forest font-medium hover:bg-gold-soft transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {formState === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-deep-forest/30 border-t-deep-forest rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Enquiry"
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="text-center text-white/60 text-sm font-light mt-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Let&apos;s help our children cultivate calmness, clarity of thought
          and confidence to thrive in life.
        </motion.p>
      </div>
    </section>
  );
}
