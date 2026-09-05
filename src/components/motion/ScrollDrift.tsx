"use client";

import { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Translates its children as the page scrolls past — the generic half of a
 * parallax, without the clipped frame `ParallaxImage` brings.
 *
 * `ParallaxImage` exists for pictures: it owns an overflow-hidden frame and
 * oversizes the image so the drift never exposes an edge. This is for
 * everything else — a marquee, a row of type, a heading — where there is no
 * frame and nothing to overscan, only movement.
 *
 * WHY IT WRAPS RATHER THAN ANIMATING THE CHILD. Several of the things drifting
 * here are already running a CSS `animation` on their own transform (the
 * marquees). GSAP writing `transform` on the same element would fight that
 * animation frame for frame. A wrapper composes with it instead: the child
 * keeps its loop, the wrapper carries the scroll.
 *
 * `x` and `y` are the TOTAL travel in px across the section's pass through the
 * viewport, split evenly either side of centre — so a value of 80 means 40 up
 * and 40 down, and the element sits where it was laid out when the section is
 * centred.
 */
export default function ScrollDrift({
  children,
  className,
  x = 0,
  y = 0,
  /** Defaults to this element; pass a selector to scrub against an ancestor. */
  trigger,
}: {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  trigger?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: -x / 2, y: -y / 2 },
        {
          x: x / 2,
          y: y / 2,
          ease: "none",
          scrollTrigger: {
            trigger: trigger ? el.closest(trigger) || el : el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [x, y, trigger]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
