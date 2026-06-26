import { useState } from "react"
import { View, Text, ScrollView, Pressable, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Button,
  Badge,
  Card,
  Separator,
  Input,
  Switch,
  Checkbox,
  Tabs,
  Progress,
  Spinner,
  Skeleton,
  Avatar,
  Alert,
  Accordion,
  AccordionItem,
  Toggle,
  RadioGroup,
  Select,
  Textarea,
  Kbd,
  Empty,
  Item,
  Breadcrumb,
  Pagination,
  Tooltip,
  Popover,
  Dialog,
  DialogFooter,
  DialogClose,
  Drawer,
  DrawerFooter,
  Sheet,
  DropdownMenu,
  ContextMenu,
  AlertDialog,
  Calendar,
  Carousel,
  Command,
  InputOtp,
  Field,
  Form,
  Menubar,
  NavigationMenu,
  Sidebar,
  ScrollArea,
  Resizable,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  Sonner,
  HoverCard,
  AspectRatio,
  ButtonGroup,
  ToggleGroup,
  Slider,
} from "@native-cn/primitives"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-8">
      <Text className="text-lg font-bold text-foreground mb-1">{title}</Text>
      <Separator className="mb-4" />
      {children}
    </View>
  )
}

function Demo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="mb-4">
      <Text className="text-xs text-muted-foreground mb-2">{label}</Text>
      <View className="flex-row flex-wrap items-center gap-3">{children}</View>
    </View>
  )
}

