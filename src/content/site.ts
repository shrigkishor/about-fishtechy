/**
 * Copy for the v2 web surface.
 *
 * Transcribed from `fishtechy-front/src/components/web/content.ts` so the
 * redesign argues with the same words the live site does. Where a string
 * changed it is because the v2 layout asks for a different shape — headlines
 * are arrays here, one entry per rendered line, because `LineReveal` masks and
 * staggers each line separately and the copy decides where it breaks rather
 * than the measured wrap.
 *
 * Copy rules carried over from the original handoff — banned: "AI-powered",
 * "Submit", "Add to cart", "Camp" (user-facing), "SMART Log".
 */

export type Link = { label: string; href: string };

export const SITE = {
  name: "Fishtechy",
  tagline: "Every catch, verified",
  description:
    "Proof Products turn any catch into a verified measurement. Measure, log, compete, and contribute from one free account.",
} as const;

export const HERO = {
  eyebrow: "Every catch, verified",
  /** One array entry per masked line. Two lines, not three: the headline is
   *  centred in its own band now, and a two-line block is what holds that
   *  shape — three stacked lines start reading as a column. */
  headline: ["Measure fish", "from your phone"],
  lede: "A Proof Product is a reference of known size. Put one in frame and the free app returns length, girth, weight and surface area in seconds.",
  ticker: { unit: "Fish measured", status: "Live", count: 128_400 },
  primaryCta: { label: "Shop Proof Products", href: "/shop" },
  secondaryCta: { label: "See how it works", href: "/how-it-works" },
} as const;

/** The capability ticker under the hero — the reference's discipline row. */
export const CAPABILITIES = [
  "Measurement",
  "Species ID",
  "Maps & Journal",
  "Contests",
  "Citizen Science",
  "Story Mode",
  "Catch Feed",
] as const;

export const MANIFESTO = "Every catch, verified — from your hand to the fishery";

export const FIVE_THINGS = {
  eyebrow: "What it unlocks",
  heading: ["What do", "Proof Products do?"],
  items: [
    {
      title: "Measure fish from your smartphone",
      body: "Place a Proof Product next to your fish in a photo or video and upload it to the FREE Fishtechy app. AI measures your catch and creates a private digital journal and map, replacing a traditional fish measuring board.",
    },
    {
      title: "Reduced fish handling time",
      body: "Proof Products reduce handling time during catch and release, letting you measure your fish and return it to the water faster. A practical addition to fishing accessories, fly fishing accessories, and bass fishing gear.",
    },
    {
      title: "Online tournaments",
      body: "Create or join online fishing tournaments using your real-life catches. Compete privately with friends or publicly with anglers worldwide, making it a useful fishing tool for fishing, fly fishing, and bass fishing.",
    },
    {
      title: "Fish for science",
      body: "Fishtechy users support conservation with every catch. Each app user has the option to donate their catch data, fully anonymously and without precise location, to vetted fisheries science organizations like NOAA to help them better protect their favorite fisheries.",
    },
    {
      title: "Automatic species identification",
      body: "The FREE Fishtechy app uses AI to identify your fish species and generate a private digital journal and map of your catches, making the Proof Products a smart addition to your fishing gear and fishing tool kit.",
    },
  ],
} as const;

export const LINEUP = {
  eyebrow: "Proof Products",
  heading: ["The Proof", "Product lineup"],
  body: "Every Proof Product is a reference point; position your catch next to a Proof Product, snap a photo or a video, and the free Fishtechy app calculates the length and weight of your catch.",
  links: [
    { label: "Learn more", href: "/how-it-works" },
    { label: "Buy", href: "/buy-now" },
  ] satisfies Link[],
} as const;

