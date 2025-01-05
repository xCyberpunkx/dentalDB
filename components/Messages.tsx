"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  sender: string
  recipient: string
  subject: string
  content: string
  date: string
  channel: string
}

interface Channel {
  id: string
  name: string
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "John Doe", recipient: "Dr. Smith", subject: "Appointment Request", content: "Can I schedule an appointment for next week?", date: "2023-07-01", channel: "general" },
    { id: "2", sender: "Dr. Smith", recipient: "Jane Smith", subject: "Follow-up", content: "How are you feeling after your recent procedure?", date: "2023-07-02", channel: "patients" },
    { id: "3", sender: "Nurse Johnson", recipient: "All Staff", subject: "Staff Meeting", content: "Reminder: We have a staff meeting tomorrow at 9 AM.", date: "2023-07-03", channel: "staff" },
  ])
  const [newMessage, setNewMessage] = useState<Omit<Message, 'id' | 'date'>>({ sender: "", recipient: "", subject: "", content: "", channel: "general" })
  const [channels] = useState<Channel[]>([
    { id: "1", name: "general" },
    { id: "2", name: "staff" },
    { id: "3", name: "patients" },
  ])
  const [activeChannel, setActiveChannel] = useState("general")

  const sendMessage = () => {
    const newMsg = { 
      ...newMessage, 
      id: Date.now().toString(), 
      date: new Date().toISOString().split('T')[0],
      sender: "Dr. Smith" // Assuming the current user is Dr. Smith
    }
    setMessages([...messages, newMsg])
    setNewMessage({ sender: "", recipient: "", subject: "", content: "", channel: activeChannel })
  }

  const filteredMessages = messages.filter(msg => msg.channel === activeChannel)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Messages</h2>
      <Tabs value={activeChannel} onValueChange={setActiveChannel}>
        <TabsList>
          {channels.map(channel => (
            <TabsTrigger key={channel.id} value={channel.name}>
              {channel.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {channels.map(channel => (
          <TabsContent key={channel.id} value={channel.name}>
            <Card>
              <CardHeader>
                <CardTitle>New Message in {channel.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Recipient"
                    value={newMessage.recipient}
                    onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                  />
                  <Input
                    placeholder="Subject"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  />
                  <Textarea
                    placeholder="Type your message here..."
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    rows={4}
                  />
                  <Button onClick={sendMessage}>Send Message</Button>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4 mt-4">
              {filteredMessages.map((message) => (
                <Card key={message.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{message.subject}</CardTitle>
                        <p className="text-sm text-gray-500">From: {message.sender} To: {message.recipient}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Date: {message.date}</p>
                    <div className="mt-2">{message.content}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

