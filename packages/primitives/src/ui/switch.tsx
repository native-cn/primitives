import { Pressable, View } from "react-native"
import { cn } from "../lib/utils"

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({
  checked,
  onCheckedChange,
  disabled,
}: SwitchProps) {
  return (
    <Pressable
      role="switch"
      aria-checked={checked}
      onPress={() => { if (!disabled) onCheckedChange(!checked) }}
      disabled={disabled}
      className={cn(
        "h-6 w-11 rounded-full p-0.5 flex-row",
        checked ? "bg-primary" : "bg-input",
        disabled && "opacity-50"
      )}
    >
      <View
        className={cn(
          "h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
          checked && "translate-x-5"
        )}
      />
    </Pressable>
  )
}
