import Image from "next/image";
import { STORE_BADGES } from "@/content/nav";
import { cn } from "@/lib/cn";

/**
 * App Store and Google Play download badges.
 *
 * Shared rather than inlined, because the hero and the footer both carry them
 * and the store artwork has usage rules — badges must not be redrawn, recoloured
 * or set at odd proportions — so there should be exactly one place that decides
 * how they are sized.
 *
 * INTRINSIC DIMENSIONS ARE THE ASSETS' OWN: 900x260 and 892x260, a hair under
 * 3.46:1. The footer previously declared 160x48 (3.33:1), which is not either
 * badge's shape — `h-11 w-auto` meant it still LOOKED right, because the real
 * ratio governs the rendered box, but Next reserved the wrong space for it and
 * the layout shifted a few pixels as they loaded.
 *
 * Height-driven sizing, so the two sit on one baseline despite being eight
 * pixels different in width.
 */
export default function StoreBadges({
  className,
  height = 44,
}: {
  className?: string;
  /** Rendered height in px; widths follow each badge's own ratio. */
  height?: number;
}) {
  return (
    <ul className={cn("flex list-none flex-wrap items-center gap-3", className)}>
      {STORE_BADGES.map(badge => (
        <li key={badge.href}>
          <a
            href={badge.href}
            target="_blank"
            rel="noreferrer noopener"
            className="block transition-opacity duration-300 hover:opacity-75"
          >
            <Image
              src={badge.src}
              alt={badge.alt}
              width={900}
              height={260}
              style={{ height }}
              className="w-auto"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
