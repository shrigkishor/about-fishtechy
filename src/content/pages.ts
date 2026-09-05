/**
 * Copy for the standalone content pages — Contests, Citizen Science, Partner,
 * Buy Now, Contact.
 *
 * Same provenance as `site.ts`: transcribed from the live site's content module
 * so the redesign does not quietly reword the programme it describes.
 */

import type { Link } from "./site";

export const CONTESTS = {
  eyebrow: "Tournaments",
  heading: ["Contests"],
  lede: "Challenge friends, teams, and anglers nationwide — with verified, low-impact measurement right from your phone.",
  ledeSecondary:
    "Fishtechy Contests transforms how anglers compete, digitally or in person. Fishing solo, joining several teams at once, or running head-to-head events — the in-app camera paired with a Proof Product measures without over-handling fish.",
  leaderboard: {
    liveLabel: "Live",
    footnote: "Every entry measured with a Proof Product",
    /** Sample board, not live data — ordered by length so the ranking reads. */
    rows: [
      { name: "Ravi Patel", species: "Smallmouth Bass", length: "27.3 in", status: "Unverified" },
      { name: "Sofia Delgado", species: "Smallmouth Bass", length: "24.1 in", status: "Verified" },
      { name: "Dana Whitfield", species: "Smallmouth Bass", length: "21.4 in", status: "Verified" },
      { name: "Elias Montgomery", species: "Smallmouth Bass", length: "18.7 in", status: "Pending" },
    ],
  },
  formats: [
    { title: "One-on-one", body: "A private matchup against your friends." },
    {
      title: "Team event",
      body: "Team against team, head to head — and you can fish for more than one team at a time. Every verified catch rolls into your side of the board.",
    },
    {
      title: "Open tournament",
      body: "Public entry, a live leaderboard, and a scorekeeper who never has to touch a tape.",
    },
  ],
  scale: {
    body: "Run a weekend contest with friends, or manage a large-scale tournament with live leaderboards, verified catches, and scorekeeping that takes care of itself — from grassroots fly shop events to brand-backed series and national-level regulated tournaments.",
    label: "Scales from",
    steps: [
      { title: "Weekend, with friends", note: "Grassroots fly shop events" },
      { title: "Brand-backed", note: "Sponsored series and prize pools" },
      { title: "National, regulated", note: "Sanctioned tournament rules" },
    ],
  },
} as const;

export const CITIZEN_SCIENCE = {
  eyebrow: "Conservation",
  heading: ["Citizen", "science"],
  lede: "An option for Fishtechy users that empowers recreational anglers to collect non-invasive data on fish populations, measurements, and habitat conditions using a Proof Product — and share it with vetted science organizations working to preserve our aquatic ecosystems.",
  ledeSecondary:
    "Donation of Citizen Science data is always optional and can be reversed at any time. Angler identity and exact location of the catch is always removed from any catch data shared with science. Catch photos are blurred to just the fish, so no angler faces are ever included in shared catch data.",
  hero: {
    src: "/web/citizen-science-hero.png",
    alt: "A school of trout holding in clear shallow water over a gravel bed",
  },
  flow: {
    heading: ["From your hands", "to the fishery"],
    steps: [
      {
        eyebrow: "The angler",
        title: "Record the catch",
        body: "A Proof Product captures species, length, girth, and weight from one photo — minimal handling, straight to catch and release.",
      },
      {
        eyebrow: "The choice",
        title: "Opt in to donate",
        body: "Sharing is a deliberate switch, never a default. Turn it on for a season, a trip, or a single catch — and turn it off whenever you like.",
      },
      {
        eyebrow: "The science",
        title: "Reaches a vetted organization",
        body: "Anonymized records land with fisheries management bodies working to protect aquatic ecosystems — far more catch data than traditional surveys can reach.",
      },
    ],
  },
  privacy: {
    heading: "What never leaves your account",
    badge: "Opt-in only",
    guarantees: [
      {
        label: "Consent",
        body: "Catch data is never shared without your express consent, and that consent can be withdrawn at any time.",
      },
      {
        label: "Identity",
        body: "Your name and the specific catch location are never attached to the data that reaches science organizations.",
      },
      {
        label: "Visibility",
        body: "No other Fishtechy user sees your donated data. It goes to science organizations and nowhere else.",
      },
    ],
  },
  why: {
    eyebrow: "Why it matters",
    heading: "Turn anglers into citizen scientists and the whole fishery gets a better picture.",
    points: [
      {
        title: "Data accuracy",
        body: "Every record is measured against a reference object, not estimated by eye.",
      },
      {
        title: "Data volume",
        body: "Recreational anglers cover water and hours no survey crew ever could.",
      },
      {
        title: "Lower impact",
        body: "Fewer invasive surveys needed to reach the same picture of a fishery.",
      },
    ],
  },
  impact: {
    heading: "Long-term, it means healthier fish populations.",
    body: "A standing partnership between the people on the water and the people managing it — and a future where sustainable practice is the default, not the exception.",
    cta: { label: "Partner with Fishtechy", href: "/partner" },
  },
} as const;

/**
 * Buy destinations.
 *
 * `store` is the label sent to analytics as `content_category` and is held
 * apart from `name` on purpose: the design renames the Shopify destination to
 * "Fishtechy Store", and letting that rename reach analytics would split the
 * category's history at the release.
 */
