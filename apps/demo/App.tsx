import { StatusBar } from "expo-status-bar"
import { Text, View, ScrollView } from "react-native"
import { Button, Card, Badge, Separator } from "@native-cn/primitives"

export default function App() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 pt-16 pb-8">
        <Text className="text-3xl font-bold text-foreground mb-2">
          native-cn
        </Text>
        <Text className="text-sm text-muted-foreground mb-6">
          shadcn/ui primitives for React Native
        </Text>

        <Separator className="mb-6" />

        <Card className="p-4 mb-4">
          <Text className="text-lg font-semibold text-card-foreground mb-2">
            Buttons
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Button onPress={() => {}}>
              <Text className="text-sm font-medium text-primary-foreground">Default</Text>
            </Button>
            <Button variant="outline" onPress={() => {}}>
              <Text className="text-sm font-medium text-foreground">Outline</Text>
            </Button>
            <Button variant="secondary" onPress={() => {}}>
              <Text className="text-sm font-medium text-secondary-foreground">Secondary</Text>
            </Button>
            <Button variant="destructive" onPress={() => {}}>
              <Text className="text-sm font-medium text-destructive-foreground">Destructive</Text>
            </Button>
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-lg font-semibold text-card-foreground mb-2">
            Badges
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-lg font-semibold text-card-foreground mb-2">
            Cards
          </Text>
          <Card className="p-3 bg-muted">
            <Text className="text-sm text-card-foreground">
              Nested card content
            </Text>
          </Card>
        </Card>

        <Text className="text-center text-xs text-muted-foreground mt-8">
          native-cn/primitives — 54 components ready to use
        </Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}
