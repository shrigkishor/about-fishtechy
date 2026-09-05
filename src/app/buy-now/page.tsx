import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import CtaLink from "@/components/ui/CtaLink";
import { BUY_NOW, RETAILERS } from "@/content/pages";

export const metadata: Metadata = {
  title: "Where to buy",
  description: BUY_NOW.lede,
};

/**
 * Where to buy.
 *
 * There is no cart on this site: Proof Products ship from three retailers and
 * this page hands the visitor to whichever one they already have an account
 * with. Every destination leaves the site, so every card is a real `<a>` with
 * `rel="noreferrer noopener"` rather than a router link dressed up as one.
 */
export default function BuyNowPage() {
  return (
    <>
      <PageHero
        eyebrow={BUY_NOW.eyebrow}
        heading={BUY_NOW.heading}
        lede={BUY_NOW.lede}
        ledeSecondary="Prices are the same everywhere. Pick on delivery speed, or on whose checkout you would rather not re-type your address into."
      />

      <section className="gutter pb-20 lg:pb-28">
        <ul className="grid list-none gap-6 md:grid-cols-3">
          {RETAILERS.map((retailer, i) => (
            <Reveal as="li" key={retailer.store} y={28} delay={i * 0.08}>
              <a
                href={retailer.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group bg-slab hover:border-flare/40 flex h-full flex-col gap-6 rounded-3xl border border-[color:var(--color-line-soft)] p-8 transition-colors duration-500 lg:p-10"
              >
                <div className="bg-chalk grid h-16 w-fit place-items-center rounded-xl px-5">
                  <Image
                    src={retailer.logo}
                    alt={retailer.name}
                    width={120}
                    height={40}
                    className="h-7 w-auto object-contain"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="t-heading text-chalk text-[clamp(1.25rem,2vw,1.75rem)]">
                    {retailer.name}
                  </h2>
                  <p className="t-body text-ash-dim">{retailer.note}</p>
                </div>

                <span className="t-micro text-brand-blue-lit link-underline self-start">
                  Buy at {retailer.name} ↗
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      <section data-ground="light" className="bg-flare text-ink slab slab-close relative mt-[-2rem] py-20 lg:py-24">
        <div className="gutter flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <LineReveal
              lines={[BUY_NOW.localPrompt.heading]}
              as="h2"
              className="t-title text-ink max-w-[16ch]"
            />
            <Reveal y={18} delay={0.12}>
              <p className="t-lede text-ink/70 mt-6 max-w-[48ch]">
                {BUY_NOW.localPrompt.body}
              </p>
            </Reveal>
          </div>

          <Reveal y={18} delay={0.2}>
            <CtaLink
              href={BUY_NOW.localPrompt.link.href}
              variant="ghost"
              className="!border-ink/25 !text-ink hover:!border-ink"
            >
              {BUY_NOW.localPrompt.link.label}
            </CtaLink>
          </Reveal>
        </div>
      </section>

      <section className="gutter py-16 text-center">
        <Reveal y={18}>
          <p className="t-body text-ash-dim">
            Comparing formats first?{" "}
            <Link href="/shop" className="text-brand-blue-lit link-underline">
              See all nine Proof Products →
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
