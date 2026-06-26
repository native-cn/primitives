import { describe, it, expect } from "vitest"
import { themes, themeColors } from "../src/themes"

describe("themes", () => {
  it("exports 8 themes", () => {
    expect(themes.length).toBe(8)
  })

  it("has unique theme names", () => {
    const names = themes.map((t) => t.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it("each theme has a label", () => {
    for (const theme of themes) {
      expect(theme.label).toBeTruthy()
    }
  })

  it("each theme has an activeColor", () => {
    for (const theme of themes) {
      expect(theme.activeColor).toMatch(/^hsl\(/)
    }
  })
})

describe("themeColors", () => {
  it("defines colors for all themes", () => {
    for (const theme of themes) {
      expect(themeColors[theme.name]).toBeDefined()
    }
  })

  it("each theme has light and dark variants", () => {
    for (const theme of themes) {
      expect(themeColors[theme.name].light).toBeDefined()
      expect(themeColors[theme.name].dark).toBeDefined()
    }
  })

  it("each color scheme has all required CSS variables", () => {
    const required = [
      "background", "foreground", "card", "card-foreground",
      "primary", "primary-foreground", "secondary", "secondary-foreground",
      "muted", "muted-foreground", "accent", "accent-foreground",
      "destructive", "destructive-foreground", "border", "input", "ring",
    ]
    for (const theme of themes) {
      for (const scheme of ["light", "dark"] as const) {
        for (const key of required) {
          expect(themeColors[theme.name][scheme][key]).toBeDefined()
        }
      }
    }
  })
})
