import { describe, it, expect } from "vitest"

// Direct imports from source files to verify exports work without loading react-native
import { cn } from "../src/lib"
import { useToast } from "../src/hooks"
import type * as Pkg from "../src/index"

// Verify at type level that all expected exports exist
type ExpectedExports = keyof typeof Pkg
const _assertions: ExpectedExports[] = ["cn", "useToast", "Accordion", "AccordionItem", "Alert", "AlertDialog",
  "AspectRatio", "Avatar", "Badge", "Breadcrumb", "Button", "ButtonGroup", "Calendar", "Card", "Carousel",
  "Checkbox", "Collapsible", "Command", "ContextMenu", "Dialog", "DialogClose", "DialogFooter", "Drawer",
  "DrawerFooter", "DropdownMenu", "Empty", "Field", "FieldGroup", "Form", "HoverCard", "Input", "InputGroup",
  "InputOtp", "Item", "Kbd", "Label", "Menubar", "NavigationMenu", "Pagination", "Popover", "Progress",
  "RadioGroup", "Resizable", "ScrollArea", "Select", "Separator", "Sheet", "Sidebar", "Skeleton", "Slider",
  "Sonner", "Spinner", "Switch", "Table", "TableCell", "TableHead", "TableHeader", "TableRow", "Tabs",
  "Textarea", "Toggle", "ToggleGroup", "Tooltip"]

describe("package exports", () => {
  it("exports cn", () => {
    expect(typeof cn).toBe("function")
  })

  it("exports useToast", () => {
    expect(typeof useToast).toBe("function")
  })
})
