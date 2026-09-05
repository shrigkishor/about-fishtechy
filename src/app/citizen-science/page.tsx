import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import CtaLink from "@/components/ui/CtaLink";
import { CITIZEN_SCIENCE } from "@/content/pages";

export const metadata: Metadata = {
  title: "Citizen science",
  description: CITIZEN_SCIENCE.lede,
};

export default function CitizenSciencePage() {
  const { flow, privacy, why, impact } = CITIZEN_SCIENCE;

  return (
    <>
      <PageHero
        eyebrow={CITIZEN_SCIENCE.eyebrow}
        heading={CITIZEN_SCIENCE.heading}
        lede={CITIZEN_SCIENCE.lede}
        ledeSecondary={CITIZEN_SCIENCE.ledeSecondary}
        image={CITIZEN_SCIENCE.hero}
      />

      <section className="gutter py-20 lg:py-28">
        <SectionHeader eyebrow="How it flows" heading={flow.heading} />

        <ol className="mt-14 grid list-none gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] md:grid-cols-3">
          {flow.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              y={26}
              delay={i * 0.08}
              className="bg-ink flex flex-col gap-4 p-8 lg:p-10"
            >
              <p className="t-micro text-flare">{step.eyebrow}</p>
              <h3 className="t-heading text-chalk text-[clamp(1.25rem,2vw,1.75rem)]">
                {step.title}
              </h3>
              <p className="t-body text-ash-dim">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* The privacy panel. This is the section the programme lives or dies on,
          so it gets the charcoal slab and its own badge rather than being a
          bullet list inside the section above. */}
      <section className="bg-slab slab slab-seam slab-close relative mt-[-2rem] py-20 lg:py-28">
        <div className="gutter">
          <div className="flex flex-wrap items-center gap-4">
            <Reveal y={14}>
              <span className="border-flare/40 text-flare t-micro rounded-full border px-4 py-2">
                {privacy.badge}
              </span>
            </Reveal>
          </div>

          <LineReveal
            lines={[privacy.heading]}
            as="h2"
            className="t-title text-chalk mt-8 max-w-[18ch]"
          />

          <ul className="mt-14 grid list-none gap-6 md:grid-cols-3">
            {privacy.guarantees.map((guarantee, i) => (
              <Reveal
                as="li"
                key={guarantee.label}
                y={24}
                delay={i * 0.08}
                className="bg-ink flex flex-col gap-3 rounded-3xl border border-[color:var(--color-line-soft)] p-8"
              >
                <p className="t-micro text-flare">{guarantee.label}</p>
                <p className="t-body text-ash-dim">{guarantee.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="gutter py-20 lg:py-28">
        <SectionHeader eyebrow={why.eyebrow} heading={[why.heading]} headingClassName="max-w-[24ch]" />

        <ul className="mt-14 grid list-none gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] md:grid-cols-3">
          {why.points.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              y={22}
              delay={i * 0.08}
              className="bg-ink flex flex-col gap-3 p-8 lg:p-10"
            >
              <span className="t-num text-flare text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-sub text-chalk">{point.title}</h3>
              <p className="t-body text-ash-dim text-[0.9375rem]">
                {point.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The orange beat closes this page, in place of the shared CTA — the
          argument here ends on conservation, not on a shop link. */}
      <section data-ground="light" className="bg-flare text-ink slab slab-close relative mt-[-2rem] py-20 lg:py-28">
        <div className="gutter">
          <LineReveal
            lines={impact.heading.split(", ")}
            as="h2"
            className="t-title text-ink max-w-[20ch]"
          />
          <Reveal y={20} delay={0.15} className="mt-8">
            <p className="t-lede text-ink/70 max-w-[60ch]">{impact.body}</p>
          </Reveal>
          <Reveal y={20} delay={0.25} className="mt-10">
            <CtaLink
              href={impact.cta.href}
              variant="ghost"
              className="!border-ink/25 !text-ink hover:!border-ink"
            >
              {impact.cta.label}
            </CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
