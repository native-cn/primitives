import { createContext, useContext } from "react"
import { type ViewStyle } from "react-native"
import { type ThemeName } from "../themes"

type ColorScheme = "light" | "dark"

export interface ThemeContextValue {
  theme: ThemeName
  colorScheme: ColorScheme
  setTheme: (theme: ThemeName) => void
  toggleColorScheme: () => void
  cssVars: Record<string, string>
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "neutral",
  colorScheme: "light",
  setTheme: () => {},
  toggleColorScheme: () => {},
  cssVars: {},
})

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
