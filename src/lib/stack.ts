/**
 * Classes for a section that holds a screen and is then covered by the next.
 *
 * TWO PARTS, AND THE SIZER IS THE POINT. A section that is simply
 * `sticky top-0 h-svh` pins for no distance at all: the moment its top reaches
 * zero its bottom is already at the fold, so the next section begins covering
 * it immediately. Reveals inside it have delays up to 0.65s and run for a
 * second — at any normal scroll speed the section is half-covered before its
 * own copy has finished arriving, which is exactly the "content gets missed"
 * complaint.
 *
 * So the section becomes a SIZER taller than the viewport, holding a sticky
 * FRAME one screen tall. The difference between them is dwell: how long the
 * section stays put, fully readable, before the next one climbs over it. At
 * 170svh that is 70svh of scroll — enough to read a section at speed without
 * making the page feel like it has stopped.
 *
 * The frame carries the ground and the lip, not the sizer: the sizer is
 * invisible scaffolding, and a rounded corner on it would sit at the seam
 * between sections rather than on the thing you actually see.
 *
 * THE WHOLE MECHANISM IS DESKTOP-ONLY, AND THAT IS THE `lg:` PREFIXES BELOW.
 * A frame that is exactly one screen tall AND `overflow-hidden` is a promise
 * that the section fits on a screen. Above `lg` these sections go two-column
 * and they do. Below it they collapse to one column and grow — measured at
 * 360x640, the numbered list ran to 1227px of content in a 640px frame and the
 * FAQ to 1208px. `justify-center` splits that overflow across BOTH ends, so
 * each was losing ~290px off the top and ~290px off the bottom with no way to
 * reach any of it: the frame is pinned, so there is nothing to scroll. Roughly
 * half of each section was simply unreachable on a phone.
 *
 * `scrollHeight` does not report this — it only ever measures overflow past the
 * bottom edge, and centred content overflows past the top as well. Measure a
 * frame's children against its own rect, not its scroll box, or the top half of
 * the problem is invisible.
 *
 * So below `lg` the sizer stops forcing a height, the frame stops pinning, and
 * the section becomes an ordinary block that is at least a screen tall and
 * grows past that when its content needs the room. `min-h-svh` with
 * `justify-center` keeps the one-section-per-screen feel for the short panels
 * that still fit; the tall ones simply get longer, which is what a phone is
 * for. Landscape phones (844x390) are the case that makes this unavoidable —
 * they are below `lg` and barely 390px tall, so nothing fits.
 */
export const STACK_SIZER = "relative lg:h-[170svh]";

export const STACK_FRAME =
  "relative flex min-h-svh flex-col justify-center overflow-hidden " +
  "lg:sticky lg:top-0 lg:h-svh";

/**
 * Vertical breathing room for a stacked section on phones.
 *
 * The pinned frame needs none — `justify-center` in a full-screen box is its
 * own padding. Once the frame is an ordinary block whose height comes from its
 * content, that padding has to be real or the copy runs into the seam with the
 * section above it.
 *
 * NOT PART OF `STACK_FRAME`, because `ManifestoPanel` must not have it: its two
 * marquees are meant to hug the top and bottom edges of the orange panel, and
 * 5rem of padding would inset them into the middle of it.
 */
export const STACK_PAD = "py-20 lg:py-0";
