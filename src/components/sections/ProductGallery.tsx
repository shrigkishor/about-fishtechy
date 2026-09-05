"use client";

import { useState } from "react";
import Image from "next/image";
import type { CatalogImage } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/**
 * The PDP's picture stack: one large frame with thumbnails beneath it.
 *
 * All frames stay mounted and the inactive ones are hidden with `opacity` on a
 * stacked grid cell rather than swapped in and out — that is what lets the
 * change cross-fade, and it means every image is fetched once rather than on
 * each click.
 *
 * The thumbnail row is a listbox rather than tabs: this selects which of a set
 * of pictures is shown, it does not switch between panels of different content.
 */
export default function ProductGallery({
  images,
  name,
}: {
  images: CatalogImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slab relative grid aspect-square overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)]">
        {images.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      {images.length > 1 ? (
        <ul
          role="listbox"
          aria-label={`${name} images`}
          className="grid list-none grid-cols-4 gap-3"
        >
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                aria-label={image.alt}
                onClick={() => setActive(i)}
                className={cn(
                  "bg-slab relative block aspect-square w-full overflow-hidden rounded-xl border transition-colors duration-300",
                  i === active
                    ? "border-flare"
                    : "border-[color:var(--color-line-soft)] hover:border-[color:var(--color-line)]"
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="12vw"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
