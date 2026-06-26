import { useState } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { Link, useRouter } from "expo-router"
import { cn, ChartContainer, BarChart, LineChart, PieChart, ChartLegend, Button } from "@native-cn/primitives"

const CHART_TYPES = ["area", "bar", "line", "pie", "radar", "radial", "tooltip"] as const

const barData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 5000, expenses: 3800 },
  { month: "Apr", revenue: 2780, expenses: 1908 },
  { month: "May", revenue: 5890, expenses: 4300 },
  { month: "Jun", revenue: 4390, expenses: 3400 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
}

const pieData = [
  { name: "Products", value: 45, color: "#3b82f6" },
  { name: "Services", value: 30, color: "#22c55e" },
  { name: "Licenses", value: 15, color: "#f59e0b" },
  { name: "Support", value: 10, color: "#8b5cf6" },
]

const pieConfig = {
  products: { label: "Products", color: "#3b82f6" },
  services: { label: "Services", color: "#22c55e" },
  licenses: { label: "Licenses", color: "#f59e0b" },
  support: { label: "Support", color: "#8b5cf6" },
}

const lineData = [
  { day: "Mon", visitors: 1200 },
  { day: "Tue", visitors: 1900 },
  { day: "Wed", visitors: 1600 },
  { day: "Thu", visitors: 2200 },
  { day: "Fri", visitors: 1800 },
  { day: "Sat", visitors: 1400 },
  { day: "Sun", visitors: 1100 },
]

export default function ChartsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-4xl mx-auto gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-foreground">Beautiful Charts & Graphs</Text>
          <Text className="text-base text-muted-foreground">
            Chart components built with react-native-svg. Simple, composable, and customizable.
          </Text>
        </View>

        {/* Chart type nav */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2 pb-2">
            {CHART_TYPES.map((type) => (
              <Pressable
                key={type}
                onPress={() => setSelectedType(selectedType === type ? null : type)}
                className={cn(
                  "px-4 py-2 rounded-full border",
                  selectedType === type
                    ? "bg-primary border-primary"
                    : "bg-muted border-border active:bg-muted/70"
                )}
              >
                <Text
                  className={cn(
                    "text-sm capitalize",
                    selectedType === type ? "text-primary-foreground font-medium" : "text-foreground"
                  )}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bar Chart */}
        {(!selectedType || selectedType === "bar") && (
          <Section title="Bar Chart" description="Compare values across categories.">
            <ChartContainer config={chartConfig}>
              <BarChart data={barData} config={chartConfig} xKey="month" yKey="revenue" height={200} />
              <ChartLegend config={chartConfig} />
            </ChartContainer>
          </Section>
        )}

        {/* Line Chart */}
        {(!selectedType || selectedType === "line") && (
          <Section title="Line Chart" description="Show trends over time.">
            <ChartContainer config={{ visitors: { label: "Visitors", color: "hsl(var(--primary))" } }}>
              <LineChart data={lineData} config={{ visitors: { label: "Visitors", color: "hsl(var(--primary))" } }} xKey="day" yKey="visitors" height={200} />
            </ChartContainer>
          </Section>
        )}

        {/* Pie Chart */}
        {(!selectedType || selectedType === "pie") && (
          <Section title="Pie Chart" description="Display proportional data as slices.">
            <ChartContainer config={pieConfig}>
              <View className="items-center py-4">
                <PieChart data={pieData} config={pieConfig} nameKey="name" valueKey="value" size={200} innerRadius={0} />
              </View>
              <ChartLegend config={pieConfig} />
            </ChartContainer>
          </Section>
        )}

        {/* Donut Chart */}
        {(!selectedType || selectedType === "radial") && (
          <Section title="Donut Chart" description="A pie chart with a hollow center.">
            <ChartContainer config={pieConfig}>
              <View className="items-center py-4">
                <PieChart data={pieData} config={pieConfig} nameKey="name" valueKey="value" size={200} innerRadius={50} />
              </View>
              <ChartLegend config={pieConfig} />
            </ChartContainer>
          </Section>
        )}

        {/* Area chart (approximation using LineChart) */}
        {(!selectedType || selectedType === "area") && (
          <Section title="Area Chart" description="Emphasize magnitude of change over time.">
            <ChartContainer config={chartConfig}>
              <LineChart data={barData} config={chartConfig} xKey="month" yKey="revenue" height={200} />
              <ChartLegend config={chartConfig} />
            </ChartContainer>
          </Section>
        )}

        <Section title="Usage">
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-foreground font-mono">
              {`import { ChartContainer, BarChart } from "@native-cn/primitives"\n\nconst config = {\n  revenue: { label: "Revenue", color: "hsl(var(--primary))" },\n}\n\n<ChartContainer config={config}>\n  <BarChart\n    data={data}\n    config={config}\n    xKey="month"\n    yKey="revenue"\n    height={200}\n  />\n  <ChartLegend config={config} />\n</ChartContainer>`}
            </Text>
          </View>
        </Section>
      </View>
    </ScrollView>
  )
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-xl font-semibold text-foreground">{title}</Text>
        <Text className="text-sm text-muted-foreground">{description}</Text>
      </View>
      <View className="bg-muted/30 rounded-xl border border-border p-4">
        {children}
      </View>
    </View>
  )
}
