import { useState, useCallback, useMemo } from "react"
import { View, useColorScheme as useRNColorScheme } from "react-native"
import { ThemeContext, type ThemeContextValue } from "../hooks/use-theme"
import { themeColors, type ThemeName } from "../themes"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
}

export function ThemeProvider({
  children,
  defaultTheme = "neutral",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme)
  const systemColorScheme = useRNColorScheme()
  const [manualColorScheme, setManualColorScheme] = useState<"light" | "dark" | undefined>()

  const colorScheme = manualColorScheme ?? systemColorScheme ?? "light"

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t)
  }, [])

  const toggleColorScheme = useCallback(() => {
    setManualColorScheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const cssVars = useMemo(() => {
    const colors = themeColors[theme]
    const vars = colorScheme === "dark" ? colors.dark : colors.light
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(vars)) {
      result[`--${key}`] = value
    }
    return result
  }, [theme, colorScheme])

  const value: ThemeContextValue = useMemo(
    () => ({ theme, colorScheme, setTheme, toggleColorScheme, cssVars }),
    [theme, colorScheme, setTheme, toggleColorScheme, cssVars]
  )

  return (
    <ThemeContext.Provider value={value}>
      <View style={cssVars as any} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  )
}
