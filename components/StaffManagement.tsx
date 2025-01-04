"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StaffMember {
  id: string
  name: string
  position: string
  email: string
  phone: string
  department: string
  hireDate: string
  salary: number
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: "1", name: "Dr. John Smith", position: "Dentist", email: "john@example.com", phone: "123-456-7890", department: "General Dentistry", hireDate: "2020-01-15", salary: 100000 },
    { id: "2", name: "Jane Doe", position: "Dental Hygienist", email: "jane@example.com", phone: "098-765-4321", department: "Hygiene", hireDate: "2021-03-01", salary: 60000 },
  ])
  const [newStaff, setNewStaff] = useState<Omit<StaffMember, 'id'>>({ name: "", position: "", email: "", phone: "", department: "", hireDate: "", salary: 0 })
  const [filterDepartment, setFilterDepartment] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const addStaffMember = () => {
    setStaff([...staff, { ...newStaff, id: Date.now().toString() }])
    setNewStaff({ name: "", position: "", email: "", phone: "", department: "", hireDate: "", salary: 0 })
  }

  const filteredStaff = staff.filter(member => 
    (filterDepartment === "All" || member.department === filterDepartment) &&
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.position.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const departments = ["All", ...new Set(staff.map(member => member.department))]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Staff Management</h2>
      <div className="flex space-x-2">
        <Input 
          placeholder="Search staff..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={setFilterDepartment} defaultValue={filterDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Staff Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">Position</Label>
              <Input
                id="position"
                value={newStaff.position}
                onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input
                id="phone"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <Input
                id="department"
                value={newStaff.department}
                onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hireDate" className="text-right">Hire Date</Label>
              <Input
                id="hireDate"
                type="date"
                value={newStaff.hireDate}
                onChange={(e) => setNewStaff({ ...newStaff, hireDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={newStaff.salary}
                onChange={(e) => setNewStaff({ ...newStaff, salary: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addStaffMember}>Add Staff Member</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead>Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStaff.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.position}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.hireDate}</TableCell>
              <TableCell>${member.salary.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

