/**
 * Video sources.
 *
 * THIS MUST NOT LIVE IN A `"use client"` MODULE. It used to sit in
 * `HeroVideo.tsx`, and every Server Component that imported it silently
 * received `undefined` for every key: when a Server Component imports from a
 * client module the bundler substitutes a client *reference*, and reading a
 * property off that gives `undefined` with no error and no warning. Component
 * exports survive it; plain values do not.
 */

/**
 * The hero reel.
 *
 * READ FROM THE ENVIRONMENT, and deliberately WITHOUT a hardcoded fallback.
 * The URL used to be a literal here, which published an internal media host in
 * a public repository — one that can be locked down, renamed or cleaned up at
 * any time, silently taking the homepage hero with it. A fallback to that
 * literal would keep it in the source and defeat the point of moving it, and so
 * would naming the host in this comment.
 *
 * `NEXT_PUBLIC_` because `HeroVideo` is a client component: the value has to
 * reach the browser, and Next inlines these at BUILD time. A deployment that
 * forgets it does not fail at runtime — it ships a build with an empty string,
 * so set it wherever the build runs, not just where it serves.
 *
 * Unset is a supported state, not a crash: `HeroVideo` renders nothing and the
 * hero keeps its own ground. The headline, the ticker and the buttons never
 * depended on the footage being there.
 */
export const REEL = {
  /**
   * ICAST 2026 — a brown trout measured against a Proof Ball, with the app's
   * length/girth/weight readout burned in. 1920x1080, ~84MB, so it is served
   * from a media CDN rather than bundled.
   *
   * If a Content-Security-Policy is ever added, whichever origin this points at
   * has to be allowed in `media-src` or `default-src 'self'` will block it.
   */
  catchReel: process.env.NEXT_PUBLIC_HERO_REEL_URL ?? "",

  /**
   * An angler measures a fish and releases it — the AI mesh, the readout, a
   * Proof Ball in hand, then the fish back in the water. 1280x720, 6.4s.
   *
   * Not an environment variable: it is a local file under `public/`, so it ships
   * with the build and has no host to depend on.
   *
   * CURRENTLY UNUSED. It headed How It Works until the reel was pulled back to
   * the home page alone.
   */
  measureRelease: "/videos/v2web_vdo.mp4",
} as const;
