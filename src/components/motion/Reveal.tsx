"use client";

import { useRef, type ComponentType, type ElementType, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import type { PolymorphicProps } from "@/lib/polymorphic";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds to hold before the element starts, on top of its scroll trigger. */
  delay?: number;
  /** Travel distance in px. Negative values fall from above. */
  y?: number;
  /** Stagger direct children instead of animating the element as one block. */
  stagger?: number;
};

/**
 * The workhorse scroll reveal: fade plus a short rise, fired once when the
 * element's top clears 85% of the viewport.
 *
 * TRIGGERED BY `IntersectionObserver`, NOT `ScrollTrigger`. ScrollTrigger
 * records an element's DOCUMENT position when it refreshes and compares scroll
 * against that. Inside a `sticky` section — which is now most of this page —
 * that position stops corresponding to where the element actually is, so the
 * triggers fired at the wrong scroll offsets or never fired at all: measured at
 * 8 of 9 reveals still hidden in the FAQ and 7 of 8 in the app showcase, i.e.
 * whole sections of invisible copy.
 *
 * IntersectionObserver reports real intersection with the viewport and does not
 * care how the element got there, so it is immune to sticky, to transforms, and
 * to anything else that moves an element away from its layout position. GSAP
 * still runs the animation; it just no longer decides when.
 *
 * The observer disconnects on first hit, which is the old `once: true`: the
 * reference never re-plays a reveal on the way back up, and replaying makes a
 * long page feel twitchy.
 *
 * The resting state lives in CSS (`[data-reveal] { opacity: 0 }`) rather than
 * being set here, so there is no frame of full-opacity text before GSAP
 * attaches.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 36,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "expo.out",
          stagger: stagger ?? 0,
          paused: true,
        }
      );

      // When the parent staggers its children, the wrapper itself must not sit
      // at the CSS resting opacity of 0 — only the children are animated.
      if (stagger) gsap.set(el, { opacity: 1 });

      const io = new IntersectionObserver(
        entries => {
          if (!entries[0]?.isIntersecting) return;
          tween.play();
          io.disconnect();
        },
        // Roughly ScrollTrigger's old `top 85%`: fire once the element has
        // cleared the bottom 15% of the viewport.
        { rootMargin: "0px 0px -15% 0px" }
      );
      io.observe(el);

      /**
       * Safety net. If the observer never delivers — a browser that throttles
       * it, a rendering path that never ticks, anything unforeseen — the copy
       * would stay at its from-state, which here means invisible. Permanently
       * hidden content is far worse than an un-animated reveal, so after a few
       * seconds it is simply shown.
       */
      const net = window.setTimeout(() => {
        if (tween.progress() === 0) tween.progress(1);
      }, 4000);

      return () => {
        window.clearTimeout(net);
        io.disconnect();
      };
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  const Tag = as as ComponentType<PolymorphicProps>;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(stagger && "[&>*]:opacity-0", className)}
    >
      {children}
    </Tag>
  );
}

/** Refresh after late-arriving layout (fonts, images) shifts trigger offsets. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
