import { View, Text, ScrollView } from "react-native"
import { ThemeProvider, themes, useTheme } from "@native-cn/primitives"

const Code = ({ code }: { code: string }) => (
  <View className="bg-muted rounded-lg p-4">
    <Text className="text-sm text-foreground font-mono">{code}</Text>
  </View>
)

export default function ThemingPage() {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-3xl gap-8">
        <Text className="text-3xl font-bold text-foreground mb-2">Theming</Text>
        <Text className="text-base text-muted-foreground">
          native-cn ships with 8 themes and a ThemeProvider for light/dark mode.
        </Text>

        <Section title="ThemeProvider">
          <Text className="text-foreground leading-relaxed mb-2">
            Wrap your app with ThemeProvider to get access to themes, color scheme toggling, and CSS variable injection:
          </Text>
          <Code code={`import { ThemeProvider } from "@native-cn/primitives"\n\nexport default function Root() {\n  return (\n    <ThemeProvider defaultTheme="neutral">\n      {/* Your app */}\n    </ThemeProvider>\n  )\n}`} />
          <View className="mt-2 gap-1">
            <Text className="text-sm text-muted-foreground">Props:</Text>
            <Text className="text-sm text-muted-foreground ml-2">defaultTheme — initial theme name (default: "neutral")</Text>
            <Text className="text-sm text-muted-foreground ml-2">defaultColorScheme — "light" | "dark" | "system"</Text>
            <Text className="text-sm text-muted-foreground ml-2">storageKey — AsyncStorage key for persisting theme (default: "native-cn-theme")</Text>
          </View>
        </Section>

        <Section title="useTheme Hook">
          <Text className="text-foreground leading-relaxed mb-2">
            Access theme state from any component:
          </Text>
          <Code code={`const { theme, setTheme, colorScheme, toggleColorScheme } = useTheme()\n\n// theme: "neutral" | "zinc" | "stone" | "blue" | "green" | "purple" | "orange" | "red"\n// colorScheme: "light" | "dark"\n// toggleColorScheme: () => void`} />
        </Section>

        <Section title="Available Themes">
          <Text className="text-foreground leading-relaxed mb-2">
            Click a theme to preview:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <View
                key={key}
                className="px-4 py-2 rounded-lg border border-border"
                style={{ backgroundColor: key === "neutral" ? "hsl(0 0% 96%)" : undefined }}
              >
                <Text className="text-foreground font-medium text-sm">{theme.label}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Dark Mode">
          <Text className="text-foreground leading-relaxed mb-2">
            Each theme has light and dark variants. toggleColorScheme switches between them:
          </Text>
          <Code code={`const { colorScheme, toggleColorScheme } = useTheme()\n\n<Button onPress={toggleColorScheme}>\n  <Text>Switch to {colorScheme === "light" ? "dark" : "light"}</Text>\n</Button>`} />
        </Section>

        <Section title="Custom CSS Variables">
          <Text className="text-foreground leading-relaxed mb-2">
            ThemeProvider sets CSS variables on a wrapper View. Your Tailwind config references them via hsl(var(--var)):
          </Text>
          <Code code={`/* global.css */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n/* Variables are injected by ThemeProvider */\n/* --background, --foreground, --card, --primary, etc. */`} />
        </Section>

        <Section title="Tailwind Preset">
          <Text className="text-foreground leading-relaxed mb-2">
            The native-cn preset maps CSS variables to utility classes:
          </Text>
          <Code code={`// tailwind.config.js\nmodule.exports = {\n  presets: [require("@native-cn/primitives/tailwind")],\n}`} />
          <Text className="text-foreground leading-relaxed mt-2">
            This enables classes like bg-background, text-foreground, border-border, etc.
          </Text>
        </Section>
      </View>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-xl font-semibold text-foreground">{title}</Text>
      {children}
    </View>
  )
}
