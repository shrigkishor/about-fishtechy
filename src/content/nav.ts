import type { Link } from "./site";

/**
 * Navigation and footer maps.
 *
 * v2 shortens two routes the live site spells out: `/fishtechy-contests` and
 * `/fishtechy-citizen-science` become `/contests` and `/citizen-science`. The
 * brand is dropped from every label and heading on this site by request, and
 * carrying it in the URL alone was the last place it survived. The old paths
 * still need redirects at the edge before this replaces the live site.
 */

export const NAV_GROUPS: { title: string; links: Link[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Where to buy", href: "/buy-now" },
      { label: "Find a store", href: "/find-store" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Contests", href: "/contests" },
      { label: "Citizen science", href: "/citizen-science" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Partner with us", href: "/partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const FOOTER_COLUMNS: { title: string; links: Link[] }[] = [
  {
    title: "Product",
    links: [
      /* Anchors into the shop's line sections, not `/shop/proof-ball` — the
         detail route is keyed by SKU slug (`proof-ball-orange-1-4`), so the
         old links here resolved to `notFound()`. Verified: they returned 404. */
      { label: "Proof Ball", href: "/shop#proof-ball" },
      { label: "Proof Bar", href: "/shop#proof-bar" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Where to buy", href: "/buy-now" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Contests", href: "/contests" },
      { label: "Citizen science", href: "/citizen-science" },
      { label: "Find a store", href: "/find-store" },
      { label: "All products", href: "/shop" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Partner portal", href: "/partner" },
      { label: "Retailers", href: "/partner/retailer" },
      { label: "Guides", href: "/partner/guide" },
      { label: "Institutions", href: "/partner/institution" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-of-use" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const SOCIAL: Link[] = [
  { label: "Instagram", href: "https://www.instagram.com/fishtechy.usa/" },
  { label: "YouTube", href: "https://www.youtube.com/user/helpusave" },
  { label: "TikTok", href: "https://www.tiktok.com/@fishtechy" },
  { label: "Facebook", href: "https://www.facebook.com/fishtechy.official/" },
];

export const FOOTER_LEGAL = {
  copyright: `© ${new Date().getFullYear()} Fishtechy Inc.`,
  tagline: "Every catch, verified",
} as const;

export const STORE_BADGES = [
  {
    href: "https://apps.apple.com/us/app/fishtechy/id1590604911",
    src: "/appstore-badge.png",
    alt: "Download Fishtechy on the App Store",
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.fishtechy",
    src: "/googleplay-badge.png",
    alt: "Get Fishtechy on Google Play",
  },
] as const;
