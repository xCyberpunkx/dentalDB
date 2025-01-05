"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  nextAppointment: string
  lastVisit: string
  medicalHistory: string[]
  insuranceProvider: string
  insuranceNumber: string
  preferredDentist: string
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([
    { 
      id: "1", 
      name: "John Smith", 
      email: "john@example.com", 
      phone: "123-456-7890", 
      dateOfBirth: "1990-05-10", 
      address: "123 Main St, Cityville", 
      nextAppointment: "2023-07-15", 
      lastVisit: "2023-06-01",
      medicalHistory: ["Allergies: Penicillin", "Previous surgeries: Wisdom teeth removal"],
      insuranceProvider: "HealthCare Inc.",
      insuranceNumber: "INS123456",
      preferredDentist: "Dr. Johnson"
    },
    { 
      id: "2", 
      name: "Emily Davis", 
      email: "emily@example.com", 
      phone: "987-654-3210", 
      dateOfBirth: "1985-11-22", 
      address: "456 Elm St, Townsville", 
      nextAppointment: "2023-07-20", 
      lastVisit: "2023-06-15",
      medicalHistory: ["Chronic conditions: Diabetes"],
      insuranceProvider: "DentalCare Plus",
      insuranceNumber: "INS789012",
      preferredDentist: "Dr. Williams"
    },
    { 
      id: "3", 
      name: "Michael Johnson", 
      email: "michael@example.com", 
      phone: "456-789-0123", 
      dateOfBirth: "1978-03-15", 
      address: "789 Oak St, Villagetown", 
      nextAppointment: "2023-07-25", 
      lastVisit: "2023-06-10",
      medicalHistory: ["Allergies: Latex"],
      insuranceProvider: "SmileCare Insurance",
      insuranceNumber: "INS345678",
      preferredDentist: "Dr. Brown"
    },
    { 
      id: "4", 
      name: "Sarah Thompson", 
      email: "sarah@example.com", 
      phone: "789-012-3456", 
      dateOfBirth: "1992-09-05", 
      address: "101 Pine St, Hamletville", 
      nextAppointment: "2023-07-18", 
      lastVisit: "2023-06-20",
      medicalHistory: ["Previous surgeries: Dental implants"],
      insuranceProvider: "DentaGuard",
      insuranceNumber: "INS901234",
      preferredDentist: "Dr. Davis"
    },
    { 
      id: "5", 
      name: "Robert Wilson", 
      email: "robert@example.com", 
      phone: "234-567-8901", 
      dateOfBirth: "1980-12-30", 
      address: "202 Maple St, Boroughburg", 
      nextAppointment: "2023-07-22", 
      lastVisit: "2023-06-05",
      medicalHistory: ["Chronic conditions: Hypertension"],
      insuranceProvider: "OralHealth Assurance",
      insuranceNumber: "INS567890",
      preferredDentist: "Dr. Taylor"
    },
  ])
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    nextAppointment: "",
    lastVisit: "",
    medicalHistory: [],
    insuranceProvider: "",
    insuranceNumber: "",
    preferredDentist: ""
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const addPatient = () => {
    setPatients([...patients, { ...newPatient, id: Date.now().toString() }])
    setNewPatient({ 
      name: "", 
      email: "", 
      phone: "", 
      dateOfBirth: "", 
      address: "", 
      nextAppointment: "", 
      lastVisit: "",
      medicalHistory: [],
      insuranceProvider: "",
      insuranceNumber: "",
      preferredDentist: ""
    })
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Patient Management</h2>
      <div className="flex justify-between">
        <Input 
          placeholder="Search patients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Patient</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input
                  id="phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="dateOfBirth" className="text-right">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={newPatient.dateOfBirth}
                  onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="address" className="text-right">Address</Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="insuranceProvider" className="text-right">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={newPatient.insuranceProvider}
                  onChange={(e) => setNewPatient({ ...newPatient, insuranceProvider: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="insuranceNumber" className="text-right">Insurance Number</Label>
                <Input
                  id="insuranceNumber"
                  value={newPatient.insuranceNumber}
                  onChange={(e) => setNewPatient({ ...newPatient, insuranceNumber: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="preferredDentist" className="text-right">Preferred Dentist</Label>
                <Input
                  id="preferredDentist"
                  value={newPatient.preferredDentist}
                  onChange={(e) => setNewPatient({ ...newPatient, preferredDentist: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={addPatient}>Add Patient</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Next Appointment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setSelectedPatient(patient)}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.dateOfBirth}</TableCell>
              <TableCell>{patient.nextAppointment}</TableCell>
              <TableCell>
                <Button className="bg-blue-500 hover:bg-blue-600">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedPatient.name} - Patient Details</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Basic Info</TabsTrigger>
                <TabsTrigger value="medical">Medical History</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <p>{selectedPatient.email}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p>{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <p>{selectedPatient.dateOfBirth}</p>
                      </div>
                      <div>
                        <Label>Address</Label>
                        <p>{selectedPatient.address}</p>
                      </div>
                      <div>
                        <Label>Insurance Provider</Label>
                        <p>{selectedPatient.insuranceProvider}</p>
                      </div>
                      <div>
                        <Label>Insurance Number</Label>
                        <p>{selectedPatient.insuranceNumber}</p>
                      </div>
                      <div>
                        <Label>Preferred Dentist</Label>
                        <p>{selectedPatient.preferredDentist}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {selectedPatient.medicalHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label>Last Visit</Label>
                        <p>{selectedPatient.lastVisit}</p>
                      </div>
                      <div>
                        <Label>Next Appointment</Label>
                        <p>{selectedPatient.nextAppointment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

