import { View, Text, ScrollView } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Button, cn } from "@native-cn/primitives"
import registry from "@native-cn/primitives/registry"

const Code = ({ code }: { code: string }) => (
  <View className="bg-muted rounded-lg p-3">
    <Text className="text-sm text-foreground font-mono">{code}</Text>
  </View>
)

const TYPE_LABELS: Record<string, string> = {
  "registry:ui": "Component",
  "registry:hook": "Hook",
  "registry:example": "Example",
  "registry:lib": "Utility",
}

const TYPE_COLORS: Record<string, string> = {
  "registry:ui": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "registry:hook": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "registry:example": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "registry:lib": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
}

export default function ComponentDetail() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const item = registry.items.find((i) => i.name === name)

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-lg font-semibold text-foreground mb-2">Component not found</Text>
        <Text className="text-muted-foreground mb-4">"{name}" is not in the registry</Text>
        <Button variant="outline" onPress={() => router.push("/docs/components" as any)}>
          <Text className="text-foreground">← Back to Components</Text>
        </Button>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-3xl gap-8">
        {/* Header */}
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Button variant="ghost" size="sm" onPress={() => router.push("/docs/components" as any)}>
              <Text className="text-muted-foreground">← Components</Text>
            </Button>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-3xl font-bold text-foreground">{name}</Text>
            <View className={cn("px-2 py-0.5 rounded-full", TYPE_COLORS[item.type])}>
              <Text className="text-xs font-medium">{TYPE_LABELS[item.type] || item.type}</Text>
            </View>
          </View>
        </View>

        {/* Files */}
        <Section title="Source Files">
          <View className="gap-1">
            {item.files.map((f) => (
              <Code key={f.path} code={`@native-cn/primitives/${f.path}`} />
            ))}
          </View>
        </Section>

        {/* Dependencies */}
        {item.dependencies.length > 0 && (
          <Section title="npm Dependencies">
            <View className="flex-row flex-wrap gap-1.5">
              {item.dependencies.map((dep) => (
                <View key={dep} className="px-2.5 py-1 rounded-full bg-muted border border-border">
                  <Text className="text-sm text-foreground">{dep}</Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* Registry Dependencies */}
        {item.registryDependencies.length > 0 && (
          <Section title="Registry Dependencies">
            <View className="flex-row flex-wrap gap-1.5">
              {item.registryDependencies.map((dep) => {
                const depItem = registry.items.find((i) => i.name === dep)
                return (
                  <Button key={dep} variant="outline" size="sm" onPress={() => router.push(`/docs/components/${dep}` as any)}>
                    <Text className="text-foreground text-sm">{dep}</Text>
                  </Button>
                )
              })}
            </View>
          </Section>
        )}

        {/* Related Examples */}
        {registry.items
          .filter((i) => i.type === "registry:example" && i.registryDependencies.includes(name))
          .length > 0 && (
          <Section title="Examples">
            {registry.items
              .filter((i) => i.type === "registry:example" && i.registryDependencies.includes(name) && i.name !== `${name}-examples`)
              .map((ex) => (
                <Button key={ex.name} variant="outline" onPress={() => router.push(`/docs/components/${ex.name}` as any)}>
                  <Text className="text-foreground">{ex.name}</Text>
                </Button>
              ))}
            {registry.items.find((i) => i.name === `${name}-examples`) && (
              <Button onPress={() => router.push(`/examples` as any)}>
                <Text className="text-primary-foreground">View Live Examples →</Text>
              </Button>
            )}
          </Section>
        )}

        {/* Install */}
        <Section title="Install">
          <Code code={`npx native-cn add ${name}`} />
          <Text className="text-sm text-muted-foreground mt-1">
            Or import directly: import {'{'} {componentExport(name)} {'}'} from "@native-cn/primitives"
          </Text>
        </Section>

        {/* Notes */}
        {item.notes && (
          <Section title="Notes">
            <Text className="text-foreground leading-relaxed">{item.notes}</Text>
          </Section>
        )}
      </View>
    </ScrollView>
  )
}

function componentExport(name: string): string {
  const nameMap: Record<string, string> = {
    card: "Card, CardHeader, CardContent, CardFooter",
    button: "Button",
    "button-group": "ButtonGroup",
    separator: "Separator",
    avatar: "Avatar",
    badge: "Badge",
    tabs: "Tabs, TabsList, TabsTrigger, TabsContent",
    input: "Input",
    textarea: "Textarea",
    checkbox: "Checkbox",
    switch: "Switch",
    "radio-group": "RadioGroup, RadioGroupItem",
    label: "Label",
    dialog: "Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription",
    sheet: "Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription",
    alert: "Alert, AlertDescription, AlertTitle",
    tooltip: "Tooltip",
    popover: "Popover, PopoverTrigger, PopoverContent",
    select: "Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel",
    "use-mobile": "useMobile",
    "use-toast": "useToast",
    "use-theme": "useTheme",
  }
  return nameMap[name] || `${name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-xl font-semibold text-foreground">{title}</Text>
      {children}
    </View>
  )
}
