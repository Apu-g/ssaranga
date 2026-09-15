"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import InstagramIcon from "@/components/InstagramIcon";

const interestedOptions = [
  "Young Minds",
  "Women",
  "Elders",
  "Workshop",
  "One-to-One Session",
  "Community Program",
];

const WHATSAPP_NUMBER = "9180168155";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi SsaRanga! I'd like to know more about your programs."
)}`;

const INSTAGRAM_LINK = "https://www.instagram.com/ssaranga_mindspa";
const EMAIL = "ssarangamindspa@gmail.com";

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
    ageGroup: "",
    phone: "",
    email: "",
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
      setFormData({
        name: "",
        ageGroup: "",
        phone: "",
        email: "",
        program: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-cream"
      ref={sectionRef}
    >
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] max-w-[94vw] max-h-[94vw] rounded-full bg-sage/30 blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        {showHeader && (
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-moss mb-4 block">
              Let&apos;s Begin the Conversation
            </span>
            <h2 className="text-ink mb-6">We&apos;d love to hear from you</h2>

            {/* Registration badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-moss/10 border border-moss/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
              <span className="label-caps text-moss text-xs">
                Registrations are now open!
              </span>
            </div>

            <p className="text-ink/65 text-lg max-w-2xl mx-auto font-light">
              Whether you are exploring SsaRanga for yourself, your child or
              your community, we&apos;re here to help you find the right space
              to begin.
            </p>
          </motion.div>
        )}

        {/* Contact card — light glass */}
        <motion.div
          className="rounded-[2rem] p-8 md:p-12 max-w-2xl mx-auto bg-white/75 backdrop-blur-xl border border-moss/15 shadow-[0_24px_70px_rgba(0,59,92,0.08)]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-8">
            <p className="text-ink/65 font-light">
              Share a few details and we&apos;ll get back to you.
            </p>
          </div>

          {formState === "sent" ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-moss/15 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M8 16L14 22L24 10"
                    stroke="#008AC7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-ink text-xl mb-2">Thank you!</h3>
              <p className="text-ink/60 font-light">
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
                    className="block text-sm text-ink/70 mb-2 font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-paper/90 border border-moss/20 text-ink placeholder:text-ink/30 transition-all duration-300 focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    placeholder="Your name"
                  />
                </div>

                {/* Age Group */}
                <div>
                  <label
                    htmlFor="ageGroup"
                    className="block text-sm text-ink/70 mb-2 font-medium"
                  >
                    Age Group
                  </label>
                  <select
                    id="ageGroup"
                    value={formData.ageGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, ageGroup: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-paper/90 border border-moss/20 text-ink transition-all duration-300 appearance-none cursor-pointer focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    style={{ color: formData.ageGroup ? "#003B5C" : "#8CA6B4" }}
                  >
                    <option value="" disabled>
                      Select an age group
                    </option>
                    <option value="Young Minds">Young Minds</option>
                    <option value="Women">Women (18+)</option>
                    <option value="Elders">Elders (55+)</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-ink/70 mb-2 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-paper/90 border border-moss/20 text-ink placeholder:text-ink/30 transition-all duration-300 focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    placeholder="Your phone number"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-ink/70 mb-2 font-medium"
                  >
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-paper/90 border border-moss/20 text-ink placeholder:text-ink/30 transition-all duration-300 focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    placeholder="Your email address"
                  />
                </div>

                {/* Program interest */}
                <div>
                  <label
                    htmlFor="program"
                    className="block text-sm text-ink/70 mb-2 font-medium"
                  >
                    Interested In
                  </label>
                  <select
                    id="program"
                    required
                    value={formData.program}
                    onChange={(e) =>
                      setFormData({ ...formData, program: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-paper/90 border border-moss/20 text-ink transition-all duration-300 appearance-none cursor-pointer focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    style={{ color: formData.program ? "#003B5C" : "#8CA6B4" }}
                  >
                    <option value="" disabled>
                      Select an interest
                    </option>
                    {interestedOptions.map((opt) => (
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
                    className="block text-sm text-ink/70 mb-2 font-medium"
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
                    className="w-full px-4 py-3 rounded-xl bg-paper/90 border border-moss/20 text-ink placeholder:text-ink/30 transition-all duration-300 resize-none focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    placeholder="Tell us a bit about what you're looking for..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-3.5 rounded-full bg-moss text-white font-medium hover:bg-deep-forest transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(0,138,199,0.3)]"
                >
                  {formState === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Enquiry"
                  )}
                </button>
              </form>

              {/* WhatsApp / Instagram — divider + inline buttons */}
              <div className="flex items-center gap-3 my-6">
                <span className="h-px flex-1 bg-moss/15" />
                <span className="label-caps text-ink/40 text-[0.6rem]">or</span>
                <span className="h-px flex-1 bg-moss/15" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-white font-medium transition-all duration-300 shadow-md hover:bg-[#1ebe5b] hover:shadow-lg hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Start a Conversation on WhatsApp
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SsaRanga on Instagram"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-moss/10 border border-moss/30 py-3.5 text-ink font-medium transition-all duration-300 shadow-md hover:bg-moss/20 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <InstagramIcon className="h-5 w-5" />
                  Follow on Instagram
                </a>
              </div>
            </>
          )}
        </motion.div>

        {/* Direct contact details */}
        <motion.div
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            {
              label: "Call / WhatsApp",
              value: "+91 9180168155",
              href: `tel:+${WHATSAPP_NUMBER}`,
            },
            {
              label: "Email",
              value: "ssarangamindspa@gmail.com",
              href: `mailto:${EMAIL}`,
            },
            {
              label: "Instagram",
              value: "@ssaranga_mindspa",
              href: INSTAGRAM_LINK,
            },
            {
              label: "Location",
              value: "Bengaluru, India",
              href: undefined,
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href?.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className={`rounded-2xl p-4 text-center bg-white/70 backdrop-blur border border-moss/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,138,199,0.15)] ${
                item.href ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="label-caps text-moss block text-xs mb-1">
                {item.label}
              </span>
              <span className="text-ink text-sm font-medium break-words">
                {item.value}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="text-center text-ink/50 text-sm font-light mt-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Nurture within. Grow beyond. We look forward to hearing your story.
        </motion.p>
      </div>
    </section>
  );
}