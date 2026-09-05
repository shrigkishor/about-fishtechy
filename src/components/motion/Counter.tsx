"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * A number that counts up to `value` when it scrolls into view.
 *
 * The element ships with the FINAL value as its text, and the tween overwrites
 * it on the way past. That ordering matters: it is what a crawler and a
 * JS-disabled visitor read, and it means the counter never renders a
 * placeholder zero that would be wrong if the animation never runs.
 */
export default function Counter({
  value,
  duration = 2,
  className,
  format = n => Math.round(n).toLocaleString("en-US"),
}: {
  value: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      const tween = gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
      });

      // IntersectionObserver rather than ScrollTrigger — see `Reveal`.
      const io = new IntersectionObserver(
        entries => {
          if (!entries[0]?.isIntersecting) return;
          tween.play();
          io.disconnect();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(el);

      return () => io.disconnect();
    }, el);

    return () => ctx.revert();
  }, [value, duration, format]);

  return (
    <span ref={ref} className={cn("t-num tabular-nums", className)}>
      {format(value)}
    </span>
  );
}
