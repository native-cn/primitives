import { describe, it, expect } from "vitest"
import { loadRegistry, resolveRegistryDependencies, findComponent, listComponents } from "../src/registry/api"

const testRegistry = {
  name: "test",
  items: [
    { name: "button", type: "registry:ui", dependencies: [], registryDependencies: [], files: [{ path: "ui/button.tsx" }] },
    { name: "card", type: "registry:ui", dependencies: [], registryDependencies: [], files: [{ path: "ui/card.tsx" }] },
    { name: "button-group", type: "registry:ui", dependencies: [], registryDependencies: ["button"], files: [{ path: "ui/button-group.tsx" }] },
    { name: "dialog", type: "registry:ui", dependencies: [], registryDependencies: ["button"], files: [{ path: "ui/dialog.tsx" }] },
    { name: "form", type: "registry:ui", dependencies: ["react-hook-form"], registryDependencies: ["field", "button"], files: [{ path: "ui/form.tsx" }] },
    { name: "field", type: "registry:ui", dependencies: [], registryDependencies: ["input"], files: [{ path: "ui/field.tsx" }] },
    { name: "input", type: "registry:ui", dependencies: [], registryDependencies: [], files: [{ path: "ui/input.tsx" }] },
    { name: "utils", type: "registry:lib", dependencies: ["clsx", "tailwind-merge"], registryDependencies: [], files: [{ path: "lib/utils.ts" }] },
  ],
}

describe("findComponent", () => {
  it("finds a component by name", () => {
    const result = findComponent("button", testRegistry as any)
    expect(result?.name).toBe("button")
  })

  it("returns undefined for missing component", () => {
    const result = findComponent("nonexistent", testRegistry as any)
    expect(result).toBeUndefined()
  })
})

describe("listComponents", () => {
  it("lists all components", () => {
    const result = listComponents(testRegistry as any)
    expect(result.length).toBe(8)
  })

  it("filters by type", () => {
    const result = listComponents(testRegistry as any, "registry:lib")
    expect(result.length).toBe(1)
    expect(result[0].name).toBe("utils")
  })
})

describe("resolveRegistryDependencies", () => {
  it("returns a single component with no deps", () => {
    const result = resolveRegistryDependencies(testRegistry as any, ["card"])
    expect(result.components.length).toBe(1)
    expect(result.components[0].name).toBe("card")
    expect(result.npmDependencies.length).toBe(0)
    expect(result.registryDependencies.length).toBe(0)
  })

  it("resolves flat registry dependencies", () => {
    const result = resolveRegistryDependencies(testRegistry as any, ["button-group"])
    expect(result.components.length).toBe(2)
    expect(result.components.map((c) => c.name)).toContain("button")
    expect(result.components.map((c) => c.name)).toContain("button-group")
  })

  it("resolves transitive dependencies", () => {
    const result = resolveRegistryDependencies(testRegistry as any, ["form"])
    expect(result.components.length).toBe(4) // form, field, input, button
    expect(result.components.map((c) => c.name).sort()).toEqual(["button", "field", "form", "input"])
    expect(result.npmDependencies).toContain("react-hook-form")
  })

  it("resolves multiple components with shared deps", () => {
    const result = resolveRegistryDependencies(testRegistry as any, ["dialog", "form"])
    expect(result.components.length).toBe(5) // dialog, form, button, field, input
    // button should only appear once
    const buttonCount = result.components.filter((c) => c.name === "button").length
    expect(buttonCount).toBe(1)
  })

  it("throws for unknown components", () => {
    expect(() => resolveRegistryDependencies(testRegistry as any, ["unknown"])).toThrow()
  })
})
