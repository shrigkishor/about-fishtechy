import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import ProofTabs from "@/components/sections/ProofTabs";
import ClosingCta from "@/components/sections/ClosingCta";
import CtaLink from "@/components/ui/CtaLink";
import { HOW_IT_WORKS } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description: HOW_IT_WORKS.lede,
};

export default function HowItWorksPage() {
  const { threeSteps, register, usage } = HOW_IT_WORKS;

  return (
    <>
      <PageHero
        eyebrow={HOW_IT_WORKS.eyebrow}
        heading={HOW_IT_WORKS.heading}
        lede={HOW_IT_WORKS.lede}
        ledeSecondary={HOW_IT_WORKS.ledeSecondary}
      />

      {/* The three-step overview, verbatim from the printed product catalog —
          one set of words for print and web, so the two cannot contradict. */}
      <section className="gutter py-20 lg:py-28">
        <SectionHeader
          eyebrow={threeSteps.eyebrow}
          heading={threeSteps.heading}
        />

        <ol className="mt-14 grid list-none gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] md:grid-cols-3">
          {threeSteps.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              y={26}
              delay={i * 0.08}
              className="bg-ink flex flex-col gap-4 p-8 lg:p-10"
            >
              <span className="t-num text-flare text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-heading text-chalk text-[clamp(1.25rem,2vw,1.75rem)]">
                {step.title}
              </h3>
              <p className="t-body text-ash-dim">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        {/* Verified results — one photograph per Proof Product, since the steps
            above say "a Proof Ball OR a Proof Bar" and one picture could only
            ever evidence one of them. The measurement overlay is baked into the
            artwork, so the figures in the alt text are the app's own output. */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {threeSteps.showcase.map((shot, i) => (
            <Reveal key={shot.src} y={30} delay={i * 0.1}>
              <ParallaxImage
                src={shot.src}
                alt={shot.alt}
                speed={i === 0 ? 0.14 : -0.14}
                className="aspect-[4/3] w-full rounded-3xl"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <LineReveal
            lines={[threeSteps.closing.heading]}
            as="h3"
            className="t-title text-chalk"
          />
          <Reveal y={20}>
            <p className="t-lede text-ash-dim">{threeSteps.closing.body}</p>
          </Reveal>
        </div>
      </section>

      {/* Registration, on a charcoal slab riding over the section above. */}
      <section className="bg-slab slab slab-seam slab-close relative mt-[-2rem] py-20 lg:py-28">
        <div className="gutter grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow={register.eyebrow}
              heading={[register.heading]}
            />
            <div className="mt-8 flex flex-col gap-4">
              {register.body.map(paragraph => (
                <Reveal key={paragraph} y={18}>
                  <p className="t-body text-ash-dim max-w-[56ch]">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={30} delay={0.1}>
            <Image
              src={register.image.src}
              alt={register.image.alt}
              width={1200}
              height={900}
              className="w-full rounded-3xl border border-[color:var(--color-line-soft)] object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="gutter py-20 lg:py-28">
        <SectionHeader heading={[usage.heading]} eyebrow="Usage" />
        <div className="mt-12">
          <ProofTabs tabs={usage.tabs} />
        </div>

        <Reveal y={20} className="mt-14">
          <CtaLink href={HOW_IT_WORKS.cta.href}>
            {HOW_IT_WORKS.cta.label}
          </CtaLink>
        </Reveal>
      </section>

      <ClosingCta />
    </>
  );
}
