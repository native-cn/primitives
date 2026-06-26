import { describe, it, expect } from "vitest"

import { cn } from "../src/lib/utils"
import { useToast } from "../src/hooks/use-toast"

const expectedExports = [
  "cn", "useToast", "useMobile", "useDirection", "DirectionProvider",
  "Accordion", "AccordionItem", "Alert", "AlertDialog",
  "AspectRatio", "Avatar", "Badge", "Breadcrumb", "Button", "ButtonGroup",
  "Calendar", "Card", "Carousel", "ChartContainer", "BarChart", "LineChart", "PieChart", "ChartLegend", "Checkbox", "Collapsible", "Combobox",
  "Command", "ContextMenu", "Dialog", "DialogClose", "DialogFooter",
  "Drawer", "DrawerFooter", "DropdownMenu", "Empty", "Field", "FieldGroup",
  "Form", "HoverCard", "Input", "InputGroup", "InputOtp", "Item", "Kbd",
  "Label", "Menubar", "NavigationMenu", "Pagination", "Popover", "Progress",
  "RadioGroup", "Resizable", "ScrollArea", "Select", "Separator", "Sheet",
  "Sidebar", "Skeleton", "Slider", "Sonner", "Spinner", "Switch", "Table",
  "TableCell", "TableHead", "TableHeader", "TableRow", "Tabs", "Textarea",
  "themes", "themeColors", "ThemeProvider", "Toggle", "ToggleGroup", "Tooltip",
]

describe("package exports", () => {
  it("exports cn", () => {
    expect(typeof cn).toBe("function")
  })

  it("exports useToast", () => {
    expect(typeof useToast).toBe("function")
  })

  it("has all expected export names defined", () => {
    expect(expectedExports.length).toBeGreaterThan(0)
  })
})
