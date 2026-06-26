import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { cn } from "../lib/utils"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { first, daysInMonth }
}

export function Calendar({ selected, onSelect, minDate, maxDate }: CalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const { first, daysInMonth } = getMonthDays(viewYear, viewMonth)
  const blanks = Array(first).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  function prev() {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11) }
    else setViewMonth(viewMonth - 1)
  }

  function next() {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0) }
    else setViewMonth(viewMonth + 1)
  }

  function isDisabled(d: number) {
    const date = new Date(viewYear, viewMonth, d)
    return (minDate && date < minDate) || (maxDate && date > maxDate)
  }

  return (
    <View className="rounded-lg border border-border bg-card p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Pressable onPress={prev} className="h-8 w-8 items-center justify-center rounded-md">
          <Text className="text-foreground">‹</Text>
        </Pressable>
        <Text className="text-sm font-semibold text-card-foreground">
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <Pressable onPress={next} className="h-8 w-8 items-center justify-center rounded-md">
          <Text className="text-foreground">›</Text>
        </Pressable>
      </View>
      <View className="flex-row flex-wrap">
        {DAYS.map((d) => (
          <View key={d} className="w-[14.28%] items-center py-1">
            <Text className="text-xs text-muted-foreground">{d}</Text>
          </View>
        ))}
        {blanks.map((_, i) => (
          <View key={`b${i}`} className="w-[14.28%] aspect-square" />
        ))}
        {days.map((d) => {
          const date = new Date(viewYear, viewMonth, d)
          const isSelected = selected && date.toDateString() === selected.toDateString()
          const disabled = isDisabled(d)
          return (
            <Pressable
              key={d}
              onPress={() => { if (!disabled && onSelect) onSelect(date) }}
              disabled={disabled}
              className={cn(
                "w-[14.28%] aspect-square items-center justify-center rounded-md",
                isSelected ? "bg-primary" : "",
                disabled ? "opacity-30" : ""
              )}
            >
              <Text
                className={cn(
                  "text-sm",
                  isSelected ? "font-medium text-primary-foreground" : "text-card-foreground"
                )}
              >
                {d}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
