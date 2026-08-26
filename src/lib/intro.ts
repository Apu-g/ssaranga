// Shared intro choreography — single source of truth for LoadingScreen, Hero and Navbar.

export const INTRO_HOLD_MS = 2800; // glossy screen hold before the reveal starts
export const REVEAL_MS = 1150; // ripple rings duration
export const LOGO_FLIGHT_DELAY_MS = 50; // logo starts flying shortly after hole opens
export const LOGO_FLIGHT_MS = 450; // 3D flight duration to its hero spot
export const LOGO_LAND_AT_MS =
  INTRO_HOLD_MS + LOGO_FLIGHT_DELAY_MS + LOGO_FLIGHT_MS; // from mount
export const INTRO_TOTAL_MS = INTRO_HOLD_MS + REVEAL_MS + 250; // loader fully gone

// Delays (ms) after "reveal started" for hero stages
export const STAGE_MEDALLION = 0; // hero container visible immediately
export const STAGE_LOGO_LAND = LOGO_FLIGHT_DELAY_MS + LOGO_FLIGHT_MS; // logo lands at hero
export const STAGE_KANNADA = STAGE_LOGO_LAND + 200;
export const STAGE_TAGLINE = STAGE_KANNADA + 260;
export const STAGE_CTA = STAGE_TAGLINE + 240;
export const STAGE_TILES = STAGE_CTA + 200;

/* ── Intro state (module-level: survives SPA navigations, resets on reload) ── */

let introStarted = false;
let introPlayed = false;

export function markIntroStarted() {
  introStarted = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ssaranga:intro-started"));
  }
}

export function hasIntroStarted() {
  return introStarted;
}

export function markIntroPlayed() {
  introPlayed = true;
}

export function hasIntroPlayed() {
  return introPlayed;
}
