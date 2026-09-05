import Marquee from "@/components/motion/Marquee";
import ScrollDrift from "@/components/motion/ScrollDrift";
import { CAPABILITIES } from "@/content/site";

/**
 * The discipline ticker directly under the hero.
 *
 * The reference runs one of these between its hero and its first real section
 * — "Architecture / Development / Deployment / APIs" — as a single line that
 * says what the studio does before any section has explained it. This is the
 * Fishtechy equivalent: the app's capabilities, named once, in one pass.
 *
 * Two rules in opposite directions frame it, which is what stops a lone moving
 * line from reading as a stray element on the page.
 */
export default function CapabilityTicker() {
  return (
    <section aria-label="What the app does" className="py-6">
      <div className="rule" />
      {/* The row loops on its own and scroll shoves it further along, so the
          speed reads as reactive rather than metronomic. The drift is on a
          wrapper because the marquee is already animating its own transform. */}
      <ScrollDrift x={-160}>
        <Marquee
          items={CAPABILITIES}
          duration={38}
          gap="3rem"
          separator={<span className="text-flare/60">/</span>}
          className="t-micro text-ash-dim py-5"
          itemClassName="whitespace-nowrap"
        />
      </ScrollDrift>
      <div className="rule" />
    </section>
  );
}
