import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import ClosingCta from "@/components/sections/ClosingCta";
import { PARTNER } from "@/content/pages";

export const metadata: Metadata = {
  title: "Partner with Fishtechy",
  description: PARTNER.lede,
};

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow={PARTNER.eyebrow}
        heading={PARTNER.heading}
        lede={PARTNER.lede}
        ledeSecondary="Each segment has its own application and its own terms. Pick the one that describes you."
      />

      <section className="gutter pb-20 lg:pb-28">
        <ul className="grid list-none gap-6 md:grid-cols-3">
          {PARTNER.segments.map((segment, i) => (
            <Reveal as="li" key={segment.slug} y={28} delay={i * 0.08}>
              <Link
                href={`/partner/${segment.slug}`}
                className="group bg-slab hover:border-flare/40 flex h-full flex-col gap-4 rounded-3xl border border-[color:var(--color-line-soft)] p-8 transition-colors duration-500 lg:p-10"
              >
                <span className="t-num text-flare text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="t-heading text-chalk text-[clamp(1.25rem,2vw,1.75rem)]">
                  {segment.title}
                </h2>
                <p className="t-body text-ash-dim flex-1">{segment.body}</p>
                <span className="t-micro text-ash link-underline mt-2 self-start">
                  Apply →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <ClosingCta eyebrow="Partner" heading={["Let's put Proof", "on your shelf"]} />
    </>
  );
}
