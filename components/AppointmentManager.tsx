"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Appointment {
  id: string
  patient: string
  dentist: string
  date: string
  time: string
  type: string
}

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "1", patient: "John Doe", dentist: "Dr. Smith", date: "2023-07-15", time: "10:00 AM", type: "Checkup" },
    { id: "2", patient: "Jane Smith", dentist: "Dr. Johnson", date: "2023-07-16", time: "2:00 PM", type: "Cleaning" },
    { id: "3", patient: "Bob Brown", dentist: "Dr. Davis", date: "2023-07-17", time: "11:30 AM", type: "Filling" },
  ])

  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    patient: "",
    dentist: "",
    date: "",
    time: "",
    type: ""
  })

  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  const addAppointment = () => {
    setAppointments([...appointments, { ...newAppointment, id: Date.now().toString() }])
    setNewAppointment({ patient: "", dentist: "", date: "", time: "", type: "" })
  }

  const updateAppointment = () => {
    if (editingAppointment) {
      setAppointments(appointments.map(app => app.id === editingAppointment.id ? editingAppointment : app))
      setEditingAppointment(null)
    }
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(app => app.id !== id))
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">Patient</Label>
              <Input
                id="patient"
                value={newAppointment.patient}
                onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dentist" className="text-right">Dentist</Label>
              <Input
                id="dentist"
                value={newAppointment.dentist}
                onChange={(e) => setNewAppointment({ ...newAppointment, dentist: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Input
                id="type"
                value={newAppointment.type}
                onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addAppointment}>Add Appointment</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Dentist</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patient}</TableCell>
              <TableCell>{appointment.dentist}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Button className="mr-2" onClick={() => setEditingAppointment(appointment)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteAppointment(appointment.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingAppointment && (
        <Dialog open={!!editingAppointment} onOpenChange={() => setEditingAppointment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-patient" className="text-right">Patient</Label>
                <Input
                  id="edit-patient"
                  value={editingAppointment.patient}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, patient: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-dentist" className="text-right">Dentist</Label>
                <Input
                  id="edit-dentist"
                  value={editingAppointment.dentist}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, dentist: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingAppointment.date}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-time" className="text-right">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editingAppointment.time}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">Type</Label>
                <Input
                  id="edit-type"
                  value={editingAppointment.type}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, type: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={updateAppointment}>Update Appointment</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

