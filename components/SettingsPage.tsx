"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [clinicName, setClinicName] = useState("DentaCare Clinic")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [language, setLanguage] = useState("english")
  const [theme, setTheme] = useState("light")
  const [currency, setCurrency] = useState("USD")

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
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
              <div className="space-y-1">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="DZD">DZD</SelectItem>
                  </SelectContent>
                </Select>
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
              <Button>Manage API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Customize Color Scheme</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Manage your third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button>Connect Google Calendar</Button>
              <Button>Connect QuickBooks</Button>
              <Button>Connect Slack</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

