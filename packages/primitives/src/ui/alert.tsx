import { View, Text } from "react-native"
import { cn } from "../lib/utils"

type AlertVariant = "default" | "destructive"

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
}

const variantStyles: Record<AlertVariant, string> = {
  default: "bg-muted border-border",
  destructive: "bg-destructive/10 border-destructive",
}

const titleStyles: Record<AlertVariant, string> = {
  default: "text-foreground",
  destructive: "text-destructive",
}

const descStyles: Record<AlertVariant, string> = {
  default: "text-muted-foreground",
  destructive: "text-destructive/80",
}

export function Alert({ variant = "default", title, children }: AlertProps) {
  return (
    <View className={cn("rounded-lg border p-4", variantStyles[variant])}>
      {title ? (
        <Text className={cn("text-sm font-semibold mb-1", titleStyles[variant])}>{title}</Text>
      ) : null}
      <Text className={cn("text-sm", descStyles[variant])}>{children}</Text>
    </View>
  )
}
