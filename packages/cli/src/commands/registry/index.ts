import { writeFileSync, readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { loadRegistry } from "../../registry/api"
import { info, success, warn, error, step, muted } from "../../utils/logger"

interface RegistryOptions {
  cwd?: string
}

const SOURCES_FILE = "native-cn-sources.json"

interface RegistrySource {
  name: string
  url: string
  homepage?: string
}

export function listSources(options: RegistryOptions) {
  const cwd = options.cwd || process.cwd()
  const sourcesPath = resolve(cwd, SOURCES_FILE)

  if (!existsSync(sourcesPath)) {
    error(`No ${SOURCES_FILE} found. Add one with: native-cn registry add <name> <url>`)
    return
  }

  const sources: RegistrySource[] = JSON.parse(readFileSync(sourcesPath, "utf-8"))
  step(`Registered registries (${sources.length})`)
  for (const source of sources) {
    muted(`  • ${source.name} ${source.homepage ? `(${source.homepage})` : ""}`)
    info(`    ${source.url}`)
  }
}

export function addSource(options: RegistryOptions & { name: string; url: string }) {
  const cwd = options.cwd || process.cwd()
  const sourcesPath = resolve(cwd, SOURCES_FILE)

  let sources: RegistrySource[] = []
  if (existsSync(sourcesPath)) {
    sources = JSON.parse(readFileSync(sourcesPath, "utf-8"))
  }

  const existing = sources.find((s) => s.name === options.name)
  if (existing) {
    existing.url = options.url
    success(`Updated registry "${options.name}"`)
  } else {
    sources.push({ name: options.name, url: options.url })
    success(`Added registry "${options.name}"`)
  }

  writeFileSync(sourcesPath, JSON.stringify(sources, null, 2))
}

export function removeSource(options: RegistryOptions & { name: string }) {
  const cwd = options.cwd || process.cwd()
  const sourcesPath = resolve(cwd, SOURCES_FILE)

  if (!existsSync(sourcesPath)) {
    error(`No ${SOURCES_FILE} found`)
    return
  }

  let sources: RegistrySource[] = JSON.parse(readFileSync(sourcesPath, "utf-8"))
  const before = sources.length
  sources = sources.filter((s) => s.name !== options.name)

  if (sources.length === before) {
    warn(`Registry "${options.name}" not found`)
    return
  }

  writeFileSync(sourcesPath, JSON.stringify(sources, null, 2))
  success(`Removed registry "${options.name}"`)
}
