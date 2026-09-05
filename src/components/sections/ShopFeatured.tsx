import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import ProductCard from "@/components/ui/ProductCard";
import { findSku } from "@/lib/catalog";
import { SHOP_FEATURED } from "@/content/pages";

/**
 * The short list, on a slab that rides over the section above.
 *
 * bellussi.com/shop puts its equivalent — "i vini più apprezzati" — on a black
 * panel in the middle of an otherwise light page, and that inversion is what
 * makes three products read as a recommendation rather than as more catalog.
 * This site is dark already, so the charcoal slab and its rounded lip do the
 * same job: a change of ground says "this part is different".
 *
 * Slugs are resolved through `findSku` and anything missing is dropped rather
 * than crashing the page — the catalog is the source of truth and a SKU can be
 * withdrawn from it without this list being the thing that notices.
 */
export default function ShopFeatured() {
  const featured = SHOP_FEATURED.slugs
    .map(slug => findSku(slug))
    .filter((sku): sku is NonNullable<typeof sku> => sku !== undefined);

  if (featured.length === 0) return null;

  return (
    <section className="bg-slab slab slab-seam slab-close relative mt-[-2rem] py-20 lg:py-28">
      <div className="gutter">
        <SectionHeader
          eyebrow={SHOP_FEATURED.eyebrow}
          heading={SHOP_FEATURED.heading}
        />

        <ul className="mt-14 grid list-none gap-3 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3">
          {featured.map((sku, i) => (
            <Reveal as="li" key={sku.slug} y={30} delay={i * 0.08}>
              <ProductCard sku={sku} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
