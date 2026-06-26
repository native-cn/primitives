import { View, Text, ScrollView } from "react-native"
import { Link, useRouter } from "expo-router"
import { Button, Card, CardHeader, CardContent, Badge } from "@native-cn/primitives"
import { blocks } from "../../components/block-registry"

const CATEGORIES = ["all", "dashboard", "forms", "auth", "profile", "layout"]

export default function BlocksIndex() {
  const router = useRouter()

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-6xl mx-auto gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-foreground">Building Blocks for React Native</Text>
          <Text className="text-base text-muted-foreground">
            Pre-built UI blocks that you can copy and paste into your apps.
          </Text>
        </View>

        {/* Featured blocks */}
        <View className="gap-4">
          <Text className="text-lg font-semibold text-foreground">Featured</Text>
          <View className="flex-row flex-wrap gap-4">
            {blocks.slice(0, 4).map((block) => (
              <Card key={block.name} className="flex-1 min-w-[260px] max-w-[400px]">
                <CardHeader>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-lg font-semibold text-card-foreground">{block.title}</Text>
                    <Badge variant="secondary"><Text className="text-[10px]">{block.category}</Text></Badge>
                  </View>
                  <Text className="text-sm text-muted-foreground">{block.description}</Text>
                </CardHeader>
                <CardContent>
                  <block.component />
                </CardContent>
                <View className="px-4 pb-4">
                  <Button
                    variant="outline"
                    onPress={() => router.push(`/blocks/${block.name}` as any)}
                  >
                    <Text className="text-foreground text-sm">View Code →</Text>
                  </Button>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* All blocks by category */}
        {CATEGORIES.filter((c) => c !== "all").map((category) => {
          const catBlocks = blocks.filter((b) => b.category === category)
          if (catBlocks.length === 0) return null
          return (
            <View key={category} className="gap-3">
              <Text className="text-lg font-semibold text-foreground capitalize">{category}</Text>
              <View className="flex-row flex-wrap gap-4">
                {catBlocks.map((block) => (
                  <Card key={block.name} className="flex-1 min-w-[260px] max-w-[400px]">
                    <CardHeader>
                      <Text className="text-base font-semibold text-card-foreground">{block.title}</Text>
                      <Text className="text-sm text-muted-foreground">{block.description}</Text>
                    </CardHeader>
                    <CardContent>
                      <block.component />
                    </CardContent>
                    <View className="px-4 pb-4">
                      <Button
                        variant="outline"
                        onPress={() => router.push(`/blocks/${block.name}` as any)}
                      >
                        <Text className="text-foreground text-sm">View Code →</Text>
                      </Button>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
