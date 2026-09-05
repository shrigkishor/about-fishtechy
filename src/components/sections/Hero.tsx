"use client";

import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import CtaLink from "@/components/ui/CtaLink";
import StoreBadges from "@/components/ui/StoreBadges";
import StickyMediaHero from "@/components/sections/StickyMediaHero";
import { REEL } from "@/content/media";
import { HERO } from "@/content/site";

/**
 * The home page's opening screen.
 *
 * All of the layout and motion lives in `StickyMediaHero`, which the products
 * and How It Works pages also use — this file is just the home page's cast:
 * the live counter and the two calls to action that only belong here.
 */
export default function Hero() {
  return (
    <StickyMediaHero
      src={REEL.catchReel}
      eyebrow={HERO.eyebrow}
      headline={HERO.headline}
      lede={HERO.lede}
    >
      {/* Live counter. The figure ships in the markup and the tween overwrites
          it on the way past — see `Counter`. */}
      <Reveal y={18} delay={0.45} className="mt-10">
        <div className="border-line inline-flex items-center gap-3 rounded-full border px-5 py-2.5">
          <span
            aria-hidden
            className="bg-flare size-1.5 animate-pulse rounded-full"
          />
          <Counter
            value={HERO.ticker.count}
            className="text-chalk text-[0.9375rem]"
          />
          <span className="t-micro text-ash-dim">{HERO.ticker.unit}</span>
          <span aria-hidden className="bg-line h-4 w-px" />
          <span className="t-micro text-flare">{HERO.ticker.status}</span>
        </div>
      </Reveal>

      <Reveal
        y={18}
        delay={0.55}
        stagger={0.08}
        className="mt-7 flex flex-wrap justify-center gap-3"
      >
        <CtaLink href={HERO.primaryCta.href}>{HERO.primaryCta.label}</CtaLink>
        <CtaLink href={HERO.secondaryCta.href} variant="ghost">
          {HERO.secondaryCta.label}
        </CtaLink>
      </Reveal>

      {/* The app is free and is what actually does the measuring, so the two
          store links belong in the hero rather than only in the footer.
       
          They sit in the copy panel with the rest of the cast, NOT over the
          reel. Store badges are fixed artwork with their own contrast rules,
          and the reel is 46 seconds of moving footage carrying its own
          burned-in interface — the one place on this page nothing is allowed to
          be read against. */}
      <Reveal y={18} delay={0.68} className="mt-8">
        <StoreBadges className="justify-center" />
      </Reveal>
    </StickyMediaHero>
  );
}
