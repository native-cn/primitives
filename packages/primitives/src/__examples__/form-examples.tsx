import { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { cn } from "../lib/utils"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Card>
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Login</Text>
        <Text className="text-sm text-muted-foreground">
          Enter your credentials to continue
        </Text>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="email-label">Email</Label>
          <TextInput
            aria-labelledby="email-label"
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            placeholderTextColor="#9ca3af"
            className="h-10 rounded-md border border-input bg-background px-3 text-foreground"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="gap-2">
          <Label nativeID="password-label">Password</Label>
          <TextInput
            aria-labelledby="password-label"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            className="h-10 rounded-md border border-input bg-background px-3 text-foreground"
            secureTextEntry
          />
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Text className="text-primary-foreground font-medium">Sign In</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function SearchInput() {
  const [query, setQuery] = useState("")
  return (
    <View className="gap-2">
      <Label nativeID="search-label">Search</Label>
      <TextInput
        aria-labelledby="search-label"
        value={query}
        onChangeText={setQuery}
        placeholder="Search anything..."
        placeholderTextColor="#9ca3af"
        className="h-10 rounded-md border border-input bg-background px-3 text-foreground"
        returnKeyType="search"
      />
      {query.length > 0 && (
        <Text className="text-sm text-muted-foreground">
          Results for "{query}"
        </Text>
      )}
    </View>
  )
}
