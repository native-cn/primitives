import { View, Text } from "react-native"
import { cn } from "../lib/utils"
import type { ViewProps } from "react-native"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

interface BadgeProps extends ViewProps {
  variant?: BadgeVariant
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  outline: "border border-border",
}

const textStyles: Record<BadgeVariant, string> = {
  default: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <View
      className={cn(
        "rounded-full px-2.5 py-0.5",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <Text className={cn("text-xs font-medium", textStyles[variant])}>
        {children}
      </Text>
    </View>
  )
}
