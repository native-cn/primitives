import { View, Pressable, Text } from "react-native"
import { cn } from "../lib/utils"

interface RadioGroupProps {
  value: string
  onValueChange: (value: string) => void
  options: { label: string; value: string }[]
}

export function RadioGroup({ value, onValueChange, options }: RadioGroupProps) {
  return (
    <View className="gap-2">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <Pressable
            key={opt.value}
            onPress={() => onValueChange(opt.value)}
            className="flex-row items-center gap-3"
          >
            <View
              className={cn(
                "h-5 w-5 rounded-full border-2 items-center justify-center",
                selected ? "border-primary" : "border-input"
              )}
            >
              {selected ? (
                <View className="h-2.5 w-2.5 rounded-full bg-primary" />
              ) : null}
            </View>
            <Text className="text-sm text-foreground">{opt.label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
