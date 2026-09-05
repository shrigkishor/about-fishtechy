"use client";

import { cn } from "@/lib/cn";

/**
 * Infinite horizontal ticker.
 *
 * The track is rendered TWICE and translated by exactly -100% of one copy, so
 * the loop point falls on identical content and never shows a seam. Duplicating
 * in markup rather than cloning in JS keeps the whole thing CSS-driven — it
 * costs no rAF frame and it runs before hydration.
 *
 * `aria-hidden` on the second copy: it is the same words again, and a screen
 * reader reading a decorative ticker twice is noise.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
  duration = 34,
  gap = "3.5rem",
  reverse = false,
  separator,
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  /** Seconds for one full pass. Longer = slower. */
  duration?: number;
  gap?: string;
  reverse?: boolean;
  separator?: React.ReactNode;
}) {
  const track = (hidden: boolean) => (
    <div
      className="marquee-track"
      aria-hidden={hidden || undefined}
      style={
        {
          "--marquee-gap": gap,
          "--marquee-duration": `${duration}s`,
          "--marquee-direction": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className={cn("shrink-0", itemClassName)}>
          {item}
          {separator ? (
            <span aria-hidden className="ml-[var(--marquee-gap)] inline-block">
              {separator}
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee", className)}>
      {track(false)}
      {track(true)}
    </div>
  );
}
