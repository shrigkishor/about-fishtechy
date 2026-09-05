"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll, driven off GSAP's ticker.
 *
 * The reference runs Lenis 1.3 and GSAP ScrollTrigger together, which only
 * behaves if ONE clock drives both. Left to themselves Lenis runs its own rAF
 * loop while ScrollTrigger runs on GSAP's, and the two disagree by a frame —
 * pinned sections visibly judder against parallax layers moving beside them.
 * So Lenis' rAF is handed to `gsap.ticker` and `lagSmoothing` is disabled: GSAP
 * smooths lag by fast-forwarding time, which would desync the scroll position
 * it is supposed to be reading.
 *
 * `js-ready` on <html> is what un-hides the reveal targets; see globals.css.
 * Without JS every `[data-reveal]` element stays at its CSS default of visible,
 * so the page reads as a plain document rather than a blank one.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      // Native scrolling, and ScrollTrigger still drives the (now instant)
      // reveals. Nothing to tear down beyond the class.
      return () => root.classList.remove("js-ready");
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as Record<string, unknown>).lenis = lenis;
    }

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links have to go through Lenis, or the browser's own jump leaves
    // Lenis' internal position stale and the next wheel event snaps back.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const id = anchor?.getAttribute("href");
      if (!anchor || !id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      root.classList.remove("js-ready");
    };
  }, []);

  return <>{children}</>;
}
