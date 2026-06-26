import { View, Text } from "react-native"
import { ChartContainer, BarChart, PieChart, ChartLegend } from "../ui/chart"

const barData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
]

const pieData = [
  { name: "Mobile", value: 45 },
  { name: "Web", value: 30 },
  { name: "Desktop", value: 25 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  mobile: { label: "Mobile", color: "#3b82f6" },
  web: { label: "Web", color: "#10b981" },
  desktop: { label: "Desktop", color: "#f59e0b" },
}

export function BarChartDemo() {
  return (
    <View className="gap-2">
      <Text className="text-base font-semibold text-foreground">Revenue by Month</Text>
      <ChartContainer config={chartConfig}>
        <BarChart data={barData} config={chartConfig} xKey="month" yKey="revenue" />
      </ChartContainer>
    </View>
  )
}

export function PieChartDemo() {
  return (
    <View className="gap-2">
      <Text className="text-base font-semibold text-foreground">Platform Distribution</Text>
      <ChartContainer config={chartConfig}>
        <PieChart
          data={pieData}
          config={chartConfig}
          nameKey="name"
          valueKey="value"
          size={180}
        />
      </ChartContainer>
      <ChartLegend config={chartConfig} data={pieData} nameKey="name" />
    </View>
  )
}
