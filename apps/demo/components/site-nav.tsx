import { useState } from "react"
import { View, Text, Pressable, ScrollView } from "react-native"
import { Link, usePathname } from "expo-router"
import { cn, useTheme, Button } from "@native-cn/primitives"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Charts", href: "/charts" },
  { label: "Colors", href: "/colors" },
  { label: "Examples", href: "/examples" },
  { label: "Create", href: "/create" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <View className="border-b border-border bg-background/95 backdrop-blur-sm">
      <View className="flex-row items-center justify-between h-14 px-4 max-w-6xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center gap-2">
            <View className="size-7 rounded-md bg-primary items-center justify-center">
              <Text className="text-primary-foreground font-bold text-xs">nc</Text>
            </View>
            <Text className="font-semibold text-foreground text-base hidden sm:flex">
              native-cn
            </Text>
          </Pressable>
        </Link>

        {/* Desktop nav */}
        <View className="hidden md:flex-row items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.href} href={item.href as any} asChild>
                <Pressable
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm",
                    active ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  <Text className={active ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            )
          })}
        </View>

        {/* Right side */}
        <View className="flex-row items-center gap-2">
          {/* Theme toggle — desktop */}
          <Pressable
            onPress={toggleColorScheme}
            className="hidden md:flex size-8 items-center justify-center rounded-md border border-border active:bg-muted"
            aria-label="Toggle color scheme"
          >
            <Text className="text-sm text-foreground">
              {colorScheme === "dark" ? "☀️" : "🌙"}
            </Text>
          </Pressable>

          {/* Mobile hamburger */}
          <Pressable
            onPress={() => setMenuOpen(!menuOpen)}
            className="md:hidden size-8 items-center justify-center rounded-md border border-border active:bg-muted"
            aria-label="Toggle menu"
          >
            <Text className="text-lg text-foreground">{menuOpen ? "✕" : "☰"}</Text>
          </Pressable>
        </View>
      </View>

      {/* Mobile menu */}
      {menuOpen && (
        <View className="md:hidden border-t border-border p-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.href} href={item.href as any} asChild>
                <Pressable
                  onPress={() => setMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-md",
                    active ? "bg-muted" : "active:bg-muted/50"
                  )}
                >
                  <Text className={active ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            )
          })}
          <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-border">
            <Text className="text-sm text-muted-foreground">
              {colorScheme === "dark" ? "Dark mode" : "Light mode"}
            </Text>
            <Button variant="outline" size="sm" onPress={toggleColorScheme}>
              <Text className="text-xs text-foreground">Toggle</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

export function SiteFooter() {
  return (
    <View className="border-t border-border bg-background">
      <View className="max-w-6xl mx-auto w-full px-4 py-8 flex-row flex-wrap gap-8">
        <View className="flex-1 min-w-[200px] gap-2">
          <Text className="font-semibold text-foreground text-sm">native-cn</Text>
          <Text className="text-xs text-muted-foreground">
            shadcn/ui primitives for React Native.
          </Text>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-medium text-foreground uppercase tracking-wider">Docs</Text>
          <Link href="/docs/getting-started"><Text className="text-xs text-muted-foreground">Getting Started</Text></Link>
          <Link href="/docs/components"><Text className="text-xs text-muted-foreground">Components</Text></Link>
          <Link href="/docs/cli"><Text className="text-xs text-muted-foreground">CLI</Text></Link>
          <Link href="/docs/theming"><Text className="text-xs text-muted-foreground">Theming</Text></Link>
        </View>
        <View className="gap-2">
          <Text className="text-xs font-medium text-foreground uppercase tracking-wider">More</Text>
          <Link href="/charts"><Text className="text-xs text-muted-foreground">Charts</Text></Link>
          <Link href="/colors"><Text className="text-xs text-muted-foreground">Colors</Text></Link>
          <Link href="/examples"><Text className="text-xs text-muted-foreground">Examples</Text></Link>
          <Link href="/create"><Text className="text-xs text-muted-foreground">Create</Text></Link>
        </View>
      </View>
      <View className="border-t border-border py-4">
        <Text className="text-xs text-muted-foreground text-center">
          MIT License — {new Date().getFullYear()}
        </Text>
      </View>
    </View>
  )
}
