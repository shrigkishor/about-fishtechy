import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` on the client, `useEffect` on the server.
 *
 * GSAP wants a layout effect so the first painted frame is already the resting
 * state, but React warns about `useLayoutEffect` during SSR. This is the
 * standard swap; it is in its own module because five animation components need
 * it and a copy in each is five places to get the guard wrong.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
