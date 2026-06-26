import { View, Text, ScrollView, Pressable } from "react-native"
import { useRouter } from "expo-router"
import { cn } from "@native-cn/primitives"
import registry from "@native-cn/primitives/registry"

const TYPES = {
  "registry:ui": "Components",
  "registry:hook": "Hooks",
  "registry:example": "Examples",
  "registry:lib": "Utilities",
} as const

const GROUPS: Record<string, string[]> = {
  Layout: ["card", "separator", "aspect-ratio", "scroll-area", "resizable", "sidebar"],
  Forms: ["button", "button-group", "input", "textarea", "select", "checkbox", "radio-group", "switch", "label", "field", "input-otp", "input-group"],
  Feedback: ["alert", "dialog", "sheet", "drawer", "toast", "sonner", "progress", "skeleton", "spinner"],
  Navigation: ["tabs", "accordion", "collapsible", "navigation-menu", "menubar", "breadcrumb", "pagination", "command"],
  Overlay: ["popover", "tooltip", "hover-card", "context-menu", "dropdown-menu"],
  Data: ["table", "calendar", "carousel", "chart"],
  Misc: ["avatar", "badge", "kbd", "toggle", "toggle-group", "empty", "combobox", "direction"],
  Hooks: ["use-mobile", "use-theme", "use-toast"],
}

export default function ComponentsIndex() {
  const router = useRouter()
  const uiItems = registry.items.filter((i) => i.type === "registry:ui")
  const hookItems = registry.items.filter((i) => i.type === "registry:hook")

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-3xl gap-8">
        <Text className="text-3xl font-bold text-foreground mb-2">Components</Text>
        <Text className="text-base text-muted-foreground">
          {uiItems.length} UI components, {hookItems.length} hooks, and utilities from @native-cn/primitives.
        </Text>

        {Object.entries(GROUPS).map(([group, names]) => (
          <View key={group} className="gap-2">
            <Text className="text-lg font-semibold text-foreground">{group}</Text>
            <View className="flex-row flex-wrap gap-1.5">
              {names.map((name) => {
                const inRegistry = registry.items.find((i) => i.name === name)
                if (!inRegistry) return null
                return (
                  <Pressable
                    key={name}
                    onPress={() => router.push(`/docs/components/${name}` as any)}
                    className="px-3 py-1.5 rounded-full bg-muted active:bg-muted/70 border border-border"
                  >
                    <Text className="text-sm text-foreground">{name}</Text>
                  </Pressable>
                )
              })}
            </View>
          </View>
        ))}

        <View className="gap-2">
          <Text className="text-lg font-semibold text-foreground">Hooks</Text>
          <View className="flex-row flex-wrap gap-1.5">
            {hookItems.map((item) => (
              <Pressable
                key={item.name}
                onPress={() => router.push(`/docs/components/${item.name}` as any)}
                className="px-3 py-1.5 rounded-full bg-muted active:bg-muted/70 border border-border"
              >
                <Text className="text-sm text-foreground">{item.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
