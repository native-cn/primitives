import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { Link, usePathname, useRouter } from "expo-router"
import { cn, useTheme } from "@native-cn/primitives"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Charts", href: "/charts" },
  { label: "Colors", href: "/colors" },
  { label: "Examples", href: "/examples" },
]

/* -------- Desktop nav (hidden on mobile) -------- */

function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <View className={cn("flex-row items-center gap-0", className)}>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href
        return (
          <Link key={item.href} href={item.href as any} asChild>
            <Pressable
              data-active={active}
              className="px-2.5 py-1.5"
            >
              <Text
                className={cn(
                  "text-sm",
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Text>
            </Pressable>
          </Link>
        )
      })}
    </View>
  )
}

/* -------- Mobile nav (hidden on desktop) -------- */

function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <View className={cn("relative", className)}>
      <Pressable
        onPress={() => setOpen(!open)}
        className="flex-row items-center gap-2.5 h-8 active:opacity-70"
      >
        <View className="relative size-4">
          <View
            className={cn(
              "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-100",
              open ? "top-[0.35rem] -rotate-45" : "top-1"
            )}
          />
          <View
            className={cn(
              "absolute left-0 h-0.5 w-4 bg-foreground transition-all duration-100",
              open ? "top-[0.35rem] rotate-45" : "top-2.5"
            )}
          />
        </View>
        <Text className="text-lg leading-none font-medium text-foreground">Menu</Text>
      </Pressable>

      {/* Backdrop overlay */}
      {open && (
        <>
          <Pressable
            onPress={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-background/80"
          />
          <View className="fixed left-0 right-0 top-12 bottom-0 z-50 overflow-y-auto bg-background px-6 py-6">
            <View className="gap-4">
              <Text className="text-sm font-medium text-muted-foreground">Menu</Text>
              <View className="gap-3">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Pressable
                      key={item.href}
                      onPress={() => { router.push(item.href as any); setOpen(false) }}
                    >
                      <Text
                        className={cn(
                          "text-2xl font-medium",
                          active ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>

            <View className="h-px bg-border my-8" />

            <View className="gap-4">
              <Text className="text-sm font-medium text-muted-foreground">Docs</Text>
              <View className="gap-3">
                {[
                  { name: "Getting Started", href: "/docs/getting-started" },
                  { name: "Components", href: "/docs/components" },
                  { name: "Theming", href: "/docs/theming" },
                  { name: "CLI", href: "/docs/cli" },
                  { name: "Changelog", href: "/docs" },
                ].map((item) => (
                  <Pressable
                    key={item.href}
                    onPress={() => { router.push(item.href as any); setOpen(false) }}
                  >
                    <Text className="text-2xl font-medium text-foreground">
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

/* -------- Site Header -------- */

export function SiteHeader() {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <View className="sticky top-0 z-50 bg-background border-b border-border">
      <View className="flex-row items-center h-12 px-4 xl:px-6">
        <MobileNav className="flex lg:hidden mr-3" />
        <MainNav className="hidden lg:flex" />
        <View className="ml-auto flex-row items-center gap-2">
          {/* Theme toggle */}
          <View className="w-px h-4 bg-border mx-1" />
          <Pressable
            onPress={toggleColorScheme}
            className="size-8 items-center justify-center active:opacity-70"
            aria-label={colorScheme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            <Text className="text-sm text-foreground">
              {colorScheme === "dark" ? "☀️" : "🌙"}
            </Text>
          </Pressable>

          {/* New button */}
          <View className="w-px h-4 bg-border mx-1" />
          <Link href="/create" asChild>
            <Pressable className="h-[31px] px-3 rounded-lg bg-primary items-center justify-center flex-row gap-1.5 active:opacity-80">
              <Text className="text-primary-foreground text-sm font-medium">+ New</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  )
}

/* -------- Site Footer (minimal — matches shadcn one-liner) -------- */

export function SiteFooter() {
  return (
    <View className="border-t border-border">
      <View className="h-14 items-center justify-center px-4 xl:px-6">
        <Text className="text-xs sm:text-sm text-center text-muted-foreground leading-loose">
          Built by{" "}
          <Text className="font-medium underline underline-offset-4 text-foreground">
            native-cn
          </Text>{" "}
          at{" "}
          <Text className="font-medium underline underline-offset-4 text-foreground">
            nativecn.com
          </Text>
          . The source code is available on{" "}
          <Text className="font-medium underline underline-offset-4 text-foreground">
            GitHub
          </Text>
          .
        </Text>
      </View>
    </View>
  )
}
