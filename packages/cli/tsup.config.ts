import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node22",
  outDir: "dist",
  platform: "node",
  bundle: true,
  treeshake: true,
  minify: false,
  external: [],
})
