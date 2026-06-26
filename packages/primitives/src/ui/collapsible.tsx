import { PropsWithChildren, useState } from "react"
import { Pressable, View, Text } from "react-native"
import { cn } from "../lib/utils"

export function Collapsible({
  children,
  title,
  className,
}: PropsWithChildren & { title: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View className={cn("rounded-lg border border-border", className)}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between px-4 py-3 active:bg-muted"
      >
        <Text className="text-sm font-medium text-foreground">{title}</Text>
        <Text className="text-xs text-muted-foreground">{isOpen ? "▼" : "▶"}</Text>
      </Pressable>
      {isOpen ? <View className="px-4 pb-3">{children}</View> : null}
    </View>
  )
}
