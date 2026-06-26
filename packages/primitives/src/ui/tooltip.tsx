import { useState } from "react"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <View onTouchStart={() => setVisible(true)} onTouchEnd={() => setVisible(false)}>
        {children}
      </View>
      {visible ? (
        <Modal transparent animationType="fade" onRequestClose={() => setVisible(false)}>
          <TouchableOpacity
            className="flex-1 bg-black/30 justify-center items-center px-8"
            onPress={() => setVisible(false)}
            activeOpacity={1}
          >
            <View className="rounded-lg bg-card px-4 py-3 shadow-xl max-w-xs">
              <Text className="text-sm text-card-foreground text-center">{content}</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  )
}
