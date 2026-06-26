import { useMemo } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { Rect, Path, Circle } from "react-native-svg"
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  Switch,
  Tabs,
  Progress,
  Avatar,
  Separator,
  Alert,
  Checkbox,
  Textarea,
  useTheme,
} from "@native-cn/primitives"

/* ---------- Page Header Components ---------- */

function Announcement() {
  return (
    <Badge variant="secondary" className="bg-muted">
      <Link href="/docs/getting-started">
        <Text className="text-xs font-medium text-foreground">
          Get started with native-cn →
        </Text>
      </Link>
    </Badge>
  )
}

function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <View className="items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20">
      {children}
    </View>
  )
}

function PageHeaderHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text className="leading-tighter max-w-3xl text-center text-3xl font-semibold tracking-tight text-primary lg:leading-[1.1] xl:text-5xl">
      {children}
    </Text>
  )
}

function PageHeaderDescription({ children }: { children: React.ReactNode }) {
  return (
    <Text className="max-w-4xl text-center text-base text-balance text-foreground sm:text-lg">
      {children}
    </Text>
  )
}

function PageActions({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-row items-center justify-center gap-2 pt-2">
      {children}
    </View>
  )
}

/* ---------- Stroke Micro Chart (inline SVG) ---------- */

function StrokeChart({ className }: { className?: string }) {
  return (
    <Svg
      viewBox="0 0 100 86"
      preserveAspectRatio="none"
      className={className}
      aria-label="Analytics trend"
    >
      <Path
        d="M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z"
        fill="currentColor"
        opacity="0.28"
      />
      <Path
        d="M0 52L18 40L36 46L54 70L72 50L100 49"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </Svg>
  )
}

/* ---------- Mini bar chart (inline View) ---------- */

function MiniBar({ data, color = "bg-chart-2" }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <View className="flex-row items-end gap-1 h-8" role="img">
      {data.map((d) => (
        <View
          key={d.label}
          className={`flex-1 min-h-[3px] rounded-t-sm ${color}`}
          style={{ height: `${(d.value / max) * 100}%` }}
        />
      ))}
    </View>
  )
}

function BarChartPreview({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <View className="flex-row items-end gap-1.5" role="img" aria-label="Bar chart">
      {data.map((d) => (
        <View key={d.label} className="flex-1 items-center gap-1">
          <View
            className="w-full min-h-[6px] rounded-t-md bg-chart-2"
            style={{ height: `${(d.value / max) * 80}%` }}
          />
          <Text className="text-[10px] text-muted-foreground">{d.label}</Text>
        </View>
      ))}
    </View>
  )
}

/* ---------- Card Components (matching shadcn/ui demo) ---------- */

function UIElements() {
  return (
    <Card>
      <CardContent className="flex-col gap-5 p-4">
        <View className="flex-row gap-2">
          <Button><Text className="text-xs text-primary-foreground">Button →</Text></Button>
          <Button variant="secondary"><Text className="text-xs text-secondary-foreground">Secondary</Text></Button>
          <Button variant="outline"><Text className="text-xs text-foreground">Outline</Text></Button>
        </View>
        <View className="gap-2">
          <Input placeholder="Name" />
          <Textarea placeholder="Message" />
        </View>
        <View className="flex-row items-center gap-2 flex-wrap">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Checkbox aria-label="Enable alerts" />
          <Switch defaultChecked aria-label="Notifications" />
        </View>
        <View className="flex-row items-center gap-3">
          <Button variant="outline"><Text className="text-xs text-foreground">Alert Dialog</Text></Button>
          <Button variant="outline"><Text className="text-xs text-foreground">Button Group</Text></Button>
        </View>
      </CardContent>
    </Card>
  )
}

function SidebarNav() {
  const sections = [
    { label: "Overview", items: ["Analytics", "Transactions", "Investments", "Accounts", "Spending"] },
    { label: "Planning", items: ["Documents", "Budget", "Reports", "Goals", "Calendar"] },
  ]
  return (
    <View className="gap-3">
      {sections.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-3 gap-1">
            <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              {s.label}
            </Text>
            {s.items.map((item) => (
              <Text key={item} className="text-sm text-foreground py-0.5">
                {item}
              </Text>
            ))}
          </CardContent>
        </Card>
      ))}
    </View>
  )
}

