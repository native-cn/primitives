import { useState } from "react"
import { View, Text, TextInput, FlatList, Pressable, ScrollView } from "react-native"
import { Button, Card, CardHeader, CardContent, CardFooter, Badge, Avatar, Separator, Switch, Progress, Label, Checkbox, cn } from "@native-cn/primitives"

/* ---------- Block Registry Types ---------- */

export interface BlockDef {
  name: string
  title: string
  description: string
  category: "dashboard" | "forms" | "auth" | "profile" | "layout"
  dependencies: string[]
  component: React.FC
  code: string
}

/* ---------- Dashboard Stats Block ---------- */

function DashboardStatsBlock() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+20.1%" },
    { label: "Subscriptions", value: "+2,350", change: "+180.1%" },
    { label: "Active Users", value: "1,423", change: "+19%" },
  ]
  return (
    <View className="gap-2">
      {stats.map((s) => (
        <View key={s.label} className="bg-muted rounded-lg p-3">
          <Text className="text-xs text-muted-foreground">{s.label}</Text>
          <Text className="text-xl font-bold text-foreground">{s.value}</Text>
          <Text className="text-xs text-emerald-500">{s.change}</Text>
        </View>
      ))}
    </View>
  )
}

const DASHBOARD_STATS_CODE = `function DashboardStats() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+20.1%" },
    { label: "Subscriptions", value: "+2,350", change: "+180.1%" },
    { label: "Active Users", value: "1,423", change: "+19%" },
  ]
  return (
    <View className="gap-2">
      {stats.map((s) => (
        <View key={s.label} className="bg-muted rounded-lg p-3">
          <Text className="text-xs text-muted-foreground">{s.label}</Text>
          <Text className="text-xl font-bold text-foreground">{s.value}</Text>
          <Text className="text-xs text-emerald-500">{s.change}</Text>
        </View>
      ))}
    </View>
  )
}`

/* ---------- Settings Form Block ---------- */

function SettingsFormBlock() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)
  return (
    <View className="gap-3">
      <Text className="text-sm font-semibold text-foreground">Settings</Text>
      {[
        { label: "Email notifications", value: notifications, set: setNotifications },
        { label: "Dark mode", value: darkMode, set: setDarkMode },
        { label: "Public profile", value: publicProfile, set: setPublicProfile },
      ].map((item) => (
        <View key={item.label} className="flex-row items-center justify-between">
          <Text className="text-sm text-foreground">{item.label}</Text>
          <Switch checked={item.value} onCheckedChange={item.set} />
        </View>
      ))}
      <View className="gap-1.5">
        <Label nativeID="name-label">Display Name</Label>
        <TextInput
          aria-labelledby="name-label"
          defaultValue="John Doe"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          placeholderTextColor="#9ca3af"
        />
      </View>
      <Button><Text className="text-primary-foreground text-sm font-medium">Save Changes</Text></Button>
    </View>
  )
}

const SETTINGS_FORM_CODE = `function SettingsForm() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  return (
    <View className="gap-3">
      <Text className="text-sm font-semibold text-foreground">Settings</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-foreground">Notifications</Text>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-foreground">Dark mode</Text>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </View>
      <Label nativeID="name">Display Name</Label>
      <TextInput
        aria-labelledby="name"
        defaultValue="John Doe"
        className="h-9 rounded-md border border-input bg-background px-3"
      />
      <Button><Text>Save Changes</Text></Button>
    </View>
  )
}`

/* ---------- Login Screen Block ---------- */

function LoginScreenBlock() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <View className="gap-4">
      <View className="items-center gap-1">
        <View className="size-10 rounded-full bg-primary items-center justify-center">
          <Text className="text-primary-foreground font-bold">nc</Text>
        </View>
        <Text className="text-lg font-semibold text-foreground">Welcome back</Text>
        <Text className="text-sm text-muted-foreground">Sign in to your account</Text>
      </View>
      <View className="gap-3">
        <View className="gap-1.5">
          <Label nativeID="login-email">Email</Label>
          <TextInput
            aria-labelledby="login-email"
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="gap-1.5">
          <Label nativeID="login-password">Password</Label>
          <TextInput
            aria-labelledby="login-password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
            placeholderTextColor="#9ca3af"
            secureTextEntry
          />
        </View>
        <Button><Text className="text-primary-foreground text-sm font-medium">Sign In</Text></Button>
      </View>
      <Pressable>
        <Text className="text-sm text-primary text-center">Forgot password?</Text>
      </Pressable>
    </View>
  )
}

