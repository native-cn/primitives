import { View } from "react-native"
import { cn } from "../lib/utils"

interface FormProps {
  children: React.ReactNode
  onSubmit?: () => void
  className?: string
}

export function Form({ children, onSubmit, className }: FormProps) {
  return (
    <View className={cn("gap-4", className)} onTouchEnd={onSubmit}>
      {children}
    </View>
  )
}
