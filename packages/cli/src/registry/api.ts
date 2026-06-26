import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { registrySchema, type Registry, type RegistryItem } from "./schema"

const DEFAULT_REGISTRY_PATH = "../../primitives/registry/registry.json"

export function loadRegistry(registryPath?: string): Registry {
  const resolvedPath = resolve(
    registryPath || DEFAULT_REGISTRY_PATH
  )

  if (!existsSync(resolvedPath)) {
    throw new Error(`Registry not found at: ${resolvedPath}`)
  }

  const raw = readFileSync(resolvedPath, "utf-8")
  const parsed = JSON.parse(raw)
  return registrySchema.parse(parsed)
}

export function resolveRegistryDependencies(
  registry: Registry,
  componentNames: string[]
): { components: RegistryItem[]; npmDependencies: string[]; registryDependencies: string[] } {
  const resolved = new Set<string>()
  const components: RegistryItem[] = []
  const npmDeps = new Set<string>()
  const regDeps = new Set<string>()

  function resolve(name: string) {
    if (resolved.has(name)) return
    resolved.add(name)

    const item = registry.items.find((i) => i.name === name)
    if (!item) {
      throw new Error(`Component "${name}" not found in registry`)
    }

    components.push(item)

    for (const dep of item.dependencies) {
      npmDeps.add(dep)
    }

    for (const regDep of item.registryDependencies) {
      regDeps.add(regDep)
      resolve(regDep)
    }
  }

  for (const name of componentNames) {
    resolve(name)
  }

  return {
    components,
    npmDependencies: Array.from(npmDeps),
    registryDependencies: Array.from(regDeps).filter(
      (d) => !componentNames.includes(d)
    ),
  }
}

export function findComponent(name: string, registry: Registry): RegistryItem | undefined {
  return registry.items.find((i) => i.name === name)
}

export function listComponents(registry: Registry, type?: string): RegistryItem[] {
  if (type) {
    return registry.items.filter((i) => i.type === type)
  }
  return registry.items
}

export function searchRegistry(registry: Registry, query: string): RegistryItem[] {
  const lower = query.toLowerCase()
  return registry.items.filter(
    (i) =>
      i.name.toLowerCase().includes(lower)
  )
}

export function loadRegistriesFromSources(cwd: string): { items: RegistryItem[]; sources: string[] } {
  const sourcesPath = resolve(cwd, "native-cn-sources.json")
  if (!existsSync(sourcesPath)) return { items: [], sources: [] }

  const sources = JSON.parse(readFileSync(sourcesPath, "utf-8"))
  const allItems: RegistryItem[] = []
  const loadedSources: string[] = []

  for (const source of sources) {
    try {
      const registry = loadRegistry(source.url)
      allItems.push(...registry.items)
      loadedSources.push(source.name)
    } catch {
      // skip unloadable sources
    }
  }

  return { items: allItems, sources: loadedSources }
}
