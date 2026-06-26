import { View } from "react-native"
import { cn } from "../lib/utils"

interface ResizableProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
}

export function Resizable({ children, direction = "horizontal" }: ResizableProps) {
  return (
    <View className={cn("flex", direction === "horizontal" ? "flex-row" : "flex-col")}>
      {children}
    </View>
  )
}
