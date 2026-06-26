import { View, Text } from "react-native"
import { cn } from "../lib/utils"

interface FieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function Field({ label, error, required, children }: FieldProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-medium text-foreground">
        {label}
        {required ? <Text className="text-destructive ml-0.5">*</Text> : null}
      </Text>
      {children}
      {error ? <Text className="text-xs text-destructive">{error}</Text> : null}
    </View>
  )
}

interface FieldGroupProps {
  children: React.ReactNode
  className?: string
}

export function FieldGroup({ children, className }: FieldGroupProps) {
  return <View className={cn("gap-4", className)}>{children}</View>
}
