import type { Metadata } from "next";
import ShopHero from "@/components/sections/ShopHero";
import ShopLines from "@/components/sections/ShopLines";
import ShopFeatured from "@/components/sections/ShopFeatured";
import ShopGrid from "@/components/sections/ShopGrid";
import ShopEditorial from "@/components/sections/ShopEditorial";
import ClosingCta from "@/components/sections/ClosingCta";
import { SHOP } from "@/content/pages";

export const metadata: Metadata = {
  title: "Shop",
  description: SHOP.lede,
};

/**
 * The shop, merchandised rather than listed.
 *
 * Section order follows bellussi.com/shop, which walks a visitor through a
 * range instead of handing them a grid:
 *
 *   BONE        the hero — the orange Proof Ball, large, on a light panel
 *   ink         the two product LINES, as large editorial tiles
 *   charcoal    the short list — three SKUs, on a slab that rides over
 *   ink         the full catalog grid, grouped by line
 *   ink         registration, as a piece of editorial
 *   ORANGE      the close
 *
 * THE GRID IS STILL HERE, and still complete. The editorial sections are a way
 * in, not a replacement — someone who arrived knowing they want the 2.1" green
 * ball reaches it by scrolling past two blocks, and the line tiles anchor
 * straight down to it.
 *
 * NO VIDEO HERO HERE. The sticky reel is the home page's alone: it is the one
 * screen whose job is to make a first impression, and repeating it at the head
 * of every page turned a signature into wallpaper — as well as putting an 84MB
 * CDN fetch in front of someone who arrived at the shop to look at products.
 * The line tiles immediately below carry this page's photography instead.
 */
export default function ProductsPage() {
  return (
    <>
      <ShopHero />
      <ShopLines />
      <ShopFeatured />
      <ShopGrid />
      <ShopEditorial />
      <ClosingCta eyebrow="Not sure which?" heading={["Start with", "the Proof Ball"]} />
    </>
  );
}
