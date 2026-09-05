import Reveal from "@/components/motion/Reveal";
import ProductCard from "@/components/ui/ProductCard";
import LineReveal from "@/components/motion/LineReveal";
import { LINES, priceRange } from "@/lib/catalog";

/**
 * The shop, grouped by product line.
 *
 * The same data as the home page's lineup, laid out with room for the longer
 * `shopDescription` — the catalog carries two descriptions per SKU, a one-line
 * one for tiles and a paragraph for the shop, and using the short one here
 * would waste the space this page exists to provide.
 *
 * A SKU with no MSRP shows its availability where the price goes. Those are
 * real rows, not gaps in the data: the green 2.1" Pro is "Coming 2027" with no
 * price and no UPC, and it cannot be bought.
 */
export default function ShopGrid() {
  return (
    <div className="gutter flex flex-col gap-24 pb-20 lg:gap-32 lg:pb-28">
      {LINES.map(line => (
        <section key={line.slug} id={line.slug}>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-[color:var(--color-line-soft)] pb-6">
            <div className="max-w-[56ch]">
              <LineReveal
                lines={[line.name]}
                as="h2"
                className="t-title text-chalk"
              />
              <Reveal y={18} delay={0.1}>
                <p className="t-body text-ash-dim mt-4">{line.intro}</p>
              </Reveal>
            </div>
            {priceRange(line) ? (
              <Reveal y={14}>
                <p className="t-num text-ash-faint text-sm">
                  {priceRange(line)}
                </p>
              </Reveal>
            ) : null}
          </div>

          <ul className="mt-10 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {line.skus.map((sku, i) => (
              <Reveal as="li" key={sku.slug} y={30} delay={(i % 3) * 0.07}>
                <ProductCard sku={sku} />
              </Reveal>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
