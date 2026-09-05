"use client";

import { useRef, type ComponentType, type ElementType } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import type { PolymorphicProps } from "@/lib/polymorphic";

/**
 * The masked line-by-line headline reveal — the reference's signature move.
 *
 * Each line is a `overflow: hidden` block with an inner span that rises into
 * it, so the type appears to be pulled up from behind a hard edge rather than
 * fading in. Lines are passed in explicitly as an array rather than measured
 * from a wrapped paragraph: measuring means reading `getClientRects()` after
 * fonts settle, and a webfont swap mid-measure splits the same headline
 * differently on a reload. The copy decides where it breaks.
 *
 * GSAP's own SplitText is the usual tool here and is a paid plugin; this covers
 * the one case the page actually needs.
 */
export default function LineReveal({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = true,
}: {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** False animates on mount instead of on scroll — for above-the-fold type. */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });
      const tween = gsap.fromTo(
        el.querySelectorAll("[data-line-inner]"),
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.15,
          delay,
          ease: "expo.out",
          stagger,
          paused: true,
        },
      );

      // Above-the-fold headlines play straight away; the rest wait to be seen.
      if (!trigger) {
        tween.play();
        return;
      }

      // IntersectionObserver rather than ScrollTrigger — see the note in
      // `Reveal`: inside a sticky section ScrollTrigger's recorded document
      // position no longer matches where the element is, and headlines simply
      // never appeared.
      const io = new IntersectionObserver(
        entries => {
          if (!entries[0]?.isIntersecting) return;
          tween.play();
          io.disconnect();
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);

      // See `Reveal`: never leave a headline permanently invisible because a
      // trigger did not arrive.
      const net = window.setTimeout(() => {
        if (tween.progress() === 0) tween.progress(1);
      }, 4000);

      return () => {
        window.clearTimeout(net);
        io.disconnect();
      };
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, trigger]);

  const Tag = as as ComponentType<PolymorphicProps>;

  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className={cn("reveal-line", lineClassName)}>
          <span data-line-inner="">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
