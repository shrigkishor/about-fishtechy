import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/sections/ProductGallery";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import CtaLink from "@/components/ui/CtaLink";
import ClosingCta from "@/components/sections/ClosingCta";
import { ALL_SKUS, findSku, formatPrice, lineForSku } from "@/lib/catalog";

type Params = { params: Promise<{ slug: string }> };

/** Nine SKUs, all known at build time — every PDP is static. */
export function generateStaticParams() {
  return ALL_SKUS.map(sku => ({ slug: sku.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sku = findSku(slug);
  if (!sku) return {};
  return {
    title: sku.name,
    description: sku.shopDescription ?? sku.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const sku = findSku(slug);
  if (!sku) notFound();

  const line = lineForSku(slug);
  const siblings = line?.skus.filter(s => s.slug !== slug) ?? [];

  // Only the facts the catalog actually carries for this SKU. An unpriced,
  // un-UPC'd row would otherwise render a spec table of dashes.
  const specs = [
    sku.dimension
      ? {
          label: sku.dimension.kind === "diameter" ? "Diameter" : "Length",
          value: `${sku.dimension.value}″`,
        }
      : null,
    sku.skuCode ? { label: "SKU", value: sku.skuCode } : null,
    sku.upc ? { label: "UPC", value: sku.upc } : null,
    sku.casePack ? { label: "Case pack", value: String(sku.casePack) } : null,
  ].filter((spec): spec is { label: string; value: string } => spec !== null);

  return (
    <>
      <section className="gutter pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Reveal y={14} className="mb-10">
          <nav aria-label="Breadcrumb" className="t-micro text-ash-faint flex flex-wrap gap-2">
            <Link href="/shop" className="hover:text-chalk">
              Shop
            </Link>
            <span aria-hidden>/</span>
            {line ? (
              <>
                <Link href={`/shop#${line.slug}`} className="hover:text-chalk">
                  {line.name}
                </Link>
                <span aria-hidden>/</span>
              </>
            ) : null}
            <span className="text-ash">{sku.name}</span>
          </nav>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal y={30}>
            <ProductGallery images={sku.images} name={sku.name} />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal y={14}>
              <p className="t-micro text-flare">{sku.subtitle}</p>
            </Reveal>

            <LineReveal
              lines={[sku.name]}
              as="h1"
              trigger={false}
              delay={0.1}
              className="t-title text-chalk"
            />

            <Reveal y={18} delay={0.2}>
              <p className="t-num text-chalk text-[clamp(1.5rem,2.6vw,2.25rem)]">
                {formatPrice(sku.msrp) ?? sku.availability ?? "Price on request"}
              </p>
            </Reveal>

            <Reveal y={20} delay={0.26}>
              <p className="t-lede text-ash-dim">
                {sku.shopDescription ?? sku.description}
              </p>
            </Reveal>

            {/* An unpriced SKU cannot be bought — the catalog has no price and
                no UPC for it — so it gets a status line instead of a CTA that
                would lead to a checkout it has nothing to sell. */}
            <Reveal y={20} delay={0.32} stagger={0.08} className="mt-2 flex flex-wrap gap-3">
              {sku.msrp === null ? (
                <span className="t-micro text-ash-dim inline-flex rounded-full border border-[color:var(--color-line)] px-7 py-4">
                  {sku.availability ?? "Not yet available"}
                </span>
              ) : (
                <CtaLink href="/buy-now">Where to buy</CtaLink>
              )}
              <CtaLink href="/how-it-works" variant="ghost">
                How it works
              </CtaLink>
            </Reveal>

            {specs.length > 0 ? (
              <Reveal y={22} delay={0.4} className="mt-6">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] sm:grid-cols-4">
                  {specs.map(spec => (
                    <div key={spec.label} className="bg-slab flex flex-col gap-1.5 p-5">
                      <dt className="t-micro text-ash-faint">{spec.label}</dt>
                      <dd className="t-num text-chalk text-[0.9375rem]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {siblings.length > 0 && line ? (
        <section className="bg-slab slab slab-seam slab-close relative mt-[-2rem] py-20 lg:py-28">
          <div className="gutter">
            <LineReveal
              lines={[`More ${line.name}`]}
              as="h2"
              className="t-title text-chalk"
            />

            <ul className="mt-12 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((sibling, i) => (
                <Reveal as="li" key={sibling.slug} y={26} delay={i * 0.07}>
                  <ProductCard sku={sibling} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCta />
    </>
  );
}
