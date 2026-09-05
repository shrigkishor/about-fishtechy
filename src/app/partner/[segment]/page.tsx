import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import CtaLink from "@/components/ui/CtaLink";
import ClosingCta from "@/components/sections/ClosingCta";
import { PARTNER } from "@/content/pages";

type Params = { params: Promise<{ segment: string }> };

export function generateStaticParams() {
  return PARTNER.segments.map(segment => ({ segment: segment.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { segment: slug } = await params;
  const segment = PARTNER.segments.find(s => s.slug === slug);
  if (!segment) return {};
  return { title: segment.title, description: segment.body };
}

/**
 * A partner segment's landing page.
 *
 * The live site runs a full application funnel behind each of these — a form, a
 * business-location picker, a pending-status screen and a portal. None of that
 * is ported yet: this build is the marketing and storefront surface, so the
 * segment page makes the pitch and hands off to contact rather than opening an
 * application it cannot submit.
 */
export default async function PartnerSegmentPage({ params }: Params) {
  const { segment: slug } = await params;
  const segment = PARTNER.segments.find(s => s.slug === slug);
  if (!segment) notFound();

  return (
    <>
      <PageHero
        eyebrow="Partner"
        heading={[segment.title]}
        lede={segment.body}
        ledeSecondary="Applications are handled by our wholesale desk. Tell us about your business and we will get the right terms in front of you."
      />

      <section className="gutter pb-24">
        <Reveal
          y={26}
          className="bg-slab flex flex-col items-start gap-6 rounded-3xl border border-[color:var(--color-line-soft)] p-8 lg:p-12"
        >
          <p className="t-micro text-flare">Applications</p>
          <p className="t-lede text-ash-dim max-w-[54ch]">
            The self-serve application and partner portal are being ported from
            the current site. In the meantime the wholesale desk takes
            applications directly.
          </p>
          <CtaLink href="/contact">Contact the wholesale desk</CtaLink>
        </Reveal>
      </section>

      <ClosingCta eyebrow="Partner" heading={["Let's put Proof", "on your shelf"]} />
    </>
  );
}
