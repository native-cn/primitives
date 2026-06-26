import { useState } from "react"
import { View, Text } from "react-native"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"

export function TabbedContent() {
  const [tab, setTab] = useState("account")
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="account"><Text className="text-foreground">Account</Text></TabsTrigger>
        <TabsTrigger value="settings"><Text className="text-foreground">Settings</Text></TabsTrigger>
        <TabsTrigger value="notifications"><Text className="text-foreground">Notifications</Text></TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text className="text-foreground">Account details and preferences.</Text>
      </TabsContent>
      <TabsContent value="settings">
        <Text className="text-foreground">App settings and configuration.</Text>
      </TabsContent>
      <TabsContent value="notifications">
        <Text className="text-foreground">Manage your notification preferences.</Text>
      </TabsContent>
    </Tabs>
  )
}
