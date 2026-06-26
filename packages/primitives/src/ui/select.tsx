import { useState } from "react"
import { View, Text, Pressable, Modal, FlatList, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
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
            <View className="rounded-xl bg-card p-2 max-h-80">
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      onValueChange(item.value)
                      setOpen(false)
                    }}
                    className={cn(
                      "px-4 py-3 rounded-lg",
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
              />
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  )
}