const LOGIN_SCREEN_CODE = `function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <View className="gap-4">
      <View className="items-center gap-1">
        <View className="size-10 rounded-full bg-primary items-center justify-center">
          <Text className="text-primary-foreground font-bold">nc</Text>
        </View>
        <Text className="text-lg font-semibold text-foreground">Welcome back</Text>
      </View>
      <View className="gap-3">
        <Label nativeID="email">Email</Label>
        <TextInput
          value={email} onChangeText={setEmail}
          placeholder="name@example.com"
          className="h-9 rounded-md border border-input bg-background px-3"
          keyboardType="email-address"
        />
        <Label nativeID="password">Password</Label>
        <TextInput
          value={password} onChangeText={setPassword}
          placeholder="••••••••"
          className="h-9 rounded-md border border-input bg-background px-3"
          secureTextEntry
        />
        <Button><Text className="text-primary-foreground">Sign In</Text></Button>
      </View>
    </View>
  )
}`

/* ---------- Profile Card Block ---------- */

function ProfileCardBlock() {
  return (
    <View className="items-center gap-3">
      <Avatar alt="John Doe" size="lg" fallback="JD" />
      <View className="items-center">
        <Text className="text-lg font-semibold text-foreground">John Doe</Text>
        <Text className="text-sm text-muted-foreground">john@example.com</Text>
      </View>
      <View className="flex-row gap-2">
        <Badge><Text className="text-[10px] text-primary-foreground">Pro Plan</Text></Badge>
        <Badge variant="secondary"><Text className="text-[10px]">Member</Text></Badge>
      </View>
      <View className="flex-row gap-2 w-full">
        <Button variant="outline" className="flex-1">
          <Text className="text-foreground text-sm">Edit Profile</Text>
        </Button>
        <Button className="flex-1">
          <Text className="text-primary-foreground text-sm">Share</Text>
        </Button>
      </View>
      <Separator />
      <View className="flex-row justify-between w-full">
        <View className="items-center">
          <Text className="text-lg font-bold text-foreground">128</Text>
          <Text className="text-xs text-muted-foreground">Posts</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-foreground">3.4K</Text>
          <Text className="text-xs text-muted-foreground">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-foreground">842</Text>
          <Text className="text-xs text-muted-foreground">Following</Text>
        </View>
      </View>
    </View>
  )
}

const PROFILE_CARD_CODE = `function ProfileCard() {
  return (
    <View className="items-center gap-3">
      <Avatar alt="John Doe" size="lg" fallback="JD" />
      <Text className="text-lg font-semibold text-foreground">John Doe</Text>
      <Text className="text-sm text-muted-foreground">john@example.com</Text>
      <View className="flex-row gap-2">
        <Badge>Pro Plan</Badge>
        <Badge variant="secondary">Member</Badge>
      </View>
      <View className="flex-row gap-2 w-full">
        <Button variant="outline" className="flex-1">
          <Text>Edit Profile</Text>
        </Button>
        <Button className="flex-1">
          <Text>Share</Text>
        </Button>
      </View>
      <Separator />
      <View className="flex-row justify-between w-full">
        <View className="items-center">
          <Text className="text-lg font-bold">128</Text>
          <Text className="text-xs text-muted-foreground">Posts</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold">3.4K</Text>
          <Text className="text-xs text-muted-foreground">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold">842</Text>
          <Text className="text-xs text-muted-foreground">Following</Text>
        </View>
      </View>
    </View>
  )
}`

/* ---------- Search List Block ---------- */

const FRUITS = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"]

