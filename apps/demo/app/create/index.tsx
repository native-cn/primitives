import { useState } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Separator,
  cn,
} from "@native-cn/primitives"

const TEMPLATES = [
  { id: "blank", name: "Blank", desc: "Start from scratch with a minimal setup." },
  { id: "dashboard", name: "Dashboard", desc: "Analytics, charts, and data views." },
  { id: "settings", name: "Settings", desc: "User preferences and account management." },
  { id: "auth", name: "Authentication", desc: "Login, signup, and password reset flows." },
]

const COMPONENTS = [
  { id: "all", name: "All Components", desc: "Every component in the library." },
  { id: "forms", name: "Forms & Inputs", desc: "Input, select, checkbox, radio, switch, textarea." },
  { id: "feedback", name: "Feedback", desc: "Alert, dialog, sheet, toast, progress." },
  { id: "navigation", name: "Navigation", desc: "Tabs, accordion, navigation-menu, breadcrumb." },
  { id: "overlay", name: "Overlays", desc: "Popover, tooltip, hover-card, dropdown-menu." },
]

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState("blank")
  const [selectedComponents, setSelectedComponents] = useState<string[]>(["all"])

  const toggleComponent = (id: string) => {
    if (id === "all") {
      setSelectedComponents(["all"])
      return
    }
    setSelectedComponents((prev) => {
      const withoutAll = prev.filter((p) => p !== "all")
      if (withoutAll.includes(id)) {
        return withoutAll.filter((p) => p !== id)
      }
      return [...withoutAll, id]
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-6 max-w-2xl mx-auto gap-8">
          <View className="flex-row items-center gap-2">
            <Link href="/" asChild>
              <Button variant="ghost" size="sm">
                <Text className="text-muted-foreground">← Back</Text>
              </Button>
            </Link>
            <Text className="text-2xl font-bold text-foreground">Create Project</Text>
          </View>

          <Card>
            <CardHeader>
              <Text className="text-lg font-semibold text-card-foreground">Choose a Template</Text>
              <Text className="text-sm text-muted-foreground">Start with a pre-built layout.</Text>
            </CardHeader>
            <CardContent className="gap-2">
              {TEMPLATES.map((t) => (
                <Pressable
                  key={t.id}
                  onPress={() => setSelectedTemplate(t.id)}
                  className={cn(
                    "p-3 rounded-lg border",
                    selectedTemplate === t.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  )}
                >
                  <Text className="text-sm font-medium text-foreground">{t.name}</Text>
                  <Text className="text-xs text-muted-foreground">{t.desc}</Text>
                </Pressable>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Text className="text-lg font-semibold text-card-foreground">Select Components</Text>
              <Text className="text-sm text-muted-foreground">Choose which components to include.</Text>
            </CardHeader>
            <CardContent className="gap-2 flex-row flex-wrap">
              {COMPONENTS.map((c) => {
                const selected = selectedComponents.includes(c.id) || selectedComponents.includes("all")
                return (
                  <Badge
                    key={c.id}
                    variant={selected ? "default" : "outline"}
                    onPress={() => toggleComponent(c.id)}
                  >
                    <Text
                      className={cn(
                        "text-xs",
                        selected ? "text-primary-foreground" : "text-foreground"
                      )}
                    >
                      {c.name}
                    </Text>
                  </Badge>
                )
              })}
            </CardContent>
          </Card>

          <Separator />

          <View className="items-center gap-3">
            <Button size="lg" className="w-full max-w-xs">
              <Text className="text-primary-foreground font-semibold">
                Create Project
              </Text>
            </Button>
            <Text className="text-xs text-muted-foreground text-center">
              This will scaffold a new Expo project with native-cn pre-configured.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
