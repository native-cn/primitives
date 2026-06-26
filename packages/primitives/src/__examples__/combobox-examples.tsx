import { useState } from "react"
import { View, Text } from "react-native"
import { Combobox } from "../ui/combobox"
import { Card, CardContent } from "../ui/card"

const frameworks = [
  { label: "React Native", value: "rn" },
  { label: "Expo", value: "expo" },
  { label: "NativeWind", value: "nw" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "next" },
]

export function FrameworkSelector() {
  const [selected, setSelected] = useState<{ label: string; value: string } | null>(null)
  return (
    <View className="gap-3">
      <Card>
        <CardContent>
          <Text className="text-sm text-muted-foreground mb-2">Selected framework</Text>
          <Text className="text-foreground font-medium">
            {selected ? selected.label : "None"}
          </Text>
        </CardContent>
      </Card>
      <Combobox
        items={frameworks}
        placeholder="Select a framework..."
        value={selected?.value ?? ""}
        onValueChange={(value) => {
          const item = frameworks.find((f) => f.value === value)
          setSelected(item ?? null)
        }}
      />
    </View>
  )
}
