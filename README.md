# native-cn / primitives

shadcn/ui primitives for **React Native** — 54 beautifully designed, accessible components powered by [NativeWind](https://nativewind.dev).

<p align="center">
  <a href="https://www.npmjs.com/package/@native-cn/primitives">
    <img src="https://img.shields.io/npm/v/@native-cn/primitives" alt="npm version">
  </a>
  <a href="https://github.com/native-cn/primitives/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@native-cn/primitives" alt="license">
  </a>
</p>

---

## Installation

```bash
npm install @native-cn/primitives
# or
yarn add @native-cn/primitives
# or
pnpm add @native-cn/primitives
```

## Prerequisites

| Dependency | Version |
|---|---|
| React Native | ^0.72.0 \|\| ^0.73.0 \|\| ^0.74.0 \|\| ^0.75.0 \|\| ^0.76.0 |
| NativeWind | ^4.0.0 |
| TailwindCSS | ^3.4.0 |
| React | ^18.3.0 \|\| ^19.0.0 |

## Setup

### 1. Tailwind config

```js
// tailwind.config.js
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

### 2. CSS variables

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
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
}
```

Import it in your app entry:

```tsx
import "./global.css"
```

### 3. Babel config

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  }
}
```

### 4. Metro config

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: "./global.css" })
```

### 5. TypeScript config

Add these to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsxImportSource": "nativewind"
  },
  "include": [
    "nativewind-env.d.ts"
  ]
}
```

Create `nativewind-env.d.ts`:

```ts
/// <reference types="nativewind/types" />
```

## Usage

```tsx
import { View, Text } from "react-native"
import { Button, Badge, Card, Progress } from "@native-cn/primitives"

export default function Profile() {
  return (
    <Card className="p-4 m-4">
      <View className="flex-row items-center gap-2 mb-4">
        <Badge variant="secondary">Pro</Badge>
        <Badge>New</Badge>
      </View>
      <Text className="text-xl font-bold mb-2">Account Overview</Text>
      <Progress value={65} className="mb-4" />
      <Button onPress={() => {}}>Upgrade Plan</Button>
    </Card>
  )
}
```

## Available Components

| Component | Description |
|---|---|
| Accordion | Collapsible content sections |
| Alert | Notification banners |
| AlertDialog | Confirmation dialogs |
| AspectRatio | Container with fixed aspect ratio |
| Avatar | User avatar with fallback |
| Badge | Inline status labels (4 variants) |
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
| HoverCard | Hover card (web) |
| Input | Text inputs |
| InputGroup | Input with adornments |
| InputOtp | OTP / verification code input |
| Item | Key-value display row |
| Kbd | Keyboard shortcut display |
| Label | Form labels |
| Menubar | Horizontal action menu |
| NavigationMenu | Navigation links |
| Pagination | Page navigation |
| Popover | Floating overlays |
| Progress | Progress bars |
| RadioGroup | Single-select options |
| Resizable | Split panel layouts |
| ScrollArea | Themed scroll container |
| Select | Dropdown pickers |
| Separator | Horizontal / vertical dividers |
| Sheet | Slide-in panels |
| Sidebar | Navigation sidebar |
| Skeleton | Loading placeholder |
| Slider | Range sliders |
| Sonner | Toast notifications |
| Spinner | Loading indicator |
| Switch | Toggle control |
| Table | Data tables |
| Tabs | Segmented controls |
| Textarea | Multi-line text input |
| Toast | Toast notifications |
| Toggle | Toggle buttons |
| ToggleGroup | Grouped toggle buttons |
| Tooltip | Information popup |

## Registry

Components are also available via the shadcn-style registry (`registry/registry.json`) for individual installation:

```bash
# CLI coming soon
npx native-cn add button
```

The registry JSON is included in the npm package at `@native-cn/primitives/registry` and can be used by the shadcn CLI or a custom CLI tool.

## Development

This monorepo uses [Turborepo](https://turbo.build) + [pnpm](https://pnpm.io):

```
native-cn/
├── apps/
│   └── demo/          # Expo SDK 56 demo app
├── packages/
│   └── primitives/    # @native-cn/primitives source
├── package.json       # root scripts
├── pnpm-workspace.yaml
└── turbo.json
```

### Commands

```bash
# Start Expo demo
pnpm start

# Start Expo demo (web)
pnpm start:web

# Watch TypeScript (primitives)
pnpm dev

# Run tests
pnpm test

# Build primitives types
pnpm build

# Publish new version
pnpm version:primitives   # bump version
pnpm publish:primitives   # publish to npm
```

### Testing

```bash
cd packages/primitives
pnpm test          # run once
pnpm test:watch    # watch mode
```

Tests use Vitest with mocked React Native modules.

## Publishing

```bash
# Bump version
pnpm version:primitives

# Publish (auto-runs build via prepublishOnly)
pnpm publish:primitives
```

The package includes source TypeScript files (compiled by Metro) and type declarations (`dist-types/`). No separate JS build step is needed for React Native consumers.

## License

MIT
