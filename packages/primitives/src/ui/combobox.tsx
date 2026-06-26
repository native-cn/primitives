import { useState, useMemo } from "react"
import { View, Text, Pressable, Modal, TouchableOpacity, FlatList, TextInput } from "react-native"
import { cn } from "../lib/utils"

interface ComboboxOption {
  label: string
  value: string
}

interface ComboboxProps {
  value: string
  onValueChange: (value: string) => void
  options?: ComboboxOption[]
  items?: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function Combobox({
  value,
  onValueChange,
  options,
  items,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
}: ComboboxProps) {
  const resolvedOptions = options ?? items ?? []
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const selected = resolvedOptions.find((o) => o.value === value)

  const filtered = useMemo(
    () =>
      resolvedOptions.filter((o) =>
        o.label.toLowerCase().includes(query.toLowerCase())
      ),
    [resolvedOptions, query]
  )

  return (
    <View>
      <Pressable
        onPress={() => {
          setQuery("")
          setOpen(true)
        }}
        className="h-10 flex-row items-center justify-between rounded-md border border-input bg-background px-3"
      >
        <Text
          className={cn(
            "text-sm",
            selected ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Text className="text-xs text-muted-foreground">▼</Text>
      </Pressable>

      {open ? (
        <Modal
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center px-4"
            onPress={() => setOpen(false)}
            activeOpacity={1}
          >
            <TouchableOpacity
              className="rounded-xl bg-card overflow-hidden max-h-96"
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View className="border-b border-border px-3 py-2.5">
                <TextInput
                  className="h-9 text-sm text-foreground"
                  placeholder={searchPlaceholder}
                  placeholderTextColor="hsl(215, 20.2%, 65.1%)"
                  value={query}
                  onChangeText={setQuery}
                  autoCapitalize="none"
                  autoFocus
                />
              </View>
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      onValueChange(item.value)
                      setOpen(false)
                    }}
                    className={cn(
                      "px-4 py-3",
                      item.value === value ? "bg-primary/10" : ""
                    )}
                  >
                    <Text
                      className={cn(
                        "text-sm",
                        item.value === value
                          ? "font-medium text-primary"
                          : "text-card-foreground"
                      )}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <Text className="px-4 py-6 text-sm text-muted-foreground text-center">
                    {emptyMessage}
                  </Text>
                }
                className="max-h-72"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  )
}
