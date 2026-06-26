import { View, Text } from "react-native"
import { cn } from "../lib/utils"

interface BreadcrumbProps {
  items: { label: string; onPress?: () => void }[]
  separator?: string
}

export function Breadcrumb({ items, separator = "/" }: BreadcrumbProps) {
  return (
    <View className="flex-row items-center flex-wrap">
      {items.map((item, idx) => (
        <View key={idx} className="flex-row items-center">
          {idx > 0 ? (
            <Text className="text-xs text-muted-foreground mx-1.5">{separator}</Text>
          ) : null}
          <Text
            onPress={item.onPress}
            className={cn(
              "text-sm",
              item.onPress ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  )
}
