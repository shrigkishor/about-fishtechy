"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { STACK_FRAME, STACK_SIZER } from "@/lib/stack";

/**
 * Numbered rows — the reference's service list, and the shape it uses whenever
 * a section is "here are N things".
 *
 * A row is a 01–0N ordinal, a title, and a body, split into two columns from
 * `lg` and stacked below it. Hovering lights the ordinal in brand orange and
 * runs a hairline bar out along the row's leading edge.
 *
 * THE HOVER IS DRIVEN IN JS RATHER THAN CSS because the ordinal and the bar sit
 * in different stacking contexts and need to move together on one eased curve;
 * two CSS transitions on separate elements drift apart at the durations this
 * uses. `gsap.matchMedia` scopes it to pointer devices — on touch there is no
 * hover, and binding it there leaves a row stuck lit after a tap.
 */
export default function NumberedList({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string;
  heading: readonly string[];
  items: readonly { title: string; body: string }[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (pointer: fine)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
        const cleanups = rows.map(row => {
          const ordinal = row.querySelector("[data-ordinal]");
          const bar = row.querySelector("[data-bar]");

          const enter = () => {
            gsap.to(ordinal, {
              color: "var(--color-flare)",
              duration: 0.35,
              ease: "power2.out",
            });
            gsap.to(bar, { scaleY: 1, duration: 0.5, ease: "expo.out" });
          };
          const leave = () => {
            gsap.to(ordinal, {
              color: "var(--color-ash-faint)",
              duration: 0.45,
              ease: "power2.out",
            });
            gsap.to(bar, { scaleY: 0, duration: 0.4, ease: "power2.in" });
          };

          row.addEventListener("pointerenter", enter);
          row.addEventListener("pointerleave", leave);
          return () => {
            row.removeEventListener("pointerenter", enter);
            row.removeEventListener("pointerleave", leave);
          };
        });

        return () => cleanups.forEach(fn => fn());
      });

      // Each row also drifts at its own rate, alternating direction, so the
      // list separates into layers as it passes rather than travelling as one
      // slab. The amounts are small — this should read as depth, not as rows
      // coming loose from each other.
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: i % 2 === 0 ? 18 : -18 },
          {
            y: i % 2 === 0 ? -18 : 18,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Rows rise in sequence as the list scrolls past.
      gsap.fromTo(
        "[data-row]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className={STACK_SIZER}>
      <div className={`bg-slab slab slab-seam gutter ${STACK_FRAME}`}>
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        <div ref={root} className="mt-6">
          <ul className="list-none">
            {items.map((item, i) => (
              <li
                key={item.title}
                data-row=""
                className="relative flex flex-col gap-2 border-b border-[color:var(--color-line-soft)] py-4 opacity-0 last:border-b-0 lg:flex-row lg:gap-8 lg:px-4 lg:py-3.5"
              >
                <span
                  aria-hidden
                  data-bar=""
                  className="bg-flare absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0"
                />

                <div className="flex items-baseline gap-5 lg:w-[38%] lg:shrink-0 lg:gap-10">
                  <span
                    aria-hidden
                    data-ordinal=""
                    className="t-num text-ash-faint shrink-0 text-[clamp(1.5rem,3vw,2.5rem)] leading-none font-light"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-heading text-chalk text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.15]">
                    {item.title}
                  </h3>
                </div>

                <p className="t-body text-ash-dim text-[0.875rem] lg:flex-1">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
