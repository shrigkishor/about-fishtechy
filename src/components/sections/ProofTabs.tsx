"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Tab = {
  id: string;
  label: string;
  steps: readonly { title: string; body: string }[];
};

/**
 * Per-product usage steps, one tab per Proof Product format.
 *
 * Both panels are rendered and the inactive one is hidden with `hidden` rather
 * than unmounted, so switching costs no layout pass and the steps are all in
 * the document for a crawler. `role="tabpanel"` + `aria-labelledby` wire each
 * panel to its own tab.
 *
 * The tabs are the same component on the home page and on How It Works, and the
 * steps come from one place in content — two copies of "how to use a Proof
 * Ball" is exactly how the two pages start disagreeing.
 */
export default function ProofTabs({ tabs }: { tabs: readonly Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Proof Product"
        className="border-line inline-flex gap-1 rounded-full border p-1"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "t-micro rounded-full px-5 py-2.5 transition-colors duration-300",
              active === tab.id
                ? "bg-flare text-ink"
                : "text-ash-dim hover:text-chalk"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map(tab => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== tab.id}
          className="mt-10"
        >
          <ol className="grid list-none gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] md:grid-cols-3">
            {tab.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                y={22}
                delay={i * 0.07}
                className="bg-ink flex flex-col gap-3 p-7 lg:p-9"
              >
                <span className="t-num text-flare text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="t-sub text-chalk">{step.title}</h4>
                <p className="t-body text-ash-dim text-[0.9375rem]">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
