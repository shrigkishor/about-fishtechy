import type { ReactNode, Ref } from "react";

/**
 * Props a polymorphic `as` target is allowed to receive.
 *
 * `ElementType` is a union of every intrinsic tag and every component type, and
 * TypeScript resolves a JSX spread against that union by intersecting the prop
 * types — which lands on `never` for anything not common to all of them, `ref`
 * and `className` included. There is no inference-friendly way around that
 * short of a full generic polymorphic-component type, which would put three
 * type parameters on every animation component for no runtime gain.
 *
 * `PolymorphicProps` is the prop bag those components hand to
 * `React.createElement`, which accepts an `ElementType` directly and so sidesteps
 * the intersection entirely. The cost is that the `as` target's own props are
 * not checked — acceptable here, because every caller passes a plain tag name.
 */
export type PolymorphicProps = Record<string, unknown> & {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
  className?: string;
};
