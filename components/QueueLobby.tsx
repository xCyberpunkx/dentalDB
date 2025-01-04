"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface QueueItem {
  id: string
  patientName: string
  appointmentTime: string
  status: "Waiting" | "In Progress" | "Completed"
  isManual: boolean
}

export default function QueueLobby() {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: "1", patientName: "John Doe", appointmentTime: "09:00", status: "Waiting", isManual: false },
    { id: "2", patientName: "Jane Smith", appointmentTime: "09:30", status: "In Progress", isManual: false },
  ])
  const [newItem, setNewItem] = useState<Omit<QueueItem, 'id' | 'isManual'>>({ patientName: "", appointmentTime: "", status: "Waiting" })

  const addToQueue = (isManual: boolean) => {
    setQueue([...queue, { ...newItem, id: Date.now().toString(), isManual }])
    setNewItem({ patientName: "", appointmentTime: "", status: "Waiting" })
  }

  const updateStatus = (id: string, newStatus: QueueItem['status']) => {
    setQueue(queue.map(item => item.id === id ? { ...item, status: newStatus } : item))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      setQueue(prevQueue => {
        return prevQueue.map(item => {
          if (!item.isManual) {
            const appointmentTime = new Date(`${currentTime.toDateString()} ${item.appointmentTime}`)
            if (appointmentTime <= currentTime && item.status === "Waiting") {
              return { ...item, status: "In Progress" }
            }
            if (appointmentTime.getTime() + 30 * 60000 <= currentTime.getTime() && item.status === "In Progress") {
              return { ...item, status: "Completed" }
            }
          }
          return item
        })
      })
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Queue & Lobby Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add to Queue</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Queue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient Name
              </Label>
              <Input
                id="patientName"
                value={newItem.patientName}
                onChange={(e) => setNewItem({ ...newItem, patientName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appointmentTime" className="text-right">
                Appointment Time
              </Label>
              <Input
                id="appointmentTime"
                type="time"
                value={newItem.appointmentTime}
                onChange={(e) => setNewItem({ ...newItem, appointmentTime: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => addToQueue(false)}>Add Automatic</Button>
            <Button onClick={() => addToQueue(true)}>Add Manual</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Appointment Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queue.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.patientName}</TableCell>
              <TableCell>{item.appointmentTime}</TableCell>
              <TableCell>
                <Badge variant={item.status === "Waiting" ? "secondary" : item.status === "In Progress" ? "default" : "success"}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.isManual ? "Manual" : "Automatic"}</TableCell>
              <TableCell>
                <Button onClick={() => updateStatus(item.id, "In Progress")} disabled={item.status !== "Waiting"}>
                  Start
                </Button>
                <Button onClick={() => updateStatus(item.id, "Completed")} disabled={item.status !== "In Progress"}>
                  Complete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

