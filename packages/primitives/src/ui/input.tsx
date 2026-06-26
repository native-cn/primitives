import * as React from "react"
import { TextInput, Text, type TextInputProps } from "react-native"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { cn } from "../lib/utils"

const PLACEHOLDER_COLORS = {
  light: "hsl(215.4, 16.3%, 46.9%)",
  dark: "hsl(215, 20.2%, 65.1%)",
}

interface InputProps extends TextInputProps {
  label?: string
  error?: string
}

const Input = React.forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const scheme = useColorScheme()
    const placeholderColor = PLACEHOLDER_COLORS[scheme === "dark" ? "dark" : "light"]

    return (
      <React.Fragment>
        {label ? (
          <Text className="mb-1.5 text-sm font-medium text-foreground">{label}</Text>
        ) : null}
        <TextInput
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          placeholderTextColor={placeholderColor}
          {...props}
        />
        {error ? (
          <Text className="mt-1 text-xs text-destructive">{error}</Text>
        ) : null}
      </React.Fragment>
    )
  }
)

Input.displayName = "Input"

export { Input, type InputProps }
