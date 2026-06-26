import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  return (
    <Modal transparent animationType="fade" visible={open} onRequestClose={() => onOpenChange(false)}>
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-center items-center px-6"
        onPress={() => onOpenChange(false)}
        activeOpacity={1}
      >
        <TouchableOpacity
          className="w-full max-w-sm rounded-xl bg-card p-6"
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {title ? (
            <Text className="text-lg font-semibold text-card-foreground mb-1">{title}</Text>
          ) : null}
          {description ? (
            <Text className="text-sm text-muted-foreground mb-4">{description}</Text>
          ) : null}
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

interface DialogFooterProps {
  className?: string
  children: React.ReactNode
}

export function DialogFooter({ className, children }: DialogFooterProps) {
  return (
    <View className={cn("flex-row gap-2 mt-4 justify-end", className)}>
      {children}
    </View>
  )
}

interface DialogCloseProps {
  onPress: () => void
  label?: string
}

export function DialogClose({ onPress, label = "Close" }: DialogCloseProps) {
  return (
    <Pressable onPress={onPress} className="rounded-md border border-input px-4 py-2">
      <Text className="text-sm font-medium text-foreground">{label}</Text>
    </Pressable>
  )
}
