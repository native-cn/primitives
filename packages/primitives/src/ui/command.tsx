import { useState } from "react"
import { View, Text, TextInput, Pressable, FlatList } from "react-native"
import { cn } from "../lib/utils"

interface CommandProps<T> {
  items: T[]
  filterKey: keyof T
  onSelect: (item: T) => void
  placeholder?: string
  renderItem: (item: T) => React.ReactNode
  emptyMessage?: string
}

export function Command<T>({
  items,
  filterKey,
  onSelect,
  placeholder = "Search...",
  renderItem,
  emptyMessage = "No results",
}: CommandProps<T>) {
  const [query, setQuery] = useState("")
  const filtered = items.filter((item) =>
    String(item[filterKey]).toLowerCase().includes(query.toLowerCase())
  )

  return (
    <View className="rounded-lg border border-border bg-card overflow-hidden">
      <View className="border-b border-border px-3 py-2">
        <TextInput
          className="h-8 text-sm text-foreground"
          placeholder={placeholder}
          placeholderTextColor="hsl(215, 20.2%, 65.1%)"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSelect(item)}
            className="px-3 py-2.5 active:bg-muted"
          >
            {renderItem(item)}
          </Pressable>
        )}
        ListEmptyComponent={
          <Text className="px-3 py-4 text-sm text-muted-foreground text-center">{emptyMessage}</Text>
        }
        className="max-h-60"
      />
    </View>
  )
}
