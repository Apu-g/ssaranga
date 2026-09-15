"use client";

import { type ReactNode, type MouseEvent } from "react";
import { scrollToSection } from "@/lib/scrollTo";

/* In-page anchor that glides to a section via the Lenis smooth-scroll
   provider instead of doing a hard browser jump. */

export default function AnchorLink({
  id,
  className,
  children,
  ariaLabel,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <a
      href={`#${id}`}
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}