export default function HomeScreen() {
  const [switchChecked, setSwitchChecked] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState("1")
  const [selectValue, setSelectValue] = useState("")
  const [togglePressed, setTogglePressed] = useState(false)
  const [tabValue, setTabValue] = useState("tab1")
  const [currentPage, setCurrentPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [sonnerVisible, setSonnerVisible] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <View className="px-4 pt-4 pb-20">
          <Text className="text-3xl font-bold text-foreground mb-1">native-cn</Text>
          <Text className="text-sm text-muted-foreground mb-6 pb-2">
            shadcn/ui primitives for React Native — 54 components
          </Text>

          <Section title="Buttons & Actions">
            <Demo label="Button variants">
              <Button onPress={() => {}}><Text className="text-sm font-medium text-primary-foreground">Default</Text></Button>
              <Button variant="secondary" onPress={() => {}}><Text className="text-sm font-medium text-secondary-foreground">Secondary</Text></Button>
              <Button variant="outline" onPress={() => {}}><Text className="text-sm font-medium text-foreground">Outline</Text></Button>
              <Button variant="ghost" onPress={() => {}}><Text className="text-sm font-medium text-foreground">Ghost</Text></Button>
              <Button variant="destructive" onPress={() => {}}><Text className="text-sm font-medium text-destructive-foreground">Destructive</Text></Button>
              <Button variant="link" onPress={() => {}}><Text className="text-sm font-medium text-primary underline">Link</Text></Button>
            </Demo>
            <Demo label="Button Group">
              <ButtonGroup>
                <Button variant="outline" onPress={() => {}}><Text className="text-sm text-foreground">Left</Text></Button>
                <Button variant="outline" onPress={() => {}}><Text className="text-sm text-foreground">Center</Text></Button>
                <Button variant="outline" onPress={() => {}}><Text className="text-sm text-foreground">Right</Text></Button>
              </ButtonGroup>
            </Demo>
            <Demo label="Toggle">
              <Toggle pressed={togglePressed} onPressedChange={setTogglePressed} label="Bold" />
              <Toggle pressed={false} onPressedChange={() => {}} label="Italic" />
            </Demo>
            <Demo label="Toggle Group">
              <ToggleGroup>
                <Toggle pressed={false} onPressedChange={() => {}} label="B" />
                <Toggle pressed={false} onPressedChange={() => {}} label="I" />
                <Toggle pressed={false} onPressedChange={() => {}} label="U" />
              </ToggleGroup>
            </Demo>
            <Demo label="Menubar">
              <Menubar items={[{ label: "File", onPress: () => {} }, { label: "Edit", onPress: () => {} }, { label: "View", onPress: () => {} }]} />
            </Demo>
          </Section>

          <Section title="Form Controls">
            <Demo label="Input">
              <Input placeholder="Enter text..." className="w-60" />
            </Demo>
            <Demo label="Textarea">
              <Textarea placeholder="Write something..." className="w-60" />
            </Demo>
            <Demo label="Select">
              <View className="w-44">
                <Select value={selectValue} onValueChange={setSelectValue} options={[{ label: "Apple", value: "apple" }, { label: "Banana", value: "banana" }]} />
              </View>
            </Demo>
            <Demo label="Field / Form">
              <Form className="w-full max-w-xs">
                <Field label="Name" required><Input placeholder="Full name" /></Field>
                <Field label="Bio"><Textarea placeholder="Tell us about yourself" /></Field>
              </Form>
            </Demo>
            <Demo label="Input OTP">
              <InputOtp value={otpValue} onValueChange={setOtpValue} length={4} />
            </Demo>
          </Section>

          <Section title="Selection Controls">
            <Demo label="Switch">
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <Switch checked={true} onCheckedChange={() => {}} />
            </Demo>
            <Demo label="Checkbox">
              <Checkbox checked={checkboxChecked} onCheckedChange={setCheckboxChecked} label="Accept terms" />
              <Checkbox checked={true} onCheckedChange={() => {}} label="Remember me" />
            </Demo>
            <Demo label="Radio Group">
              <RadioGroup value={radioValue} onValueChange={setRadioValue} options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]} />
            </Demo>
            <Demo label="Tabs">
              <Tabs value={tabValue} onValueChange={setTabValue} options={[{ label: "Tab 1", value: "tab1" }, { label: "Tab 2", value: "tab2" }]} />
            </Demo>
          </Section>

          <Section title="Status & Feedback">
            <Demo label="Badge">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Danger</Badge>
              <Badge variant="outline">Outline</Badge>
            </Demo>
            <Demo label="Alert">
              <Alert title="Heads up">Default alert message</Alert>
              <Alert variant="destructive" title="Error">Something went wrong</Alert>
            </Demo>
            <Demo label="Progress">
              <Progress value={65} className="w-60" />
            </Demo>
            <Demo label="Spinner">
              <Spinner />
              <Spinner label="Loading..." />
            </Demo>
            <Demo label="Skeleton">
              <View className="gap-2 w-40">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </View>
            </Demo>
            <Demo label="Sonner">
              <Button onPress={() => setSonnerVisible(true)}><Text className="text-sm font-medium text-primary-foreground">Show Toast</Text></Button>
              {sonnerVisible ? <Sonner message="Saved!" variant="success" duration={2000} onDismiss={() => setSonnerVisible(false)} /> : null}
            </Demo>
          </Section>

          <Section title="Data Display">
            <Demo label="Card">
              <Card className="p-4 w-full max-w-xs">
                <Text className="text-sm font-semibold text-card-foreground">Card Title</Text>
                <Text className="text-sm text-muted-foreground mt-1">Card content goes here</Text>
              </Card>
            </Demo>
            <Demo label="Avatar">
              <Avatar alt="John Doe" />
              <Avatar alt="Jane Smith" size="lg" />
              <Avatar alt="User" size="sm" fallback="U" />
            </Demo>
            <Demo label="Table">
              <Table>
                <TableHeader>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                </TableHeader>
                <TableRow>
                  <TableCell>Alice</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
              </Table>
            </Demo>
            <Demo label="Item / Breadcrumb">
              <Item label="Email" value="user@example.com" />
              <Breadcrumb items={[{ label: "Home" }, { label: "Settings" }]} />
            </Demo>
            <Demo label="Calendar">
              <Calendar selected={date} onSelect={setDate} />
            </Demo>
            <Demo label="Carousel">
              <Carousel data={["Slide 1", "Slide 2", "Slide 3"]} renderItem={(item) => (
                <View className="h-24 bg-muted rounded-lg items-center justify-center mx-1">
                  <Text className="text-sm text-muted-foreground">{item}</Text>
                </View>
              )} />
            </Demo>
            <Demo label="Command (searchable list)">
              <Command items={[{ name: "Settings" }, { name: "Profile" }, { name: "Help" }]} filterKey="name" onSelect={() => {}} renderItem={(item) => <Text className="text-sm text-card-foreground">{item.name}</Text>} />
            </Demo>
          </Section>

          <Section title="Overlays">
            <Demo label="Dialog">
              <Button onPress={() => setDialogOpen(true)}><Text className="text-sm font-medium text-primary-foreground">Open Dialog</Text></Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Confirm" description="This action cannot be undone.">
                <DialogFooter>
                  <DialogClose onPress={() => setDialogOpen(false)} />
                  <Button onPress={() => setDialogOpen(false)}><Text className="text-sm font-medium text-primary-foreground">Continue</Text></Button>
                </DialogFooter>
              </Dialog>
            </Demo>
            <Demo label="Alert Dialog">
              <Button variant="destructive" onPress={() => setAlertDialogOpen(true)}><Text className="text-sm font-medium text-destructive-foreground">Delete</Text></Button>
              <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen} title="Delete?" description="This is permanent." variant="destructive" />
            </Demo>
            <Demo label="Drawer">
              <Button onPress={() => setDrawerOpen(true)}><Text className="text-sm font-medium text-primary-foreground">Open Drawer</Text></Button>
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Options">
                <DrawerFooter>
                  <Button variant="outline" onPress={() => setDrawerOpen(false)}><Text className="text-sm text-foreground">Cancel</Text></Button>
                  <Button onPress={() => setDrawerOpen(false)}><Text className="text-sm font-medium text-primary-foreground">Save</Text></Button>
                </DrawerFooter>
              </Drawer>
            </Demo>
            <Demo label="Sheet">
              <Button onPress={() => setSheetOpen(true)}><Text className="text-sm font-medium text-primary-foreground">Open Sheet</Text></Button>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Filters">
                <Text className="text-sm text-card-foreground">Sheet content</Text>
              </Sheet>
            </Demo>
            <Demo label="Popover / Dropdown / Context Menu">
              <Popover trigger={<Button variant="outline" onPress={() => {}}><Text className="text-sm text-foreground">Popover</Text></Button>}>
                <Text className="text-sm text-card-foreground">Popover content</Text>
              </Popover>
              <DropdownMenu trigger={<Button variant="outline" onPress={() => {}}><Text className="text-sm text-foreground">Menu</Text></Button>} items={[{ label: "Edit", value: "edit" }, { label: "Delete", value: "delete", destructive: true }]} onSelect={() => {}} />
              <ContextMenu actions={[{ label: "Edit", onPress: () => {} }, { label: "Delete", destructive: true, onPress: () => {} }]}>
                <View className="rounded-md border border-border bg-card p-3">
                  <Text className="text-sm text-card-foreground">Long-press me</Text>
                </View>
              </ContextMenu>
            </Demo>
            <Demo label="Tooltip">
              <Tooltip content="Helpful info">
                <Text className="text-sm text-foreground border-b border-dashed">Tap for info</Text>
              </Tooltip>
            </Demo>
          </Section>

          <Section title="Navigation & Layout">
            <Demo label="Pagination">
              <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
            </Demo>
            <Demo label="Navigation Menu">
              <NavigationMenu items={[{ label: "Dashboard", onPress: () => {}, badge: 3 }, { label: "Orders", onPress: () => {} }]} />
            </Demo>
            <Demo label="Sidebar">
              <Sidebar items={[{ label: "Dashboard", icon: "📊", onPress: () => {}, active: true }, { label: "Orders", icon: "📦", onPress: () => {}, badge: "12" }]} />
            </Demo>
            <Demo label="Accordion">
              <Accordion>
                <AccordionItem title="What is this?">
                  <Text className="text-sm text-card-foreground">A shadcn/ui component library for React Native.</Text>
                </AccordionItem>
                <AccordionItem title="How to install?">
                  <Text className="text-sm text-card-foreground">npm install @native-cn/primitives</Text>
                </AccordionItem>
              </Accordion>
            </Demo>
            <Demo label="Scroll Area / Resizable">
              <ScrollArea className="h-20">
                <View className="p-2"><Text className="text-sm text-foreground">Scrollable content</Text></View>
              </ScrollArea>
              <Resizable direction="horizontal">
                <View className="flex-1 bg-muted p-3 rounded-l-md"><Text className="text-xs text-muted-foreground">Left</Text></View>
                <View className="flex-1 bg-muted/50 p-3 rounded-r-md"><Text className="text-xs text-muted-foreground">Right</Text></View>
              </Resizable>
            </Demo>
            <Demo label="Aspect Ratio / Empty / Kbd">
              <View className="w-16"><AspectRatio ratio={1}><View className="flex-1 bg-muted rounded-md" /></AspectRatio></View>
              <Empty title="No results" description="Try again" />
              <Kbd>⌘K</Kbd>
            </Demo>
          </Section>

          <Text className="text-center text-xs text-muted-foreground mt-8">
            54 components from @native-cn/primitives
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
