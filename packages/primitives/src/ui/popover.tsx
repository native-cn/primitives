import { useRef, useState } from "react"
import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native"
import { cn } from "../lib/utils"

interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export function Popover({ trigger, children }: PopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <View>
      <Pressable onPress={() => setOpen(true)}>{trigger}</Pressable>
      {open ? (
        <Modal transparent animationType="fade" onRequestClose={() => setOpen(false)}>
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center px-6"
            onPress={() => setOpen(false)}
            activeOpacity={1}
          >
            <TouchableOpacity
              className="w-72 rounded-xl bg-card p-4 shadow-xl"
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {children}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  )
}
