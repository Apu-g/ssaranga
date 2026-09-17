"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import BlurImage from "./BlurImage";
import FilterText from "./FilterText";
import { scrollToSection } from "@/lib/scrollTo";

export interface ProgramItem {
  slug: "kids" | "women" | "elders" | "workshops" | "one-to-one";
  shortName: string;
  name: string;
  subtitle: string;
  format: string;
  desc: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  highlights: string[];
}

const programs: ProgramItem[] = [
  {
    slug: "kids",
    shortName: "Young Minds",
    name: "Young Minds",
    subtitle: "Discover • Express • Grow",
    format: "Workshops | Activity Sessions | Group Programs",
    desc: "Interactive experiences that nurture confidence, emotional awareness, communication, problem solving, and positive life skills for children and young adults.",
    image: "/images/kids 2.jpeg",
    imageAlt: "Children engaged in creative learning at SsaRanga",
    highlights: [
      "Storytelling & expressive games",
      "Building emotional resilience & self-belief",
      "Fun peer communication & team problem solving",
      "Safe space to express feelings without pressure",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 30V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 18C18 18 14 13 14 9C14 5 16 4 18 4C20 4 22 5 22 9C22 13 18 18 18 18Z" stroke="currentColor" strokeWidth="2" />
        <path d="M14 30H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 22L18 24L24 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: "women",
    shortName: "Women",
    name: "Women — Rooted & Rising",
    subtitle: "Pause • Reflect • Reconnect • Rise",
    format: "Workshops | Group Sessions | Special Circles | One-to-One",
    desc: "Meaningful sessions designed to create a safe space for women to pause from daily responsibilities, reflect on self-worth, rebuild confidence, and connect with fellow seekers.",
    image: "/images/women2.jpeg",
    imageAlt: "Women connecting in a wellness circle at SsaRanga",
    highlights: [
      "Guided reflective conversations & journaling",
      "Navigating life transitions & career/personal balance",
      "Empathetic, non-judgmental community circle",
      "Rediscovering personal aspirations and inner strength",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 6C12 10 10 16 14 22C16 26 18 30 18 30C18 30 20 26 22 22C26 16 24 10 18 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 14V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 18L18 16L22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: "elders",
    shortName: "Elders",
    name: "Elders — Every Story Matters",
    subtitle: "Connect • Share • Create • Celebrate",
    format: "Activity Sessions | Community Programs | Special Gatherings",
    desc: "Warm, heartwarming experiences that celebrate the wisdom of seniors, providing creative activities, memory-sharing circles, music, and intergenerational bonding.",
    image: "/images/elders2.jpeg",
    imageAlt: "Elders celebrating memories and music at SsaRanga",
    highlights: [
      "Memoir & storytelling circles",
      "Gentle creative arts, music & cultural gatherings",
      "Meaningful companionship & social engagement",
      "Intergenerational sharing and joyful learning",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="14" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M14 26C14 26 16 22 18 22C20 22 22 26 22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 30C10 30 12 26 18 26C24 26 26 30 26 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "workshops",
    shortName: "Workshops",
    name: "Special Theme Workshops",
    subtitle: "Customized experiences for groups & communities",
    format: "Schools | Corporates | Communities | Residential Societies",
    desc: "Theme-based interactive workshops curated for educational institutions, apartment communities, corporate teams, and special interest groups seeking mindful growth.",
    image: "/images/workshop.jpg",
    imageAlt: "Mindfulness and interactive workshop at SsaRanga",
    highlights: [
      "Customized modules tailored to your group needs",
      "Interactive group dynamics & icebreaking exercises",
      "Practical tools for emotional wellness & communication",
      "Facilitated by experienced mentors",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="2" />
        <path d="M18 10C14 14 14 22 18 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 10C22 14 22 22 18 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 18H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "one-to-one",
    shortName: "One-to-One",
    name: "One-to-One Personal Sessions",
    subtitle: "A personal and focused conversation",
    format: "Individual | Confidential | Tailored",
    desc: "Dedicated personal sessions for individuals seeking a private, tranquil space to talk through life transitions, clarify thoughts, and discover inner equilibrium.",
    image: "/images/one-to-one.jpg",
    imageAlt: "One-to-one reflective session at SsaRanga",
    highlights: [
      "100% confidential and individualized attention",
      "Empathetic listening without rush or judgement",
      "Personalized clarity frameworks & reflection tools",
      "Flexible scheduling options",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M12 18C12 18 14 12 18 12C22 12 24 18 24 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 12V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="24" r="3.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function ProgramsSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const [activeSlug, setActiveSlug] = useState<ProgramItem["slug"]>("kids");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-60px" });

  useEffect(() => {
    const handleSelectProgram = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail as ProgramItem["slug"];
      if (slug && programs.some((p) => p.slug === slug)) {
        setActiveSlug(slug);
      }
    };
    window.addEventListener("ssaranga:select-program", handleSelectProgram);
    return () => window.removeEventListener("ssaranga:select-program", handleSelectProgram);
  }, []);

  const activeProgram = programs.find((p) => p.slug === activeSlug) || programs[0];

  const handleBookClick = () => {
    scrollToSection("contact");
  };

  return (
    <section id="programs" className="section-padding bg-paper relative overflow-hidden" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] max-w-[94vw] max-h-[94vw] rounded-full bg-sage/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-10 md:mb-14">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-caps text-moss block">
                Our Programs
              </span>
            </motion.div>
            <FilterText
              as="h2"
              variant="melt"
              className="text-ink mb-4"
              duration={1.1}
            >
              Programs designed around people
            </FilterText>
            <p className="text-ink/75 text-base sm:text-lg font-light max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore our curated programs tailored for each generation, life stage, and learning aspiration.
            </p>
          </div>
        )}

        {/* Program Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-12">
          {programs.map((program) => {
            const isSelected = program.slug === activeSlug;
            return (
              <button
                key={program.slug}
                onClick={() => setActiveSlug(program.slug)}
                className={`relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-moss text-white shadow-[0_8px_25px_rgba(0,138,199,0.35)] scale-105"
                    : "bg-white/80 text-ink/75 border border-moss/15 hover:bg-moss/10 hover:text-moss"
                }`}
              >
                <span className={isSelected ? "text-white" : "text-moss"}>
                  {program.icon}
                </span>
                <span>{program.shortName}</span>
                {isSelected && (
                  <motion.span
                    layoutId="activeProgramTab"
                    className="absolute inset-0 rounded-full ring-2 ring-moss ring-offset-2 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Program Card — Screen-Fitted Showcase */}
        <div className="relative glass-light rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-moss/20 shadow-[0_24px_70px_rgba(0,59,92,0.1)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Photo 2 Showcase */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-[2rem] overflow-hidden ring-1 ring-moss/20 shadow-lg bg-cream">
                  <BlurImage
                    src={activeProgram.image}
                    alt={activeProgram.imageAlt}
                    fill
                    wrapperClassName="absolute inset-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 420px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/45 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="label-caps bg-deep-forest/70 backdrop-blur-md px-3 py-1 rounded-full text-[0.65rem] tracking-widest border border-white/20 inline-block mb-1">
                      {activeProgram.format}
                    </span>
                  </div>
                </div>
              </div>

              {/* Program Details & Direct Action CTA */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-xl bg-moss/10 text-moss">
                    {activeProgram.icon}
                  </span>
                  <span className="label-caps text-moss text-xs font-semibold">
                    {activeProgram.format}
                  </span>
                </div>

                <h3 className="text-ink text-2xl sm:text-3xl md:text-4xl font-normal mb-1">
                  {activeProgram.name}
                </h3>

                <p
                  className="text-moss text-lg sm:text-xl italic mb-4 font-light"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {activeProgram.subtitle}
                </p>

                <p className="text-ink/75 font-light text-base leading-relaxed mb-6">
                  {activeProgram.desc}
                </p>

                {/* Program Highlights */}
                <div className="space-y-2.5 mb-8">
                  <p className="label-caps text-moss text-xs font-semibold">
                    Session Highlights:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {activeProgram.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-ink/80 font-light bg-white/70 p-2.5 rounded-xl border border-moss/10"
                      >
                        <span className="text-moss mt-0.5 shrink-0">✦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action CTA Buttons (Fixed from redirecting backwards) */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleBookClick}
                    className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-moss text-white font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:bg-deep-forest hover:shadow-[0_10px_35px_rgba(0,138,199,0.35)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="relative z-10">Enquire / Book This Session</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="cta-sheen" />
                  </button>

                  <a
                    href={`https://wa.me/9180168155?text=${encodeURIComponent(
                      `Hi SsaRanga! I am interested in knowing more about the ${activeProgram.name} program.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/80 border border-moss/30 text-ink text-sm font-medium hover:bg-moss/10 hover:text-moss transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Quick WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}