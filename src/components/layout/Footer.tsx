import Link from "next/link";
import Logo from "@/components/ui/Logo";
import StoreBadges from "@/components/ui/StoreBadges";
import FooterWordmark from "@/components/layout/FooterWordmark";
import { FOOTER_COLUMNS, FOOTER_LEGAL, SOCIAL } from "@/content/nav";

/**
 * The closing panel: a repeating wordmark ticker, the link columns, and the
 * store badges.
 *
 * The reference ends every page on its own name set enormous, and so does this
 * one: FISHTECHY, once, lighting under the pointer. It briefly carried a ticker
 * repeating "Every catch, verified" instead — which said the tagline six times
 * and the brand's name zero.
 *
 * NO SLAB LIP HERE, unlike every section above it. Those ride OVER the section
 * before them, and a rounded leading edge is what sells that. This one does not
 * move at all — it is uncovered from behind as the page slides off it, so a lip
 * would be describing a gesture it never makes. See `FooterReveal`.
 */
export default function Footer() {
  return (
    <footer className="bg-ink-deep relative pt-20 md:pt-28">
      {/* The brand name, once and enormous, rather than a ticker repeating the
          tagline. It lights under the pointer — see `FooterWordmark`. The
          tagline still closes the legal row below, so nothing is lost. */}
      <FooterWordmark />

      <div className="gutter mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            aria-label="Fishtechy — home"
            className="inline-flex transition-opacity duration-300 hover:opacity-70"
          >
            <Logo tone="dark" height={34} />
          </Link>
          <p className="t-body text-ash-dim max-w-[38ch]">
            Proof Products turn any catch into a verified measurement. Measure,
            log, compete, and contribute from one free account.
          </p>
          <StoreBadges />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_COLUMNS.map(column => (
            <div key={column.title}>
              <p className="t-micro text-ash-faint mb-4">{column.title}</p>
              <ul className="flex list-none flex-col gap-2.5">
                {column.links.map(link => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="t-body text-ash hover:text-brand-blue-lit link-underline text-[0.9375rem]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="gutter mt-16 border-t border-[color:var(--color-line-soft)] py-7">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="t-micro text-ash-faint">{FOOTER_LEGAL.copyright}</p>
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-2">
            {SOCIAL.map(social => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-micro text-ash-dim hover:text-flare transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-micro text-flare">{FOOTER_LEGAL.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
