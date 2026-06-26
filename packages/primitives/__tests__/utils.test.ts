import { describe, it, expect } from "vitest"
import { cn } from "../src/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "always")).toBe("base always")
  })

  it("handles undefined and null", () => {
    expect(cn("a", undefined, "b", null)).toBe("a b")
  })

  it("merges tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6")
  })

  it("merges tailwind conflicts across groups", () => {
    expect(cn("p-4 px-6", "p-2")).toBe("p-2")
  })

  it("handles empty input", () => {
    expect(cn()).toBe("")
  })

  it("handles object syntax", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo")
  })

  it("handles array syntax", () => {
    expect(cn(["a", "b"])).toBe("a b")
  })

  it("handles mixed arguments", () => {
    expect(cn("a", ["b", "c"], { d: true })).toBe("a b c d")
  })

  it("preserves important modifiers", () => {
    expect(cn("!p-4", "!p-6")).toBe("!p-6")
  })
})
