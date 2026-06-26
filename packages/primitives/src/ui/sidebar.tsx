import { View, Text, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface SidebarProps {
  items: { label: string; icon?: string; onPress: () => void; active?: boolean; badge?: string }[]
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <View className="w-64 rounded-lg border border-border bg-card p-2 gap-0.5">
      {items.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={item.onPress}
          className={cn(
            "flex-row items-center gap-3 rounded-md px-3 py-2.5",
            item.active ? "bg-primary/10" : "active:bg-muted"
          )}
        >
          {item.icon ? <Text className="text-base">{item.icon}</Text> : null}
          <Text
            className={cn(
              "flex-1 text-sm",
              item.active ? "font-medium text-primary" : "text-card-foreground"
            )}
          >
            {item.label}
          </Text>
          {item.badge ? (
            <View className="rounded-full bg-primary px-2 py-0.5">
              <Text className="text-xs text-primary-foreground">{item.badge}</Text>
            </View>
          ) : null}
        </Pressable>
      ))}
    </View>
  )
}
