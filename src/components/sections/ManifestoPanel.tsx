import Marquee from "@/components/motion/Marquee";
import ScrollDrift from "@/components/motion/ScrollDrift";
import LineReveal from "@/components/motion/LineReveal";
import { MANIFESTO } from "@/content/site";
import { STACK_FRAME, STACK_SIZER } from "@/lib/stack";

/**
 * The orange beat.
 *
 * This panel is where the brand colour goes FULL BLEED with ink type on it, and
 * it is the direct stand-in for the reference's bone ground: the reference
 * alternates light and dark to break a long scroll into acts, and on a
 * dark-first brand the only tone with enough contrast to do that job is
 * #ee4125 — the vermilion sampled from the logo mark.
 *
 * Used exactly twice on the site — here and on the closing CTA. A third would
 * make it decoration instead of punctuation.
 *
 * The rounded top corners and the negative top margin are the reference's slab:
 * the panel rides OVER the section above rather than butting against it.
 */
export default function ManifestoPanel({
  quote = MANIFESTO,
  ticker = ["Measure", "Verify", "Log", "Compete", "Contribute"],
}: {
  quote?: string;
  ticker?: readonly string[];
}) {
  return (
    <section className={STACK_SIZER}>
      <div
        data-ground="light"
        className={`bg-flare text-ink slab slab-seam ${STACK_FRAME}`}
      >
        {/* The two tickers already run in opposite directions; scroll pulls them
          further apart, so the panel shears as it passes rather than sliding as
          one block. */}
        <ScrollDrift x={-120}>
          <Marquee
            items={Array.from({ length: 4 }, () => ticker).flat()}
            duration={30}
            gap="2rem"
            separator={<span className="text-ink/40">●</span>}
            className="t-micro text-ink/70 py-2"
            itemClassName="whitespace-nowrap"
          />
        </ScrollDrift>

        <div className="gutter py-14 lg:py-20">
          <LineReveal
            lines={quote.split(" — ")}
            as="p"
            className="t-title text-ink mx-auto max-w-[22ch] text-center"
          />
        </div>

        <ScrollDrift x={120}>
          <Marquee
            items={Array.from({ length: 4 }, () => ticker).flat()}
            duration={30}
            gap="2rem"
            reverse
            separator={<span className="text-ink/40">●</span>}
            className="t-micro text-ink/70 py-2"
            itemClassName="whitespace-nowrap"
          />
        </ScrollDrift>
      </div>
    </section>
  );
}
