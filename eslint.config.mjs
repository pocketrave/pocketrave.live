import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "_next/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // readymag folder and build outputs
    "readymag/**",
    "**/readymag/**",
    "pocketrave-site/**",
  ]),
]);

export default eslintConfig;
