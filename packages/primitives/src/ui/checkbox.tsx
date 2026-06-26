import { Pressable, View, Text } from "react-native"
import { cn } from "../lib/utils"

interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled,
}: CheckboxProps) {
  return (
    <Pressable
      role="checkbox"
      aria-checked={checked}
      onPress={() => { if (!disabled) onCheckedChange(!checked) }}
      disabled={disabled}
      className={cn(
        "flex-row items-center gap-2",
        disabled && "opacity-50"
      )}
    >
      <View
        className={cn(
          "h-5 w-5 rounded border-2 items-center justify-center",
          checked
            ? "border-primary bg-primary"
            : "border-input bg-background"
        )}
      >
        {checked ? (
          <Text className="text-xs font-bold text-primary-foreground">✓</Text>
        ) : null}
      </View>
      {label ? (
        <Text className="text-sm text-foreground">{label}</Text>
      ) : null}
    </Pressable>
  )
}
