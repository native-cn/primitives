import { describe, it, expect } from "vitest"

describe("tailwind preset", () => {
  let preset: any

  beforeAll(async () => {
    preset = await import("../src/tailwind-preset.js")
  })

  it("has darkMode set to class", () => {
    expect(preset.darkMode).toBe("class")
  })

  it("defines all shadcn color tokens", () => {
    const colors = preset.theme.extend.colors
    expect(colors.border).toBe("hsl(var(--border))")
    expect(colors.input).toBe("hsl(var(--input))")
    expect(colors.ring).toBe("hsl(var(--ring))")
    expect(colors.background).toBe("hsl(var(--background))")
    expect(colors.foreground).toBe("hsl(var(--foreground))")
    expect(colors.primary.DEFAULT).toBe("hsl(var(--primary))")
    expect(colors.primary.foreground).toBe("hsl(var(--primary-foreground))")
    expect(colors.secondary.DEFAULT).toBe("hsl(var(--secondary))")
    expect(colors.secondary.foreground).toBe("hsl(var(--secondary-foreground))")
    expect(colors.destructive.DEFAULT).toBe("hsl(var(--destructive))")
    expect(colors.destructive.foreground).toBe("hsl(var(--destructive-foreground))")
    expect(colors.muted.DEFAULT).toBe("hsl(var(--muted))")
    expect(colors.muted.foreground).toBe("hsl(var(--muted-foreground))")
    expect(colors.accent.DEFAULT).toBe("hsl(var(--accent))")
    expect(colors.accent.foreground).toBe("hsl(var(--accent-foreground))")
    expect(colors.popover.DEFAULT).toBe("hsl(var(--popover))")
    expect(colors.popover.foreground).toBe("hsl(var(--popover-foreground))")
    expect(colors.card.DEFAULT).toBe("hsl(var(--card))")
    expect(colors.card.foreground).toBe("hsl(var(--card-foreground))")
  })

  it("defines border radius tokens", () => {
    const radii = preset.theme.extend.borderRadius
    expect(radii.lg).toBe("var(--radius)")
    expect(radii.md).toBe("calc(var(--radius) - 2px)")
    expect(radii.sm).toBe("calc(var(--radius) - 4px)")
  })
})
