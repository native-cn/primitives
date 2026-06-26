# native-cn / primitives

shadcn/ui primitives for **React Native** — 54 beautifully designed, accessible components powered by NativeWind.

## Installation

```bash
npm install @native-cn/primitives
# or
yarn add @native-cn/primitives
# or
pnpm add @native-cn/primitives
```

## Quick Start

### 1. Add the Tailwind preset

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@native-cn/primitives/tailwind")],
  // ... your config
}
```

### 2. Add CSS variables

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 346 62% 54%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 346 62% 54%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 346 62% 54%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 346 62% 54%;
}
```

### 3. Use components

```tsx
import { Button, Card, Badge } from "@native-cn/primitives"

export default function App() {
  return (
    <Card className="p-4">
      <Badge>New</Badge>
      <Button onPress={() => {}}>Click me</Button>
    </Card>
  )
}
```

## Available Components

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible content sections |
| Alert | Notification banners |
| AlertDialog | Confirmation dialogs |
| AspectRatio | Container with fixed aspect ratio |
| Avatar | User avatar with fallback |
| Badge | Inline status labels |
| Breadcrumb | Navigation trail |
| Button | Action triggers (5 variants) |
| ButtonGroup | Grouped buttons |
| Calendar | Date picker |
| Card | Content containers |
| Carousel | Horizontal slideshow |
| Checkbox | Multi-select control |
| Collapsible | Expandable sections |
| Command | Searchable command palette |
| ContextMenu | Long-press context menus |
| Dialog | Modal dialogs |
| Drawer | Bottom sheet panels |
| DropdownMenu | Action sheet menus |
| Empty | Empty state placeholder |
| Field | Form field wrapper |
| Form | Form container |
| HoverCard | Web-only passthrough |
| Input | Text inputs |
| InputGroup | Input with adornments |
| InputOtp | OTP code input |
| Item | Key-value row |
| Kbd | Keyboard shortcut display |
| Label | Form labels |
| Menubar | Horizontal action bar |
| NavigationMenu | Navigation links |
| Pagination | Page navigation |
| Popover | Floating overlays |
| Progress | Progress bars |
| RadioGroup | Single-select options |
| Resizable | Split layouts |
| ScrollArea | Themed scroll container |
| Select | Dropdown pickers |
| Separator | Horizontal/vertical dividers |
| Sheet | Slide-in panels |
| Sidebar | Navigation sidebar |
| Skeleton | Loading placeholders |
| Slider | Range sliders |
| Sonner | Toast notifications |
| Spinner | Loading indicators |
| Switch | Toggle controls |
| Table | Data tables |
| Tabs | Segmented controls |
| Textarea | Multi-line inputs |
| Toast | Toast notifications |
| Toggle | Toggle buttons |
| ToggleGroup | Grouped toggles |
| Tooltip | Information popups |

## Registry

Components can also be installed individually via the registry:

```bash
# Coming soon
npx native-cn init
npx native-cn add button
```

## License

MIT