export const RETAILERS = [
  {
    name: "Amazon",
    note: "Prime delivery · ships in 2 days",
    store: "Amazon",
    href: "https://a.co/d/048GePCP",
    logo: "/amazon.png",
  },
  {
    name: "Fishtechy Store",
    note: "Direct from us · checkout on site",
    store: "Shopify",
    href: "https://www.store.fishtechy.com/",
    logo: "/shopify.png",
  },
  {
    name: "Walmart",
    note: "Pickup or delivery near you",
    store: "Walmart",
    href: "https://www.walmart.com/ip/Proof-Ball-Powered-by-Fishtechy-Easy-accurate-fish-measurements/17651819988",
    logo: "/walmart.png",
  },
] as const;

export const BUY_NOW = {
  eyebrow: "Buy now",
  heading: ["Where", "to buy"],
  lede: "Proof Products ship from three retailers. Pick whichever you already have an account with — the product is identical.",
  localPrompt: {
    heading: "Prefer to buy locally?",
    body: "Proof Products are stocked at fly shops and outfitters nationwide.",
    link: { label: "Find a store", href: "/find-store" } satisfies Link,
  },
} as const;

export const SHOP = {
  eyebrow: "Shop",
  heading: ["Proof", "Products"],
  lede: "Every Proof Product is a reference point; position your catch next to a Proof Product, snap a photo or a video, and the free Fishtechy app calculates the length and weight of your catch.",
} as const;

export const PARTNER = {
  eyebrow: "Partner",
  heading: ["Part of the", "fishing world?"],
  lede: "From retailers and guides to industry pros, biologists, manufacturers, and government.",
  segments: [
    {
      slug: "retailer",
      title: "Retailers",
      body: "Stock Proof Products at wholesale, with tiered pricing from 45% to 55% off MSRP.",
    },
    {
      slug: "guide",
      title: "Guides & outfitters",
      body: "Give every client a verified measurement of the fish they came for.",
    },
    {
      slug: "institution",
      title: "Institutions",
      body: "Fisheries bodies, universities, and conservation groups working with angler-collected data.",
    },
  ],
  cta: { label: "Start an application", href: "/partner" } satisfies Link,
} as const;

export const CONTACT = {
  eyebrow: "Contact",
  heading: ["Have a question", "or a project", "in mind?"],
  lede: "Fishtechy would love to hear from you.",
  channels: [
    { label: "General", value: "hello@fishtechy.com", href: "mailto:hello@fishtechy.com" },
    { label: "Support", value: "support@fishtechy.com", href: "mailto:support@fishtechy.com" },
    { label: "Wholesale", value: "sales@fishtechy.com", href: "mailto:sales@fishtechy.com" },
  ],
} as const;

/**
 * Shop merchandising.
 *
 * The shop is laid out as an edited sequence rather than one flat catalog —
 * the arrangement bellussi.com/shop uses: the product LINES first, then a
 * short list of what most people actually buy, then the full grid, then a
 * piece of editorial. A visitor who knows what they want reaches the grid in
 * one scroll; a visitor who does not is walked through the range instead of
 * being handed nine SKUs and left to it.
 *
 * The two line tiles use in-use photography rather than packshots, because the
 * question they answer is "where would I use this", not "what does it look
 * like" — the grid below answers that.
 */
export const SHOP_LINES = {
  eyebrow: "The range",
  heading: ["Two lines,", "one measurement"],
  body: "Every Proof Product measures the same way. The formats differ in where they are practical to use — in your hand, or mounted to the boat.",
  lines: [
    {
      slug: "proof-ball",
      name: "Proof Ball",
      tagline: "Held beside the fish",
      body: "A reference sphere you hold in frame. Clips to a keyring, floats if you drop it, and is what most anglers start with.",
      image: {
        src: "/web/verified-catch-1.webp",
        alt: "A brown trout held streamside beside a Proof Ball, measured in the Fishtechy app at 17.8 inches",
      },
    },
    {
      slug: "proof-bar",
      name: "Proof Bar",
      tagline: "Mounted where you fish",
      body: "A fixed reference on a net handle, a cooler, a gunnel or a deck. Lay the fish alongside and shoot — nothing to hold.",
      image: {
        src: "/web/verified-catch-smallmouth-bass.webp",
        alt: "A smallmouth bass on a kayak deck beside a Proof Bar, measured in the Fishtechy app at 21.77 inches",
      },
    },
  ],
} as const;

/**
 * The short list, on the dark panel.
 *
 * Three SKUs by slug rather than by a "featured" flag in the catalog: the
 * catalog is the price list and should not carry merchandising decisions, and
 * these three are chosen to span the range — the one most people start with,
 * the one with the electronics, and the one that lives on a boat — not to be
 * the three best sellers, which is a number nobody here has.
 */
export const SHOP_FEATURED = {
  eyebrow: "Most chosen",
  heading: ["Where most", "anglers start"],
  slugs: [
    "proof-ball-orange-1-4",
    "proof-ball-pro-orange-1-4",
    "eva-foam-proof-bar-green-28",
  ],
} as const;

export const SHOP_EDITORIAL = {
  eyebrow: "Before your first cast",
  heading: ["Register it once,", "then forget it"],
  body: "Every Ball and Bar carries a unique code that ties it to your account. Scan the QR code in the box and it is done — measurements start landing in your journal from the next photo onwards.",
  image: {
    src: "/web/register-qr-hang-tag.png",
    alt: "Scanning the QR code on a Proof Product hang tag with the Fishtechy app",
  },
  cta: { label: "How registration works", href: "/how-it-works" } satisfies Link,
} as const;
