import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Fishtechy logo lockup.
 *
 * Two artwork files, not one recoloured file. The brand kit ships the wordmark
 * in white (`logo.svg`) and in near-black (`logo-dark-text.svg`), and both keep
 * the fish mark in brand blue `#144D81`. A CSS filter cannot get from one to
 * the other without also mangling the blue, so the variant is a file swap.
 *
 * `tone` names the GROUND the logo sits on, not the ink:
 *   dark   → the ink and charcoal sections, white wordmark
 *   light  → the full-bleed orange panels, near-black wordmark
 *
 * The lockup is 247×55, so `height` drives the box and the width follows the
 * ratio. Passing both explicitly (rather than `width: auto`) is what keeps
 * next/image from reserving the wrong space before the SVG loads.
 */
const RATIO = 247 / 55;

export default function Logo({
  tone = "dark",
  height = 30,
  className,
  priority,
}: {
  tone?: "dark" | "light";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? "/logo-dark-text.svg" : "/logo.svg"}
      alt="Fishtechy"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("w-auto", className)}
      style={{ height }}
    />
  );
}

/**
 * The square mark on its own — the fish over its dark plate, 48×48.
 *
 * Used where the full lockup would not read: the preloader, and anywhere the
 * available box is closer to square than to the lockup's 4.5:1.
 */
export function LogoMark({
  size = 44,
  className,
  priority,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/fishtechy-icon.svg"
      alt="Fishtechy"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-xl", className)}
    />
  );
}
