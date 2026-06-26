import { type ThemeName } from "../themes";
type ColorScheme = "light" | "dark";
export interface ThemeContextValue {
    theme: ThemeName;
    colorScheme: ColorScheme;
    setTheme: (theme: ThemeName) => void;
    toggleColorScheme: () => void;
    cssVars: Record<string, string>;
}
export declare const ThemeContext: import("react").Context<ThemeContextValue>;
export declare function useTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=use-theme.d.ts.map