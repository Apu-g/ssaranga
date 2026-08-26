/* Hidden SVG filter definitions used by <FilterText />.
   Rendered once in the root layout. Adapted from the goo/turbulence/
   displacement filters in OnScrollSVGFilterText. */

export default function SvgFilterDefs() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        {/* Melt: pure gaussian blur resolving to crisp */}
        <filter id="gooey-melt">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 13 -6"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Turbulence: blur + noise displacement melting in */}
        <filter id="gooey-turbulence">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 12 -4"
            result="goo"
          />
          <feTurbulence
            type="turbulence"
            baseFrequency="1"
            numOctaves="1"
            seed="2"
            result="noise"
          />
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement" />
          <feComposite in="SourceGraphic" in2="displacement" operator="atop" />
        </filter>

        {/* Fractal water: soft liquid ripple resolve (used for the About quote) */}
        <filter id="gooey-fractal">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 15 -8"
            result="goo"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.1 0.5"
            numOctaves="5"
            seed="2"
            result="noise"
          />
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement" />
          <feComposite in="SourceGraphic" in2="displacement" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
