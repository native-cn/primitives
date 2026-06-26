import { View, Text } from "react-native"
import { cn } from "../lib/utils"

interface ItemProps {
  label: string
  value?: string
  className?: string
}

export function Item({ label, value, className }: ItemProps) {
  return (
    <View className={cn("flex-row justify-between items-center py-2", className)}>
      <Text className="text-sm text-muted-foreground">{label}</Text>
      {value ? <Text className="text-sm text-foreground font-medium">{value}</Text> : null}
    </View>
  )
}
