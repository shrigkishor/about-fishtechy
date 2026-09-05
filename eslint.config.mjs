import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships flat configs directly, so they are spread here
 * rather than wrapped in `FlatCompat`. The compat shim serialises each config
 * to validate it, and the plugin graph in this version is circular — it throws
 * "Converting circular structure to JSON" before it lints a single file.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default config;