export const APP_FEATURES = {
  eyebrow: "Fishtechy app",
  heading: ["Everything", "the app does"],
  body: "Measure, log, compete, contribute, and register your gear — all from one free account on your phone.",
  viewMore: { label: "View more", href: "/how-it-works" },
  items: [
    {
      eyebrow: "AI Measurement",
      title: "Point, shoot, verified.",
      body: "Length, girth, and weight from a single photo, read against a Proof Product in frame. Seconds of handling, a number you can stand behind.",
      image: "/web/app-ai-measurement.webp",
      href: "/how-it-works",
    },
    {
      eyebrow: "Social Feed",
      title: "Show off your catches.",
      body: "A feed of verified catches from the anglers and guides you follow. React, comment, and share a fish with the numbers attached.",
      image: "/web/app-social-feed.webp",
      href: "/how-it-works",
    },
    {
      eyebrow: "Story Mode",
      title: "The trip, told in order.",
      body: "Every catch from a session strung into one scrollable story — conditions, locations, and fish in the order they happened.",
      image: "/web/app-story-mode.webp",
      href: "/how-it-works",
    },
    {
      eyebrow: "Digital Journal",
      title: "Your journal writes itself.",
      body: "Every measured fish lands in your private log with the size, map pin, weather, water, and time already filled in.",
      image: "/web/app-digital-journal.webp",
      href: "/how-it-works",
    },
    {
      eyebrow: "Contests",
      title: "Compete on verified numbers.",
      body: "Private matchups against friends, team events, and full tournaments — scored on measurements the app verified, with live leaderboards.",
      image: "/web/app-contests.webp",
      href: "/contests",
    },
    {
      eyebrow: "Citizen Science",
      title: "Your catch data can support conservation.",
      body: "Opt in and your measurements reach vetted science partners as anonymized records — more catch data in front of fisheries than has ever been available.",
      image: "/web/app-citizen-science.webp",
      href: "/citizen-science",
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  eyebrow: "Measurement",
  heading: ["Measure fish from", "your smartphone"],
  lede: "Fishtechy offers advanced fish measurement features using Proof Products. Length, girth, weight, and surface area in seconds — with minimal handling, prioritizing the well-being of the fish.",
  ledeSecondary:
    "Register your Proof Product once, then measure with either the Proof Ball or the Proof Bar. The steps for each are below.",
  threeSteps: {
    eyebrow: "How it works",
    heading: ["Three steps", "to a verified", "measurement"],
    steps: [
      {
        title: "Add a Proof Product",
        body: "Hold a Proof Ball beside the fish, or mount a Proof Bar to a net, cooler or deck.",
      },
      {
        title: "Take a photo or video",
        body: "Upload it in the free Fishtechy app and AI does the rest.",
      },
      {
        title: "Get verified numbers",
        body: "Length, girth, weight and FSA in seconds. Tournament-ready.",
      },
    ],
    showcase: [
      {
        src: "/web/verified-catch-1.webp",
        alt: "A brown trout held streamside beside a Proof Ball, measured in the Fishtechy app — 17.8 inch length, 9.3 inch girth, 33.79 square inch FSA, an estimated 2.1 pounds",
      },
      {
        src: "/web/verified-catch-smallmouth-bass.webp",
        alt: "A smallmouth bass on a kayak deck beside a Proof Bar, measured in the Fishtechy app — 21.77 inch length, 12.93 inch girth, 64.55 square inch FSA, an estimated 4.55 pounds",
      },
    ],
    closing: {
      heading: "Reduce fish handling.",
      body: "Less time out of the water — better for the fish, and for the fishery.",
    },
  },
  register: {
    eyebrow: "Every Proof Product",
    heading: "Register your product",
    body: [
      "Register your Proof Product in the app before your first measurement. Each Ball and Bar has a unique code that links it to your account.",
      "A QR code ships in the package with your product. Scan it from the app to register.",
    ],
    image: {
      src: "/web/register-qr-hang-tag.png",
      alt: "Scanning the QR code on a Proof Product hang tag with the Fishtechy app",
    },
  },
  usage: {
    heading: "How to use Proof Products",
    tabs: [
      {
        id: "ball",
        label: "Proof Ball",
        steps: [
          {
            title: "Hang the ball off your finger",
            body: "Hold your catch and hang the ball off your finger — the ball must be on the same plane as the fish.",
          },
          {
            title: "Square up the camera",
            body: "Hold the camera square to the fish, less than 6 feet away, with the fish and ball fully in frame.",
          },
          {
            title: "Snap the photo or video",
            body: "The app measures length, girth, weight, and surface area instantly.",
          },
        ],
      },
      {
        id: "bar",
        label: "Proof Bar",
        steps: [
          {
            title: "Mount the bar",
            body: "Mount your Proof Bar on a net handle, rod, cooler, or deck.",
          },
          {
            title: "Lay the fish alongside",
            body: "Bar and fish on the same plane.",
          },
          {
            title: "Snap a photo or video",
            body: "The free Fishtechy app uses your Proof Bar to calculate the length and weight of your catch.",
          },
        ],
      },
    ],
  },
  cta: { label: "Shop Proof Products", href: "/shop" },
} as const;

export const FAQ = {
  eyebrow: "FAQ",
  heading: ["Frequently asked", "questions"],
  stillStuck: "Still stuck?",
  contact: { label: "Contact our team", href: "/contact" },
  items: [
    {
      q: "Which Proof Product should I buy?",
      a: "All Proof Products measure fish from your smartphone, but each Proof Product has a different application. The Proof Ball is meant to be held next to fish in hero shots — it also clips to a keyring, floats, and is what most anglers start with. The Proof Ball Pro adds Bluetooth pairing, live water and air temperature with every catch, and LED tournament verification. The Temp Proof Bar mini is made to mount to net handles, while Vinyl Proof Bars are made to mount to coolers, gunnel or boats. The EVA foam Proof Bar is a permanent boat deck measuring station.",
    },
    {
      q: "Is the Proof Ball less accurate than the Bar or the Pro?",
      a: "No. Every Proof Product is a reference object of known size, and the app measures against it the same way. The formats differ in where they are practical to use, not in how they measure. The Pro adds Bluetooth pairing, temperature logging and LED tournament verification on top.",
    },
    {
      q: "Do I need the app? Does it cost anything?",
      a: "Yes, the app does the measuring, and it is free. One account covers measuring, your Maps and Journal, contests, and citizen science.",
    },
    {
      q: "Do I need more than one Proof Product?",
      a: "One Proof Product is enough to measure every catch. Anglers add a second format when they fish more than one way — a Ball in the pack for walk and wades and a Bar on the kayak, for example.",
    },
    {
      q: "How do I register my Proof Products?",
      a: "Registering pairs your Proof Product's unique code to your account. Do it once, before your first measurement — scan the QR code that ships in the box, or use photo registration.",
    },
    {
      q: "Can I buy one locally instead of ordering?",
      a: "Yes. Find a Store lists the retailers near you that carry Proof Products.",
    },
  ],
} as const;
