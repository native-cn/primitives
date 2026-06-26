import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  cancelLabel?: string
  actionLabel?: string
  onCancel?: () => void
  onAction?: () => void
  variant?: "default" | "destructive"
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  onCancel,
  onAction,
  variant = "default",
}: AlertDialogProps) {
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
          <Text className="text-lg font-semibold text-card-foreground mb-1">{title}</Text>
          {description ? (
            <Text className="text-sm text-muted-foreground mb-6">{description}</Text>
          ) : null}
          <View className="flex-row gap-2 justify-end">
            <Pressable
              onPress={() => { onCancel?.(); onOpenChange(false) }}
              className="rounded-md border border-input px-4 py-2"
            >
              <Text className="text-sm font-medium text-foreground">{cancelLabel}</Text>
            </Pressable>
            <Pressable
              onPress={() => { onAction?.(); onOpenChange(false) }}
              className={cn(
                "rounded-md px-4 py-2",
                variant === "destructive" ? "bg-destructive" : "bg-primary"
              )}
            >
              <Text className="text-sm font-medium text-primary-foreground">{actionLabel}</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}
