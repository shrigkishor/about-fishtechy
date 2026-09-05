"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Logo from "@/components/ui/Logo";
import { NAV_GROUPS, SOCIAL } from "@/content/nav";
import { cn } from "@/lib/cn";

/**
 * Logo left, one circular button right, and a full-screen overlay behind it —
 * the reference's entire navigation, and the reason its pages read as
 * uninterrupted scroll surfaces.
 *
 * GROUND DETECTION, NOT `mix-blend-difference`. The header used to sit in
 * difference blend mode so one set of colours would read over both the ink
 * ground and the full-bleed orange panels. That works for pure greys and fails
 * for everything else: white differenced against the brand orange resolves to
 * `rgb(0,89,191)`, a mid blue — so the wordmark turned blue over exactly the
 * two panels the trick existed to handle, and the brand-blue fish mark in the
 * logo would have inverted to orange beside it.
 *
 * Instead every light-ground section carries `data-ground="light"`, and a
 * ScrollTrigger per section reports whether one is currently under the header
 * band. The header then picks real colours and the real logo artwork. Counting
 * active sections rather than storing a boolean keeps the two adjacent panels
 * on a page from cancelling each other out as one leaves while the next enters.
 *
 * THE OVERLAY IS ALWAYS IN THE DOM, hidden with `visibility` rather than
 * unmounted. GSAP cannot animate an element that does not exist yet, and
 * mounting on open means the first frame of the open animation is also the
 * first paint of its contents, which stutters the link stagger. `inert` keeps
 * the hidden overlay out of the tab order and away from screen readers.
 *
 * The header hides on scroll down and returns on scroll up, so the button is
 * never in the way of a section but is never more than a flick away.
 */
export default function Nav() {
  /**
   * The menu is open when it was opened AT the current route.
   *
   * Storing the pathname rather than a boolean is what closes the overlay on
   * navigation without an effect: once `pathname` changes, `openedAt` no longer
   * matches and `open` is false on the very next render. The previous version
   * called `setOpen(false)` from an effect keyed on `pathname`, which lands a
   * second render after every navigation — and leaves the overlay up over the
   * new page for that frame.
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [onLightGround, setOnLightGround] = useState(false);
  const pathname = usePathname();
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);
  const overlay = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // While the overlay is up it is its own dark ground, whatever is behind it.
  const onLight = onLightGround && !open;

  // Light-ground sections differ per page, so the triggers are rebuilt on
  // navigation. The set is rebuilt with them, or a panel left behind on the
  // previous page would keep the header inverted on the next one.
  useIsomorphicLayoutEffect(() => {
    /**
     * The set of light sections currently under the header.
     *
     * A SET, not a counter. `ScrollTrigger.refresh()` — which fires on every
     * resize, and on the preloader's way out — re-evaluates triggers and calls
     * `onToggle` again for ones that are already active. An increment/decrement
     * counter drifts on each of those: it goes to 2 on the way in, back to 1 on
     * the way out, and the header stays inverted over dark ground forever.
     * Adding the same element twice to a set is a no-op, so this survives any
     * number of redundant toggles.
     */
    const active = new Set<HTMLElement>();
    setOnLightGround(false);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-ground="light"]');

      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          // The header band is the top ~88px of the viewport; the ground
          // changes the moment the panel's edge crosses it, not when the panel
          // reaches the middle of the screen.
          start: "top 88px",
          end: "bottom 88px",
          onToggle: self => {
            if (self.isActive) active.add(section);
            else active.delete(section);
            setOnLightGround(active.size > 0);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  useIsomorphicLayoutEffect(() => {
    const el = overlay.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.set(el, { visibility: "visible" })
        .fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }
        )
        .fromTo(
          el.querySelectorAll("[data-nav-item]"),
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "expo.out",
          },
          "-=0.45"
        );

      timeline.current = tl;
    }, el);

    return () => {
      ctx.revert();
      timeline.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;
    if (open) {
      tl.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.reverse();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes, as it must for anything that traps the viewport.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Hide on scroll down, show on scroll up.
  useIsomorphicLayoutEffect(() => {
    const el = header.current;
    if (!el) return;
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      // Past the fold only, and never while the menu is open.
      if (!open && y > 240) {
        gsap.to(el, {
          yPercent: y > last ? -140 : 0,
          duration: 0.5,
          ease: "power3.out",
        });
      } else if (y <= 240) {
        gsap.to(el, { yPercent: 0, duration: 0.4, ease: "power3.out" });
      }
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      <header
        ref={header}
        className="gutter fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5"
      >
        <Link
          href="/"
          aria-label="Fishtechy — home"
          className="transition-opacity duration-300 hover:opacity-70"
        >
          {/* Both variants are rendered and one is hidden, so switching ground
              is a CSS toggle rather than a new image request mid-scroll. */}
          {/* 32px matches the header size the current site uses (`h-8`). The
              lockup carries a tagline line under the wordmark that stops being
              legible much below that. */}
          <Logo tone="dark" height={32} priority className={cn(onLight && "hidden")} />
          <Logo tone="light" height={32} className={cn(!onLight && "hidden")} />
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "group relative z-[70] grid size-12 place-items-center rounded-full border transition-colors duration-300 md:size-14",
            onLight ? "border-ink/25 hover:border-ink" : "border-chalk/30 hover:border-chalk"
          )}
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                onLight ? "bg-ink" : "bg-chalk",
                open ? "top-1/2 rotate-45" : "top-0 rotate-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                onLight ? "bg-ink" : "bg-chalk",
                open ? "top-1/2 -rotate-45" : "top-full rotate-0"
              )}
            />
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        ref={overlay}
        inert={!open}
        className="bg-ink-deep invisible fixed inset-0 z-[60] flex flex-col justify-between overflow-y-auto pt-28 pb-10"
      >
        <nav className="gutter grid gap-x-16 gap-y-12 md:grid-cols-[1.4fr_1fr]">
          <ul className="flex list-none flex-col gap-2">
            {NAV_GROUPS.flatMap(group => group.links).map(link => (
              <li key={link.href} className="overflow-hidden">
                <Link
                  href={link.href}
                  data-nav-item=""
                  className="t-title text-chalk hover:text-flare block py-1 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-10">
            {NAV_GROUPS.map(group => (
              <div key={group.title} data-nav-item="">
                <p className="t-micro text-ash-faint mb-3">{group.title}</p>
                <ul className="flex list-none flex-col gap-1.5">
                  {group.links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="t-body text-ash link-underline hover:text-brand-blue-lit"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="gutter mt-16 flex flex-wrap items-center justify-between gap-6">
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-2">
            {SOCIAL.map(social => (
              <li key={social.href} data-nav-item="">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-micro text-ash-dim hover:text-flare transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-micro text-ash-faint" data-nav-item="">
            Every catch, verified
          </p>
        </div>
      </div>
    </>
  );
}
