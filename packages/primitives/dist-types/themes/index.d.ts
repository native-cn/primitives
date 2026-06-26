export type ThemeName = "neutral" | "zinc" | "stone" | "blue" | "green" | "purple" | "orange" | "red";
export interface ThemeDefinition {
    name: ThemeName;
    label: string;
    activeColor: string;
}
export interface ThemeColors {
    light: Record<string, string>;
    dark: Record<string, string>;
}
export declare const themes: ThemeDefinition[];
export declare const themeColors: Record<ThemeName, ThemeColors>;
//# sourceMappingURL=index.d.ts.map