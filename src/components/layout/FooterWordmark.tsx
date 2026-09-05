"use client";

import { useCallback, useRef } from "react";

/**
 * The oversized FISHTECHY footer wordmark.
 *
 * The effect is a torch that follows the cursor: letters near the pointer burn
 * orange and fall off to the base stroke colour within a couple of hundred
 * pixels, so only the part of the word you are pointing at lights up. It is NOT
 * a uniform hover glow — the letters light individually as the pointer crosses
 * them.
 *
 * Implemented as a radial gradient painted into the glyphs via
 * `background-clip: text`, with its centre driven by two custom properties the
 * pointer handler writes. That keeps the whole effect on the compositor: no
 * per-letter DOM, and no re-render on mouse move.
 *
 * WRITING THE PROPERTIES STRAIGHT ONTO THE NODE is deliberate — routing them
 * through React state would re-render this subtree sixty times a second for a
 * purely visual effect.
 *
 * Carried over from the current site's `FooterWordmark`, retuned to v2's
 * palette: the front's `action-primary`/`accent-light` are this site's `flare`
 * and `flare-soft`, and the cold end of the ramp is its neutrals.
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--torch-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--torch-y", `${e.clientY - r.top}px`);
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Park the torch far off the glyphs so the word settles back to grey.
    el.style.removeProperty("--torch-x");
    el.style.removeProperty("--torch-y");
  }, []);

  return (
    <div
      aria-hidden
      className="ft-watermark-wrap"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <p ref={ref} className="ft-watermark">
        FISHTECHY
      </p>
    </div>
  );
}
