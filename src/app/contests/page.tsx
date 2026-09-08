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
            {/* `flex-wrap` + `shrink-0` on the label: at 360px the footnote is
                long enough to squeeze the live label down to 18px and crop it
                to "Li". The footnote drops to its own line instead. */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[color:var(--color-line-soft)] px-6 py-5 lg:px-9">
              <div className="flex shrink-0 items-center gap-3">
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
                /* FIVE COLUMNS ONLY WHERE FIVE COLUMNS FIT. The `min-w-[Nch]`
                   floors add up to ~35ch of unshrinkable row, which a 272px
                   phone column cannot hold — and because `* { min-width: 0 }`
                   lets a flex item shrink under its content, the name did not
                   wrap, it overflowed and was cropped by the card's
                   `overflow-hidden`: "Elias Montgomery" lost 37px of itself.
                   Below `sm` the row is a two-line block instead — rank and
                   name on top, the reading and its status beneath — and the
                   `min-w` floors only apply from `sm`, where there is room. */
                <li
                  key={row.name}
                  className="flex flex-wrap items-center gap-x-6 gap-y-1.5 border-b border-[color:var(--color-line-soft)] px-6 py-5 last:border-b-0 max-sm:gap-y-2.5 lg:px-9"
                >
                  <span className="t-num text-ash-faint w-8 shrink-0 text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-sub text-chalk flex-1 max-sm:basis-[calc(100%-3.5rem)] sm:min-w-[12ch]">
                    {row.name}
                  </span>
                  <span className="t-body text-ash-dim text-[0.9375rem] max-sm:pl-14 sm:min-w-[16ch]">
                    {row.species}
                  </span>
                  <span className="t-num text-chalk text-[1.0625rem] sm:min-w-[7ch]">
                    {row.length}
                  </span>
                  <span
                    className={cn(
                      // `ml-14` matches the species' `pl-14`, so everything
                      // stacked under the name shares its left edge.
                      "t-micro shrink-0 rounded-full border px-3 py-1.5 max-sm:ml-14",
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
