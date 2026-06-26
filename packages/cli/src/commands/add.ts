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
        execSync(`npm install ${missing.join(" ")}`, {
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
  const sourcesDir = resolve(__dirname, "../../../primitives/src")

  for (const component of resolved.components) {
    for (const file of component.files) {
      const sourcePath = resolve(sourcesDir, file.path)
      const destPath = resolve(
        cwd,
        "components",
        "ui",
        file.path.replace("ui/", "").replace("lib/", "").replace("hooks/", "")
      )

      if (!existsSync(sourcePath)) {
        continue
      }

      const destDir = dirname(destPath)
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true })
      }

      const fileContent = readFileSync(sourcePath, "utf-8")
      writeFileSync(destPath, fileContent)
      muted(`  ${relative(cwd, destPath)}`)
    }
  }

  success(`${resolved.components.length} component(s) added`)
  muted(`Components installed in ${resolve(cwd, "components/ui")}`)
}
