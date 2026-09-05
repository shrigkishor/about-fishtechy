"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { FAQ } from "@/content/site";
import { cn } from "@/lib/cn";
import { STACK_FRAME, STACK_SIZER } from "@/lib/stack";

/**
 * The FAQ, as a single-open accordion.
 *
 * Built on native `<button>` + `aria-expanded` rather than `<details>`: the
 * open panel animates its height, and `<details>` cannot be transitioned open
 * in a way that works across browsers without fighting its own toggle.
 *
 * The answer panel uses a grid-rows 0fr→1fr transition, which is the one
 * technique that animates to a CONTENT-DERIVED height without measuring it in
 * JS — no `scrollHeight` read, so no reflow on every open and nothing to
 * recompute when the viewport width changes the answer's wrap.
 */
export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={STACK_SIZER}>
      <div className={`bg-ink gutter ${STACK_FRAME}`}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow={FAQ.eyebrow} heading={FAQ.heading} />
            <Reveal y={18} delay={0.15} className="mt-8">
              <p className="t-body text-ash-dim">
                {FAQ.stillStuck}{" "}
                <Link
                  href={FAQ.contact.href}
                  className="text-brand-blue-lit link-underline"
                >
                  {FAQ.contact.label} →
                </Link>
              </p>
            </Reveal>
          </div>

          <ul className="list-none">
            {FAQ.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal
                  as="li"
                  key={item.q}
                  y={20}
                  delay={i * 0.05}
                  className="border-b border-[color:var(--color-line-soft)] first:border-t"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "t-sub transition-colors duration-300",
                          isOpen
                            ? "text-flare"
                            : "text-chalk group-hover:text-ash",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "border-line mt-1 grid size-7 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                          isOpen && "border-flare rotate-45",
                        )}
                      >
                        <span className="relative block size-3">
                          <span
                            className={cn(
                              "absolute top-1/2 left-0 h-px w-full -translate-y-1/2",
                              isOpen ? "bg-flare" : "bg-ash",
                            )}
                          />
                          <span
                            className={cn(
                              "absolute top-0 left-1/2 h-full w-px -translate-x-1/2",
                              isOpen ? "bg-flare" : "bg-ash",
                            )}
                          />
                        </span>
                      </span>
                    </button>
                  </h3>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="t-body text-ash-dim max-w-[68ch] pr-10 pb-7">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
