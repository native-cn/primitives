import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "src/index.ts",
    "src/ui/*.tsx",
    "src/lib/*.ts",
    "src/hooks/*.ts",
  ],
  format: ["esm"],
  sourcemap: false,
  minify: true,
  target: "esnext",
  outDir: "dist",
  treeshake: true,
  external: [
    "react",
    "react-native",
    "nativewind",
    "tailwindcss",
  ],
})
