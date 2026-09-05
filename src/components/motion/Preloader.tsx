"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LogoMark } from "@/components/ui/Logo";

/**
 * Ring geometry. Declared here rather than inline because the markup and the
 * tween both need the circumference, and two copies of `2 * Math.PI * r` is two
 * chances for the arc to stop short of a full circle.
 */
const RING_BOX = 132;
const RING_R = 62;
const RING_LENGTH = 2 * Math.PI * RING_R;

/**
 * The opening curtain: the logo mark centred, progress drawn around it.
 *
 * The count is a TIMED tween, not real load progress. Browsers expose no
 * reliable total-bytes figure for a page, so every "percent loaded" counter of
 * this kind is choreography; being honest about that here is better than
 * wiring it to `document.readyState`, which sits at 0 and then jumps to 100
 * with nothing in between.
 *
 * What IS real is the wait: the curtain lifts only once the count has finished
 * AND the document has loaded, with a ceiling so a slow connection is never
 * held indefinitely. Those are two independent conditions, so they are two
 * flags and one `tryExit` rather than one timeline with a pause in the middle —
 * `tl.addPause()` re-arms the moment the playhead is resumed onto it, which
 * strands the curtain at 100% forever.
 *
 * The document is scroll-locked while the curtain is up, which is why
 * ScrollTrigger gets a refresh on the way out: triggers measured against a
 * locked page have the wrong offsets.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [done, setDone] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    let counted = false;
    let loaded = document.readyState === "complete";
    let exited = false;

    /**
     * Wall-clock escape hatch.
     *
     * Everything above this line is driven by GSAP's ticker, which is
     * `requestAnimationFrame` — and rAF does not fire in a background or
     * hidden tab. A visitor who opens the site in a background tab and comes
     * back to it would otherwise find the curtain frozen at 00% with the body
     * still scroll-locked, i.e. a blank unusable page.
     *
     * `setTimeout` is throttled in background tabs but it still fires, so this
     * tears the curtain down unconditionally. It is deliberately longer than
     * the animated path's own ceiling (2.6s + ~1.5s of exit), so it only ever
     * wins when the animation genuinely never ran.
     */
    const hardStop = window.setTimeout(() => {
      if (exited) return;
      exited = true;
      document.body.style.overflow = "";
      setDone(true);
    }, 5000);

    const ctx = gsap.context(() => {
      const progress = { n: 0 };

      const tryExit = () => {
        if (exited || !counted || !loaded) return;
        exited = true;
        window.clearTimeout(hardStop);

        gsap
          .timeline()
          /* The ring's grandparent is the centred block holding both the ring
             and the mark, so this fades the whole device out together rather
             than leaving the logo behind on the rising curtain. */
          .to(
            [
              countRef.current,
              ringRef.current?.ownerSVGElement?.parentElement ?? null,
            ],
            {
              opacity: 0,
              duration: 0.35,
              ease: "power2.in",
            },
          )
          // The curtain splits upward on a rounded edge — the same shape the
          // slab sections use, so the page's first move rhymes with its rhythm.
          .to(el, {
            yPercent: -100,
            borderBottomLeftRadius: "50% 12%",
            borderBottomRightRadius: "50% 12%",
            duration: 1.1,
            ease: "expo.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              setDone(true);
              ScrollTrigger.refresh();
            },
          });
      };

      gsap.to(progress, {
        n: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const pct = Math.round(progress.n);
          if (countRef.current) {
            countRef.current.textContent = String(pct).padStart(2, "0");
          }
          if (ringRef.current) {
            // Draw the arc by retracting the dash gap. The circle is dashed
            // once around its whole circumference, so the offset IS the unfilled
            // remainder.
            ringRef.current.style.strokeDashoffset = String(
              RING_LENGTH * (1 - progress.n / 100),
            );
          }
        },
        onComplete: () => {
          counted = true;
          tryExit();
        },
      });

      const onLoad = () => {
        loaded = true;
        tryExit();
      };

      if (!loaded) window.addEventListener("load", onLoad);
      // The ceiling. Also the safety net for the case `load` fired between the
      // readyState read above and this listener being attached.
      gsap.delayedCall(2.6, onLoad);

      return () => window.removeEventListener("load", onLoad);
    }, el);

    return () => {
      window.clearTimeout(hardStop);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="bg-ink-deep fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      {/* The mark centred, with the progress drawn around it as a ring.
       
          A ring rather than a bar because the mark is round: a circle
          concentric with it reads as one object filling up, where a bar
          underneath read as two unrelated things stacked. */}
      <div className="relative grid place-items-center">
        <svg
          aria-hidden
          width={RING_BOX}
          height={RING_BOX}
          viewBox={`0 0 ${RING_BOX} ${RING_BOX}`}
          /* -90deg so the arc starts at twelve o'clock rather than at three. */
          className="-rotate-90"
        >
          <circle
            cx={RING_BOX / 2}
            cy={RING_BOX / 2}
            r={RING_R}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={2}
          />
          <circle
            ref={ringRef}
            cx={RING_BOX / 2}
            cy={RING_BOX / 2}
            r={RING_R}
            fill="none"
            stroke="var(--color-flare)"
            strokeWidth={2}
            strokeLinecap="round"
            /* Dashed once around the full circumference, then offset by the
               whole of it — so it starts drawn as nothing. */
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH}
          />
        </svg>

        {/* The mark rather than the wordmark: this is a round space and the
            4.5:1 lockup would sit lost inside it. */}
        {/* `rounded-full` clips the mark's own dark plate to a circle, so a
            square does not sit inside a ring. The plate is full-bleed in the
            asset and the fish is centred with margin, so the clip only takes
            corner background. */}
        <span className="absolute">
          <LogoMark size={56} priority className="rounded-full" />
        </span>
      </div>

      <div className="mt-7 flex items-baseline gap-1">
        <span ref={countRef} className="t-num text-ash text-sm">
          00
        </span>
        <span className="t-num text-flare text-sm">%</span>
      </div>
    </div>
  );
}
