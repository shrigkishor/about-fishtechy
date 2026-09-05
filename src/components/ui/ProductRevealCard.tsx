import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Sku } from "@/lib/catalog";

/**
 * A product tile in the editorial style of lagencedesignstudio.com.
 *
 * HOME PAGE ONLY, and deliberately separate from the shop's `ProductCard`
 * rather than a variant of it — see `LineupSection`. The shop shows everything
 * at once because it is a page for comparing nine SKUs; this is a page people
 * scroll past.
 *
 * WHAT CHANGED TO MATCH THE REFERENCE, and why each one:
 *
 *  - SQUARE CORNERS. Their slides carry `border-radius: 0`. On a grid of
 *    photographs a radius is a frame, and their whole look is pictures sitting
 *    on the page unframed.
 *  - NO CARD BORDER OR FILL. The picture is the card. The hairline box this
 *    used to sit in was doing the job the image should do.
 *  - META BELOW THE PICTURE, not floating on it. Theirs sets a caption under
 *    the image rather than over it, which is also what lets the photograph be
 *    read as a photograph.
 *  - THE DIMENSION MOVED into that caption from a pill over the image. It is
 *    the most important fact about a reference object, so it stays — but a
 *    floating chip is exactly the chrome this restyle is removing.
 *
 * The hover overlay stays, because it was asked for and nothing about the
 * restyle contradicts it: the caption below carries name, size and price at
 * rest, and hover adds the sentence explaining where you would use the thing.
 *
 * The reveal animation is `ClipReveal`, applied by the grid rather than here,
 * so the card stays a presentational component.
 */
export default function ProductRevealCard({
  sku,
  index,
}: {
  sku: Sku;
  /** 1-based position in the grid; rendered as the 01/02 ordinal. */
  index: number;
}) {
  const dimension = sku.dimension ? `${sku.dimension.value}″` : null;
  const price = formatPrice(sku.msrp) ?? sku.availability ?? "—";

  return (
    <Link href={`/shop/${sku.slug}`} className="reveal-card group block">
      {/* A LIGHT PLATE, deliberately. The artwork is `sku.cutout` — the shot
          with its white studio paper keyed to alpha — so this is not the white
          box the cutouts were made to remove; it is a chosen ground.
       
          It has to be light because the range is photographed for paper and
          half of it is BLACK: the Proof Bars disappeared against the ink page,
          and the balls lost the moulding shadows that give them form. Bone is
          the one ground every product in the range reads on.
       
          `object-contain`, not `cover`: a cutout has transparent margins, and
          cropping them would clip the product rather than the paper. */}
      <div className="bg-bone relative aspect-[4/5] overflow-hidden">
        {sku.images[0] ? (
          <Image
            data-clip-media=""
            data-reveal-media=""
            src={sku.cutout}
            alt={sku.images[0].alt}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
            className="object-contain"
          />
        ) : null}

        <span
          aria-hidden
          data-reveal-ordinal=""
          className="t-num text-ink/35 absolute top-4 left-4 z-20 text-sm"
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* The sentence, on hover. `pointer-events-none` matters: the panel
            covers the picture, and without it the pointer would enter the panel,
            leave the image, and flicker the hover state on the boundary. */}
        <div
          data-reveal-detail=""
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(5,5,6,0.25)_0%,rgba(5,5,6,0.86)_55%,rgba(5,5,6,0.94)_100%)] p-6"
        >
          {[
            <p key="eyebrow" className="t-micro text-flare">
              {sku.subtitle}
            </p>,
            <p key="body" className="t-body text-ash mt-3 text-[0.875rem]">
              {sku.description}
            </p>,
            <span
              key="cta"
              className="t-micro text-chalk mt-5 flex items-center gap-2"
            >
              View product
              <span aria-hidden>→</span>
            </span>,
          ].map((child, i) => (
            <span
              key={child.key}
              data-reveal-line=""
              /* The one value that varies per line; the states themselves live
                 in globals.css under `.reveal-card`. */
              style={{ "--stagger": `${i * 70}ms` } as React.CSSProperties}
              className="block"
            >
              {child}
            </span>
          ))}
        </div>
      </div>

      {/* The caption. Always visible, under the picture — the reference's own
          arrangement, and the reason the photograph reads as a photograph. */}
      <div className="flex items-baseline justify-between gap-4 pt-4">
        <div className="min-w-0">
          <h4 className="t-sub text-chalk truncate">{sku.name}</h4>
          <p className="t-micro text-ash-faint mt-1.5">
            {dimension ? `${dimension} · ` : ""}
            {sku.availability ?? "In the lineup"}
          </p>
        </div>
        <span className="t-num text-flare shrink-0 text-[1.0625rem]">
          {price}
        </span>
      </div>
    </Link>
  );
}
