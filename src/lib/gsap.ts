"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One registration point for GSAP plugins.
 *
 * `gsap.registerPlugin` is idempotent, but importing ScrollTrigger from a dozen
 * component files means a dozen chances to forget the call — and a missing
 * registration fails as a silent no-op scroll trigger rather than a throw. Every
 * module that animates imports from here instead.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as Record<string, unknown>).gsap = gsap;
    (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
  }
}

export { gsap, ScrollTrigger };
