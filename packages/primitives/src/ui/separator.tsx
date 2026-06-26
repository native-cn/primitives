import { View } from "react-native"
import { cn } from "../lib/utils"
import type { ViewProps } from "react-native"

interface SeparatorProps extends ViewProps {
  orientation?: "horizontal" | "vertical"
}

export function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <View
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
}
