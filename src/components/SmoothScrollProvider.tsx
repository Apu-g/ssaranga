"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Site-wide buttery scrolling (Lenis) synced with GSAP ScrollTrigger.
   The smooth scroll itself is the transition glue between sections while
   the scroll-driven wave / morph / filter effects play. It also serves
   anchor navigation for the single-page layout. */

interface LenisLike {
  raf: (t: number) => void;
  destroy: () => void;
  scrollTo: (t: number | string | HTMLElement, o?: Record<string, unknown>) => void;
  on: (e: string, cb: () => void) => void;
}

const NAV_OFFSET = -76; // clear the fixed navbar

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisLike | null>(null);

  /* Always start the site at the top (home) on a fresh load.
     Disable the browser's scroll-restoration so a reload doesn't
     leave the user mid-page — it restarts from the hero instead. */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (typeof requestAnimationFrame === "function") {
      const raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis as unknown as LenisLike;

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      document.documentElement.classList.add("lenis");

      cleanup = () => {
        document.documentElement.classList.remove("lenis");
        lenisRef.current = null;
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  /* Anchor navigation for the one-page layout */
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const lenis = lenisRef.current;
      if (id === "top") {
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.5 });
      else {
        const y = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };
    window.addEventListener("ssaranga:scroll-to", handler);
    return () => window.removeEventListener("ssaranga:scroll-to", handler);
  }, []);

  return <>{children}</>;
}
