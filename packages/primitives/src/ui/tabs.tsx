import { View, Pressable, Text } from "react-native"
import { cn } from "../lib/utils"

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  options: { label: string; value: string }[]
}

export function Tabs({ value, onValueChange, options }: TabsProps) {
  return (
    <View className="flex-row rounded-lg bg-muted p-1">
      {options.map((opt) => (
        <Pressable
          key={opt.value}
          onPress={() => onValueChange(opt.value)}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 items-center",
            value === opt.value ? "bg-background shadow-sm" : ""
          )}
        >
          <Text
            className={cn(
              "text-sm font-medium",
              value === opt.value ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}
