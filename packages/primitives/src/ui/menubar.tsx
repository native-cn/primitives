import { View, Text, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface MenubarProps {
  items: { label: string; onPress: () => void; icon?: string }[]
}

export function Menubar({ items }: MenubarProps) {
  return (
    <View className="flex-row rounded-lg bg-muted p-1 gap-1">
      {items.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={item.onPress}
          className="flex-row items-center gap-1.5 rounded-md px-3 py-1.5 active:bg-background"
        >
          {item.icon ? <Text className="text-sm">{item.icon}</Text> : null}
          <Text className="text-sm font-medium text-foreground">{item.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}
