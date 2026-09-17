"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type BlurImageProps = ImageProps & {
  wrapperClassName?: string;
};

/**
 * BlurImage — shows a shimmer skeleton while the image loads,
 * then fades the real image in smoothly. Drop-in for Next.js <Image>.
 */
export default function BlurImage({
  wrapperClassName = "",
  className = "",
  ...props
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Shimmer skeleton shown until image loads */}
      {!loaded && (
        <div
          className="absolute inset-0 z-10 img-skeleton"
          aria-hidden="true"
        />
      )}
      <Image
        {...props}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setLoaded(true)}
        loading={props.priority ? "eager" : "lazy"}
      />
    </div>
  );
}
