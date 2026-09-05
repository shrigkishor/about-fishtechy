"use client";

import { useRef, type ComponentType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import type { PolymorphicProps } from "@/lib/polymorphic";

/**
 * A control that leans toward the pointer and springs back on leave.
 *
 * Movement is capped at `strength` px in each axis rather than tracking the
 * pointer one-to-one, so a fast sweep across the button does not fling it off
 * its own layout box.
 *
 * Pointer-type gated: on touch there is no hover to lean into, and binding
 * these handlers there only means a jump on the tap that precedes navigation.
 */
export default function MagneticButton({
  children,
  className,
  strength = 14,
  as = "button",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement> &
  Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const dx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const dy = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
    gsap.to(el, {
      x: gsap.utils.clamp(-strength, strength, dx * strength),
      y: gsap.utils.clamp(-strength, strength, dy * strength),
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const reset = () => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    }
  };

  const Tag = as as ComponentType<PolymorphicProps>;

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      className={cn("will-change-transform", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
