import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs"
import { resolve, relative } from "node:path"
import { loadRegistry } from "../registry/api"
import { info, success, warn, error, step, muted } from "../utils/logger"

interface UpdateOptions {
  cwd?: string
  registry?: string
  components?: string[]
}

const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/native-cn/primitives/main/packages/primitives/src"

async function fetchRegistryFile(path: string): Promise<string | null> {
  try {
    const url = `${REGISTRY_BASE_URL}/${path}`
    const response = await fetch(url)
    if (!response.ok) return null
    return await response.text()
  } catch {
    return null
  }
}

export async function update(options: UpdateOptions) {
  const cwd = options.cwd || process.cwd()
  const componentsDir = resolve(cwd, "components", "ui")

  if (!existsSync(componentsDir)) {
    error("No components/ui directory found. Run `native-cn init` first.")
    return
  }

  if (options.components && options.components.length === 0) {
    error("No components specified")
    return
  }

  step("Loading registry")
  const registry = loadRegistry(options.registry)
  const registryComponents = registry.items.filter((i) => i.type === "registry:ui")
  const targetNames = options.components || registryComponents.map((c) => c.name)

  step(`Updating ${targetNames.length} component(s)...`)
  let updated = 0
  let skipped = 0
  let errors = 0

  for (const name of targetNames) {
    const reg = registry.items.find((i) => i.name === name)
    if (!reg) {
      warn(`Component "${name}" not found in registry`)
      errors++
      continue
    }

    for (const file of reg.files) {
      const regContent = await fetchRegistryFile(file.path)
      if (regContent === null) {
        warn(`Could not fetch "${name}" from registry`)
        errors++
        continue
      }

      const destPath = resolve(
        cwd,
        "components",
        "ui",
        file.path.replace("ui/", "").replace("lib/", "").replace("hooks/", "")
      )

      const destDir = resolve(destPath, "..")
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }

      writeFileSync(destPath, regContent)
      muted(`  ✓ ${relative(cwd, destPath)}`)
      updated++
    }
  }

  success(`${updated} file(s) updated`)
  if (errors > 0) warn(`${errors} error(s)`)
  if (skipped > 0) muted(`${skipped} file(s) skipped (unchanged)`)
}
