import { View, Text, ScrollView, Pressable } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { useState } from "react"
import { Button, Card, Badge, cn } from "@native-cn/primitives"
import { blocks } from "../../components/block-registry"

export default function BlockDetail() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const [showCode, setShowCode] = useState(false)
  const block = blocks.find((b) => b.name === name)

  if (!block) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-lg font-semibold text-foreground mb-2">Block not found</Text>
        <Button variant="outline" onPress={() => router.push("/blocks" as any)}>
          <Text className="text-foreground">← Back to Blocks</Text>
        </Button>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-4xl mx-auto gap-8">
        <View className="flex-row items-center gap-2">
          <Button variant="ghost" size="sm" onPress={() => router.push("/blocks" as any)}>
            <Text className="text-muted-foreground">← Blocks</Text>
          </Button>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">{block.title}</Text>
            <Badge variant="secondary"><Text className="text-xs">{block.category}</Text></Badge>
          </View>
          <Text className="text-base text-muted-foreground">{block.description}</Text>
        </View>

        {/* Live preview */}
        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Preview</Text>
          <View className="bg-muted/30 rounded-xl border border-border p-4">
            <block.component />
          </View>
        </View>

        {/* Code toggle */}
        <Pressable
          onPress={() => setShowCode(!showCode)}
          className="flex-row items-center justify-between bg-muted rounded-lg p-3"
        >
          <Text className="text-sm font-medium text-foreground">Source Code</Text>
          <Text className="text-sm text-muted-foreground">{showCode ? "Hide" : "Show"}</Text>
        </Pressable>

        {showCode && (
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-foreground font-mono leading-relaxed">
              {block.code}
            </Text>
          </View>
        )}

        {/* Usage */}
        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Install</Text>
          <View className="bg-muted rounded-lg p-3">
            <Text className="text-sm text-foreground font-mono">npx native-cn add {block.dependencies.join(" ")}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
