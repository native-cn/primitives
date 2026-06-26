import { ScrollView, View, Text } from "react-native"
import { Link } from "expo-router"
import { Button } from "@native-cn/primitives"
import { ButtonVariants } from "@native-cn/primitives/__examples__/button-examples"
import { SimpleCard, CardGrid } from "@native-cn/primitives/__examples__/card-examples"
import { LoginForm, SearchInput } from "@native-cn/primitives/__examples__/form-examples"
import { ConfirmDialog } from "@native-cn/primitives/__examples__/dialog-examples"
import { TabbedContent } from "@native-cn/primitives/__examples__/tabs-examples"
import { FrameworkSelector } from "@native-cn/primitives/__examples__/combobox-examples"
import { BarChartDemo, PieChartDemo } from "@native-cn/primitives/__examples__/chart-examples"
import { Separator } from "@native-cn/primitives"

export default function ExamplesPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 gap-8">
        <View className="flex-row items-center gap-2">
          <Link href="/" asChild>
            <Button variant="ghost" size="sm">
              <Text className="text-muted-foreground">← Back</Text>
            </Button>
          </Link>
          <Text className="text-2xl font-bold text-foreground">Examples</Text>
        </View>

        <Section title="Button">
          <ButtonVariants />
        </Section>

        <Separator />

        <Section title="Card">
          <SimpleCard />
        </Section>

        <Separator />

        <Section title="Card Grid">
          <CardGrid />
        </Section>

        <Separator />

        <Section title="Form">
          <LoginForm />
        </Section>

        <Separator />

        <Section title="Search Input">
          <SearchInput />
        </Section>

        <Separator />

        <Section title="Dialog">
          <ConfirmDialog />
        </Section>

        <Separator />

        <Section title="Tabs">
          <TabbedContent />
        </Section>

        <Separator />

        <Section title="Combobox">
          <FrameworkSelector />
        </Section>

        <Separator />

        <Section title="Charts">
          <BarChartDemo />
          <View className="h-4" />
          <PieChartDemo />
        </Section>
      </View>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-4">
      <Text className="text-xl font-semibold text-foreground">{title}</Text>
      {children}
    </View>
  )
}
