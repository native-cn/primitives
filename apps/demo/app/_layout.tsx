import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import "../global.css"

declare module "nativewind" {
  interface NativeWind {
    theme: string
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  useEffect(() => {
    document?.documentElement?.classList?.toggle?.("dark", colorScheme === "dark")
  }, [colorScheme])

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
