import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import ClosingCta from "@/components/sections/ClosingCta";
import { SOCIAL } from "@/content/nav";
import { CONTACT } from "@/content/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT.lede,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={CONTACT.eyebrow}
        heading={CONTACT.heading}
        lede={CONTACT.lede}
        ledeSecondary="Wholesale enquiries, press, support, or a question about which Proof Product to start with — one of the three below will reach the right desk."
      />

      <section className="gutter pb-20 lg:pb-28">
        <ul className="grid list-none gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] md:grid-cols-3">
          {CONTACT.channels.map((channel, i) => (
            <Reveal
              as="li"
              key={channel.href}
              y={24}
              delay={i * 0.08}
              className="bg-slab flex flex-col gap-3 p-8 lg:p-10"
            >
              <p className="t-micro text-flare">{channel.label}</p>
              <a
                href={channel.href}
                className="t-sub text-brand-blue-lit link-underline self-start"
              >
                {channel.value}
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16">
          <p className="t-micro text-ash-faint mb-6">Elsewhere</p>
          <ul className="flex list-none flex-wrap gap-3">
            {SOCIAL.map((social, i) => (
              <Reveal as="li" key={social.href} y={18} delay={i * 0.06}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-micro text-ash hover:border-flare hover:text-flare inline-flex rounded-full border border-[color:var(--color-line)] px-5 py-3 transition-colors duration-300"
                >
                  {social.label}
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Marquee
        items={Array.from({ length: 4 }, () => "Get in touch")}
        duration={36}
        gap="3rem"
        separator={<span className="text-flare">✦</span>}
        className="t-display text-chalk/6 py-2 select-none"
        itemClassName="whitespace-nowrap"
      />

      <ClosingCta />
    </>
  );
}
