"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type BlurImageProps = Omit<ImageProps, "onLoad"> & {
  wrapperClassName?: string;
};

/**
 * BlurImage — shows a shimmer skeleton while the image loads,
 * then fades the real image in smoothly. Drop-in for Next.js <Image>.
 *
 * When `fill` is true the wrapper becomes `absolute inset-0` so it
 * inherits size from the already-relative parent container, preventing
 * the "height 0" error.
 */
export default function BlurImage({
  wrapperClassName = "",
  className = "",
  fill,
  ...props
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  // fill images need absolute positioning on the wrapper so they
  // correctly inherit the parent container's dimensions.
  const wrapperClasses = fill
    ? `absolute inset-0 overflow-hidden ${wrapperClassName}`.trim()
    : `relative overflow-hidden ${wrapperClassName}`.trim();

  return (
    <div className={wrapperClasses}>
      {/* Shimmer skeleton — visible until image loads */}
      {!loaded && (
        <div className="absolute inset-0 z-10 img-skeleton" aria-hidden="true" />
      )}
      <Image
        {...props}
        fill={fill}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`.trim()}
        onLoad={() => setLoaded(true)}
        loading={props.priority ? "eager" : "lazy"}
      />
    </div>
  );
}
