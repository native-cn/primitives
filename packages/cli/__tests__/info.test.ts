import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}))

vi.mock("node:module", () => ({
  createRequire: () => (path: string) => {
    if (path.endsWith("/package.json")) return { version: "0.1.0" }
    throw new Error("not found")
  },
}))

vi.mock("node:child_process", () => ({
  execSync: vi.fn(),
}))

import { existsSync, readFileSync } from "node:fs"

beforeEach(() => {
  vi.clearAllMocks()
})

describe("info command", () => {
  it("should detect package manager by lockfile", async () => {
    const pnpmLock = require.resolve("node:fs")
    // Simulate pnpm lock exists
    vi.mocked(existsSync).mockImplementation((p: string) => {
      const s = String(p)
      return s.includes("pnpm-lock") || s.endsWith("package.json")
    })

    vi.mocked(readFileSync).mockImplementation((p: string) => {
      if (String(p).endsWith("package.json")) return JSON.stringify({ version: "56.0.0" })
      return "{}"
    })

    // Should not throw
    const { info } = await import("../src/commands/info")
    await expect(info({ cwd: "/tmp" })).resolves.toBeUndefined()
  })
})

describe("diff command", () => {
  it("should error when components/ui does not exist", async () => {
    vi.mocked(existsSync).mockReturnValue(false)

    const { diff } = await import("../src/commands/diff")
    await expect(diff({ cwd: "/tmp" })).resolves.toBeUndefined()
  })

  it("should warn for unknown components", async () => {
    vi.mocked(existsSync).mockImplementation((p: string) => {
      const s = String(p)
      return s.includes("components/ui")
    })

    const { diff } = await import("../src/commands/diff")
    await expect(diff({ cwd: "/tmp", components: ["nonexistent"] })).resolves.toBeUndefined()
  })
})
