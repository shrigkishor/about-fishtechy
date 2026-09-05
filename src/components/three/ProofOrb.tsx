"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import type { Mesh, Group } from "three";

/**
 * The hero's 3D object — a Proof Ball, rendered rather than photographed.
 *
 * The reference puts a Three.js canvas behind its hero; the Fishtechy read on
 * that is the product itself, since a Proof Ball IS a sphere of known size and
 * a rotating one says what the product does without a caption.
 *
 * Distortion is kept low (0.22). A heavily wobbling ball would undercut the
 * whole proposition — the product's value is that its dimensions are fixed and
 * trustworthy, so it may drift and catch light, but it must not look soft.
 *
 * The orb tracks the pointer at a fraction of its travel rather than following
 * it, so the hero feels responsive without the ball chasing the cursor around.
 */
function Orb() {
  const mesh = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.18;
    if (group.current) {
      const { x, y } = state.pointer;
      // Lerp toward the target; a direct assignment reads as a twitch.
      group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.9}>
        <mesh ref={mesh} castShadow>
          <sphereGeometry args={[1.35, 128, 128]} />
          <MeshDistortMaterial
            color="#ee4125"
            distort={0.22}
            speed={1.4}
            roughness={0.28}
            metalness={0.55}
            emissive="#c93727"
            emissiveIntensity={0.14}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ProofOrb({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        // Capped at 2 — the orb is a soft background object and a 3x retina
        // buffer costs frames it gains nothing visible from.
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 5, 3]} intensity={2.1} />
          {/* Cool rim from behind, so the orange edge separates from the
              near-black ground instead of sinking into it. */}
          <directionalLight position={[-5, -2, -4]} intensity={1.2} color="#5b8cff" />
          <Orb />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export type { ThreeElements };