function ContributionHistory() {
  const data = [
    { label: "Dec", value: 800 },
    { label: "Jan", value: 1100 },
    { label: "Feb", value: 900 },
    { label: "Mar", value: 1300 },
    { label: "Apr", value: 750 },
    { label: "May", value: 1400 },
  ]
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Contribution History</Text>
        <Text className="text-xs text-muted-foreground">Last 6 months of activity</Text>
      </CardHeader>
      <CardContent className="px-4">
        <BarChartPreview data={data} />
      </CardContent>
      <CardContent className="px-4 pb-4">
        <View className="flex-row gap-3">
          <View className="flex-1 bg-muted rounded-lg p-3">
            <Text className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Upcoming</Text>
            <Text className="text-sm font-semibold text-foreground">May 2024</Text>
            <Text className="text-xs text-muted-foreground">Scheduled</Text>
          </View>
          <View className="flex-1 bg-muted rounded-lg p-3">
            <Text className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Savings Plan</Text>
            <Text className="text-sm font-semibold text-foreground">Accelerated</Text>
            <Text className="text-xs text-muted-foreground">Recurring</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}

function ClaimableBalance() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-xs text-muted-foreground">Claimable Balance</Text>
        <Text className="text-3xl font-semibold tabular-nums text-card-foreground">$1,211.29</Text>
        <Badge variant="outline">
          <View className="size-1.5 rounded-full bg-yellow-500 mr-1" />
          <Text className="text-xs">Pending Setup</Text>
        </Badge>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <View className="bg-muted rounded-lg p-3 gap-2">
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted-foreground">Net Royalties</Text>
            <Text className="text-xs font-medium tabular-nums text-foreground">$1,248.75</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted-foreground">Processing Fee</Text>
            <Text className="text-xs font-medium tabular-nums text-foreground">-$37.46</Text>
          </View>
          <Separator />
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted-foreground">Total Ready to Claim</Text>
            <Text className="text-xs font-semibold tabular-nums text-foreground">$1,211.29 USD</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}

function DividendIncome() {
  const holdings = [
    { name: "Vanguard", shares: "450 Shares", amount: "$1,842.10" },
    { name: "S&P 500 VOO", shares: "112 Shares", amount: "$928.40" },
    { name: "Apple AAPL", shares: "85 Shares", amount: "$340.00" },
    { name: "Realty Income", shares: "320 Shares", amount: "$1,139.50" },
  ]
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Q2 Dividend Income</Text>
        <Text className="text-xs text-muted-foreground">Quarterly dividend payouts across your portfolio holdings.</Text>
      </CardHeader>
      <CardContent className="px-4 pb-4 gap-2">
        {holdings.map((h) => (
          <View key={h.name} className="flex-row items-center justify-between bg-muted rounded-lg p-3">
            <View>
              <Text className="text-sm font-medium text-foreground">{h.name}</Text>
              <Text className="text-xs text-muted-foreground">{h.shares}</Text>
            </View>
            <Text className="text-sm font-semibold tabular-nums text-foreground">{h.amount}</Text>
          </View>
        ))}
      </CardContent>
    </Card>
  )
}

function NewMilestone() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Set a new milestone</Text>
        <Text className="text-xs text-muted-foreground">Define your financial target and we'll help you pace your savings.</Text>
      </CardHeader>
      <CardContent className="px-4 gap-3">
        <Input placeholder="Goal Name" defaultValue="e.g. New Car" />
        <View className="flex-row gap-3">
          <Input placeholder="Target Amount" className="flex-1" defaultValue="$15,000" />
          <Input placeholder="Target Date" className="flex-1" defaultValue="Dec 2025" />
        </View>
      </CardContent>
    </Card>
  )
}

