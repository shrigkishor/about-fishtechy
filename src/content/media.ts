/**
 * Video sources.
 *
 * THIS MUST NOT LIVE IN A `"use client"` MODULE. It used to sit in
 * `HeroVideo.tsx`, and every Server Component that imported it — the products
 * and How It Works pages — silently received `undefined` for every key.
 *
 * The reason is a Server Components rule rather than a bug: when a Server
 * Component imports from a `"use client"` module, the bundler substitutes a
 * client *reference* for the module. Component exports survive that, because a
 * reference is exactly what the server needs to emit for them. Plain values do
 * not — reading a property off the reference gives `undefined`, with no error
 * and no warning. The page then fell through to the default source and quietly
 * rendered the wrong film.
 *
 * A plain module has no such boundary and can be read from either side.
 */
export const REEL = {
  /**
   * ICAST 2026 — a brown trout measured against a Proof Ball, with the app's
   * length/girth/weight readout burned in. 1920x1080, ~84MB, so it is served
   * from the media CDN rather than bundled.
   *
   * v2 sets no Content-Security-Policy, so this origin needs no `media-src`
   * entry; if a CSP is added later it has to be allowed there or
   * `default-src 'self'` will block it.
   */
  catchReel: "https://file-dev.flytechy.com/public/uploads/ICAST+2026_2.mp4",

  /**
   * An angler measures a fish and releases it — the AI mesh, the readout, a
   * Proof Ball in hand, then the fish back in the water. 1280x720, 6.4s, and
   * under a megabyte, so it is checked in rather than fetched.
   *
   * CURRENTLY UNUSED. It headed How It Works until the reel was pulled back to
   * the home page alone. Kept because it is the only clip that shows the whole
   * method end to end, and the file is already in `public/videos`; delete it
   * along with the asset if that page is never going to carry motion.
   */
  measureRelease: "/videos/v2web_vdo.mp4",
} as const;
