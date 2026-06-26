import { View } from "react-native"
import { cn } from "../lib/utils"
import type { ViewProps } from "react-native"

interface ProgressProps extends ViewProps {
  value: number
  max?: number
}

export function Progress({
  value,
  max = 100,
  className,
  ...props
}: ProgressProps) {
  const pct = Math.min(Math.max(value / max, 0), 1) * 100

  return (
    <View
      className={cn("h-2 w-full rounded-full bg-muted overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      {...props}
    >
      <View
        className="h-full rounded-full bg-primary"
        style={{ width: `${pct}%` }}
      />
    </View>
  )
}