function PayoutThreshold() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Payout Threshold</Text>
        <Text className="text-xs text-muted-foreground">Set the minimum balance required before a payout is triggered.</Text>
      </CardHeader>
      <CardContent className="px-4 gap-4">
        <View className="gap-2">
          <Text className="text-xs text-muted-foreground">Minimum Payout Amount</Text>
          <Text className="text-2xl font-semibold tabular-nums text-foreground">$2,500.00</Text>
          <Progress value={25} />
          <View className="flex-row justify-between">
            <Text className="text-[10px] text-muted-foreground">$50 (MIN)</Text>
            <Text className="text-[10px] text-muted-foreground">$10,000 (MAX)</Text>
          </View>
        </View>
        <Textarea placeholder="Add any notes for this payout configuration..." />
      </CardContent>
    </Card>
  )
}

function AccountAccess() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Account Access</Text>
        <Text className="text-xs text-muted-foreground">Update your credentials or re-authenticate.</Text>
      </CardHeader>
      <CardContent className="px-4 gap-3">
        <View className="gap-1.5">
          <Text className="text-xs text-foreground">Email Address</Text>
          <Input placeholder="artist@studio.inc" />
        </View>
        <View className="gap-1.5">
          <View className="flex-row justify-between">
            <Text className="text-xs text-foreground">Current Password</Text>
            <Text className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Forgot?</Text>
          </View>
          <Input placeholder="••••••••••••••••" />
        </View>
      </CardContent>
    </Card>
  )
}

function QrConnect() {
  return (
    <Card>
      <CardContent className="items-center pt-6 pb-2">
        <View className="rounded-xl border bg-white p-3">
          {(() => {
            const qrCells = [
              "111111100101101111111",
              "100000101001001000001",
              "101110101111101011101",
              "101110100100001011101",
              "101110101010101011101",
              "100000100111001000001",
              "111111101010101111111",
              "000000001101000000000",
              "101011111001111010110",
              "010100001110010101001",
              "111010111011101111010",
              "110001010100001010111",
              "110101111101111010011",
              "000000001001010001010",
              "111111101101111101001",
              "100000100010001001111",
              "101110101011101110100",
              "101110100110100010011",
              "101110101000111101110",
              "100000101101000011001",
              "111111101011101101111",
            ]
            return (
              <Svg viewBox="0 0 21 21" width={120} height={120} aria-label="QR code">
                {qrCells.map((row, y) =>
                  [...row].map((cell, x) =>
                    cell === "1" ? (
                      <Rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="black" />
                    ) : null
                  )
                )}
              </Svg>
            )
          })()}
        </View>
      </CardContent>
      <CardHeader className="items-center pb-4">
        <Text className="text-sm font-semibold text-card-foreground text-center">Scan to connect your mobile device</Text>
        <Text className="text-xs text-muted-foreground text-center text-balance">
          Open the Ledger mobile app and scan this code to link your device.
        </Text>
      </CardHeader>
    </Card>
  )
}

function TransferFunds() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Transfer Funds</Text>
        <Text className="text-xs text-muted-foreground">Move money between your connected accounts.</Text>
      </CardHeader>
      <CardContent className="px-4 gap-3">
        <View className="gap-1.5">
          <Text className="text-xs text-foreground">Amount to Transfer</Text>
          <Input defaultValue="$1,200.00" />
        </View>
        <View className="gap-1.5">
          <Text className="text-xs text-foreground">From Account</Text>
          <Input defaultValue="Main Checking (··8402)" />
        </View>
        <View className="gap-1.5">
          <Text className="text-xs text-foreground">To Account</Text>
          <Input defaultValue="High Yield Savings (··1192)" />
        </View>
        <View className="bg-muted rounded-lg p-3 gap-2">
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted-foreground">Estimated arrival</Text>
            <Text className="text-xs font-medium text-foreground">Today, Apr 14</Text>
          </View>
          <Separator />
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted-foreground">Transaction fee</Text>
            <Text className="text-xs font-medium tabular-nums text-foreground">$0.00</Text>
          </View>
          <Separator />
          <View className="flex-row justify-between">
            <Text className="text-xs font-medium text-foreground">Total amount</Text>
            <Text className="text-xs font-semibold tabular-nums text-foreground">$1,200.00</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}

