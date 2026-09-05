"use client";

import { useRef, type ReactNode } from "react";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import HeroVideo from "@/components/sections/HeroVideo";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * A reel held at the top of the viewport while the copy climbs over it.
 *
 * THE HOME PAGE IS THE ONLY CALLER. It briefly headed the products and How It
 * Works pages too, and repeating it turned a signature into wallpaper — as well
 * as putting an 84MB CDN fetch in front of someone who arrived at the shop to
 * look at products. It stays parameterised rather than folded back into `Hero`
 * because the `src`/`headline`/`lede` seam is what keeps the choreography
 * separable from the home page's own cast.
 *
 * THE COPY PANEL IS OPAQUE, and that is the whole mechanism: it OCCLUDES the
 * film rather than floating on it. Nothing is ever read against moving footage
 * — a rule this design cannot bend, because these reels carry their own
 * burned-in interfaces that drift around the frame, so anything laid over them
 * is a bet that loses on some frame.
 *
 * THE FRAME IS `aspect-video`, WHICH IS WHY NOTHING IS CROPPED. It used to be
 * a viewport-relative height (78svh ≈ a 2.05 ratio at 1440×900) holding a 16:9
 * source under `object-cover`, which shaved ~108px off the picture — and
 * `object-bottom` anchored that loss to the TOP of the frame, which is exactly
 * where it showed. Matching the frame to the source's own ratio means cover has
 * no overscan to take.
 *
 * THERE IS NO SCALE ON THE MEDIA any more, for the same reason: a scrubbed
 * zoom is overscan by definition, so "show the whole frame" and "scale the
 * media" cannot both be true. The parallax comes from the differential instead
 * — the reel is pinned at zero while the panel travels the full height of the
 * viewport over it, which is a larger separation than any scale tween gave.
 *
 * PINNED WITH `position: sticky`, NOT `ScrollTrigger.pin`. Sticky is the
 * browser's own compositor-level behaviour and rides Lenis' smoothed scroll for
 * free; GSAP's pin re-parents the element into a generated spacer, which fights
 * both Lenis and the negative-margin overlap below it.
 *
 * Two layout constraints worth knowing before editing:
 *  - no ancestor may set `overflow: hidden`, which silently kills sticky. The
 *    body uses `overflow-x: clip` for this reason;
 *  - nothing may be placed in the band at the foot of the reel, because the
 *    panel's negative margin draws over it.
 */
export default function StickyMediaHero({
  src,
  eyebrow,
  headline,
  lede,
  children,
  headlineSize = "clamp(2.75rem, 8vw, 7.5rem)",
}: {
  /** Defaults to the catch reel; see `REEL` in `HeroVideo`. */
  src?: string;
  eyebrow: string;
  /** One entry per masked line — the copy decides where it breaks. */
  headline: readonly string[];
  lede?: readonly string[] | string;
  /** Ticker, buttons, anything that belongs under the headline. */
  children?: ReactNode;
  headlineSize?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // The reel dims as the panel climbs, so a bright frame does not glow
      // through the panel's rounded corners as it arrives.
      gsap.to("[data-hero-dim]", {
        opacity: 0.78,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-panel]",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const ledeLines =
    typeof lede === "string" ? [lede] : lede ? [...lede] : null;

  return (
    <section ref={root} className="bg-ink-deep relative">
      <div className="sticky top-0 aspect-video w-full overflow-hidden">
        <HeroVideo src={src} />

        {/* A wash at the top only, so the header's logo reads over any frame. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.66)_0%,rgba(10,10,11,0.08)_26%,rgba(10,10,11,0)_60%)]"
        />
        <div
          data-hero-dim=""
          aria-hidden
          className="bg-ink pointer-events-none absolute inset-0 opacity-0"
        />
      </div>

      {/* The copy, riding up over the reel on the design system's slab. The
          negative margin is what makes it overlap rather than butt against it,
          and the visible rounded lip is what signals there is more below. */}
      <div
        data-hero-panel=""
        className="bg-ink slab slab-seam relative z-10 -mt-[clamp(1.5rem,3.6vw,2.75rem)]"
      >
        <div className="gutter flex flex-col items-center pt-20 pb-16 text-center lg:pt-28 lg:pb-20">
          <Reveal y={14}>
            <p className="t-micro text-flare mb-7">{eyebrow}</p>
          </Reveal>

          <div style={{ "--display-size": headlineSize } as React.CSSProperties}>
            <LineReveal
              lines={headline}
              as="h1"
              trigger={false}
              delay={0.25}
              className="t-display text-chalk"
            />
          </div>

          {children}

          {ledeLines ? (
            <Reveal y={20} delay={0.65} className="mt-14 w-full">
              <p className="t-body text-ash-dim mx-auto max-w-[68ch]">
                {ledeLines.map(line => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
