"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface Integration {
  id: string
  name: string
  description: string
  enabled: boolean
  category: "Calendar" | "Finance" | "Communication" | "Patient Management" | "Other"
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "1", name: "Google Calendar", description: "Sync appointments with Google Calendar", enabled: false, category: "Calendar" },
    { id: "2", name: "Slack", description: "Receive notifications in Slack", enabled: true, category: "Communication" },
    { id: "3", name: "QuickBooks", description: "Sync financial data with QuickBooks", enabled: false, category: "Finance" },
    { id: "4", name: "Zoom", description: "Conduct virtual consultations via Zoom", enabled: false, category: "Communication" },
    { id: "5", name: "Mailchimp", description: "Manage email campaigns for patients", enabled: false, category: "Patient Management" },
    { id: "6", name: "Dropbox", description: "Store and share patient files securely", enabled: false, category: "Other" },
    { id: "7", name: "Stripe", description: "Process payments online", enabled: false, category: "Finance" },
    { id: "8", name: "Twilio", description: "Send SMS reminders to patients", enabled: false, category: "Communication" },
    { id: "9", name: "Salesforce", description: "Manage patient relationships", enabled: false, category: "Patient Management" },
    { id: "10", name: "Asana", description: "Manage dental office tasks and projects", enabled: false, category: "Other" },
  ])

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration =>
      integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
    ))
  }

  const categories = ["Calendar", "Finance", "Communication", "Patient Management", "Other"] as const

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Integrations</h2>
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-xl font-semibold mb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.filter(integration => integration.category === category).map(integration =>
              <Card key={integration.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {integration.name}
                    <Badge variant={integration.enabled ? "default" : "secondary"}>
                      {integration.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                    <span>{integration.enabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ))}
      <Button onClick={() => console.log("Configure integrations")}>Configure Integrations</Button>
    </div>
  )
}

