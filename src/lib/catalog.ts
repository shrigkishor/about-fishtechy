import catalog from "@/data/proofCatalog.json";

/**
 * The Proof Product catalog, read from the same JSON the live site ships.
 *
 * The JSON writes dimensions as `{dim}` placeholders inside names, subtitles
 * and alt text so one row can render in either unit system. v2 is US-only for
 * now and resolves them to inches here; `formatDimension` is the single place
 * to add a metric branch when that changes.
 *
 * `msrp: null` is a real state, not missing data — the green 2.1" Pro is
 * "Coming 2027" with no price and no UPC. Those SKUs render a status instead of
 * a price and cannot be bought, which is why `price` stays nullable all the way
 * through rather than being defaulted to 0 somewhere in the middle.
 */

export type CatalogImage = { src: string; alt: string };

export type Sku = {
  /**
   * The first product shot with its white studio background keyed to alpha.
   *
   * Generated once from `product.webp` and checked in beside it — see the note
   * on `cutoutFor`. Used where the shot sits on the dark ground and the paper
   * would otherwise read as a white box.
   */
  cutout: string;
  skuCode: string | null;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  shopDescription?: string;
  msrp: number | null;
  upc: string | null;
  availability: string | null;
  casePack: number | null;
  images: CatalogImage[];
  spin?: CatalogImage[];
  dimension: { value: number; kind: "diameter" | "length" } | null;
};

export type Line = {
  slug: string;
  name: string;
  intro: string;
  skus: Sku[];
};

function formatDimension(d: Sku["dimension"]): string {
  if (!d) return "";
  // The inch mark is a double prime, not a straight quote — it sits beside the
  // product name in display type where the difference is legible.
  return `${d.value}″`;
}

/** Resolves every `{dim}` placeholder in a string against its SKU. */
function resolve(text: string, sku: { dimension: Sku["dimension"] }): string {
  return text.replace(/\{dim\}/g, formatDimension(sku.dimension));
}

/**
 * Path to a SKU's alpha cutout.
 *
 * Every `images[0]` in the catalog is `product.webp`, and every one of them has
 * a `product-cutout.webp` generated beside it, so this is a name swap rather
 * than a lookup. It is derived rather than stored because the catalog JSON is
 * the price list — photography variants do not belong in it.
 *
 * WHY CUTOUTS EXIST AT ALL: the studio shots are opaque RGB on pure white
 * (`corner_px = (255,255,255)`), so on this site's near-black ground they
 * render as white boxes. The alpha versions were keyed by flood-filling the
 * border-connected neutral paper — which also takes the drop shadow — and, for
 * the balls only, punching the enclosed pure-white keyring holes. The cream
 * label survives that test because it is `(255,248,236)`, not pure white.
 */
function cutoutFor(images: CatalogImage[]): string {
  const first = images[0]?.src ?? "";
  return first.replace(/product\.webp$/, "product-cutout.webp");
}

const raw = catalog as unknown as { lines: Line[] };

export const LINES: Line[] = raw.lines.map(line => ({
  ...line,
  skus: line.skus.map(sku => ({
    ...sku,
    cutout: cutoutFor(sku.images ?? []),
    name: resolve(sku.name, sku),
    subtitle: resolve(sku.subtitle, sku),
    description: resolve(sku.description, sku),
    ...(sku.shopDescription
      ? { shopDescription: resolve(sku.shopDescription, sku) }
      : {}),
    images: (sku.images ?? []).map(img => ({
      ...img,
      alt: resolve(img.alt, sku),
    })),
    ...(sku.spin
      ? { spin: sku.spin.map(img => ({ ...img, alt: resolve(img.alt, sku) })) }
      : {}),
  })),
}));

export const ALL_SKUS: Sku[] = LINES.flatMap(line => line.skus);

export function findLine(slug: string): Line | undefined {
  return LINES.find(line => line.slug === slug);
}

export function findSku(slug: string): Sku | undefined {
  return ALL_SKUS.find(sku => sku.slug === slug);
}

/** The line a SKU belongs to — needed for breadcrumbs and "more like this". */
export function lineForSku(slug: string): Line | undefined {
  return LINES.find(line => line.skus.some(sku => sku.slug === slug));
}

export function formatPrice(msrp: number | null): string | null {
  if (msrp === null) return null;
  return `$${msrp}`;
}

/** The price band a line spans, for the shop grid's line headers. */
export function priceRange(line: Line): string | null {
  const prices = line.skus
    .map(sku => sku.msrp)
    .filter((p): p is number => p !== null);
  if (prices.length === 0) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$${min}` : `$${min} — $${max}`;
}
