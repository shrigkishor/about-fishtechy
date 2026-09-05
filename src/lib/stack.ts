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
 */
export const STACK_SIZER = "relative h-[170svh]";

export const STACK_FRAME =
  "sticky top-0 flex h-svh flex-col justify-center overflow-hidden";
