"use client";

import { useRef, useState, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * A horizontal track you can drag with the mouse.
 *
 * Built on NATIVE `overflow-x` rather than a transformed inner div, so a
 * trackpad's horizontal gesture, a shift-wheel, touch, and the keyboard all
 * work without a line of code. The pointer handlers only add the one input the
 * platform does not give you for free: dragging with a mouse.
 *
 * IT DOES NOT HIJACK THE VERTICAL WHEEL. Mapping wheel-Y onto scroll-X is the
 * usual way to build one of these and it is why those galleries feel broken —
 * the page stops scrolling whenever the pointer happens to cross them, and it
 * fights Lenis, which is already smoothing the vertical axis. Drag, trackpad
 * and the arrow keys are the ways across; the wheel keeps meaning "down".
 *
 * A DRAG MUST NOT FIRE A CLICK. The children are links, so without this a mouse
 * drag that ends over a card would navigate. Once travel passes `DRAG_SLOP` the
 * next click is swallowed in the capture phase, which is early enough to beat
 * the link's own handler.
 *
 * Scroll snapping is on the children (`snap-start`), not here, so a caller can
 * opt a child out of it.
 */
const DRAG_SLOP = 6;

export default function DragScroller({
  children,
  className,
  trackClassName,
  /** Renders a progress rule under the track. */
  indicator = true,
  label,
  /**
   * Drive the track from the PAGE's vertical scroll: the section holds still
   * while the row moves left, then releases to the section below once the last
   * card lands. Drag still works on top of it.
   */
  scrollDriven = false,
  /** Content that pins along with the track — a heading, links. */
  header,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  indicator?: boolean;
  /** Accessible name for the scrollable region. */
  label?: string;
  scrollDriven?: boolean;
  header?: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const sizer = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = track.current;
    if (!el) return;

    const readProgress = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max <= 0 ? 0 : el.scrollLeft / max);
    };
    readProgress();
    el.addEventListener("scroll", readProgress, { passive: true });

    // Mouse drag. Pointer capture keeps the gesture alive when the cursor
    // leaves the track mid-drag, which is most of what makes it feel solid.
    let startX = 0;
    let startLeft = 0;
    let active = false;
    let travelled = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      active = true;
      travelled = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      setDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      travelled = Math.max(travelled, Math.abs(dx));
      el.scrollLeft = startLeft - dx;
      // Past the slop this is a drag, not a click, so suppress text selection.
      if (travelled > DRAG_SLOP) e.preventDefault();
    };

    const endDrag = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      setDragging(false);
      if (el.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
    };

    const onClickCapture = (e: MouseEvent) => {
      if (travelled > DRAG_SLOP) {
        e.preventDefault();
        e.stopPropagation();
        travelled = 0;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);

    /**
     * Vertical scroll drives horizontal position.
     *
     * STICKY, NOT `ScrollTrigger.pin`. The pin re-parents the element into a
     * generated spacer, which fights Lenis and the negative-margin overlaps the
     * sections use. A tall sizer with a sticky child gets the same hold from the
     * browser's own compositor, and GSAP is left doing only the mapping.
     *
     * The sizer's height is the viewport PLUS the horizontal distance, so one
     * pixel of page scroll buys one pixel of travel and the section releases
     * exactly as the last card lands. It is measured rather than guessed, and
     * re-measured on refresh — card widths are in `vw`, so the distance changes
     * with the window.
     */
    let ctx: gsap.Context | null = null;
    if (scrollDriven && sizer.current) {
      const sizerEl = sizer.current;
      ctx = gsap.context(() => {
        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
        const proxy = { x: 0 };

        gsap.to(proxy, {
          x: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sizerEl,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: () => {
              sizerEl.style.height = `calc(100svh + ${distance()}px)`;
            },
            onUpdate: self => {
              el.scrollLeft = self.progress * distance();
            },
          },
        });
      }, sizerEl);
    }

    return () => {
      ctx?.revert();
      el.removeEventListener("scroll", readProgress);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const rail = (
    <>
      {header}
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          // `shrink-0` is load-bearing: inside the sticky flex column a
          // too-tall header would otherwise compress the track below the
          // cards' own height, and `overflow-hidden` on the frame then cut
          // their bottoms off. Measured at 567px of card in a 502px track.
          "no-scrollbar flex shrink-0 overflow-x-auto overscroll-x-contain",
          !scrollDriven && "snap-x snap-mandatory",
          dragging ? "cursor-grabbing select-none" : "cursor-grab",
          trackClassName,
        )}
      >
        {children}
      </div>

      {indicator ? (
        <div className="bg-line relative mt-8 h-px w-full" aria-hidden>
          <span
            className="bg-flare absolute inset-y-0 left-0 w-[22%] transition-transform duration-150 ease-out"
            style={{
              transform: `translateX(${progress * ((100 / 22) * 100 - 100)}%)`,
            }}
          />
        </div>
      ) : null}
    </>
  );

  if (!scrollDriven) return <div className={className}>{rail}</div>;

  return (
    <div ref={sizer} className={className}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {rail}
      </div>
    </div>
  );
}
