"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image with a graceful luxury fallback: if a remote photo fails to load,
 * we swap in a cream→crimson gradient instead of a broken-image icon, so the
 * composition never breaks even while real photography is being swapped in.
 */
export default function SmartImage({
  alt,
  className,
  ...props
}: ImageProps & { alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-cream via-[#f3d9a0] to-crimson/70 ${className ?? ""}`}
        aria-label={alt}
        role="img"
      >
        <span className="font-display text-2xl italic text-charcoal/40">Chilli N Curry</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