function SearchListBlock() {
  const [query, setQuery] = useState("")
  const filtered = FRUITS.filter((f) => f.toLowerCase().includes(query.toLowerCase()))
  return (
    <View className="gap-2">
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search items..."
        className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
        placeholderTextColor="#9ca3af"
      />
      <ScrollView className="max-h-32" nestedScrollEnabled>
        {filtered.map((item) => (
          <View key={item} className="py-1.5 border-b border-border/50">
            <Text className="text-sm text-foreground">{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const SEARCH_LIST_CODE = `function SearchList() {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
  const [query, setQuery] = useState("")
  const filtered = items.filter((i) =>
    i.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <View className="gap-2">
      <TextInput
        value={query} onChangeText={setQuery}
        placeholder="Search..."
        className="h-9 rounded-md border border-input bg-background px-3"
      />
      <ScrollView className="max-h-32" nestedScrollEnabled>
        {filtered.map((item) => (
          <View key={item} className="py-1.5 border-b border-border/50">
            <Text className="text-sm text-foreground">{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}`

/* ---------- Activity Goal Block ---------- */

function ActivityGoalBlock() {
  const [goal, setGoal] = useState(350)
  return (
    <View className="gap-3">
      <View className="items-center">
        <Text className="text-3xl font-bold text-foreground tabular-nums">{goal}</Text>
        <Text className="text-xs text-muted-foreground uppercase">Calories/day</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Button variant="outline" size="sm" onPress={() => setGoal(Math.max(100, goal - 10))}>
          <Text className="text-foreground">−</Text>
        </Button>
        <Progress value={(goal / 500) * 100} className="flex-1" />
        <Button variant="outline" size="sm" onPress={() => setGoal(Math.min(500, goal + 10))}>
          <Text className="text-foreground">+</Text>
        </Button>
      </View>
      <Button variant="secondary">
        <Text className="text-secondary-foreground text-sm">Set Goal</Text>
      </Button>
    </View>
  )
}

const ACTIVITY_GOAL_CODE = `function ActivityGoal() {
  const [goal, setGoal] = useState(350)
  return (
    <View className="gap-3">
      <View className="items-center">
        <Text className="text-3xl font-bold tabular-nums">{goal}</Text>
        <Text className="text-xs text-muted-foreground uppercase">Calories/day</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Button variant="outline" onPress={() => setGoal(Math.max(100, goal - 10))}>
          <Text>−</Text>
        </Button>
        <Progress value={(goal / 500) * 100} className="flex-1" />
        <Button variant="outline" onPress={() => setGoal(Math.min(500, goal + 10))}>
          <Text>+</Text>
        </Button>
      </View>
      <Button variant="secondary"><Text>Set Goal</Text></Button>
    </View>
  )
}`

/* ---------- Export Registry ---------- */

export const blocks: BlockDef[] = [
  {
    name: "dashboard-stats",
    title: "Dashboard Stats",
    description: "A grid of key metrics with values and percentage changes.",
    category: "dashboard",
    dependencies: ["card"],
    component: DashboardStatsBlock,
    code: DASHBOARD_STATS_CODE,
  },
  {
    name: "settings-form",
    title: "Settings Form",
    description: "Toggles, inputs, and a save button for app settings.",
    category: "forms",
    dependencies: ["switch", "input", "label", "button"],
    component: SettingsFormBlock,
    code: SETTINGS_FORM_CODE,
  },
  {
    name: "login-screen",
    title: "Login Screen",
    description: "A complete sign-in form with email, password, and CTA.",
    category: "auth",
    dependencies: ["button", "input", "label"],
    component: LoginScreenBlock,
    code: LOGIN_SCREEN_CODE,
  },
  {
    name: "profile-card",
    title: "Profile Card",
    description: "Avatar, user info, badges, stats, and action buttons.",
    category: "profile",
    dependencies: ["avatar", "badge", "button", "separator"],
    component: ProfileCardBlock,
    code: PROFILE_CARD_CODE,
  },
  {
    name: "search-list",
    title: "Search List",
    description: "A filterable list with a search input.",
    category: "layout",
    dependencies: ["input"],
    component: SearchListBlock,
    code: SEARCH_LIST_CODE,
  },
  {
    name: "activity-goal",
    title: "Activity Goal",
    description: "A goal-setting widget with stepper and progress bar.",
    category: "dashboard",
    dependencies: ["button", "progress"],
    component: ActivityGoalBlock,
    code: ACTIVITY_GOAL_CODE,
  },
]
