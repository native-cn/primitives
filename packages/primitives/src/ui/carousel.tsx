import { FlatList, View, type ViewToken } from "react-native"
import { useCallback, useRef, useState } from "react"
import { cn } from "../lib/utils"

interface CarouselProps<T> {
  data: T[]
  renderItem: (item: T) => React.ReactNode
  className?: string
  onIndexChange?: (index: number) => void
}

export function Carousel<T>({
  data,
  renderItem,
  className,
  onIndexChange,
}: CarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0)

  const onViewRef = useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems[0]) {
      const idx = info.viewableItems[0].index ?? 0
      setActiveIndex(idx)
      onIndexChange?.(idx)
    }
  })

  return (
    <View className={cn("relative", className)}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <View className="w-full">{renderItem(item)}</View>}
        keyExtractor={(_, i) => String(i)}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      <View className="flex-row justify-center gap-1.5 mt-3">
        {data.map((_, i) => (
          <View
            key={i}
            className={cn(
              "h-1.5 rounded-full",
              i === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
            )}
          />
        ))}
      </View>
    </View>
  )
}
