import { useRef, createRef } from "react"
import { View, TextInput, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface InputOtpProps {
  length?: number
  value: string
  onValueChange: (value: string) => void
}

export function InputOtp({ length = 6, value, onValueChange }: InputOtpProps) {
  const refs = useRef(Array.from({ length }, () => createRef<TextInput>()))

  const digits = value.split("").concat(Array(length - value.length).fill(""))

  function handleChange(text: string, idx: number) {
    const newVal = value.slice(0, idx) + text.slice(-1) + value.slice(idx + 1)
    onValueChange(newVal.slice(0, length))
    if (text && idx < length - 1) {
      refs.current[idx + 1]?.current?.focus()
    }
  }

  function handleKeyPress(key: string, idx: number) {
    if (key === "Backspace" && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.current?.focus()
    }
  }

  return (
    <View className="flex-row gap-2 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <Pressable key={idx} onPress={() => refs.current[idx]?.current?.focus()}>
          <View
            className={cn(
              "h-12 w-10 rounded-md border bg-background items-center justify-center",
              digits[idx] ? "border-primary" : "border-input"
            )}
          >
            <TextInput
              ref={refs.current[idx]}
              className="h-full w-full text-center text-base text-foreground"
              maxLength={1}
              value={digits[idx] || ""}
              onChangeText={(t) => handleChange(t, idx)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
              caretHidden
            />
          </View>
        </Pressable>
      ))}
    </View>
  )
}
