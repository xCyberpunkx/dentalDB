"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Settings() {
  const [clinicName, setClinicName] = useState("DentaCare Clinic")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your clinic's general settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="clinicName">Clinic Name</Label>
                <Input
                  id="clinicName"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoBackup"
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
                <Label htmlFor="autoBackup">Enable Automatic Backups</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="smsNotifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account's security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button>Change Password</Button>
              <Button>Enable Two-Factor Authentication</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

