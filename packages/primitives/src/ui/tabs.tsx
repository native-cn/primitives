import { createContext, useContext, type ReactNode } from "react"
import { View, Pressable, Text } from "react-native"
import { cn } from "../lib/utils"

type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error("Tabs compound components must be used within <Tabs />")
  return ctx
}

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View className="gap-4">{children}</View>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <View className={cn("flex-row rounded-lg bg-muted p-1", className)}>
      {children}
    </View>
  )
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabsContext()
  const selected = selectedValue === value

  return (
    <Pressable
      onPress={() => onValueChange(value)}
      className={cn(
        "flex-1 rounded-md px-3 py-1.5 items-center",
        selected ? "bg-background shadow-sm" : "",
        className
      )}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          selected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {children}
      </Text>
    </Pressable>
  )
}

interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: selectedValue } = useTabsContext()

  if (selectedValue !== value) return null

  return <View className={className}>{children}</View>
}
