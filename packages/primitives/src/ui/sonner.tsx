import { useEffect, useRef } from "react"
import { View, Text, Animated } from "react-native"
import { cn } from "../lib/utils"

type SonnerVariant = "default" | "success" | "error" | "info"

interface SonnerProps {
  message: string
  variant?: SonnerVariant
  duration?: number
  onDismiss: () => void
}

const variantStyles: Record<SonnerVariant, string> = {
  default: "bg-card border-border",
  success: "bg-emerald-50 border-emerald-500",
  error: "bg-destructive/10 border-destructive",
  info: "bg-blue-50 border-blue-500",
}

const variantText: Record<SonnerVariant, string> = {
  default: "text-card-foreground",
  success: "text-emerald-800",
  error: "text-destructive",
  info: "text-blue-800",
}

export function Sonner({ message, variant = "default", duration = 3000, onDismiss }: SonnerProps) {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(duration),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onDismiss())
  }, [])

  return (
    <Animated.View
      className={cn(
        "absolute bottom-4 left-4 right-4 rounded-lg border p-4 shadow-lg",
        variantStyles[variant]
      )}
      style={{ opacity: opacity as unknown as number }}
    >
      <Text className={cn("text-sm font-medium", variantText[variant])}>{message}</Text>
    </Animated.View>
  )
}
