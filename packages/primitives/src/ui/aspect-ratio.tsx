import { View } from "react-native"
import type { ViewProps } from "react-native"

interface AspectRatioProps extends ViewProps {
  ratio?: number
}

export function AspectRatio({ ratio = 16 / 9, style, children, ...props }: AspectRatioProps) {
  return (
    <View style={[{ aspectRatio: ratio }, style]} {...props}>
      {children}
    </View>
  )
}
