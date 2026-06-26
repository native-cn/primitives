import { View } from "react-native"
import { cn } from "../lib/utils"

interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
}

export function ButtonGroup({ children, orientation = "horizontal" }: ButtonGroupProps) {
  return (
    <View
      className={cn(
        "rounded-lg overflow-hidden border border-border",
        orientation === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      {children}
    </View>
  )
}
