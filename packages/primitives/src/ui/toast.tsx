import { useEffect, useState, createContext, useContext, useCallback, type ReactNode } from "react"
import { View, Text, Pressable, Animated } from "react-native"
import { cn } from "../lib/utils"

type ToastVariant = "default" | "success" | "error" | "warning"

interface Toast {
  id: string
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const variantStyles: Record<ToastVariant, { bg: string; text: string; border: string }> = {
  default: { bg: "bg-card", text: "text-card-foreground", border: "border-border" },
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-800 dark:text-emerald-200",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950",
    text: "text-red-800 dark:text-red-200",
    border: "border-red-200 dark:border-red-800",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-800 dark:text-amber-200",
    border: "border-amber-200 dark:border-amber-800",
  },
}

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, variant: ToastVariant = "default") => {
      const id = `toast-${++toastCounter}`
      setToasts((prev) => [...prev, { id, message, variant }])
      setTimeout(() => dismiss(id), 4000)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <View className="absolute top-12 left-4 right-4 z-50 gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </View>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const opacity = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(3500),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onDismiss())
  }, [opacity, onDismiss])

  const styles = variantStyles[t.variant]

  return (
    <Animated.View style={{ opacity }} className="pointer-events-auto">
      <Pressable onPress={onDismiss}>
        <View
          className={cn(
            "rounded-lg border p-4 shadow-lg",
            styles.bg,
            styles.border
          )}
        >
          <Text className={cn("text-sm font-medium", styles.text)}>{t.message}</Text>
        </View>
      </Pressable>
    </Animated.View>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}
