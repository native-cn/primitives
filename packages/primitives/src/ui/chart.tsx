import { useMemo } from "react"
import { View, Text, type ViewStyle } from "react-native"
import Svg, { Rect, Circle, Polyline, G, Path, Text as SvgText } from "react-native-svg"
import { cn } from "../lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface DataPoint {
  [key: string]: string | number
}

/* ---------- Chart Container ---------- */

interface ChartContainerProps {
  config: ChartConfig
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function ChartContainer({ config, className, style, children }: ChartContainerProps) {
  return (
    <View className={cn("w-full", className)} style={style}>
      {children}
    </View>
  )
}

/* ---------- Bar Chart ---------- */

interface BarChartProps {
  data: DataPoint[]
  config: ChartConfig
  xKey: string
  yKey: string
  height?: number
  className?: string
}

export function BarChart({ data, config, xKey, yKey, height = 200, className }: BarChartProps) {
  const color = config[yKey]?.color || "#3b82f6"
  const width = 320

  const { maxVal, barWidth, items } = useMemo(() => {
    const max = Math.max(...data.map((d) => Number(d[yKey])), 1)
    const gap = 4
    const totalBars = data.length
    const bw = Math.max(6, Math.min(40, (width - 40) / totalBars - gap))
    return {
      maxVal: max,
      barWidth: bw,
      items: data.map((d, i) => {
        const val = Number(d[yKey])
        const barH = (val / max) * (height - 30)
        const x = 20 + i * (bw + gap)
        const y = height - 25 - barH
        return { x, y, barH, label: String(d[xKey]), value: val }
      }),
    }
  }, [data, xKey, yKey, height, width])

  return (
    <View className={cn("w-full", className)} style={{ height }}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {items.map((item, i) => (
          <G key={i}>
            <Rect
              x={item.x} y={item.y}
              width={barWidth} height={item.barH}
              rx={3} fill={color} opacity={0.85}
            />
            <SvgText
              x={item.x + barWidth / 2} y={height - 5}
              fontSize={9} fill="#888" textAnchor="middle"
            >
              {item.label.slice(0, 3)}
            </SvgText>
          </G>
        ))}
      </Svg>
    </View>
  )
}

/* ---------- Line Chart ---------- */

interface LineChartProps {
  data: DataPoint[]
  config: ChartConfig
  xKey: string
  yKey: string
  height?: number
  showDots?: boolean
  className?: string
}

export function LineChart({
  data, config, xKey, yKey,
  height = 200, showDots = true, className,
}: LineChartProps) {
  const color = config[yKey]?.color || "#3b82f6"
  const width = 320

  const { points, maxVal } = useMemo(() => {
    const max = Math.max(...data.map((d) => Number(d[yKey])), 1)
    const pad = 20
    const cw = width - pad * 2
    const ch = height - pad * 2
    const pts = data.map((d, i) => ({
      x: pad + (i / Math.max(data.length - 1, 1)) * cw,
      y: pad + ch - (Number(d[yKey]) / max) * ch,
      label: String(d[xKey]).slice(0, 3),
    }))
    return { points: pts, maxVal: max }
  }, [data, xKey, yKey, height, width])

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <View className={cn("w-full", className)} style={{ height }}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polyline points={linePoints} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {showDots && points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
        ))}
        {points.map((p, i) => (
          <SvgText key={i} x={p.x} y={height - 5} fontSize={9} fill="#888" textAnchor="middle">
            {p.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  )
}

/* ---------- Pie Chart ---------- */

interface PieChartProps {
  data: DataPoint[]
  config: ChartConfig
  nameKey: string
  valueKey: string
  size?: number
  innerRadius?: number
  className?: string
}

export function PieChart({
  data, config, nameKey, valueKey,
  size = 200, innerRadius = 0, className,
}: PieChartProps) {
  const total = useMemo(() => data.reduce((s, d) => s + Number(d[valueKey]), 0), [data, valueKey])
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 10
  const defaultColors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]
  const colors = Object.values(config).map((c) => c.color)

  const arcs = useMemo(() => {
    let angle = -Math.PI / 2
    return data.map((d, i) => {
      const val = Number(d[valueKey])
      const slice = (val / total) * 2 * Math.PI
      const start = angle
      const end = angle + slice
      angle = end

      const color = colors[i] || defaultColors[i % defaultColors.length]
      const x1 = cx + outerR * Math.cos(start)
      const y1 = cy + outerR * Math.sin(start)
      const x2 = cx + outerR * Math.cos(end)
      const y2 = cy + outerR * Math.sin(end)
      const large = slice > Math.PI ? 1 : 0

      const mid = start + slice / 2
      const lr = outerR * 0.65

      return {
        path: `M ${cx} ${cy} L ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} Z`,
        color,
        name: String(d[nameKey]).slice(0, 2),
        lx: cx + lr * Math.cos(mid),
        ly: cy + lr * Math.sin(mid),
      }
    })
  }, [data, valueKey, total, cx, cy, outerR, colors, defaultColors, nameKey])

  return (
    <View className={cn("items-center", className)} style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((arc, i) => (
          <G key={i}>
            <Path d={arc.path} fill={arc.color} opacity={0.85} />
            <SvgText x={arc.lx} y={arc.ly} fontSize={10} fill="#fff" textAnchor="middle" fontWeight="bold">
              {arc.name}
            </SvgText>
          </G>
        ))}
        {innerRadius > 0 && (
          <Circle cx={cx} cy={cy} r={innerRadius} fill="hsl(var(--background))" />
        )}
      </Svg>
    </View>
  )
}

/* ---------- Chart Legend ---------- */

interface ChartLegendProps {
  config: ChartConfig
  className?: string
}

export function ChartLegend({ config, className }: ChartLegendProps) {
  return (
    <View className={cn("flex-row flex-wrap gap-3 mt-2", className)}>
      {Object.entries(config).map(([key, { label, color }]) => (
        <View key={key} className="flex-row items-center gap-1.5">
          <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }} />
          <Text className="text-xs text-muted-foreground">
            {label}
          </Text>
        </View>
      ))}
    </View>
  )
}
