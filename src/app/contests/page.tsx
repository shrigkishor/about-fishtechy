import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import ClosingCta from "@/components/sections/ClosingCta";
import { CONTESTS } from "@/content/pages";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Contests",
  description: CONTESTS.lede,
};

/** Verified reads in brand orange; the other two stay muted. */
function statusTone(status: string) {
  if (status === "Verified") return "text-flare border-flare/40";
  if (status === "Pending") return "text-ash-dim border-[color:var(--color-line)]";
  return "text-ash-faint border-[color:var(--color-line-soft)]";
}

export default function ContestsPage() {
  return (
    <>
      <PageHero
        eyebrow={CONTESTS.eyebrow}
        heading={CONTESTS.heading}
        lede={CONTESTS.lede}
        ledeSecondary={CONTESTS.ledeSecondary}
      />

      {/* A sample board, not live data — rows are ordered by length so the
          ranking reads correctly. */}
      <section className="gutter py-16 lg:py-24">
        <Reveal y={30}>
          <div className="bg-slab overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)]">
            <div className="flex items-center justify-between gap-4 border-b border-[color:var(--color-line-soft)] px-6 py-5 lg:px-9">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="bg-flare size-1.5 animate-pulse rounded-full"
                />
                <span className="t-micro text-flare">
                  {CONTESTS.leaderboard.liveLabel}
                </span>
              </div>
              <p className="t-micro text-ash-faint">
                {CONTESTS.leaderboard.footnote}
              </p>
            </div>

            <ol className="list-none">
              {CONTESTS.leaderboard.rows.map((row, i) => (
                <li
                  key={row.name}
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--color-line-soft)] px-6 py-5 last:border-b-0 lg:px-9"
                >
                  <span className="t-num text-ash-faint w-8 shrink-0 text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-sub text-chalk min-w-[12ch] flex-1">
                    {row.name}
                  </span>
                  <span className="t-body text-ash-dim min-w-[16ch] text-[0.9375rem]">
                    {row.species}
                  </span>
                  <span className="t-num text-chalk min-w-[7ch] text-[1.0625rem]">
                    {row.length}
                  </span>
                  <span
                    className={cn(
                      "t-micro rounded-full border px-3 py-1.5",
                      statusTone(row.status)
                    )}
                  >
                    {row.status}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="gutter pb-16 lg:pb-24">
        <SectionHeader eyebrow="Formats" heading={["Three ways", "to compete"]} />

        <ul className="mt-14 grid list-none gap-6 md:grid-cols-3">
          {CONTESTS.formats.map((format, i) => (
            <Reveal
              as="li"
              key={format.title}
              y={26}
              delay={i * 0.08}
              className="bg-slab flex flex-col gap-4 rounded-3xl border border-[color:var(--color-line-soft)] p-8 lg:p-10"
            >
              <span className="t-num text-flare text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-heading text-chalk text-[clamp(1.25rem,2vw,1.75rem)]">
                {format.title}
              </h3>
              <p className="t-body text-ash-dim">{format.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The scale ladder, closed by a ticker of the three rungs. */}
      <section className="bg-slab slab slab-seam slab-close relative mt-[-2rem] py-20 lg:py-28">
        <div className="gutter">
          <SectionHeader
            eyebrow={CONTESTS.scale.label}
            heading={["Weekend event", "to national series"]}
            body={CONTESTS.scale.body}
          />

          <ol className="mt-14 grid list-none gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] md:grid-cols-3">
            {CONTESTS.scale.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                y={22}
                delay={i * 0.08}
                className="bg-ink flex flex-col gap-3 p-8 lg:p-10"
              >
                <span className="t-num text-flare text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-sub text-chalk">{step.title}</h3>
                <p className="t-body text-ash-faint text-[0.875rem]">
                  {step.note}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Marquee
          items={CONTESTS.scale.steps.flatMap(step => [step.title, step.note])}
          duration={40}
          gap="2.5rem"
          separator={<span className="text-flare/50">/</span>}
          className="t-micro text-ash-faint mt-16 py-3"
          itemClassName="whitespace-nowrap"
        />
      </section>

      <ClosingCta
        eyebrow="Start a contest"
        heading={["Run your first", "verified", "tournament"]}
      />
    </>
  );
}
