import { View, Text } from "react-native"
import { cn } from "../lib/utils"

interface TableProps {
  children: React.ReactNode
}

export function Table({ children }: TableProps) {
  return <View className="w-full rounded-lg border border-border">{children}</View>
}

interface TableHeaderProps {
  children: React.ReactNode
}

export function TableHeader({ children }: TableHeaderProps) {
  return <View className="flex-row bg-muted border-b border-border">{children}</View>
}

interface TableRowProps {
  children: React.ReactNode
  className?: string
}

export function TableRow({ children, className }: TableRowProps) {
  return <View className={cn("flex-row border-b border-border last:border-b-0", className)}>{children}</View>
}

interface TableHeadProps {
  children: React.ReactNode
  className?: string
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <View className={cn("flex-1 px-3 py-3", className)}>
      <Text className="text-xs font-medium text-muted-foreground uppercase">{children}</Text>
    </View>
  )
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <View className={cn("flex-1 px-3 py-3", className)}>
      {typeof children === "string" ? (
        <Text className="text-sm text-foreground">{children}</Text>
      ) : children}
    </View>
  )
}
