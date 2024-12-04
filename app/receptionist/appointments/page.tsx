"use client";

import * as React from "react";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import BASE_URL from "@/lib/config";
import { toast } from "@/components/ui/use-toast";

const ReceptionistAppointments = () => {
  // export function ReceptionistAppointments() {
  const [appointments, setAppointments] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  const [appointmentTypes, setAppointmentTypes] = React.useState([]);
  const [isAddingAppointment, setIsAddingAppointment] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterPeriod, setFilterPeriod] = React.useState("all");

  const handleAddAppointment = async (newAppointment) => {
    if (
      !newAppointment.date ||
      !newAppointment.time ||
      !newAppointment.typeId ||
      !newAppointment.patientId ||
      !newAppointment.doctorId
    ) {
      toast({
        title: "Error",
        description: "Please select a new date and time.",
        variant: "destructive",
      });
      return;
    }
    const url = `${BASE_URL}/appointments`;
    const method = "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: Number(newAppointment.patientId),
        doctorId: Number(newAppointment.doctorId),
        date: newAppointment.date,
        time: newAppointment.time,
        typeId: Number(newAppointment.typeId),
        status: "UPCOMING",
      }),
    });
    if (res.ok) {
      fetchAppointmentsDoctors();
      setIsAddingAppointment(false);
    } else {
      alert("Error saving data");
    }
  };

  const handleUpdateAppointment = async (updatedAppointment) => {
    if (
      !updatedAppointment.time ||
      !updatedAppointment.date ||
      !updatedAppointment.doctorId ||
      !updatedAppointment.typeId
    ) {
      toast({
        title: "Error",
        description: "Please select a new date and time.",
        variant: "destructive",
      });
      return;
    } else if (selectedAppointment) {
      const url = `${BASE_URL}/appointments/${selectedAppointment.id}`;
      const method = "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: updatedAppointment.date,
          time: updatedAppointment.time,
          typeId: Number(updatedAppointment.typeId),
          doctorId: Number(updatedAppointment.doctorId),
          status: "UPCOMING",
        }),
      });

      if (res.ok) {
        alert("seccuess");
        fetchAppointmentsDoctors();
      } else {
        alert("Error saving data");
      }
      setSelectedAppointment(null);
    }
  };

  const handleRemoveAppointment = async (id) => {
    const url = `${BASE_URL}/appointments/${id}`;
    const method = "DELETE";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      fetchAppointmentsDoctors(); // Refresh users list
    } else {
      alert("Error saving data");
    }

    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patient.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.type.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Parse date and normalize to local midnight
    const appointmentDate = new Date(appointment.date);
    const normalizedAppointmentDate = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate()
    );

    // Get the start of today (local midnight)
    const today = new Date();
    const normalizedToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Calculate the start of one week later (local midnight)
    const oneWeekLater = new Date(
      normalizedToday.getFullYear(),
      normalizedToday.getMonth(),
      normalizedToday.getDate() + 7
    );

    // Calculate the start of one month later (local midnight)
    const oneMonthLater = new Date(
      normalizedToday.getFullYear(),
      normalizedToday.getMonth() + 1,
      normalizedToday.getDate()
    );

    switch (filterPeriod) {
      case "today":
        return (
          matchesSearch &&
          normalizedAppointmentDate.getTime() === normalizedToday.getTime()
        );
      case "this-week":
        return (
          matchesSearch &&
          normalizedAppointmentDate >= normalizedToday &&
          normalizedAppointmentDate < oneWeekLater
        );
      case "this-month":
        return (
          matchesSearch &&
          normalizedAppointmentDate >= normalizedToday &&
          normalizedAppointmentDate < oneMonthLater
        );
      default:
        return matchesSearch;
    }
  });

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const fetchAppointmentsDoctors = async () => {
    const resAppointments = await fetch(`${BASE_URL}/appointments`);
    const appointmentsData = await resAppointments.json();
    const resTypes = await fetch(`${BASE_URL}/types`);
    const typesData = await resTypes.json();
    const resDoctors = await fetch(`${BASE_URL}/doctors`);
    const doctorsData = await resDoctors.json();
    const resPatients = await fetch(`${BASE_URL}/patients`);
    const patientsData = await resPatients.json();
    setAppointments(
      appointmentsData.filter((app) => {
        return app.status.status === "UPCOMING"; // Ensure to return true or false
      })
    );
    setDoctors(doctorsData);
    setAppointmentTypes(typesData);
    setPatients(patientsData);
  };

  React.useEffect(() => {
    fetchAppointmentsDoctors();
  }, [appointments]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Appointment Management
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>
            Schedule, reschedule, or cancel appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Search appointments..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog
              open={isAddingAppointment}
              onOpenChange={setIsAddingAppointment}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddingAppointment(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Enter the appointment details below.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleAddAppointment(Object.fromEntries(formData));
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="patientName" className="text-right">
                        Patient Name
                      </Label>
                      <Select name="patientId" required>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem
                              key={patient.firstName}
                              value={String(patient.id)}
                            >
                              {`${patient.firstName} ${patient.lastName} (Age: ${patient.age}, Phone: ${patient.phone})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="doctorName" className="text-right">
                        Doctor Name
                      </Label>
                      <Select name="doctorId" required>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem
                              key={doctor.firstName}
                              value={String(doctor.id)}
                            >
                              {doctor.firstName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Appointment Type
                      </Label>
                      <Select name="typeId" required>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type.type} value={String(type.id)}>
                              {type.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        className="col-span-3"
                        required
                        min={formattedToday}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Time
                      </Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingAppointment(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Schedule Appointment</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</TableCell>
                    <TableCell>
                      {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                    </TableCell>
                    <TableCell>{appointment.type.type}</TableCell>
                    <TableCell>{`${format(
                      new Date(appointment.date),
                      "dd/MM/yyyy"
                    )} ${format(
                      new Date(appointment.time),
                      "HH:mm"
                    )}`}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSelectedAppointment(appointment)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Appointment</DialogTitle>
                              <DialogDescription>
                                Update the appointment details below.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedAppointment && (
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const formData = new FormData(e.target);
                                  handleUpdateAppointment({
                                    ...selectedAppointment,
                                    ...Object.fromEntries(formData),
                                  });
                                }}
                              >
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-type"
                                      className="text-right"
                                    >
                                      Doctor Name
                                    </Label>
                                    <Select name="doctorId">
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Doctor Name" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {doctors.map((doctor) => (
                                          <SelectItem
                                            key={doctor.id}
                                            value={String(doctor.id)}
                                          >
                                            {doctor.firstName} {doctor.lastName}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-type"
                                      className="text-right"
                                    >
                                      Appointment Type
                                    </Label>
                                    <Select name="typeId">
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select appointment type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {appointmentTypes.map((type) => (
                                          <SelectItem
                                            key={type.type}
                                            value={String(type.id)}
                                          >
                                            {type.type}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-date"
                                      className="text-right"
                                    >
                                      Date
                                    </Label>
                                    <Input
                                      id="edit-date"
                                      name="date"
                                      type="date"
                                      defaultValue={selectedAppointment.date}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-time"
                                      className="text-right"
                                    >
                                      Time
                                    </Label>
                                    <Input
                                      id="edit-time"
                                      name="time"
                                      type="time"
                                      defaultValue={selectedAppointment.time}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">
                                    Update Appointment
                                  </Button>
                                </DialogFooter>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleRemoveAppointment(appointment.id)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
export default ReceptionistAppointments;
