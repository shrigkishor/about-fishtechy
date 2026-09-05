import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { findLine, priceRange } from "@/lib/catalog";
import { SHOP_LINES } from "@/content/pages";

/**
 * The two product lines, as full-height editorial tiles.
 *
 * This is the shop's opening move, borrowed from bellussi.com/shop: before any
 * grid, the range is introduced as a small number of large things. Nine SKUs
 * presented cold is a spreadsheet; two lines presented properly is a choice a
 * visitor can actually make, and the grid further down is then a detail view
 * rather than the whole argument.
 *
 * THE TILES PARALLAX IN OPPOSITE DIRECTIONS (`i % 2`). Uniform drift across a
 * pair reads as the block sliding, which is indistinguishable from a scroll
 * offset bug; opposing directions are what make it legible as depth.
 *
 * The price range is read from the catalog rather than written here, so a new
 * SKU or a price change moves it without anyone remembering to.
 */
export default function ShopLines() {
  return (
    <section className="gutter py-20 lg:py-28">
      <SectionHeader
        eyebrow={SHOP_LINES.eyebrow}
        heading={SHOP_LINES.heading}
        body={SHOP_LINES.body}
      />

      <ul className="mt-14 grid list-none gap-6 lg:mt-20 lg:grid-cols-2">
        {SHOP_LINES.lines.map((line, i) => {
          const range = priceRange(findLine(line.slug)!);

          return (
            <Reveal as="li" key={line.slug} y={34} delay={i * 0.1}>
              <Link
                href={`#${line.slug}`}
                className="group bg-slab hover:border-flare/40 block h-full overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] transition-colors duration-500"
              >
                <ParallaxImage
                  src={line.image.src}
                  alt={line.image.alt}
                  speed={i % 2 === 0 ? 0.16 : -0.16}
                  className="aspect-[5/4] w-full"
                  imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />

                <div className="flex flex-col gap-3 p-7 lg:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="t-micro text-flare">{line.tagline}</p>
                    {range ? (
                      <p className="t-num text-ash-faint text-sm">{range}</p>
                    ) : null}
                  </div>

                  <h3 className="t-title text-chalk text-[clamp(1.75rem,3.4vw,3rem)]">
                    {line.name}
                  </h3>
                  <p className="t-body text-ash-dim max-w-[46ch]">{line.body}</p>

                  <span className="t-micro text-ash group-hover:text-chalk mt-3 flex items-center gap-2 transition-colors duration-300">
                    Shop the line
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
