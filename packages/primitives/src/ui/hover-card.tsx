import { View, Text } from "react-native"

interface HoverCardProps {
  content: string
  children: React.ReactNode
}

export function HoverCard({ content, children }: HoverCardProps) {
  return <View>{children}</View>
}
