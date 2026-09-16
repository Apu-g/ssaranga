"use client";

import { motion } from "framer-motion";
import FilterText from "./FilterText";
import { scrollToSection } from "@/lib/scrollTo";

const events = [
  {
    title: "Upcoming Workshop",
    date: "To be announced",
    time: "To be announced",
    venue: "Bengaluru",
    tag: "Workshop",
  },
  {
    title: "Community Gathering",
    date: "To be announced",
    time: "To be announced",
    venue: "Bengaluru",
    tag: "Community",
  },
  {
    title: "Special Experience",
    date: "To be announced",
    time: "To be announced",
    venue: "Bengaluru",
    tag: "Special",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function EventsSection() {
  return (
    <section id="events" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[44rem] h-[26rem] max-w-[96vw] rounded-full bg-sage/15 blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            className="mb-4 inline-block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="label-caps text-moss block">
              What&apos;s Happening at SsaRanga?
            </span>
          </motion.div>
          <FilterText as="h2" variant="melt" className="text-ink mb-5" duration={1.1}>
            Upcoming Events
          </FilterText>
          <p className="text-ink/80 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Discover upcoming workshops, community gatherings and special
            experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              onClick={() => scrollToSection("contact")}
              className="glass-light rounded-3xl p-8 card-hover block group cursor-pointer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="label-caps text-moss bg-moss/10 border border-moss/20 px-3 py-1 rounded-full text-xs">
                  {event.tag}
                </span>
                <svg
                  className="text-moss/40 transition-transform duration-300 group-hover:translate-x-1"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="text-ink text-xl mb-4">{event.title}</h3>

              <div className="space-y-2.5 text-sm font-light text-ink/60">
                <div className="flex items-center gap-2.5">
                  <span className="text-moss">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  Date: {event.date}
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-moss">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Time: {event.time}
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-moss">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  Venue: {event.venue}
                </div>
              </div>

              <span className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(0,138,199,0.4)]">
                Register Now
              </span>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          className="mx-auto mt-12 max-w-xl px-6 text-center text-sm font-light text-ink/45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          New events and workshop dates will be announced here soon. Follow us
          on Instagram to be the first to know.
        </motion.p>
      </div>
    </section>
  );
}