function Payments() {
  const items = [
    { title: "Change transfer limit", desc: "Adjust how much you can send from your balance." },
    { title: "Scheduled transfers", desc: "Set up a transfer to send at a later date." },
    { title: "Recurring card payments", desc: "Manage your repeated card transactions." },
  ]
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Payments</Text>
        <Text className="text-xs text-muted-foreground">Home / Payments</Text>
      </CardHeader>
      <CardContent className="px-4 pb-4 gap-2">
        {items.map((item) => (
          <View key={item.title} className="bg-muted rounded-lg p-3">
            <Text className="text-sm font-medium text-foreground">{item.title}</Text>
            <Text className="text-xs text-muted-foreground">{item.desc}</Text>
          </View>
        ))}
      </CardContent>
    </Card>
  )
}

function NotificationSettings() {
  const notifications = [
    { id: "transactions", label: "Transaction alerts", desc: "Deposits, withdrawals, and transfers.", checked: true },
    { id: "security", label: "Security alerts", desc: "Login attempts and account changes.", checked: true },
    { id: "goals", label: "Goal milestones", desc: "Updates at 25%, 50%, 75%, and 100%.", checked: false },
    { id: "market", label: "Market updates", desc: "Daily portfolio summary and price alerts.", checked: false },
  ]
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Notifications</Text>
        <Text className="text-xs text-muted-foreground">Choose which email and push alerts you want to receive.</Text>
      </CardHeader>
      <CardContent className="px-4 pb-4 gap-3">
        {notifications.map((n) => (
          <View key={n.id} className="flex-row items-start gap-3">
            <Checkbox id={n.id} defaultChecked={n.checked} aria-label={n.label} />
            <View className="flex-1">
              <Text className="text-sm text-foreground">{n.label}</Text>
              <Text className="text-xs text-muted-foreground">{n.desc}</Text>
            </View>
          </View>
        ))}
      </CardContent>
    </Card>
  )
}

function PowerUsage() {
  const data = [
    { label: "6a", value: 1.2 },
    { label: "8a", value: 2.8 },
    { label: "10a", value: 3.1 },
    { label: "12p", value: 2.4 },
    { label: "2p", value: 3.4 },
    { label: "4p", value: 2.9 },
    { label: "6p", value: 3.8 },
    { label: "8p", value: 3.2 },
  ]
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Power Usage</Text>
        <Text className="text-xs text-muted-foreground">Whole Home</Text>
      </CardHeader>
      <CardContent className="px-4 gap-3">
        <MiniBar data={data} />
        <Separator />
        <View className="flex-row justify-between">
          <View>
            <Text className="text-xs text-muted-foreground">Currently Using</Text>
            <Text className="text-base font-semibold tabular-nums text-foreground">3.4 kW</Text>
          </View>
          <View>
            <Text className="text-xs text-muted-foreground">Solar Gen</Text>
            <Text className="text-base font-semibold tabular-nums text-foreground">+1.2 kW</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  )
}

function AnalyticsCard() {
  return (
    <Card className="pb-0">
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Analytics</Text>
        <View className="flex-row items-center gap-1.5">
          <Text className="text-xs text-muted-foreground">418.2K Visitors</Text>
          <Badge><Text className="text-[10px] text-primary-foreground">+10%</Text></Badge>
        </View>
      </CardHeader>
      <View className="px-4 pb-4">
        <View className="text-chart-1">
          <StrokeChart className="w-full h-20" />
        </View>
      </View>
    </Card>
  )
}

