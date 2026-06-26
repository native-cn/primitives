import { writeFileSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { registrySchema, type Registry } from "../registry/schema"
import { info, success, error, step, muted } from "../utils/logger"

interface BuildOptions {
  cwd?: string
  registry?: string
  output?: string
}

export async function build(options: BuildOptions) {
  const cwd = options.cwd || process.cwd()
  const registryPath = options.registry || resolve(cwd, "registry.json")
  const outputPath = options.output || resolve(cwd, "dist", "registry.json")

  step("Building registry")

  let registry: Registry
  try {
    const raw = readFileSync(registryPath, "utf-8")
    registry = registrySchema.parse(JSON.parse(raw))
    info(`Loaded ${registry.items.length} items from registry`)
  } catch (e: any) {
    error(`Failed to parse registry: ${e.message}`)
    return
  }

  // Validate all registryDependencies exist
  const allNames = new Set(registry.items.map((i) => i.name))
  const missing: string[] = []

  for (const item of registry.items) {
    for (const dep of item.registryDependencies) {
      if (!allNames.has(dep)) {
        missing.push(`${item.name} → ${dep}`)
      }
    }
  }

  if (missing.length > 0) {
    error(`Missing registry dependencies:\n${missing.map((m) => `  ${m}`).join("\n")}`)
    return
  }

  // Write output
  const outDir = resolve(outputPath, "..")
  const { mkdirSync } = await import("node:fs")
  const { dirname } = await import("node:path")
  const dir = dirname(outputPath)
  if (!dir) {
    const fs = await import("node:fs")
    fs.mkdirSync(dir, { recursive: true })
  }

  writeFileSync(outputPath, JSON.stringify(registry, null, 2))
  success(`Registry built: ${outputPath}`)
  muted(`${registry.items.length} items, ${registry.items.filter((i) => i.registryDependencies.length > 0).length} with dependencies`)
}
