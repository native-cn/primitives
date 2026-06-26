import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { View } from "react-native"
import { ThemeProvider, useTheme } from "@native-cn/primitives"
import { SiteHeader, SiteFooter } from "../components/site-nav"
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
      <View className="flex-1 bg-background">
        <SiteHeader />
        <View className="flex-1">
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <SiteFooter />
      </View>
    </ThemeProvider>
  )
}
