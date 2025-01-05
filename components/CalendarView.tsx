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
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled" | "مجدول" | "قيد التنفيذ" | "مكتمل"
}

const mockDoctors = [
  "Dr. Ahmed Ben Ali",
  "Dr. Fatima Zidane",
  "Dr. Karim Bouaziz",
  "Dr. Amira Mansouri",
]

const mockPatients = [
  "Mohammed Al-Arabi",
  "Amina Beloufa",
  "Youcef Kaddour",
  "Nadia Hamidi",
  "Rachid Ben Moussa",
  "Leila Boudiaf",
  "Omar Hadjadj",
  "Samira Messaoudi",
  "Kamel Zerrouki",
  "Farida Benhamou",
]

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "1", title: "Dental Checkup", date: new Date(2023, 6, 15), time: "10:00", patient: "Mohammed Al-Arabi", doctor: "Dr. Ahmed Ben Ali", reason: "Regular checkup", status: "Scheduled" },
    { id: "2", title: "Root Canal", date: new Date(2023, 6, 16), time: "14:00", patient: "Amina Beloufa", doctor: "Dr. Fatima Zidane", reason: "Severe tooth pain", status: "Scheduled" },
    { id: "3", title: "Teeth Cleaning", date: new Date(2023, 6, 17), time: "11:30", patient: "Youcef Kaddour", doctor: "Dr. Karim Bouaziz", reason: "Regular cleaning", status: "Scheduled" },
    { id: "4", title: "Dental Implant Consultation", date: new Date(2023, 6, 18), time: "09:00", patient: "Nadia Hamidi", doctor: "Dr. Amira Mansouri", reason: "Discuss implant options", status: "Scheduled" },
    { id: "5", title: "Wisdom Tooth Extraction", date: new Date(2023, 6, 19), time: "13:00", patient: "Rachid Ben Moussa", doctor: "Dr. Ahmed Ben Ali", reason: "Impacted wisdom tooth", status: "Scheduled" },
    { id: "6", title: "Orthodontic Adjustment", date: new Date(2023, 6, 20), time: "15:30", patient: "Leila Boudiaf", doctor: "Dr. Fatima Zidane", reason: "Regular braces adjustment", status: "Scheduled" },
    { id: "7", title: "Cavity Filling", date: new Date(2023, 6, 21), time: "11:00", patient: "Omar Hadjadj", doctor: "Dr. Karim Bouaziz", reason: "Treat dental cavity", status: "Scheduled" },
    { id: "8", title: "Dental Crown Fitting", date: new Date(2023, 6, 22), time: "14:30", patient: "Samira Messaoudi", doctor: "Dr. Amira Mansouri", reason: "Crown installation", status: "Scheduled" },
  ])
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
                  <li key={appointment.id} className="flex justify-between items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div>
                      <span className="font-bold text-lg">{appointment.time} - {appointment.title}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Patient: {appointment.patient}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Doctor: {appointment.doctor}</p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      appointment.status === "Scheduled" ? "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200" :
                      appointment.status === "In Progress" ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200" :
                      appointment.status === "Completed" ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200" :
                      "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200"
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
          <Button onClick={addAppointment} className="bg-green-500 hover:bg-green-600">Add Appointment</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

