import { View, Text } from "react-native"
import { cn } from "../lib/utils"

interface EmptyProps {
  title?: string
  description?: string
  icon?: string
  action?: React.ReactNode
}

export function Empty({
  title = "No results",
  description,
  icon = "📭",
  action,
}: EmptyProps) {
  return (
    <View className="items-center justify-center py-12 px-6">
      <Text className="text-3xl mb-3">{icon}</Text>
      <Text className="text-base font-medium text-foreground text-center">{title}</Text>
      {description ? (
        <Text className="text-sm text-muted-foreground text-center mt-1">{description}</Text>
      ) : null}
      {action ? <View className="mt-4">{action}</View> : null}
    </View>
  )
}
