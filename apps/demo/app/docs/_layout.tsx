import { View, Text, ScrollView, Pressable } from "react-native"
import { Stack, useRouter, usePathname } from "expo-router"
import { cn } from "@native-cn/primitives"
import { useMemo } from "react"

const NAV_ITEMS = [
  { label: "Overview", href: "/docs" },
  { label: "Getting Started", href: "/docs/getting-started" },
  { label: "CLI", href: "/docs/cli" },
  { label: "Theming", href: "/docs/theming" },
  { label: "Components", href: "/docs/components" },
]

export default function DocsLayout() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <View className="flex-1 flex-row bg-background">
      {/* Sidebar (hidden on narrow screens via classes) */}
      <View className="hidden md:flex w-64 border-r border-border bg-muted/30">
        <ScrollView className="flex-1">
          <View className="p-4 gap-1">
            <Text className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
              Documentation
            </Text>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Pressable
                  key={item.href}
                  onPress={() => router.push(item.href as any)}
                  className={cn(
                    "px-3 py-2 rounded-md",
                    active ? "bg-primary/10" : "active:bg-muted"
                  )}
                >
                  <Text
                    className={cn(
                      "text-sm",
                      active ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </ScrollView>
      </View>

      {/* Top tab bar for mobile */}
      <View className="md:hidden flex-row border-b border-border bg-muted/30">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row px-2 py-2 gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Pressable
                  key={item.href}
                  onPress={() => router.push(item.href as any)}
                  className={cn(
                    "px-3 py-1.5 rounded-full",
                    active ? "bg-primary" : "bg-muted active:bg-muted/50"
                  )}
                >
                  <Text
                    className={cn(
                      "text-sm",
                      active ? "text-primary-foreground font-medium" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </ScrollView>
      </View>

      {/* Content area */}
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  )
}
