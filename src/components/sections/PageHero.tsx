import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";

/**
 * The opening block every page except the home page uses.
 *
 * Eyebrow, an oversized masked headline, then a two-column lede — the claim on
 * the left and what to do about it on the right. Splitting the lede is what
 * keeps a 60-word introduction from reading as a wall under a 7rem headline.
 *
 * `trigger={false}` on the headline: it is above the fold on every page that
 * uses this, so a scroll trigger would either fire instantly or, on a short
 * viewport, never fire at all and leave the page's title invisible.
 *
 * An optional image sits under the lede and parallaxes as the page scrolls off
 * it — the reference's "hero visual that enlarges on scroll", at the gentler
 * setting that a still photograph can carry without smearing.
 */
export default function PageHero({
  eyebrow,
  heading,
  lede,
  ledeSecondary,
  image,
}: {
  eyebrow: string;
  heading: readonly string[];
  lede: string;
  ledeSecondary?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="gutter pt-36 pb-16 lg:pt-48 lg:pb-24">
      <Reveal y={14}>
        <p className="t-micro text-flare">{eyebrow}</p>
      </Reveal>

      <LineReveal
        lines={heading}
        as="h1"
        trigger={false}
        delay={0.15}
        className="t-display text-chalk mt-8"
      />

      <div className="rule mt-12 mb-10" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal y={22} delay={0.25}>
          <p className="t-lede text-ash">{lede}</p>
        </Reveal>
        {ledeSecondary ? (
          <Reveal y={22} delay={0.32}>
            <p className="t-body text-ash-dim">{ledeSecondary}</p>
          </Reveal>
        ) : null}
      </div>

      {image ? (
        <Reveal y={34} delay={0.4} className="mt-16">
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            speed={0.14}
            priority
            className="aspect-[16/9] w-full rounded-3xl"
          />
        </Reveal>
      ) : null}
    </section>
  );
}
