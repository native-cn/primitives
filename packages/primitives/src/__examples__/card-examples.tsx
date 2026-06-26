import { View, Text } from "react-native"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

export function SimpleCard() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Getting Started</Text>
        <Text className="text-sm text-muted-foreground">
          Install native-cn and start building.
        </Text>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-foreground">
          npx native-cn init{'\n'}npx native-cn add button
        </Text>
      </CardContent>
      <Separator />
      <CardFooter>
        <Button><Text className="text-primary-foreground">Continue</Text></Button>
      </CardFooter>
    </Card>
  )
}

export function CardGrid() {
  const items = [
    { title: "Revenue", value: "$45,231", change: "+20.1%" },
    { title: "Subscriptions", value: "2,350", change: "+180.1%" },
    { title: "Active Users", value: "1,423", change: "+19%" },
  ]
  return (
    <View className="flex-col gap-3">
      <Text className="text-lg font-semibold text-foreground mb-2">Card Grid</Text>
      <View className="flex-row flex-wrap gap-3">
        {items.map((item) => (
          <Card key={item.title} className="flex-1 min-w-[120px]">
            <CardHeader>
              <Text className="text-sm text-muted-foreground">{item.title}</Text>
              <Text className="text-2xl font-bold text-foreground">{item.value}</Text>
              <Text className="text-sm text-emerald-500">{item.change}</Text>
            </CardHeader>
          </Card>
        ))}
      </View>
    </View>
  )
}
