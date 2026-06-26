import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import { ThemeProvider, useTheme } from "@native-cn/primitives"
import "../global.css"

function ThemedStatusBar() {
  const { colorScheme } = useTheme()

  useEffect(() => {
    document?.documentElement?.classList?.toggle?.("dark", colorScheme === "dark")
  }, [colorScheme])

  return <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
}

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="neutral">
      <ThemedStatusBar />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  )
}
