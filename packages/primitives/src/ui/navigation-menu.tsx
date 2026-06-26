import { View, Text, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface NavigationMenuProps {
  items: { label: string; onPress: () => void; badge?: number }[]
  horizontal?: boolean
}

export function NavigationMenu({ items, horizontal = true }: NavigationMenuProps) {
  return (
    <View className={cn("gap-1", horizontal ? "flex-row" : "flex-col")}>
      {items.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={item.onPress}
          className="flex-row items-center gap-2 rounded-md px-3 py-2 active:bg-muted"
        >
          <Text className="text-sm text-foreground">{item.label}</Text>
          {item.badge ? (
            <View className="rounded-full bg-primary px-1.5 py-0.5">
              <Text className="text-xs text-primary-foreground">{item.badge}</Text>
            </View>
          ) : null}
        </Pressable>
      ))}
    </View>
  )
}
