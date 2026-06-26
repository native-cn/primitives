import { Pressable, Text } from "react-native"
import { cn } from "../lib/utils"

type ToggleVariant = "default" | "outline"

interface ToggleProps {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
  label: string
  variant?: ToggleVariant
  disabled?: boolean
}

const variantStyles: Record<ToggleVariant, string> = {
  default: "bg-muted data-[pressed=true]:bg-primary",
  outline: "border border-input data-[pressed=true]:bg-primary/10",
}

export function Toggle({
  pressed,
  onPressedChange,
  label,
  variant = "default",
  disabled,
}: ToggleProps) {
  return (
    <Pressable
      onPress={() => { if (!disabled) onPressedChange(!pressed) }}
      disabled={disabled}
      className={cn(
        "h-9 px-3 rounded-md items-center justify-center",
        disabled && "opacity-50",
        variantStyles[variant],
        pressed && "bg-primary"
      )}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          pressed ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {label}
      </Text>
    </Pressable>
  )
}
