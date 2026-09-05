import Link from "next/link";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import ScrollDrift from "@/components/motion/ScrollDrift";
import CtaLink from "@/components/ui/CtaLink";
import { CONTACT } from "@/content/pages";
import { STACK_FRAME, STACK_SIZER } from "@/lib/stack";

/**
 * The closing panel — the site's second and last full-bleed orange beat.
 *
 * The reference ends on an oversized invitation with contact routes listed
 * beneath it, and the switch to its light ground is what signals the page is
 * over. Same job here.
 *
 * The two CTAs are deliberately not the same kind of thing: one buys a Proof
 * Product, the other starts a conversation. Both `ghost` on this ground —
 * `solid` is orange-on-ink and would vanish into the panel.
 */
export default function ClosingCta({
  heading = CONTACT.heading,
  eyebrow = CONTACT.eyebrow,
}: {
  heading?: readonly string[];
  eyebrow?: string;
}) {
  return (
    <section className={STACK_SIZER}>
      <div
        data-ground="light"
        className={`bg-flare text-ink slab slab-seam ${STACK_FRAME}`}
      >
        <div className="gutter">
          <Reveal y={14}>
            <p className="t-micro text-ink/55">{eyebrow}</p>
          </Reveal>

          {/* The headline rides against the panel as it arrives, so the last
            beat of the page has movement of its own rather than simply
            appearing. */}
          <ScrollDrift y={56}>
            <LineReveal
              lines={heading}
              as="h2"
              className="t-title text-ink mt-8 max-w-[16ch]"
            />
          </ScrollDrift>

          <Reveal
            y={20}
            delay={0.15}
            stagger={0.08}
            className="mt-12 flex flex-wrap gap-3"
          >
            <CtaLink
              href="/shop"
              variant="ghost"
              className="!border-ink/25 !text-ink hover:!border-ink hover:!text-ink"
            >
              Shop Proof Products
            </CtaLink>
            <CtaLink
              href="/contact"
              variant="ghost"
              className="!border-ink/25 !text-ink hover:!border-ink hover:!text-ink"
            >
              Get in touch
            </CtaLink>
          </Reveal>

          <div className="mt-16 grid gap-8 border-t border-[color:var(--color-line-ink)] pt-10 sm:grid-cols-3">
            {CONTACT.channels.map((channel, i) => (
              <Reveal key={channel.href} y={18} delay={i * 0.07}>
                <p className="t-micro text-ink/50 mb-2">{channel.label}</p>
                <Link
                  href={channel.href}
                  className="t-sub text-ink link-underline"
                >
                  {channel.value}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
