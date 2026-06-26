import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: React.ReactNode
}

export function Drawer({ open, onOpenChange, title, children }: DrawerProps) {
  return (
    <Modal transparent animationType="slide" visible={open} onRequestClose={() => onOpenChange(false)}>
      <TouchableOpacity
        className="flex-1 bg-black/50"
        onPress={() => onOpenChange(false)}
        activeOpacity={1}
      >
        <TouchableOpacity
          className="mt-auto bg-card rounded-t-2xl p-6 pb-10 min-h-[40%]"
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto mb-4" />
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

export function DrawerFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <View className={cn("flex-row gap-2 mt-4", className)}>{children}</View>
}
