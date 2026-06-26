# @native-cn/primitives

shadcn/ui primitives for **React Native** — 54 beautifully designed, accessible components powered by [NativeWind](https://nativewind.dev).

[View on GitHub](https://github.com/native-cn/primitives)

## Installation

```bash
npm install @native-cn/primitives
```

## Requirements

- React Native ^0.72.0 (up to ^0.76.0)
- NativeWind ^4.0.0
- TailwindCSS ^3.4.0

## Quick Start

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@native-cn/primitives/tailwind")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@native-cn/primitives/src/**/*.{ts,tsx}",
  ],
}
```

### global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 346 62% 54%;
    --primary-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --ring: 346 62% 54%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 346 62% 54%;
    --primary-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --ring: 346 62% 54%;
  }
}
```

```tsx
// App.tsx
import "./global.css"
```

### Full component list

Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Empty, Field, Form, HoverCard, Input, InputGroup, InputOtp, Item, Kbd, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip.

## License

MIT
