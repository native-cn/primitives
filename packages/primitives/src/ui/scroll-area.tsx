import { ScrollView } from "react-native"
import { cn } from "../lib/utils"
import type { ScrollViewProps } from "react-native"

interface ScrollAreaProps extends ScrollViewProps {}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollView
      className={cn("rounded-lg border border-border bg-background", className)}
      showsVerticalScrollIndicator
      {...props}
    >
      {children}
    </ScrollView>
  )
}
