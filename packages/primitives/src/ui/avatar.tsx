import { View, Text, Image } from "react-native"
import { cn } from "../lib/utils"

type AvatarSize = "sm" | "default" | "lg" | "xl"

interface AvatarProps {
  src?: string | null
  alt: string
  size?: AvatarSize
  fallback?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  default: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

const textSizes: Record<AvatarSize, string> = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
  xl: "text-xl",
}

export function Avatar({ src, alt, size = "default", fallback }: AvatarProps) {
  const initials = fallback || alt.slice(0, 2).toUpperCase()

  return (
    <View className={cn("rounded-full bg-muted items-center justify-center overflow-hidden", sizeClasses[size])}>
      {src ? (
        <Image source={{ uri: src }} className="h-full w-full" accessibilityLabel={alt} />
      ) : (
        <Text className={cn("font-medium text-muted-foreground", textSizes[size])}>{initials}</Text>
      )}
    </View>
  )
}
