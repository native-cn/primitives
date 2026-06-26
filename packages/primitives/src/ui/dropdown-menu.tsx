import { useState } from "react"
import { View, Text, Pressable, Modal, TouchableOpacity, FlatList } from "react-native"
import { cn } from "../lib/utils"

interface DropdownMenuItem {
  label: string
  value: string
  destructive?: boolean
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  onSelect: (value: string) => void
  title?: string
}

export function DropdownMenu({ trigger, items, onSelect, title }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <View>
      <Pressable onPress={() => setOpen(true)}>{trigger}</Pressable>
      {open ? (
        <Modal transparent animationType="fade" onRequestClose={() => setOpen(false)}>
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center px-6"
            onPress={() => setOpen(false)}
            activeOpacity={1}
          >
            <View className="rounded-xl bg-card overflow-hidden max-h-80">
              {title ? (
                <View className="px-4 py-3 border-b border-border">
                  <Text className="text-sm font-semibold text-card-foreground">{title}</Text>
                </View>
              ) : null}
              <FlatList
                data={items}
                keyExtractor={(i) => i.value}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => { onSelect(item.value); setOpen(false) }}
                    className="px-4 py-3 active:bg-muted"
                  >
                    <Text
                      className={cn(
                        "text-sm",
                        item.destructive ? "text-destructive" : "text-card-foreground"
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
