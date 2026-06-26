import { useState } from "react"
import { View, Text } from "react-native"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

export function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  return (
    <View className="gap-3">
      <Card>
        <CardContent>
          <Text className="text-sm text-foreground">
            Status: {confirmed ? "Confirmed ✓" : "Pending"}
          </Text>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onPress={() => setOpen(true)}>
            <Text className="text-foreground">Open Dialog</Text>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onPress={() => setOpen(false)}>
              <Text className="text-foreground">Cancel</Text>
            </Button>
            <Button onPress={() => { setConfirmed(true); setOpen(false) }}>
              <Text className="text-primary-foreground">Confirm</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  )
}
