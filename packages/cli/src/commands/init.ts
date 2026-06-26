import { writeFileSync, existsSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import { execSync } from "node:child_process"
import { info, success, warn, error, step, muted } from "../utils/logger"

interface InitOptions {
  cwd?: string
  yes?: boolean
  force?: boolean
}

const TAILWIND_PRESET_CONFIG = `const { nativeCnPreset } = require("@native-cn/primitives/tailwind")

/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [nativeCnPreset],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
}
`

const GLOBAL_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark:root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
`

const COMPONENTS_JSON = `{
  "$schema": "https://native-cn.github.io/primitives/schema/registry.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/global.css",
    "baseColor": "neutral"
  },
  "aliases": {
    "components": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
`

export async function init(options: InitOptions) {
  const cwd = options.cwd || process.cwd()
  const projectName = cwd.split(/[\\/]/).pop() || "app"

  step(`Initializing native-cn in ${projectName}`)

  // Check if already initialized
  const configPath = resolve(cwd, "components.json")
  if (existsSync(configPath) && !options.force) {
    warn("native-cn is already initialized (components.json exists)")
    info("Use --force to overwrite")
    return
  }

  // 1. Install peer dependencies
  step("Installing dependencies")
  try {
    execSync(
      "npm install @native-cn/primitives clsx tailwind-merge tailwindcss nativewind",
      { cwd, stdio: "inherit" }
    )
    success("Dependencies installed")
  } catch {
    error("Failed to install dependencies")
    return
  }

  // 2. Create tailwind.config.js
  step("Creating tailwind config")
  const tailwindPath = resolve(cwd, "tailwind.config.js")
  writeFileSync(tailwindPath, TAILWIND_PRESET_CONFIG)
  success("tailwind.config.js created")

  // 3. Create or update global CSS
  step("Setting up CSS variables")
  const cssDir = resolve(cwd, "app")
  if (!existsSync(cssDir)) {
    mkdirSync(cssDir, { recursive: true })
  }
  const cssPath = resolve(cssDir, "global.css")
  writeFileSync(cssPath, GLOBAL_CSS)
  success("app/global.css created")

  // 4. Create components.json
  step("Creating components.json")
  writeFileSync(configPath, COMPONENTS_JSON)
  success("components.json created")

  success(`native-cn initialized in ${projectName}`)
  muted("Run `npx native-cn add button card` to add components")
}
