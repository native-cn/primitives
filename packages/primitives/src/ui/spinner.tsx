import { ActivityIndicator, View, Text } from "react-native"
import { cn } from "../lib/utils"
import type { ViewProps } from "react-native"

interface SpinnerProps extends ViewProps {
  size?: "sm" | "default" | "lg"
  label?: string
}

const sizeMap = {
  sm: "small",
  default: "small",
  lg: "large",
} as const

export function Spinner({
  size = "default",
  label,
  className,
  ...props
}: SpinnerProps) {
  return (
    <View className={cn("flex-row items-center gap-2", className)} {...props}>
      <ActivityIndicator size={sizeMap[size]} color="hsl(346, 62%, 54%)" />
      {label ? (
        <Text className="text-sm text-muted-foreground">{label}</Text>
      ) : null}
    </View>
  )
}
