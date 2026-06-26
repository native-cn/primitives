import { View, Text } from "react-native"
import { Button } from "../ui/button"

export function ButtonVariants() {
  return (
    <View className="flex-col gap-4">
      <Text className="text-lg font-semibold text-foreground mb-2">Button Variants</Text>
      <View className="flex-row flex-wrap gap-2">
        <Button variant="default"><Text className="text-primary-foreground">Default</Text></Button>
        <Button variant="destructive"><Text className="text-destructive-foreground">Destructive</Text></Button>
        <Button variant="outline"><Text className="text-foreground">Outline</Text></Button>
        <Button variant="secondary"><Text className="text-secondary-foreground">Secondary</Text></Button>
        <Button variant="ghost"><Text className="text-foreground">Ghost</Text></Button>
        <Button variant="link"><Text className="text-primary underline">Link</Text></Button>
      </View>
      <Text className="text-lg font-semibold text-foreground mt-4 mb-2">Button Sizes</Text>
      <View className="flex-row items-center gap-2">
        <Button size="sm"><Text className="text-primary-foreground">Small</Text></Button>
        <Button size="default"><Text className="text-primary-foreground">Default</Text></Button>
        <Button size="lg"><Text className="text-primary-foreground">Large</Text></Button>
        <Button size="icon"><Text className="text-primary-foreground">+</Text></Button>
      </View>
      <Button disabled><Text className="text-muted-foreground">Disabled</Text></Button>
    </View>
  )
}
