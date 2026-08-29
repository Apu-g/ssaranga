"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import InstagramIcon from "@/components/InstagramIcon";

const programOptions = [
  "SsaRanga Kids (8–18)",
  "SsaRanga Women (18+)",
  "SsaRanga Elders (55+)",
  "SsaRanga One-to-One",
  "SsaRanga Workshops",
  "General Enquiry",
];

const WHATSAPP_NUMBER = "9008480197";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi SsaRanga! I'd like to know more about your programs."
)}`;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 3.2c-7.06 0-12.8 5.738-12.8 12.8 0 2.267.6 4.474 1.735 6.415L3.2 28.8l6.575-1.7a12.77 12.77 0 0 0 6.23 1.582h.006c7.057 0 12.795-5.738 12.795-12.798 0-3.42-1.33-6.633-3.748-9.05A12.72 12.72 0 0 0 16.004 3.2zm0 23.436h-.005a10.62 10.62 0 0 1-5.408-1.482l-.388-.23-3.99 1.032 1.065-3.89-.253-.39a10.59 10.59 0 0 1-1.626-5.655c0-5.874 4.78-10.653 10.656-10.653 2.846 0 5.52 1.11 7.53 3.124a10.58 10.58 0 0 1 3.118 7.53c0 5.874-4.78 10.654-10.65 10.657zm5.84-7.976c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.506-.16-.72.16-.213.32-.826 1.04-1.013 1.254-.186.213-.373.24-.693.08-.32-.16-1.35-.497-2.572-1.586-.95-.849-1.594-1.897-1.78-2.218-.187-.32-.02-.492.14-.654.143-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55-.186-.008-.4-.01-.613-.01-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.457 4.823.763.33 1.36.526 1.823.673.767.246 1.464.213 2.016.13.615-.094 1.893-.774 2.16-1.52.267-.747.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
  );
}

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
    <>
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
            <>
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

            {/* WhatsApp / Instagram — divider + inline buttons */}
            <div className="flex items-center gap-3 my-6">
              <span className="h-px flex-1 bg-white/10" />
              <span className="label-caps text-white/40 text-[0.6rem]">or</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-white font-medium transition-all duration-300 shadow-md hover:bg-[#1ebe5b] hover:shadow-lg hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a
                href="https://www.instagram.com/ssaranga_mindspa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SsaRanga on Instagram"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white/10 border border-white/20 py-3.5 text-white font-medium transition-all duration-300 shadow-md hover:bg-white/20 hover:shadow-lg hover:-translate-y-0.5"
              >
                <InstagramIcon className="h-5 w-5" />
                Follow on Instagram
              </a>
            </div>
            </>
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

    {/* Floating WhatsApp bubble — mobile only */}
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SsaRanga on WhatsApp"
      className="fixed bottom-5 right-5 z-50 md:hidden flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)]"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.28], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <WhatsAppIcon className="relative z-10 h-7 w-7" />
    </motion.a>
    </>
  );
}
