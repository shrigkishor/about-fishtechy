"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary for the 3D orb.
 *
 * `dynamic(..., { ssr: false })` cannot be called from a Server Component in
 * the App Router, and the orb must not be server-rendered — constructing a WebGL
 * context during SSR throws outright rather than degrading. So the import lives
 * behind this one-line client component, which server pages can render freely.
 *
 * Three.js and its react bindings are the heaviest thing in the bundle by a
 * wide margin, and nothing on the page depends on them: every page that mounts
 * this is fully readable before the canvas arrives.
 */
const ProofOrb = dynamic(() => import("@/components/three/ProofOrb"), {
  ssr: false,
});

export default function ProofOrbMount({ className }: { className?: string }) {
  return <ProofOrb className={className} />;
}
