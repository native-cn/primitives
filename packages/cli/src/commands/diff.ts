import { readFileSync, existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { loadRegistry } from "../registry/api"
import { info, success, warn, error, step, muted } from "../utils/logger"

interface DiffOptions {
  cwd?: string
  registry?: string
  components?: string[]
}

const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/native-cn/primitives/main/packages/primitives/src"

interface DiffResult {
  name: string
  status: "added" | "modified" | "removed" | "unchanged"
}

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

export async function diff(options: DiffOptions) {
  const cwd = options.cwd || process.cwd()
  const componentsDir = resolve(cwd, "components", "ui")

  if (!existsSync(componentsDir)) {
    error("No components/ui directory found. Run `native-cn init` first.")
    return
  }

  step("Loading registry")
  const registry = loadRegistry(options.registry)
  const registryComponents = registry.items.filter((i) => i.type === "registry:ui")
  const targetNames = options.components || registryComponents.map((c) => c.name)

  step(`Checking ${targetNames.length} component(s)...`)
  const results: DiffResult[] = []

  for (const name of targetNames) {
    const reg = registry.items.find((i) => i.name === name)
    if (!reg) {
      warn(`Component "${name}" not found in registry`)
      continue
    }

    const localPath = resolve(componentsDir, `${name}.tsx`)
    const exists = existsSync(localPath)

    if (!exists) {
      results.push({ name, status: "removed" })
      continue
    }

    const localContent = readFileSync(localPath, "utf-8")
    const regFile = reg.files[0]
    if (!regFile) {
      results.push({ name, status: "unchanged" })
      continue
    }

    const regPath = regFile.path.replace("ui/", "")
    const regContent = await fetchRegistryFile(regFile.path)

    if (regContent === null) {
      warn(`Could not fetch registry file for "${name}" — skipping`)
      continue
    }

    if (localContent.trim() === regContent.trim()) {
      results.push({ name, status: "unchanged" })
    } else {
      results.push({ name, status: "modified" })
    }
  }

  // Print results
  const changed = results.filter((r) => r.status !== "unchanged")
  const unchanged = results.filter((r) => r.status === "unchanged")

  if (changed.length === 0) {
    success(`All ${unchanged.length} component(s) are up to date`)
    return
  }

  for (const result of changed) {
    const icon = result.status === "modified" ? "~" : result.status === "added" ? "+" : "-"
    const color = result.status === "modified" ? "yellow" : result.status === "added" ? "green" : "red"
    muted(`  ${icon} ${result.name} (${result.status})`)
  }

  if (unchanged.length > 0) {
    muted(`\n  ${unchanged.length} component(s) unchanged`)
  }

  success(`${changed.length} component(s) differ from registry`)
}
