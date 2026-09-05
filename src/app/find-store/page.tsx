import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import CtaLink from "@/components/ui/CtaLink";
import ClosingCta from "@/components/sections/ClosingCta";

export const metadata: Metadata = {
  title: "Find a store",
  description:
    "Proof Products are stocked at fly shops and outfitters nationwide. Find the retailers near you.",
};

/**
 * Find a Store.
 *
 * The live site backs this with a MapLibre dealer map fed by an authenticated
 * dealer-coordinates endpoint. Neither the map nor that endpoint is wired into
 * v2 yet, so rather than ship a dead map canvas this page states the situation
 * and routes to the destinations that DO work today.
 *
 * Porting the map is tracked as follow-up work; see the project README.
 */
export default function FindStorePage() {
  return (
    <>
      <PageHero
        eyebrow="Stockists"
        heading={["Find a store", "near you"]}
        lede="Proof Products are stocked at fly shops, outfitters, and marine dealers nationwide."
        ledeSecondary="The dealer map is not connected on this build yet. Until it is, the retail links below ship anywhere in the US."
      />

      <section className="gutter pb-24">
        <Reveal
          y={26}
          className="bg-slab flex flex-col items-start gap-6 rounded-3xl border border-[color:var(--color-line-soft)] p-8 lg:p-12"
        >
          <p className="t-micro text-flare">Dealer map</p>
          <p className="t-lede text-ash-dim max-w-[54ch]">
            The searchable stockist map is being ported from the current site and
            needs its dealer feed connected before it can go live here.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/buy-now">Buy online instead</CtaLink>
            <CtaLink href="/contact" variant="ghost">
              Ask us where to look
            </CtaLink>
          </div>
        </Reveal>
      </section>

      <ClosingCta />
    </>
  );
}
