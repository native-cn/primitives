import { View } from "react-native"
import { cn } from "../lib/utils"

interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onValueChange: (value: number) => void
}

export function Slider({ value, min = 0, max = 100, step = 1 }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <View className="h-7 justify-center">
      <View className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <View className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </View>
    </View>
  )
}
