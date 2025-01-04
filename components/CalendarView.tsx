"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Appointment {
  id: string
  title: string
  date: Date
  time: string
  patient: string
  doctor: string
  reason: string
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
}

const mockDoctors = [
  "Dr. Ahmed Benali",
  "Dr. Fatima Zidane",
  "Dr. Karim Bouaziz",
  "Dr. Amira Mansouri",
]

const mockPatients = [
  "Mohammed Larbi",
  "Amina Beloufa",
  "Youcef Kaddour",
  "Nadia Hamidi",
  "Rachid Benmoussa",
  "Leila Boudiaf",
  "Omar Hadjadj",
  "Samira Messaoudi",
  "Kamel Zerrouki",
  "Farida Benhamou",
]

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    title: "",
    date: new Date(),
    time: "",
    patient: "",
    doctor: "",
    reason: "",
    status: "Scheduled"
  })

  useEffect(() => {
    // Simulating fetching appointments from an API
    const mockAppointments: Appointment[] = [
      { id: "1", title: "Dental Checkup", date: new Date(2023, 6, 15), time: "10:00", patient: "Mohammed Larbi", doctor: "Dr. Ahmed Benali", reason: "Regular checkup", status: "Scheduled" },
      { id: "2", title: "Root Canal", date: new Date(2023, 6, 16), time: "14:00", patient: "Amina Beloufa", doctor: "Dr. Fatima Zidane", reason: "Severe tooth pain", status: "Scheduled" },
      { id: "3", title: "Teeth Cleaning", date: new Date(2023, 6, 17), time: "11:30", patient: "Youcef Kaddour", doctor: "Dr. Karim Bouaziz", reason: "Regular cleaning", status: "Scheduled" },
    ]
    setAppointments(mockAppointments)
  }, [])

  const addAppointment = () => {
    const newAppointmentWithId = { ...newAppointment, id: Date.now().toString() }
    setAppointments([...appointments, newAppointmentWithId])
    setNewAppointment({ title: "", date: new Date(), time: "", patient: "", doctor: "", reason: "", status: "Scheduled" })
  }

  const appointmentsForSelectedDate = appointments.filter(
    (appointment) => appointment.date.toDateString() === date?.toDateString()
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Calendar</h2>
      <div className="flex space-x-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Appointment Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Appointments for {date?.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsForSelectedDate.length > 0 ? (
              <ul className="space-y-2">
                {appointmentsForSelectedDate.map((appointment) => (
                  <li key={appointment.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <div>
                      <span className="font-bold">{appointment.time} - {appointment.title}</span>
                      <p className="text-sm text-gray-600">Patient: {appointment.patient}</p>
                      <p className="text-sm text-gray-600">Doctor: {appointment.doctor}</p>
                    </div>
                    <span className={`text-sm ${
                      appointment.status === "Scheduled" ? "text-blue-500" :
                      appointment.status === "In Progress" ? "text-yellow-500" :
                      appointment.status === "Completed" ? "text-green-500" :
                      "text-red-500"
                    }`}>
                      {appointment.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Appointment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date.toISOString().split('T')[0]}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: new Date(e.target.value) })}
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
              <Label htmlFor="patient" className="text-right">Patient</Label>
              <Select
                onValueChange={(value) => setNewAppointment({ ...newAppointment, patient: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient} value={patient}>{patient}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">Doctor</Label>
              <Select
                onValueChange={(value) => setNewAppointment({ ...newAppointment, doctor: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {mockDoctors.map((doctor) => (
                    <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">Reason</Label>
              <Input
                id="reason"
                value={newAppointment.reason}
                onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addAppointment}>Add Appointment</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

