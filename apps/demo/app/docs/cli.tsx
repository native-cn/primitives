import { View, Text, ScrollView } from "react-native"
import { Link } from "expo-router"
import { Button } from "@native-cn/primitives"

const Code = ({ code }: { code: string }) => (
  <View className="bg-muted rounded-lg p-4">
    <Text className="text-sm text-foreground font-mono">{code}</Text>
  </View>
)

const Cmd = ({ cmd }: { cmd: string }) => (
  <View className="bg-muted rounded-lg p-3 flex-row items-center">
    <Text className="text-sm text-foreground font-mono">$ {cmd}</Text>
  </View>
)

export default function CliReference() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 md:p-10 max-w-3xl gap-8">
        <Text className="text-3xl font-bold text-foreground mb-2">CLI Reference</Text>
        <Text className="text-base text-muted-foreground">
          The native-cn CLI helps you initialize projects, add components, and manage registries.
        </Text>

        <Section title="init">
          <Text className="text-foreground leading-relaxed mb-2">
            Scaffolds the project configuration (tailwind preset, global.css, components.json).
          </Text>
          <Cmd cmd="npx native-cn init" />
          <View className="mt-2 gap-1">
            <Text className="text-sm text-muted-foreground">Options:</Text>
            <Text className="text-sm text-muted-foreground ml-2">-y, --yes — skip confirmation prompts</Text>
            <Text className="text-sm text-muted-foreground ml-2">-f, --force — overwrite existing config</Text>
            <Text className="text-sm text-muted-foreground ml-2">--cwd — working directory</Text>
          </View>
        </Section>

        <Section title="add">
          <Text className="text-foreground leading-relaxed mb-2">
            Adds one or more components to your project. Resolves dependencies automatically.
          </Text>
          <Cmd cmd="npx native-cn add button card input" />
          <View className="mt-2 gap-1">
            <Text className="text-sm text-muted-foreground">Options:</Text>
            <Text className="text-sm text-muted-foreground ml-2">--cwd — working directory</Text>
            <Text className="text-sm text-muted-foreground ml-2">--registry — path to custom registry.json</Text>
          </View>
        </Section>

        <Section title="build">
          <Text className="text-foreground leading-relaxed mb-2">
            Builds/validates the registry from source files.
          </Text>
          <Cmd cmd="npx native-cn build" />
          <View className="mt-2 gap-1">
            <Text className="text-sm text-muted-foreground ml-2">-o, --output — output path for built registry</Text>
          </View>
        </Section>

        <Section title="diff">
          <Text className="text-foreground leading-relaxed mb-2">
            Compares installed components against the latest registry version.
          </Text>
          <Cmd cmd="npx native-cn diff" />
          <Cmd cmd="npx native-cn diff button card" />
        </Section>

        <Section title="update">
          <Text className="text-foreground leading-relaxed mb-2">
            Updates installed components to the latest registry version.
          </Text>
          <Cmd cmd="npx native-cn update" />
          <Cmd cmd="npx native-cn update button card" />
        </Section>

        <Section title="info">
          <Text className="text-foreground leading-relaxed mb-2">
            Shows system information: Node version, package manager, Expo/RN/NativeWind versions, and config status.
          </Text>
          <Cmd cmd="npx native-cn info" />
        </Section>

        <Section title="registry">
          <Text className="text-foreground leading-relaxed mb-2">
            Manage third-party registry sources. Registries are stored in native-cn-sources.json.
          </Text>
          <View className="gap-2">
            <Cmd cmd="npx native-cn registry list" />
            <Cmd cmd="npx native-cn registry add my-ui https://example.com/registry.json" />
            <Cmd cmd="npx native-cn registry remove my-ui" />
          </View>
        </Section>

        <Section title="Components.json">
          <Text className="text-foreground leading-relaxed mb-2">
            The project config file created by init:
          </Text>
          <Code code={`{\n  "$schema": "https://native-cn.github.io/primitives/schema/components.json",\n  "style": "default",\n  "tailwind": {\n    "config": "tailwind.config.js",\n    "css": "global.css"\n  },\n  "aliases": {\n    "components": "components",\n    "ui": "components/ui",\n    "lib": "lib"\n  }\n}`} />
        </Section>
      </View>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-xl font-semibold text-foreground">{title}</Text>
      {children}
    </View>
  )
}
