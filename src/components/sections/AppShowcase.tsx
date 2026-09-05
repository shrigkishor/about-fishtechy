import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import DragScroller from "@/components/motion/DragScroller";
import Reveal from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { APP_FEATURES } from "@/content/site";

/**
 * What the app does — six features, each with its own artwork.
 *
 * This is the reference's "Works" section re-pointed: there, oversized cards
 * with photographic backdrops drift at different rates as the section scrolls;
 * here the same treatment carries the app screens.
 *
 * ROWS ALTERNATE their parallax direction (`i % 2`). Uniform drift across a
 * grid reads as the whole block sliding, which is indistinguishable from a
 * scroll offset bug; opposing directions are what make it legible as depth.
 *
 * The section sits on a charcoal slab with rounded top corners so it rides over
 * the ground above it — the reference's structural move, at its normal
 * (non-orange) weight.
 */
export default function AppShowcase() {
  return (
    <section className="bg-slab slab slab-seam relative -mt-[clamp(1.5rem,3.6vw,2.75rem)]">
      {/* A RAIL, NOT A 2x3 GRID. Six image tiles stacked two-up ran to 2864px —
          more than three screens — which cannot be a stacked section: a sticky
          box taller than the viewport pins its top and strands everything below
          the fold. Laid along one scroll-driven track the section shows one
          screen at a time and keeps all six tiles.
       
          Same mechanism as the product lineup: vertical scroll walks the row
          left, then the section releases to what is below. */}
      <DragScroller
        scrollDriven
        indicator={false}
        label="What the app does"
        trackClassName="gutter gap-5"
        header={
          <div className="gutter mb-8">
            <SectionHeader
              eyebrow={APP_FEATURES.eyebrow}
              heading={APP_FEATURES.heading}
            />
          </div>
        }
      >
        {APP_FEATURES.items.map((item, i) => (
          <div
            key={item.title}
            className="w-[80vw] shrink-0 sm:w-[52vw] lg:w-[34vw] lg:max-w-[460px]"
          >
            <Reveal y={30} delay={Math.min(i, 4) * 0.06}>
              <Link
                href={item.href}
                className="group bg-ink hover:border-flare/40 flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] transition-colors duration-500"
              >
                <ParallaxImage
                  src={item.image}
                  alt=""
                  speed={i % 2 === 0 ? 0.16 : -0.16}
                  className="aspect-[16/11] w-full"
                  imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <p className="t-micro text-flare">{item.eyebrow}</p>
                  <h3 className="t-sub text-chalk">{item.title}</h3>
                  <p className="t-body text-ash-dim flex-1 text-[0.875rem]">
                    {item.body}
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        ))}
      </DragScroller>
    </section>
  );
}
