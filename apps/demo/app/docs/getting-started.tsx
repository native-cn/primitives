import { View, Text, ScrollView } from "react-native"
import { Link } from "expo-router"
import { Button } from "@native-cn/primitives"

const CodeBlock = ({ code }: { code: string }) => (
  <View className="bg-muted rounded-lg p-4">
    <Text className="text-sm text-foreground font-mono">{code}</Text>
  </View>
)

export default function GettingStarted() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-3xl gap-8">
        <Text className="text-3xl font-bold text-foreground mb-2">Getting Started</Text>

        <Section title="1. Prerequisites">
          <Text className="text-foreground leading-relaxed">
            An Expo or React Native project with Tailwind CSS and NativeWind v4 configured.
          </Text>
        </Section>

        <Section title="2. Install">
          <CodeBlock code="npm install @native-cn/primitives nativewind tailwindcss\nnpx native-cn init" />
        </Section>

        <Section title="3. Configure Tailwind">
          <Text className="text-foreground leading-relaxed mb-2">
            Add the native-cn preset to your tailwind.config.js:
          </Text>
          <CodeBlock code={`// tailwind.config.js\nmodule.exports = {\n  presets: [require("@native-cn/primitives/tailwind")],\n}`} />
        </Section>

        <Section title="4. Wrap with ThemeProvider">
          <Text className="text-foreground leading-relaxed mb-2">
            Wrap your app root with ThemeProvider in layout.tsx:
          </Text>
          <CodeBlock code={`import { ThemeProvider } from "@native-cn/primitives"\n\nexport default function RootLayout() {\n  return (\n    <ThemeProvider defaultTheme="neutral">\n      <Stack screenOptions={{ headerShown: false }} />\n    </ThemeProvider>\n  )\n}`} />
        </Section>

        <Section title="5. Add components">
          <Text className="text-foreground leading-relaxed mb-2">
            Use the CLI to add any component:
          </Text>
          <CodeBlock code="npx native-cn add button card input" />
          <Text className="text-foreground leading-relaxed mt-2">
            Or import directly from @native-cn/primitives:
          </Text>
          <CodeBlock code={`import { Button, Card } from "@native-cn/primitives"\n\n<Button>\n  <Text className="text-primary-foreground">Click me</Text>\n</Button>`} />
        </Section>

        <Section title="6. Next Steps">
          <View className="gap-2">
            <Link href="/docs/components" asChild>
              <Button variant="outline"><Text className="text-foreground">Browse Components →</Text></Button>
            </Link>
            <Link href="/examples" asChild>
              <Button variant="outline"><Text className="text-foreground">View Examples →</Text></Button>
            </Link>
            <Link href="/docs/theming" asChild>
              <Button variant="outline"><Text className="text-foreground">Learn About Theming →</Text></Button>
            </Link>
          </View>
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
