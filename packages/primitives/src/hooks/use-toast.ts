import { useState, useCallback } from "react"

interface ToastState {
  message: string
  variant?: "default" | "success" | "error" | "info"
  visible: boolean
}

interface UseToastReturn {
  toast: (message: string, variant?: ToastState["variant"]) => void
  dismiss: () => void
  state: ToastState
}

export function useToast(): UseToastReturn {
  const [state, setState] = useState<ToastState>({ message: "", visible: false })

  const toast = useCallback((message: string, variant?: ToastState["variant"]) => {
    setState({ message, variant, visible: true })
  }, [])

  const dismiss = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }))
  }, [])

  return { toast, dismiss, state }
}
