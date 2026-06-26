import { TextInput } from "react-native"
import { cn } from "../lib/utils"
import type { TextInputProps } from "react-native"

interface TextareaProps extends TextInputProps {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <TextInput
      className={cn(
        "min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
        className
      )}
      placeholderTextColor="hsl(215, 20.2%, 65.1%)"
      multiline
      textAlignVertical="top"
      {...props}
    />
  )
}
