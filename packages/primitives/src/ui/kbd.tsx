import { Text } from "react-native"
import { cn } from "../lib/utils"

interface KbdProps {
  children: string
}

export function Kbd({ children }: KbdProps) {
  return (
    <Text className={cn(
      "inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5",
      "text-xs font-mono text-muted-foreground"
    )}>
      {children}
    </Text>
  )
}
