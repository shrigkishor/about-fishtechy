import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Sku } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/**
 * A shop product card, built to the anatomy bellussi.com/shop uses.
 *
 * Theirs is: a raised dark panel, the product cut out and floated in generous
 * space, then centred type — name in caps, price under it, and a small `BUY`
 * label sitting on a short gold rule. No description, no badges, no chrome over
 * the photograph. The gold appears twice and only twice: the rule, and a
 * hairline border on the card you are pointing at.
 *
 * WHAT MOVED TO FISHTECHY'S PALETTE. Their gold `#D9C36F` becomes the brand
 * orange; their navy panel becomes `slab`, which is the token that already
 * means "raised off the ink ground". The structure is theirs; none of the
 * colour is.
 *
 * THE PANEL IS LIGHT, AND THAT IS WHAT MAKES THE PRODUCTS READ. `sku.cutout`
 * has the white studio paper keyed to alpha, but the range is photographed for
 * paper: several Proof Bars are BLACK-bodied, so on a dark card they sat almost
 * invisible, and the balls lost their moulding shadows into the ground. On bone
 * every product in the range reads the way it was lit — the black bars have
 * something to be black against, and the orange and green balls keep their
 * form.
 *
 * The card inverts against the page rather than blending into it, which is also
 * the reference's structure: there, dark cards on a darker page; here, light
 * cards on a dark page. The relationship is the same, the polarity is the one
 * the photography needs.
 *
 * NO DESCRIPTION HERE, deliberately, and that is a change: this card used to
 * print `shopDescription`. The reference card carries name and price and
 * nothing else, and on a nine-up grid that is the difference between a set of
 * products and nine paragraphs. The sentence still exists — it is on the
 * detail page, which is what this links to.
 *
 * An unpriced SKU shows its availability where the price goes and says so
 * instead of `BUY`. The green 2.1" Pro is "Coming 2027" with no price and no
 * UPC; offering to sell it would be a lie the catalog does not tell.
 */
export default function ProductCard({
  sku,
  className,
}: {
  sku: Sku;
  className?: string;
}) {
  const price = formatPrice(sku.msrp);
  const buyable = price !== null;

  return (
    <Link
      href={`/shop/${sku.slug}`}
      className={cn(
        "group bg-bone hover:border-flare focus-visible:border-flare flex h-full flex-col border border-transparent px-6 pt-10 pb-9 transition-colors duration-500",
        className
      )}
    >
      {/* The product floats in its own space — no frame, no plate, no crop.
          `object-contain` because a cutout's margins are transparent and
          cropping them would clip the product rather than the paper. */}
      <div className="relative mx-auto aspect-square w-full max-w-[300px] flex-1">
        {sku.images[0] ? (
          <Image
            src={sku.cutout}
            alt={sku.images[0].alt}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 84vw"
            className="object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        ) : null}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <h3 className="t-sub text-ink text-[clamp(0.9375rem,1.25vw,1.125rem)] leading-[1.35] tracking-[0.02em] uppercase">
          {sku.name}
        </h3>

        <p className="t-num text-ink/60 text-[1.0625rem]">
          {price ?? sku.availability ?? "—"}
        </p>

        {/* The label and its rule. The rule is the reference's one flourish and
            it is the only place the accent colour appears at rest. */}
        <span className="mt-3 flex flex-col items-center gap-2">
          <span className="t-micro text-ink group-hover:text-flare-deep transition-colors duration-300">
            {buyable ? "Buy" : "Notify me"}
          </span>
          <span
            aria-hidden
            className="bg-flare-deep h-px w-10 origin-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[1.6]"
          />
        </span>
      </div>
    </Link>
  );
}
