import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  side?: "bottom" | "top" | "left" | "right"
  children: React.ReactNode
}

const sideClasses: Record<string, string> = {
  bottom: "mt-auto rounded-t-2xl pb-8",
  top: "mb-auto rounded-b-2xl pt-8",
  left: "mr-auto h-full rounded-r-2xl",
  right: "ml-auto h-full rounded-l-2xl",
}

export function Sheet({
  open,
  onOpenChange,
  title,
  side = "bottom",
  children,
}: SheetProps) {
  return (
    <Modal transparent animationType="slide" visible={open} onRequestClose={() => onOpenChange(false)}>
      <TouchableOpacity
        className="flex-1 bg-black/50"
        onPress={() => onOpenChange(false)}
        activeOpacity={1}
      >
        <TouchableOpacity
          className={cn("bg-card p-6", sideClasses[side])}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row items-center justify-between mb-4">
            {title ? (
              <Text className="text-lg font-semibold text-card-foreground">{title}</Text>
            ) : <View />}
            <Pressable onPress={() => onOpenChange(false)}>
              <Text className="text-muted-foreground">✕</Text>
            </Pressable>
          </View>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}
