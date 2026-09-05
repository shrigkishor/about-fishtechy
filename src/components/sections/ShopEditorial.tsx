import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import CtaLink from "@/components/ui/CtaLink";
import { SHOP_EDITORIAL } from "@/content/pages";

/**
 * A piece of editorial between the catalog and the close.
 *
 * bellussi.com/shop breaks its grid with full-width feature blocks — a new
 * collection, a mixology story — so the page is not one uninterrupted wall of
 * product. The Fishtechy equivalent is the one thing a buyer has to do that the
 * grid cannot tell them: register the thing before the first cast.
 *
 * It earns its place by being useful rather than decorative. A visitor who
 * reaches the bottom of the shop has decided what to buy; this is the next
 * question they will have.
 */
export default function ShopEditorial() {
  return (
    <section className="gutter py-20 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal y={32}>
          <ParallaxImage
            src={SHOP_EDITORIAL.image.src}
            alt={SHOP_EDITORIAL.image.alt}
            speed={0.14}
            className="aspect-[4/3] w-full rounded-3xl"
          />
        </Reveal>

        <div>
          <Reveal y={14}>
            <p className="t-micro text-flare">{SHOP_EDITORIAL.eyebrow}</p>
          </Reveal>

          <LineReveal
            lines={SHOP_EDITORIAL.heading}
            as="h2"
            className="t-title text-chalk mt-6"
          />

          <Reveal y={20} delay={0.12}>
            <p className="t-body text-ash-dim mt-6 max-w-[52ch]">
              {SHOP_EDITORIAL.body}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.2} className="mt-9">
            <CtaLink href={SHOP_EDITORIAL.cta.href} variant="ghost">
              {SHOP_EDITORIAL.cta.label}
            </CtaLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
