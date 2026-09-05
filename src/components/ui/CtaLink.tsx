"use client";

import Link from "next/link";
import MagneticButton from "@/components/motion/MagneticButton";
import { cn } from "@/lib/cn";

/**
 * The page's primary control: a pill that leans toward the pointer.
 *
 * `solid` is the brand vermilion and carries the one action a section actually
 * wants; `ghost` is the alternative beside it, and it is BLUE — the logo's
 * secondary, which is exactly the job a secondary button does.
 *
 * Ghost uses `brand-blue-lit` rather than the logo's own `#0f4d86`, because
 * this base state sits on ink where the logo value is 2.29:1. Callers on the
 * light and vermilion panels override both colours inline; see `ShopHero` and
 * `ClosingCta`.
 * Two variants and no more — the reference never puts three competing weights
 * of button in one view, and the restraint is most of why its CTAs read.
 */
export default function CtaLink({
  href,
  children,
  variant = "solid",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "t-micro inline-flex items-center gap-3 rounded-full px-7 py-4 transition-colors duration-300",
    variant === "solid"
      ? "bg-flare text-ink hover:bg-flare-soft"
      : "border border-[color:var(--color-brand-blue-lit)]/45 text-brand-blue-lit hover:border-brand-blue-lit hover:text-chalk",
    className
  );

  const content = (
    <>
      {children}
      <span aria-hidden className="text-[1.1em] leading-none">
        →
      </span>
    </>
  );

  if (external) {
    return (
      <MagneticButton
        as="a"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {content}
      </MagneticButton>
    );
  }

  return (
    <MagneticButton as={Link} href={href} className={classes}>
      {content}
    </MagneticButton>
  );
}
