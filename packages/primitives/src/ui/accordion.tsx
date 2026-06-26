import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  return (
    <View className="border-b border-border">
      <Pressable
        onPress={() => setOpen(!open)}
        className="flex-row items-center justify-between py-3 px-1"
      >
        <Text className="text-sm font-medium text-foreground">{title}</Text>
        <Text className={cn("text-xs text-muted-foreground transition-transform", open && "rotate-180")}>
          ▼
        </Text>
      </Pressable>
      {open ? <View className="pb-3 px-1">{children}</View> : null}
    </View>
  )
}

interface AccordionProps {
  children: React.ReactNode
}

export function Accordion({ children }: AccordionProps) {
  return <View className="divide-y divide-border rounded-lg border border-border">{children}</View>
}
