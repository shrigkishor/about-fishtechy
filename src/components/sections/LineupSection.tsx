import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import ClipReveal from "@/components/motion/ClipReveal";
import DragScroller from "@/components/motion/DragScroller";
import ProductRevealCard from "@/components/ui/ProductRevealCard";
import { ALL_SKUS } from "@/lib/catalog";
import { LINEUP } from "@/content/site";

/**
 * The product lineup on the home page: every SKU in one grid.
 *
 * ONE GRID, NOT TWO GROUPED LISTS. This used to repeat the shop's structure —
 * a header and a row per product line — which meant the home page and
 * `/products` were the same page twice, the second one just further down. The
 * home page's job is to show that the lineup exists and is coherent; the shop's
 * job is to let someone compare nine SKUs properly. So this is a flat grid and
 * the grouped catalog is one click away.
 *
 * The cards are `ProductRevealCard`, which holds its description back until
 * hover — see that file for why it is a separate component from the shop's
 * `ProductCard` rather than a variant of it. Nine descriptions printed at once
 * is a wall of text on a page nobody came here to read.
 *
 * Built from the catalog rather than a hand-kept tile list, so a new SKU
 * appears here by existing.
 */
export default function LineupSection() {
  return (
    /* The ground and the lip sit on the SECTION, not on the sticky frame
       inside it: the frame is one viewport tall and slides, so a rounded corner
       there would travel up the page instead of staying at the seam. */
    <section
      id="lineup"
      className="bg-ink slab slab-seam relative -mt-[clamp(1.5rem,3.6vw,2.75rem)] py-20 lg:py-32"
    >
      <DragScroller
        scrollDriven
        indicator={false}
        label="Proof Product lineup"
        trackClassName="gutter gap-4 pb-2"
        header={
          <div className="gutter mb-8">
            {/* No body copy in the pinned header. It is 342px of heading in a
                900px frame otherwise, which leaves the cards less room than
                they need and the frame clips them. The sentence lives on the
                shop, which these links go to. */}
            <SectionHeader
              eyebrow={LINEUP.eyebrow}
              heading={LINEUP.heading}
            />

            <Reveal
              y={20}
              delay={0.15}
              className="mt-6 flex flex-wrap gap-x-8 gap-y-3"
            >
              {LINEUP.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="t-micro text-brand-blue-lit link-underline"
                >
                  {link.label} →
                </Link>
              ))}
            </Reveal>
          </div>
        }
      >
        {ALL_SKUS.map((sku, i) => (
          <div
            key={sku.slug}
            className="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] lg:max-w-[400px]"
          >
            <ClipReveal
              from={i % 2 === 0 ? "left" : "right"}
              /* Capped: past the fifth card the delay would outlast the reveal
                 itself, and everything off to the right animates on arrival
                 anyway once it is dragged into view. */
              delay={Math.min(i, 5) * 0.06}
            >
              <ProductRevealCard sku={sku} index={i + 1} />
            </ClipReveal>
          </div>
        ))}
      </DragScroller>
    </section>
  );
}
