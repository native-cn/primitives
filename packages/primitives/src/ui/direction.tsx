import { createContext, useContext, useState, useCallback } from "react"
import { I18nManager, View } from "react-native"
import { cn } from "../lib/utils"

type Direction = "ltr" | "rtl"

interface DirectionContextValue {
  direction: Direction
  setDirection: (dir: Direction) => void
  toggleDirection: () => void
  isRTL: boolean
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: "ltr",
  setDirection: () => {},
  toggleDirection: () => {},
  isRTL: false,
})

export function useDirection(): DirectionContextValue {
  return useContext(DirectionContext)
}

interface DirectionProviderProps {
  children: React.ReactNode
  initialDirection?: Direction
}

export function DirectionProvider({
  children,
  initialDirection,
}: DirectionProviderProps) {
  const [direction, setDirectionState] = useState<Direction>(
    initialDirection ?? (I18nManager.isRTL ? "rtl" : "ltr")
  )

  const setDirection = useCallback((dir: Direction) => {
    setDirectionState(dir)
    I18nManager.allowRTL(dir === "rtl")
    I18nManager.forceRTL(dir === "rtl")
  }, [])

  const toggleDirection = useCallback(() => {
    setDirection(direction === "ltr" ? "rtl" : "ltr")
  }, [direction, setDirection])

  return (
    <DirectionContext.Provider
      value={{ direction, setDirection, toggleDirection, isRTL: direction === "rtl" }}
    >
      <View className={cn(direction === "rtl" && "flex-row-reverse")}>
        {children}
      </View>
    </DirectionContext.Provider>
  )
}
