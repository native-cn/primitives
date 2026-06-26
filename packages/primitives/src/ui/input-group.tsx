import { View, Text, TextInput } from "react-native"
import { cn } from "../lib/utils"
import type { TextInputProps } from "react-native"

interface InputGroupProps extends TextInputProps {
  label?: string
  error?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

export function InputGroup({
  label,
  error,
  startAdornment,
  endAdornment,
  className,
  ...props
}: InputGroupProps) {
  return (
    <View className="gap-1">
      {label ? (
        <Text className="text-sm font-medium text-foreground mb-0.5">{label}</Text>
      ) : null}
      <View
        className={cn(
          "flex-row items-center rounded-md border bg-background",
          error ? "border-destructive" : "border-input"
        )}
      >
        {startAdornment ? (
          <View className="pl-3">{startAdornment}</View>
        ) : null}
        <TextInput
          className={cn(
            "flex-1 h-10 px-3 text-sm text-foreground",
            startAdornment && "pl-1",
            endAdornment && "pr-1",
            className
          )}
          placeholderTextColor="hsl(215, 20.2%, 65.1%)"
          {...props}
        />
        {endAdornment ? (
          <View className="pr-3">{endAdornment}</View>
        ) : null}
      </View>
      {error ? (
        <Text className="text-xs text-destructive">{error}</Text>
      ) : null}
    </View>
  )
}
