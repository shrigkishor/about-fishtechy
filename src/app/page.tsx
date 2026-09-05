import Hero from "@/components/sections/Hero";
import CapabilityTicker from "@/components/sections/CapabilityTicker";
import NumberedList from "@/components/sections/NumberedList";
import ManifestoPanel from "@/components/sections/ManifestoPanel";
import LineupSection from "@/components/sections/LineupSection";
import AppShowcase from "@/components/sections/AppShowcase";
import FaqSection from "@/components/sections/FaqSection";
import ClosingCta from "@/components/sections/ClosingCta";
import { FIVE_THINGS } from "@/content/site";

/**
 * The home page.
 *
 * Section order follows the reference's act structure — an almost-empty hero, a
 * ticker that names the disciplines, the numbered list, then the alternation of
 * dark slabs and orange panels that carries the rest of the scroll:
 *
 *   ink      hero, capability ticker, numbered list
 *   ORANGE   manifesto            <- act break
 *   ink      product lineup
 *   charcoal app showcase          <- slab rides over the lineup
 *   ink      FAQ
 *   ORANGE   closing CTA           <- act break
 *
 * The two orange panels are the page's only high-contrast moments and they sit
 * a long way apart on purpose: one closes the argument about what the product
 * is, the other closes the page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityTicker />
      <NumberedList
        eyebrow={FIVE_THINGS.eyebrow}
        heading={FIVE_THINGS.heading}
        items={FIVE_THINGS.items}
      />
      <ManifestoPanel />
      <LineupSection />
      <AppShowcase />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
