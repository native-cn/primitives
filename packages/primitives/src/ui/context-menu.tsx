import { useState } from "react"
import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface ContextMenuAction {
  label: string
  onPress: () => void
  destructive?: boolean
}

interface ContextMenuProps {
  actions: ContextMenuAction[]
  children: React.ReactNode
}

export function ContextMenu({ actions, children }: ContextMenuProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Pressable onLongPress={() => setVisible(true)}>{children}</Pressable>
      {visible ? (
        <Modal transparent animationType="fade" onRequestClose={() => setVisible(false)}>
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-end px-4 pb-8"
            onPress={() => setVisible(false)}
            activeOpacity={1}
          >
            <View className="rounded-xl bg-card overflow-hidden">
              {actions.map((action, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => { action.onPress(); setVisible(false) }}
                  className={cn(
                    "px-4 py-3.5 border-b border-border last:border-b-0 active:bg-muted"
                  )}
                >
                  <Text
                    className={cn(
                      "text-sm text-center",
                      action.destructive ? "text-destructive" : "text-card-foreground"
                    )}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  )
}
