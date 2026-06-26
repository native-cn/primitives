import { View } from "react-native"
import { cn } from "../lib/utils"

interface ToggleGroupProps {
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
}

export function ToggleGroup({ children, orientation = "horizontal" }: ToggleGroupProps) {
  return (
    <View
      className={cn(
        "gap-px",
        orientation === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      {children}
    </View>
  )
}
