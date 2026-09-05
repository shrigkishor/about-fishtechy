"use client";

import { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * A curtain wipe with a counter-moving picture inside it.
 *
 * Transcribed from lagencedesignstudio.com, which runs this same recipe on
 * every one of its project blocks:
 *
 *   frame   opacity  0 -> 1                                    over 0.3s
 *   frame   clipPath inset(0 0 0 100%) -> inset(0 0 0 0%)      over 1.4s
 *   media   scale    1.2 -> 1   and   x  80 -> 0               over 1.4s
 *
 * both on `power3.out`, fired at `top 75%`.
 *
 * THE COUNTER-MOVE IS THE POINT. A clip-path wipe on its own reads as a mask
 * sliding over a static picture. Moving the picture the other way underneath —
 * out from an 80px offset and down from 1.2 — makes the frame read as a window
 * opening onto something that was already there and is settling into place. It
 * is the difference between "a rectangle appeared" and "this was uncovered".
 *
 * The media is addressed by `[data-clip-media]` rather than by tag, because the
 * thing that needs to counter-move is whatever fills the frame — an `img`, a
 * `next/image` wrapper, a video — and the caller knows which.
 *
 * `toggleActions: "play none none reverse"` is theirs too: the wipe runs back
 * out on the way up rather than latching open. On a grid of nine that keeps the
 * page feeling alive when someone scrolls back rather than leaving a wall of
 * already-revealed tiles.
 */
export default function ClipReveal({
  children,
  className,
  /** Which edge the curtain opens from. */
  from = "left",
  delay = 0,
  /** Set false to latch open once revealed. */
  reverse = true,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // `inset()` reads top right bottom left, so the hidden state insets the
      // side the curtain opens FROM by the full width.
      const hidden =
        from === "left" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
      const shown = "inset(0 0 0 0%)";
      const offset = from === "left" ? 80 : -80;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        paused: true,
        delay,
      });

      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
      tl.fromTo(
        el,
        { clipPath: hidden },
        { clipPath: shown, duration: 1.4 },
        0,
      );

      const media = el.querySelectorAll("[data-clip-media]");
      if (media.length) {
        tl.fromTo(
          media,
          { scale: 1.2, x: offset },
          { scale: 1, x: 0, duration: 1.4 },
          0,
        );
      }

      // IntersectionObserver rather than ScrollTrigger — see `Reveal`. These
      // cards live inside the lineup's sticky rail, where ScrollTrigger's
      // recorded position is meaningless and the wipes never ran.
      //
      // `reverse` keeps the old `toggleActions: play none none reverse`: the
      // wipe runs back out when the card leaves, so the observer stays
      // connected rather than disconnecting on first hit.
      const io = new IntersectionObserver(
        entries => {
          const seen = entries[0]?.isIntersecting;
          if (seen) tl.play();
          else if (reverse) tl.reverse();
          if (!reverse && seen) io.disconnect();
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);

      // See `Reveal`: a card whose wipe never runs is a clipped-away card.
      const net = window.setTimeout(() => {
        if (tl.progress() === 0) tl.progress(1);
      }, 4000);

      return () => {
        window.clearTimeout(net);
        io.disconnect();
      };
    }, el);

    return () => ctx.revert();
  }, [from, delay, reverse]);

  return (
    <div ref={ref} data-clip-reveal="" className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
