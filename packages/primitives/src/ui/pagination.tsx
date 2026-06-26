import { View, Text, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <View className="flex-row items-center justify-center gap-1">
      <Pressable
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-9 w-9 items-center justify-center rounded-md"
      >
        <Text className={cn("text-sm", currentPage <= 1 ? "text-muted-foreground/40" : "text-foreground")}>‹</Text>
      </Pressable>
      {pages.map((p) => (
        <Pressable
          key={p}
          onPress={() => onPageChange(p)}
          className={cn(
            "h-9 w-9 items-center justify-center rounded-md",
            p === currentPage ? "bg-primary" : ""
          )}
        >
          <Text
            className={cn(
              "text-sm",
              p === currentPage ? "font-medium text-primary-foreground" : "text-foreground"
            )}
          >
            {p}
          </Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-9 w-9 items-center justify-center rounded-md"
      >
        <Text className={cn("text-sm", currentPage >= totalPages ? "text-muted-foreground/40" : "text-foreground")}>›</Text>
      </Pressable>
    </View>
  )
}
