"use client";

/* Ask the SmoothScrollProvider to glide to a section id (e.g. "contact").
   Falls back to native smooth scrolling when Lenis is unavailable. */

export function scrollToSection(id: string) {
  window.dispatchEvent(new CustomEvent("ssaranga:scroll-to", { detail: id }));
}
