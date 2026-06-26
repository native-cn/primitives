import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Button,
  Badge,
  Card,
  Input,
  Switch,
  Tabs,
  Progress,
  Avatar,
  Separator,
  Alert,
  Checkbox,
  Textarea,
  Dialog,
  DialogFooter,
  DialogClose,
  Toggle,
  Tooltip,
  Combobox,
  ChartContainer,
  BarChart,
  LineChart,
  PieChart,
  ChartLegend,
  ThemeProvider,
  useTheme,
  themes,
} from "@native-cn/primitives"

export default function HomeScreen() {
  const [switchChecked, setSwitchChecked] = useState(false)
  const [tabValue, setTabValue] = useState("tab1")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [newsletterChecked, setNewsletterChecked] = useState(true)
  const [togglePressed, setTogglePressed] = useState(false)
  const [goal, setGoal] = useState(350)
  const [comboboxValue, setComboboxValue] = useState("")
  const { theme, setTheme, colorScheme, toggleColorScheme } = useTheme()

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {/* Hero */}
        <View className="items-center px-6 pt-10 pb-6 md:pt-16 lg:pt-20">
          <Badge variant="secondary" className="bg-muted mb-4">
            <Text className="text-xs">
              ✨ Introducing native-cn primitives
            </Text>
          </Badge>
          <Text className="leading-tighter max-w-3xl text-center text-3xl font-semibold tracking-tight text-primary lg:text-5xl xl:tracking-tighter">
            The Foundation for your Design System
          </Text>
          <Text className="max-w-4xl text-center text-base text-foreground mt-3 sm:text-lg">
            A set of beautifully designed components that you can customize,
            extend, and build on. Start here then make it your own. Open
            Source. Open Code.
          </Text>
          <View className="flex-row items-center justify-center gap-2 pt-4">
            <Button onPress={() => {}}>
              <Text className="text-sm font-medium text-primary-foreground">
                Build Your Own →
              </Text>
            </Button>
          </View>
        </View>

        {/* Theme Switcher */}
        <View className="px-4 pb-2">
          <Card className="p-3">
            <Text className="text-sm font-semibold text-card-foreground mb-2">Theme</Text>
            <View className="flex-row flex-wrap gap-1.5">
              {themes.map((t) => (
                <Badge
                  key={t.name}
                  variant={theme === t.name ? "default" : "outline"}
                >
                  <Text
                    onPress={() => setTheme(t.name)}
                    className={theme === t.name ? "text-primary-foreground" : "text-foreground"}
                  >
                    {t.label}
                  </Text>
                </Badge>
              ))}
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-xs text-muted-foreground">
                {colorScheme === "dark" ? "🌙 Dark" : "☀️ Light"}
              </Text>
              <Button variant="outline" onPress={toggleColorScheme}>
                <Text className="text-xs text-foreground">Toggle mode</Text>
              </Button>
            </View>
          </Card>
        </View>

        <Separator />

        {/* Cards Demo */}
        <View className="px-4 pt-8 pb-16 gap-4">
          {/* Stats */}
          <Card className="p-4">
            <Text className="text-xs text-muted-foreground">
              Total Revenue
            </Text>
            <Text className="text-3xl font-bold text-foreground mt-1">
              $15,231.89
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">
              +20.1% from last month
            </Text>
            <Separator className="my-3" />
            <Text className="text-xs text-muted-foreground">Subscriptions</Text>
            <Text className="text-3xl font-bold text-foreground mt-1">
              +2,350
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">
              +180.1% from last month
            </Text>
          </Card>

          {/* Upgrade Subscription */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground">
              Upgrade your Subscription
            </Text>
            <Text className="text-sm text-muted-foreground mt-1 text-balance">
              You are currently on the free plan. Upgrade to the pro plan to
              get access to all features.
            </Text>
            <View className="gap-3 mt-4">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-sm text-foreground mb-1">Name</Text>
                  <Input placeholder="Max Leiter" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-foreground mb-1">Email</Text>
                  <Input placeholder="mail@acme.com" />
                </View>
              </View>
              <Text className="text-sm text-foreground">Plan</Text>
              <View className="flex-row gap-2">
                <View className="flex-1 border border-border rounded-lg p-3 bg-muted/30">
                  <Text className="text-sm font-medium text-foreground">
                    Starter Plan
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    For small businesses.
                  </Text>
                  <Text className="text-lg font-bold text-foreground mt-1">
                    $10
                  </Text>
                </View>
                <View className="flex-1 border border-border rounded-lg p-3 bg-muted/30">
                  <Text className="text-sm font-medium text-foreground">
                    Pro Plan
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    More features and storage.
                  </Text>
                  <Text className="text-lg font-bold text-foreground mt-1">
                    $20
                  </Text>
                </View>
              </View>
              <Textarea placeholder="Enter notes" />
              <View className="gap-2">
                <View className="flex-row items-center gap-2">
                  <Checkbox
                    checked={termsChecked}
                    onCheckedChange={setTermsChecked}
                  />
                  <Text className="text-sm text-foreground">
                    I agree to the terms and conditions
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Checkbox
                    checked={newsletterChecked}
                    onCheckedChange={setNewsletterChecked}
                  />
                  <Text className="text-sm text-foreground">
                    Allow us to send you emails
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Button variant="outline" onPress={() => {}} className="flex-1">
                  <Text className="text-sm text-foreground">Cancel</Text>
                </Button>
                <Button onPress={() => {}} className="flex-1">
                  <Text className="text-sm font-medium text-primary-foreground">
                    Upgrade Plan
                  </Text>
                </Button>
              </View>
            </View>
          </Card>

          {/* Tabs + Settings */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground mb-3">
              Settings
            </Text>
            <Tabs
              value={tabValue}
              onValueChange={setTabValue}
              options={[
                { label: "Account", value: "tab1" },
                { label: "Password", value: "tab2" },
              ]}
            />
            {tabValue === "tab1" ? (
              <View className="gap-3 mt-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-foreground">
                    Email notifications
                  </Text>
                  <Switch
                    checked={switchChecked}
                    onCheckedChange={setSwitchChecked}
                  />
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-foreground">Dark mode</Text>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-foreground">Public profile</Text>
                  <Switch checked={false} onCheckedChange={() => {}} />
                </View>
              </View>
            ) : (
              <View className="gap-3 mt-3">
                <Text className="text-sm text-foreground mb-1">
                  Current password
                </Text>
                <Input placeholder="••••••••" />
                <Text className="text-sm text-foreground mb-1">
                  New password
                </Text>
                <Input placeholder="Enter new password" />
                <Button onPress={() => {}}>
                  <Text className="text-sm font-medium text-primary-foreground">
                    Update Password
                  </Text>
                </Button>
              </View>
            )}
          </Card>

          {/* Activity Goal */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground">
              Move Goal
            </Text>
            <Text className="text-sm text-muted-foreground mt-1">
              Set your daily activity goal.
            </Text>
            <View className="items-center justify-center py-4">
              <Text className="text-4xl font-bold tracking-tighter text-foreground tabular-nums">
                {goal}
              </Text>
              <Text className="text-xs text-muted-foreground uppercase">
                Calories/day
              </Text>
            </View>
            <View className="flex-row items-center justify-center gap-4 mb-3">
              <Button
                variant="outline"
                onPress={() => setGoal(Math.max(200, goal - 10))}
                disabled={goal <= 200}
              >
                <Text className="text-foreground">−</Text>
              </Button>
              <Progress value={(goal / 400) * 100} className="flex-1" />
              <Button
                variant="outline"
                onPress={() => setGoal(Math.min(400, goal + 10))}
                disabled={goal >= 400}
              >
                <Text className="text-foreground">+</Text>
              </Button>
            </View>
            <Button variant="secondary" onPress={() => {}}>
              <Text className="text-sm font-medium text-secondary-foreground text-center">
                Set Goal
              </Text>
            </Button>
          </Card>

          {/* Team Members */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground mb-3">
              Team
            </Text>
            <View className="gap-3">
              {[
                { name: "Olivia Martin", role: "Product Designer", initials: "OM" },
                { name: "Jackson Lee", role: "Software Engineer", initials: "JL" },
                { name: "Isabella Nguyen", role: "Data Analyst", initials: "IN" },
              ].map((member) => (
                <View
                  key={member.name}
                  className="flex-row items-center gap-3"
                >
                  <Avatar alt={member.name} size="sm" fallback={member.initials} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-foreground">
                      {member.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {member.role}
                    </Text>
                  </View>
                  <Badge variant="outline">
                    <Text className="text-xs">Member</Text>
                  </Badge>
                </View>
              ))}
            </View>
          </Card>

          {/* Chat Preview */}
          <Card className="p-4">
            <View className="flex-row items-center gap-3 mb-3">
              <Avatar alt="Sofia Davis" size="sm" fallback="SD" />
              <View>
                <Text className="text-sm font-medium text-foreground">
                  Sofia Davis
                </Text>
                <Text className="text-xs text-muted-foreground">
                  m@example.com
                </Text>
              </View>
            </View>
            <View className="gap-2">
              <View className="bg-muted self-start max-w-[75%] rounded-lg px-3 py-2">
                <Text className="text-sm text-foreground">
                  Hi, how can I help you today?
                </Text>
              </View>
              <View className="bg-primary self-end max-w-[75%] rounded-lg px-3 py-2">
                <Text className="text-sm text-primary-foreground">
                  Hey, I&apos;m having trouble with my account.
                </Text>
              </View>
              <View className="bg-muted self-start max-w-[75%] rounded-lg px-3 py-2">
                <Text className="text-sm text-foreground">
                  What seems to be the problem?
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2 mt-3">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button onPress={() => {}}>
                <Text className="text-sm font-medium text-primary-foreground">
                  Send
                </Text>
              </Button>
            </View>
          </Card>

          {/* Alerts / Notifications */}
          <Alert title="Heads up!" variant="default">
            We just shipped v0.1.0 — check out the new components.
          </Alert>

          {/* More primitives showcase */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground mb-3">
              More Primitives
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              <Badge>Badge</Badge>
              <Badge variant="secondary">Badge</Badge>
              <Badge variant="outline">Badge</Badge>
              <Badge variant="destructive">Badge</Badge>
            </View>
            <View className="flex-row gap-2 mb-3">
              <Toggle
                pressed={togglePressed}
                onPressedChange={setTogglePressed}
                label="Bold"
              />
              <Toggle pressed={false} onPressedChange={() => {}} label="Italic" />
              <Toggle pressed={false} onPressedChange={() => {}} label="Underline" />
            </View>
            <View className="flex-row gap-2">
              <Tooltip content="Edit your profile">
                <Button variant="outline" onPress={() => {}}>
                  <Text className="text-sm text-foreground">Hover me</Text>
                </Button>
              </Tooltip>
              <Button onPress={() => setDialogOpen(true)}>
                <Text className="text-sm font-medium text-primary-foreground">
                  Open Dialog
                </Text>
              </Button>
            </View>
            <Dialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              title="Confirm"
              description="This action cannot be undone."
            >
              <DialogFooter>
                <DialogClose onPress={() => setDialogOpen(false)} />
                <Button onPress={() => setDialogOpen(false)}>
                  <Text className="text-sm font-medium text-primary-foreground">
                    Continue
                  </Text>
                </Button>
              </DialogFooter>
            </Dialog>
          </Card>

          {/* Charts */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground mb-3">
              Charts
            </Text>
            {(() => {
              const chartData = [
                { month: "Jan", revenue: 400, expenses: 240 },
                { month: "Feb", revenue: 300, expenses: 139 },
                { month: "Mar", revenue: 500, expenses: 380 },
                { month: "Apr", revenue: 280, expenses: 190 },
                { month: "May", revenue: 590, expenses: 430 },
                { month: "Jun", revenue: 490, expenses: 340 },
              ]
              const pieData = [
                { name: "Products", value: 45 },
                { name: "Services", value: 30 },
                { name: "Licenses", value: 15 },
                { name: "Support", value: 10 },
              ]
              const chartConfig = {
                revenue: { label: "Revenue", color: "hsl(221.2 83.2% 53.3%)" },
                expenses: { label: "Expenses", color: "hsl(0 84.2% 60.2%)" },
              }
              const pieConfig = {
                products: { label: "Products", color: "#3b82f6" },
                services: { label: "Services", color: "#22c55e" },
                licenses: { label: "Licenses", color: "#f59e0b" },
                support: { label: "Support", color: "#8b5cf6" },
              }

              return (
                <>
                  <ChartContainer config={chartConfig}>
                    <Text className="text-xs text-muted-foreground mb-1">Bar Chart</Text>
                    <BarChart data={chartData} config={chartConfig} xKey="month" yKey="revenue" height={160} />
                    <ChartLegend config={chartConfig} />
                  </ChartContainer>
                  <View className="h-4" />
                  <ChartContainer config={chartConfig}>
                    <Text className="text-xs text-muted-foreground mb-1">Line Chart</Text>
                    <LineChart data={chartData} config={chartConfig} xKey="month" yKey="expenses" height={160} />
                  </ChartContainer>
                  <View className="h-4" />
                  <ChartContainer config={pieConfig}>
                    <Text className="text-xs text-muted-foreground mb-1">Pie Chart</Text>
                    <PieChart data={pieData} config={pieConfig} nameKey="name" valueKey="value" size={180} innerRadius={40} />
                    <ChartLegend config={pieConfig} />
                  </ChartContainer>
                </>
              )
            })()}
          </Card>

          {/* Combobox */}
          <Card className="p-4">
            <Text className="text-lg font-semibold text-card-foreground mb-3">
              Combobox
            </Text>
            <Combobox
              value={comboboxValue}
              onValueChange={setComboboxValue}
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Cherry", value: "cherry" },
                { label: "Date", value: "date" },
                { label: "Elderberry", value: "elderberry" },
              ]}
              placeholder="Pick a fruit..."
            />
          </Card>

          {/* Quick links */}
          <View className="items-center gap-3 py-4">
            <Link href="/examples" asChild>
              <Button size="lg">
                <Text className="text-primary-foreground font-semibold">Browse Examples</Text>
              </Button>
            </Link>
          </View>

          {/* All components count */}
          <View className="items-center py-2">
            <Text className="text-center text-xs text-muted-foreground">
              55 components + 7 examples from @native-cn/primitives
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
