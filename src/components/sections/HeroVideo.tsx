"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { REEL } from "@/content/media";


/**
 * The hero's background reel.
 *
 * The loop is done by hand rather than with the `loop` attribute, because a
 * looping media element never fires `ended` — and `ended` is the only signal
 * that a lap finished. Seeking to zero and playing again keeps the reel
 * continuous AND keeps the event.
 *
 * `muted` is what makes `autoPlay` legal (every browser blocks unmuted
 * autoplay) and `playsInline` stops iOS Safari hijacking it into the fullscreen
 * player. `preload="metadata"`, not `auto`: at ~84MB there is nothing to gain
 * from racing the whole download against the rest of the page.
 *
 * IT FADES IN ON `canplay` RATHER THAN SHOWING A POSTER. A poster frame would
 * be a bundled still standing in for a CDN reel, and the box behind it is the
 * page's own ink ground — which is exactly what the scrim fades into anyway. So
 * the hero opens on flat ground and the footage arrives when it can.
 *
 * `onError` matters: a reel that never loads would otherwise sit at opacity 0
 * forever. On failure the element is dropped entirely and the hero keeps its
 * ground, which is a design it was built to survive — the type and the scrim
 * never depended on the footage being there.
 *
 * THE `canplay` HANDLER IS NOT ENOUGH ON ITS OWN. A cached or fast-arriving
 * reel can reach `HAVE_ENOUGH_DATA` before React hydrates and binds the
 * listener, and a media event that already fired is simply gone — leaving the
 * reel playing underneath at `opacity: 0` with nothing left to reveal it. The
 * mount effect closes that race by reading `readyState` directly, which is
 * state rather than an event and is therefore still true after the fact.
 *
 * `aria-hidden` because it is decorative; the `h1` over it is what is announced.
 */
export default function HeroVideo({
  src = REEL.catchReel,
  className,
}: {
  src?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // HAVE_FUTURE_DATA (3) or better means there is enough decoded to show.
    if (video.readyState >= 3) setState("ready");
    else if (video.error) setState("failed");
  }, [src]);

  // Placed after the hook, not before it: an early return above a `useEffect`
  // changes the hook count between renders and React throws.
  if (state === "failed") return null;

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      playsInline
      preload="metadata"
      onCanPlay={() => setState("ready")}
      onError={() => setState("failed")}
      onEnded={event => {
        const video = event.currentTarget;
        video.currentTime = 0;
        /* `play()` rejects when the browser declines — a backgrounded tab
           paused to save power is the common one — and logs an unhandled
           AbortError if nothing catches it. There is nothing to do about a
           refused resume: the reel picks up when the tab comes back. */
        video.play().catch(() => {});
      }}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        state === "ready" ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
