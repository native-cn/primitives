import { useState } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { cn } from "@native-cn/primitives"

const FORMATS = ["HEX", "RGB", "HSL", "CSS Variable"] as const
type Format = typeof FORMATS[number]

interface ColorGroup {
  name: string
  colors: { name: string; hex: string }[]
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    name: "Neutral",
    colors: [
      { name: "50", hex: "#fafafa" },
      { name: "100", hex: "#f5f5f5" },
      { name: "200", hex: "#e5e5e5" },
      { name: "300", hex: "#d4d4d4" },
      { name: "400", hex: "#a3a3a3" },
      { name: "500", hex: "#737373" },
      { name: "600", hex: "#525252" },
      { name: "700", hex: "#404040" },
      { name: "800", hex: "#262626" },
      { name: "900", hex: "#171717" },
      { name: "950", hex: "#0a0a0a" },
    ],
  },
  {
    name: "Red",
    colors: [
      { name: "50", hex: "#fef2f2" },
      { name: "100", hex: "#fee2e2" },
      { name: "200", hex: "#fecaca" },
      { name: "300", hex: "#fca5a5" },
      { name: "400", hex: "#f87171" },
      { name: "500", hex: "#ef4444" },
      { name: "600", hex: "#dc2626" },
      { name: "700", hex: "#b91c1c" },
      { name: "800", hex: "#991b1b" },
      { name: "900", hex: "#7f1d1d" },
      { name: "950", hex: "#450a0a" },
    ],
  },
  {
    name: "Orange",
    colors: [
      { name: "50", hex: "#fff7ed" },
      { name: "100", hex: "#ffedd5" },
      { name: "200", hex: "#fed7aa" },
      { name: "300", hex: "#fdba74" },
      { name: "400", hex: "#fb923c" },
      { name: "500", hex: "#f97316" },
      { name: "600", hex: "#ea580c" },
      { name: "700", hex: "#c2410c" },
      { name: "800", hex: "#9a3412" },
      { name: "900", hex: "#7c2d12" },
      { name: "950", hex: "#431407" },
    ],
  },
  {
    name: "Yellow",
    colors: [
      { name: "50", hex: "#fefce8" },
      { name: "100", hex: "#fef9c3" },
      { name: "200", hex: "#fef08a" },
      { name: "300", hex: "#fde047" },
      { name: "400", hex: "#facc15" },
      { name: "500", hex: "#eab308" },
      { name: "600", hex: "#ca8a04" },
      { name: "700", hex: "#a16207" },
      { name: "800", hex: "#854d0e" },
      { name: "900", hex: "#713f12" },
      { name: "950", hex: "#422006" },
    ],
  },
  {
    name: "Green",
    colors: [
      { name: "50", hex: "#f0fdf4" },
      { name: "100", hex: "#dcfce7" },
      { name: "200", hex: "#bbf7d0" },
      { name: "300", hex: "#86efac" },
      { name: "400", hex: "#4ade80" },
      { name: "500", hex: "#22c55e" },
      { name: "600", hex: "#16a34a" },
      { name: "700", hex: "#15803d" },
      { name: "800", hex: "#166534" },
      { name: "900", hex: "#14532d" },
      { name: "950", hex: "#052e16" },
    ],
  },
  {
    name: "Blue",
    colors: [
      { name: "50", hex: "#eff6ff" },
      { name: "100", hex: "#dbeafe" },
      { name: "200", hex: "#bfdbfe" },
      { name: "300", hex: "#93c5fd" },
      { name: "400", hex: "#60a5fa" },
      { name: "500", hex: "#3b82f6" },
      { name: "600", hex: "#2563eb" },
      { name: "700", hex: "#1d4ed8" },
      { name: "800", hex: "#1e40af" },
      { name: "900", hex: "#1e3a8a" },
      { name: "950", hex: "#172554" },
    ],
  },
  {
    name: "Purple",
    colors: [
      { name: "50", hex: "#faf5ff" },
      { name: "100", hex: "#f3e8ff" },
      { name: "200", hex: "#e9d5ff" },
      { name: "300", hex: "#d8b4fe" },
      { name: "400", hex: "#c084fc" },
      { name: "500", hex: "#a855f7" },
      { name: "600", hex: "#9333ea" },
      { name: "700", hex: "#7e22ce" },
      { name: "800", hex: "#6b21a8" },
      { name: "900", hex: "#581c87" },
      { name: "950", hex: "#3b0764" },
    ],
  },
  {
    name: "Pink",
    colors: [
      { name: "50", hex: "#fdf2f8" },
      { name: "100", hex: "#fce7f3" },
      { name: "200", hex: "#fbcfe8" },
      { name: "300", hex: "#f9a8d4" },
      { name: "400", hex: "#f472b6" },
      { name: "500", hex: "#ec4899" },
      { name: "600", hex: "#db2777" },
      { name: "700", hex: "#be185d" },
      { name: "800", hex: "#9d174d" },
      { name: "900", hex: "#831843" },
      { name: "950", hex: "#500724" },
    ],
  },
  {
    name: "Slate",
    colors: [
      { name: "50", hex: "#f8fafc" },
      { name: "100", hex: "#f1f5f9" },
      { name: "200", hex: "#e2e8f0" },
      { name: "300", hex: "#cbd5e1" },
      { name: "400", hex: "#94a3b8" },
      { name: "500", hex: "#64748b" },
      { name: "600", hex: "#475569" },
      { name: "700", hex: "#334155" },
      { name: "800", hex: "#1e293b" },
      { name: "900", hex: "#0f172a" },
      { name: "950", hex: "#020617" },
    ],
  },
]

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `${r} ${g} ${b}`
}

function hexToHsl(hex: string): string {
  let r = 0, g = 0, b = 0
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex
  r = parseInt(result[1], 16) / 255
  g = parseInt(result[2], 16) / 255
  b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export default function ColorsPage() {
  const [format, setFormat] = useState<Format>("HEX")

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-5xl mx-auto gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-foreground">Tailwind Colors</Text>
          <Text className="text-base text-muted-foreground">
            The full Tailwind CSS color palette in every format.
          </Text>
        </View>

        {/* Format switcher */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2 pb-2">
            {FORMATS.map((f) => (
              <Pressable
                key={f}
                onPress={() => setFormat(f)}
                className={cn(
                  "px-4 py-2 rounded-full border",
                  format === f ? "bg-primary border-primary" : "bg-muted border-border"
                )}
              >
                <Text
                  className={cn(
                    "text-sm",
                    format === f ? "text-primary-foreground font-medium" : "text-foreground"
                  )}
                >
                  {f}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Color groups */}
        {COLOR_GROUPS.map((group) => (
          <View key={group.name} className="gap-2">
            <Text className="text-lg font-semibold text-foreground">{group.name}</Text>
            <View className="rounded-lg border border-border overflow-hidden">
              {group.colors.map((color) => {
                let value = color.hex
                if (format === "RGB") value = hexToRgb(color.hex)
                else if (format === "HSL") value = hexToHsl(color.hex)
                else if (format === "CSS Variable") {
                  const name = group.name.toLowerCase()
                  value = `--color-${name}-${color.name}`
                }
                return (
                  <View key={color.name} className="flex-row items-center h-10">
                    <View className="w-10 h-full border-r border-border" style={{ backgroundColor: color.hex }} />
                    <View className="flex-1 flex-row items-center px-3">
                      <Text className="text-sm text-muted-foreground w-12">{color.name}</Text>
                      <Text className="text-sm text-foreground font-mono">{value}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
