import Image from "next/image";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import CtaLink from "@/components/ui/CtaLink";
import { findSku, formatPrice } from "@/lib/catalog";

/**
 * The shop's opening screen: the orange Proof Ball, large.
 *
 * bellussi.com/shop opens on a single product photographed big and lit
 * moodily, before any grid. This is the same move with the range's most
 * recognisable object.
 *
 * THE PANEL IS LIGHT, AND THAT IS THE POINT. Every `product.webp` in the
 * catalog is an opaque studio shot on pure white — checked: `mode=RGB`,
 * `alpha=False`, corner pixel `(255,255,255)`. Dropped on this site's near-black
 * ground they read as bright white boxes, and keying the white out properly is
 * retouching, not CSS (the keyring hole and the drop shadow both defeat a
 * simple flood fill).
 *
 * So the hero inverts instead, and the panel is PURE WHITE rather than the
 * warmer `bone` token — because the shot's background is exactly `#ffffff`, and
 * against bone's `#f4f2ed` it read as a white rectangle floating on a cream
 * panel. Matching the ground to the photograph's own white is what makes the
 * ball sit in open space, which is what it was lit for. It also gives the shop the one high-contrast beat the
 * page otherwise lacks — and the ground-detection in `Nav` already knows how to
 * flip the logo and the menu button over a light section, which is why this
 * carries `data-ground="light"`.
 *
 * `slab-close` rounds the bottom edge so the dark page resumes underneath it
 * rather than butting against a hard line.
 */
export default function ShopHero() {
  const hero = findSku("proof-ball-orange-1-4");
  if (!hero) return null;

  const price = formatPrice(hero.msrp);

  return (
    <section
      data-ground="light"
      className="text-ink slab-close relative overflow-hidden bg-white"
    >
      <div className="gutter grid items-center gap-10 pt-36 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pt-44 lg:pb-24">
        <div>
          <Reveal y={14}>
            <p className="t-micro text-ink/50">Shop</p>
          </Reveal>

          <div
            style={
              { "--display-size": "clamp(2.5rem, 7vw, 6.5rem)" } as React.CSSProperties
            }
          >
            <LineReveal
              lines={["Proof", "Products"]}
              as="h1"
              trigger={false}
              delay={0.15}
              className="t-display text-ink mt-6"
            />
          </div>

          <Reveal y={22} delay={0.28}>
            <p className="t-lede text-ink/70 mt-8 max-w-[46ch]">
              A reference of known size, in your hand or on your boat. Put one in
              frame and the free app returns length, girth, weight and surface
              area in seconds.
            </p>
          </Reveal>

          <Reveal
            y={20}
            delay={0.38}
            stagger={0.08}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <CtaLink
              href="#proof-ball"
              variant="ghost"
              className="!border-brand-blue/35 !text-brand-blue hover:!border-brand-blue"
            >
              Shop the range
            </CtaLink>
            <CtaLink
              href={`/shop/${hero.slug}`}
              variant="ghost"
              className="!border-brand-blue/35 !text-brand-blue hover:!border-brand-blue"
            >
              {hero.name}
              {price ? ` · ${price}` : ""}
            </CtaLink>
          </Reveal>
        </div>

        {/* The ball drifts against the panel as the page scrolls. No clipping
            frame around it: the shot's white ground and the panel are the same
            value, so a frame would draw a box around nothing. */}
        <Reveal y={30} delay={0.2} className="relative">
          <Parallax speed={0.12}>
            <Image
              src={hero.images[0].src}
              alt={hero.images[0].alt}
              width={1200}
              height={1200}
              priority
              sizes="(min-width: 1024px) 46vw, 88vw"
              className="mx-auto w-full max-w-[560px]"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
