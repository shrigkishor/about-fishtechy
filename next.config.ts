import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Turbopack walks up looking for a lockfile to infer the workspace root, and
   * finds a stray `package-lock.json` in the user's home directory before it
   * finds ours. Left alone it roots the build there, which drags every
   * unrelated directory above this project into module resolution. Pinning the
   * root to this file's directory is the documented fix.
   */
  turbopack: { root: path.dirname(new URL(import.meta.url).pathname) },
  transpilePackages: ["three"],
};

export default nextConfig;
