import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs"
import { resolve, dirname, relative } from "node:path"
import { createRequire } from "node:module"
import { loadRegistry, resolveRegistryDependencies } from "../registry/api"
import { info, success, warn, error, step, muted } from "../utils/logger"

interface AddOptions {
  cwd?: string
  registry?: string
  components: string[]
}

const _require = createRequire(import.meta.url)

const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/native-cn/primitives/main/packages/primitives/src"

async function readComponentFile(filePath: string): Promise<string | null> {
  // Try local source first (when running from repo)
  try {
    const sourcesDir = resolve(__dirname, "../../../primitives/src")
    const localPath = resolve(sourcesDir, filePath)
    if (existsSync(localPath)) {
      return readFileSync(localPath, "utf-8")
    }
  } catch {}

  // Fall back to remote fetch
  try {
    const url = `${REGISTRY_BASE_URL}/${filePath}`
    const response = await fetch(url)
    if (response.ok) return await response.text()
  } catch {}

  return null
}

export async function add(options: AddOptions) {
  const cwd = options.cwd || process.cwd()

  if (options.components.length === 0) {
    error("No components specified. Usage: native-cn add button card")
    return
  }

  step("Loading registry")
  const registry = loadRegistry(options.registry)

  step(`Resolving dependencies for: ${options.components.join(", ")}`)
  let resolved
  try {
    resolved = resolveRegistryDependencies(registry, options.components)
  } catch (e: any) {
    error(e.message)
    return
  }

  info(
    `Found ${resolved.components.length} component(s) to install`
  )

  if (resolved.npmDependencies.length > 0) {
    muted(`npm deps: ${resolved.npmDependencies.join(", ")}`)
  }
  if (resolved.registryDependencies.length > 0) {
    muted(`registry deps: ${resolved.registryDependencies.join(", ")}`)
  }

  // Install npm dependencies
  if (resolved.npmDependencies.length > 0) {
    step("Installing npm dependencies")
    const missing = resolved.npmDependencies.filter((dep) => {
      try {
        _require.resolve(dep, { paths: [cwd] })
        return false
      } catch {
        return true
      }
    })

    if (missing.length > 0) {
      try {
        const { execSync } = await import("node:child_process")
        execSync(`${pmBin(cwd)} install ${missing.join(" ")}`, {
          cwd,
          stdio: "inherit",
        })
        success("Dependencies installed")
      } catch {
        warn("Failed to install some dependencies — you may need to install them manually")
      }
    } else {
      muted("All npm dependencies already installed")
    }
  }

  // Write component files
  step("Copying component files")

  for (const component of resolved.components) {
    for (const file of component.files) {
      const fileContent = await readComponentFile(file.path)
      if (fileContent === null) {
        warn(`Could not read source for ${file.path} — skipping`)
        continue
      }

      const destPath = resolve(
        cwd,
        "components",
        "ui",
        file.path.replace("ui/", "").replace("lib/", "").replace("hooks/", "")
      )

      const destDir = dirname(destPath)
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }

      writeFileSync(destPath, fileContent)
      muted(`  ${relative(cwd, destPath)}`)
    }
  }

  success(`${resolved.components.length} component(s) added`)
  muted(`Components installed in ${resolve(cwd, "components/ui")}`)
}

function pmBin(cwd: string): string {
  const hasPnpm = existsSync(resolve(cwd, "pnpm-lock.yaml"))
  const hasYarn = existsSync(resolve(cwd, "yarn.lock"))
  return hasPnpm ? "pnpm" : hasYarn ? "yarn" : "npm"
}
