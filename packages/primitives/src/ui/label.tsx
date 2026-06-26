import * as React from "react"
import { Text, type TextProps } from "react-native"
import { cn } from "../lib/utils"

interface LabelProps extends TextProps {}

const Label = React.forwardRef<React.ComponentRef<typeof Text>, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn("text-sm font-medium leading-none text-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  )
)

Label.displayName = "Label"

export { Label, type LabelProps }
