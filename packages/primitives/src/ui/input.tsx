import * as React from "react"
import { TextInput, Text, View, type TextInputProps } from "react-native"
import { cn } from "../lib/utils"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
}

const Input = React.forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <View className="gap-1">
        {label ? (
          <Text className="text-sm font-medium text-foreground">{label}</Text>
        ) : null}
        <TextInput
          ref={ref}
          className={cn(
            "h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground",
            error && "border-destructive",
            className
          )}
          placeholderTextColor="hsl(215, 20.2%, 65.1%)"
          {...props}
        />
        {error ? <Text className="text-xs text-destructive">{error}</Text> : null}
      </View>
    )
  }
)
Input.displayName = "Input"

export { Input }
