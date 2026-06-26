import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { createRequire } from "node:module"
import { execSync } from "node:child_process"
import { info, success, muted, step } from "../utils/logger"

interface InfoOptions {
  cwd?: string
}

const _require = createRequire(import.meta.url)

export async function info(options: InfoOptions) {
  const cwd = options.cwd || process.cwd()

  step("System Information")

  // Node version
  muted(`Node: ${process.version}`)
  muted(`Platform: ${process.platform} ${process.arch}`)

  // CLI version
  let cliVersion = "unknown"
  try {
    const pkg = _require("../package.json")
    cliVersion = pkg.version
  } catch {}
  muted(`CLI: ${cliVersion}`)

  // Package manager
  const hasPnpm = existsSync(resolve(cwd, "pnpm-lock.yaml"))
  const hasYarn = existsSync(resolve(cwd, "yarn.lock"))
  const hasNpm = existsSync(resolve(cwd, "package-lock.json"))
  const pm = hasPnpm ? "pnpm" : hasYarn ? "yarn" : hasNpm ? "npm" : "unknown"
  muted(`Package manager: ${pm}`)

  // Expo / React Native versions
  const depPaths = [
    resolve(cwd, "node_modules", "expo", "package.json"),
    resolve(cwd, "node_modules", "react-native", "package.json"),
    resolve(cwd, "node_modules", "nativewind", "package.json"),
    resolve(cwd, "node_modules", "@native-cn", "primitives", "package.json"),
  ]

  const labels = ["Expo", "React Native", "NativeWind", "@native-cn/primitives"]
  for (let i = 0; i < depPaths.length; i++) {
    try {
      const pkg = JSON.parse(readFileSync(depPaths[i], "utf-8"))
      muted(`${labels[i]}: ${pkg.version}`)
    } catch {
      muted(`${labels[i]}: not installed`)
    }
  }

  // Tailwind config
  const twPaths = [
    resolve(cwd, "tailwind.config.js"),
    resolve(cwd, "tailwind.config.ts"),
  ]
  const twExists = twPaths.some((p) => existsSync(p))
  muted(`Tailwind config: ${twExists ? "found" : "not found"}`)

  // components.json
  const configPath = resolve(cwd, "components.json")
  muted(`components.json: ${existsSync(configPath) ? "found" : "not found"}`)

  success("Info collected")
}
