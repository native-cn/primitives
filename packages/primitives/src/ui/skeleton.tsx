import { View, type ViewStyle, type ViewProps, type DimensionValue } from "react-native"
import { cn } from "../lib/utils"

interface SkeletonProps {
  width?: DimensionValue
  height?: DimensionValue
  rounded?: "sm" | "md" | "lg" | "full"
  className?: string
  style?: ViewStyle
}

function Skeleton({
  width,
  height = 20,
  rounded = "md",
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <View
      className={cn(
        "bg-muted animate-pulse",
        rounded === "sm" && "rounded-sm",
        rounded === "md" && "rounded-md",
        rounded === "lg" && "rounded-lg",
        rounded === "full" && "rounded-full",
        className
      )}
      style={[{ width, height } as ViewStyle, style]}
      {...props}
    />
  )
}

function SkeletonCard({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("rounded-lg border border-border bg-card p-4", className)}
      {...props}
    >
      <Skeleton width="60%" height={16} className="mb-3" />
      <Skeleton width="100%" height={12} className="mb-2" />
      <Skeleton width="80%" height={12} className="mb-4" />
      <Skeleton width="40%" height={12} />
    </View>
  )
}

function SkeletonList({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <View className={cn("gap-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  )
}

export { Skeleton, SkeletonCard, SkeletonList }