function SavingsTargets() {
  return (
    <Card>
      <CardHeader>
        <Text className="text-sm font-semibold text-card-foreground">Savings Targets</Text>
        <Text className="text-xs text-muted-foreground">Active milestones for 2024 across your portfolio.</Text>
      </CardHeader>
      <CardContent className="px-4 pb-4 gap-3">
        {[
          { title: "Retirement", value: "$420,000", progress: 65, achieved: "$273,000" },
          { title: "Real Estate", value: "$85,000", progress: 32, achieved: "$27,200" },
        ].map((item) => (
          <View key={item.title} className="bg-muted rounded-lg p-3 gap-2">
            <Text className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{item.title}</Text>
            <Text className="text-2xl font-semibold tabular-nums text-foreground">{item.value}</Text>
            <Progress value={item.progress} />
            <View className="flex-row justify-between">
              <Text className="text-xs text-muted-foreground">{item.progress}% achieved</Text>
              <Text className="text-xs font-medium tabular-nums text-foreground">{item.achieved}</Text>
            </View>
          </View>
        ))}
      </CardContent>
    </Card>
  )
}

function EmptyDistributeTrack() {
  return (
    <Card>
      <CardContent className="items-center py-8 gap-3">
        <View className="size-10 rounded-full bg-muted items-center justify-center">
          <Text className="text-lg text-foreground">+</Text>
        </View>
        <Text className="text-sm font-semibold text-foreground">Distribute Track</Text>
        <Text className="text-xs text-muted-foreground text-center text-balance px-4">
          Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
        </Text>
        <Button><Text className="text-xs text-primary-foreground">Create Release</Text></Button>
      </CardContent>
    </Card>
  )
}

/* ---------- Skeleton Rail Placeholders (decorative) ---------- */

function SkeletonRail() {
  return (
    <View className="hidden min-[2200px]:flex absolute top-12 z-0 opacity-50 gap-8 px-8">
      <View className="gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-muted/50">
            <CardContent className="p-4 gap-2">
              <View className="h-4 w-24 bg-muted rounded-md" />
              <View className="h-3 w-32 bg-muted rounded-md" />
              <View className="h-8 w-full bg-muted rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  )
}

/* ---------- Demo Wrapper ---------- */

function CardsDemo() {
  return (
    <View
      className="theme-neutral relative w-full flex-col gap-8 overflow-hidden bg-muted p-6 pb-0 lg:p-8 lg:pb-0 dark:bg-background"
    >
      <View className="mx-auto gap-8 flex-row flex-wrap justify-center xl:max-w-[1600px]">
        {/* Column 1 */}
        <View className="flex-1 min-w-[280px] max-w-[380px] gap-8">
          <UIElements />
          <SidebarNav />
          <SavingsTargets />
        </View>
        {/* Column 2 */}
        <View className="hidden lg:flex flex-1 min-w-[280px] max-w-[380px] gap-8">
          <ContributionHistory />
          <ClaimableBalance />
          <DividendIncome />
        </View>
        {/* Column 3 */}
        <View className="hidden xl:flex flex-1 min-w-[280px] max-w-[380px] gap-8">
          <NewMilestone />
          <PayoutThreshold />
          <AccountAccess />
        </View>
        {/* Column 4 */}
        <View className="hidden md:flex flex-1 min-w-[280px] max-w-[380px] gap-8">
          <QrConnect />
          <TransferFunds />
          <Payments />
        </View>
        {/* Column 5 */}
        <View className="hidden 3xl:flex flex-1 min-w-[280px] max-w-[380px] gap-8">
          <EmptyDistributeTrack />
          <AnalyticsCard />
          <NotificationSettings />
          <PowerUsage />
        </View>
      </View>
    </View>
  )
}

/* ---------- Main Page ---------- */

export default function HomeScreen() {
  const { toggleColorScheme, colorScheme } = useTheme()

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Hero Section — matching shadcn/ui v4 exactly */}
        <PageHeader>
          <Announcement />
          <PageHeaderHeading>
            The Foundation for your Design System
          </PageHeaderHeading>
          <PageHeaderDescription>
            A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.
          </PageHeaderDescription>
          <PageActions>
            <Link href="/create" asChild>
              <Button className="h-[31px] rounded-lg">
                <Text className="text-sm font-medium text-primary-foreground">
                  Build Your Own →
                </Text>
              </Button>
            </Link>
          </PageActions>
        </PageHeader>

        {/* Cards Demo */}
        <CardsDemo />
      </ScrollView>
    </SafeAreaView>
  )
}
