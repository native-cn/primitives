import { View, Text, ScrollView } from "react-native"
import { Link } from "expo-router"
import { Button } from "@native-cn/primitives"

export default function DocsOverview() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-3xl gap-8">
        <View>
          <Text className="text-3xl font-bold text-foreground mb-2">
            @native-cn/primitives
          </Text>
          <Text className="text-lg text-muted-foreground">
            shadcn/ui primitives for React Native. Beautifully designed, accessible, and customizable components built with NativeWind.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3">
          <Link href="/docs/getting-started" asChild>
            <Button><Text className="text-primary-foreground font-medium">Get Started</Text></Button>
          </Link>
          <Link href="/docs/components" asChild>
            <Button variant="outline"><Text className="text-foreground font-medium">Browse Components</Text></Button>
          </Link>
        </View>

        <Section title="Why native-cn?">
          <Text className="text-foreground leading-relaxed">
            native-cn brings the shadcn/ui developer experience to React Native. Every component is a copy-pasteable source file — no opaque build step, no lock-in. Customize anything with NativeWind utility classes.
          </Text>
        </Section>

        <Section title="Features">
          {[
            ["Copy-paste components", "Each component is a single .tsx file in your project. Full control."],
            ["Theme system", "8 built-in themes (neutral, zinc, blue, green, etc.) with dark mode support."],
            ["CLI tool", "native-cn init, add, build, diff, update, info, and registry management."],
            ["TypeScript", "Full type safety with React Native class name augmentation."],
            ["Accessible", "Built with accessibility in mind — proper ARIA labels, keyboard navigation."],
            ["Charts", "Bar, Line, and Pie charts using react-native-svg with the same config pattern."],
          ].map(([title, desc]) => (
            <View key={title} className="flex-row gap-3 items-start">
              <Text className="text-primary text-lg mt-0.5">◆</Text>
              <View className="flex-1">
                <Text className="font-semibold text-foreground">{title}</Text>
                <Text className="text-sm text-muted-foreground">{desc}</Text>
              </View>
            </View>
          ))}
        </Section>

        <Section title="Quick Links">
          <View className="gap-2">
            <Link href="/docs/cli" asChild>
              <Button variant="ghost"><Text className="text-primary">CLI Reference →</Text></Button>
            </Link>
            <Link href="/docs/theming" asChild>
              <Button variant="ghost"><Text className="text-primary">Theming Guide →</Text></Button>
            </Link>
            <Link href="/examples" asChild>
              <Button variant="ghost"><Text className="text-primary">Live Examples →</Text></Button>
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
