"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Holds the footer behind the page so the content slides off it.
 *
 * The footer does not move. It sits fixed at the foot of the viewport on a
 * lower layer, and the page — which is opaque and on a higher one — scrolls up
 * and uncovers it. Measured off the reference recording: between two frames a
 * quarter-second apart the footer's own rows sat at identical y positions while
 * the content above them travelled, and the footer's top row only appeared once
 * enough of the page had passed.
 *
 * THE PAGE NEEDS SOMEWHERE TO GO. A fixed footer is out of flow, so nothing
 * reserves space for it and the page would simply end over a covered footer.
 * The reserved space is a bottom margin on `<main>` exactly one footer tall,
 * which is the scroll distance during which the reveal happens.
 *
 * MEASURED, NOT GUESSED, and re-measured on resize: the footer's height changes
 * with the viewport as its link columns rewrap, and a stale number either
 * strands a gap under the page or clips the last rows off the footer.
 *
 * FALLS BACK WHEN THE FOOTER IS TALLER THAN THE VIEWPORT. A fixed element
 * cannot be scrolled, so on a short window the bottom of a tall footer would be
 * unreachable — legal links and all. In that case the effect is dropped and the
 * footer goes back to being an ordinary block at the end of the document, which
 * is worse-looking and entirely usable.
 */
export default function FooterReveal({
  children,
  main,
}: {
  children: ReactNode;
  /** The page content, which does the sliding. */
  main: ReactNode;
}) {
  const footer = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const f = footer.current;
    const m = mainRef.current;
    if (!f || !m) return;

    const sync = () => {
      const h = f.offsetHeight;
      const fits = h <= window.innerHeight;
      f.dataset.revealed = String(fits);
      // No reserved space when the effect is off, or the page would end on a
      // viewport of nothing.
      m.style.marginBottom = fits ? `${h}px` : "0px";
    };

    sync();
    // Observe BOTH the footer and the document element. Watching only the
    // footer misses the case that actually matters: the viewport shrinking
    // below the footer's height while the footer itself does not change size,
    // which left it fixed and its top rows stranded off-screen. The `resize`
    // event alone is not enough either — it does not fire for every way a
    // viewport can change.
    const ro = new ResizeObserver(sync);
    ro.observe(f);
    ro.observe(document.documentElement);
    window.addEventListener("resize", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      m.style.marginBottom = "";
    };
  }, []);

  return (
    <>
      {/* `bg-ink` is not decoration — it is what makes the page opaque, and an
          opaque page is the whole mechanism. Without it the footer shows
          through the content the entire way down. */}
      <main
        ref={mainRef}
        id="main"
        className="bg-ink relative z-10"
      >
        {main}
      </main>

      {/* `data-revealed="false"` returns it to the flow on short viewports; see
          the fallback note above. */}
      <div
        ref={footer}
        data-revealed="true"
        className="footer-reveal inset-x-0 bottom-0 z-0"
      >
        {children}
      </div>
    </>
  );
}
