"use client";

import { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Scroll-linked parallax translation.
 *
 * `speed` is the fraction of the scrolled distance the layer gives back:
 * 0.2 drifts gently behind the page, negative values run ahead of it. The
 * reference uses this on the photographic backdrops behind its project cards,
 * which is the same job it does here behind the lineup and the app rows.
 *
 * `scrub: true` rather than a number — a scrub delay on top of Lenis' own
 * easing compounds into visible lag, since Lenis has already smoothed the
 * input this is reading.
 *
 * The element must be inside something clipped (`overflow: hidden`) and sized
 * taller than its frame, or the translation reveals its edges. `ParallaxImage`
 * below bundles that.
 */
export default function Parallax({
  children,
  speed = 0.18,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/**
 * A clipped frame with a parallaxing image inside it.
 *
 * The image is oversized so the drift never exposes a gap at the top or bottom
 * of the frame: the overscan has to cover the full travel, which is
 * `speed * 50%` in each direction.
 *
 * THE OVERSCAN USES `Math.abs(speed)`. A negative speed means "drift the other
 * way", not "need less room" — but sizing from the signed value made the inner
 * box SMALLER than its frame (at -0.16: 84% tall, inset 8%), so a
 * reverse-direction layer sat in a letterboxed gap and only covered the frame
 * at the extremes of its travel. The magnitude of the travel is what decides
 * the overscan; the sign only decides which way it goes.
 */
export function ParallaxImage({
  src,
  alt,
  speed = 0.18,
  className,
  imgClassName,
  priority,
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Parallax speed={speed} className="absolute inset-0">
        <div
          className="absolute inset-x-0"
          style={{
            top: `${-Math.abs(speed) * 50}%`,
            height: `${100 + Math.abs(speed) * 100}%`,
          }}
        >
          {/* Plain <img>: these are decorative full-bleed backdrops whose box is
              set by the frame, and next/image's fill mode adds a wrapper that
              fights the parallax transform above it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn("h-full w-full object-cover", imgClassName)}
          />
        </div>
      </Parallax>
    </div>
  );
}
