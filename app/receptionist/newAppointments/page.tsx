"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Clock, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BASE_URL from "@/lib/config";
import { format } from "date-fns";

interface Patient {
  fullName: string;
  age: number;
  sex: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  medicalHistory: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  reason: string;
  notes: string;
  patient: Patient;
}

const Component = () => {
  const [waitingAppointments, setWaitingAppointments] = useState<Appointment[]>(
    []
  );

  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isPatientInfoDialogOpen, setIsPatientInfoDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newDoctor, setNewDoctor] = useState();

  const [availableDoctors, setAvailableDoctors] = useState([]);

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleDialogOpen(true);
  };

  const handleRescheduleConfirm = async () => {
    if (!newTime || !newDate || !Number(newDoctor)) {
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
          date: newDate,
          time: newTime,
          doctorId: newDoctor,
          status: "UPCOMING",
        }),
      });

      if (res.ok) {
        fetchAppointmentsDoctors();
      } else {
        alert("Error saving data");
      }
      setIsRescheduleDialogOpen(false);
    }
  };

  const handleCancel = async (id: number) => {
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

  const handleConfirm = async (id: number) => {
    const url = `${BASE_URL}/appointments/${id}`;
    const method = "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "UPCOMING",
      }),
    });

    if (res.ok) {
      fetchAppointmentsDoctors();
    } else {
      alert("Error saving data");
    }
  };

  const handlePatientInfoClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsPatientInfoDialogOpen(true);
  };

  const fetchAppointmentsDoctors = async () => {
    const resAppointments = await fetch(`${BASE_URL}/appointments`);
    const appointmentsData = await resAppointments.json();
    const resDoctors = await fetch(`${BASE_URL}/doctors`);
    const doctorsData = await resDoctors.json();

    setWaitingAppointments(
      appointmentsData.filter((app) => {
        return app.status.status === "WAITING"; // Ensure to return true or false
      })
    );
    setAvailableDoctors(doctorsData);
  };

  useEffect(() => {
    fetchAppointmentsDoctors();
  }, [waitingAppointments]);

  return (
    <>
      <Tabs defaultValue="upcoming">
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waitingAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-blue-50 dark:bg-gray-700">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                      {format(new Date(appointment.date), "dd/MM/yyyy")}
                    </div>
                    <Button
                      variant="ghost"
                      className="p-0 hover:bg-transparent"
                      onClick={() => handlePatientInfoClick(appointment)}
                    >
                      <span className="text-blue-500 hover:underline">
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </span>
                    </Button>
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {format(new Date(appointment.time), "HH:mm")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center mb-2">
                    <User className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {appointment.doctor.firstName}{" "}
                      {appointment.doctor.lastName}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {appointment.type.type}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Additional Notes:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {appointment.additionalNotes}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-gray-200 dark:border-gray-700"
                    onClick={() => handleReschedule(appointment)}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleConfirm(appointment.id)}
                  >
                    Confirm
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={setIsRescheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-date" className="text-right">
                New Date
              </Label>
              <Input
                id="new-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-time" className="text-right">
                New Time
              </Label>
              <Input
                id="new-time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-doctor" className="text-right">
                New Doctor
              </Label>
              <Select
                value={newDoctor}
                onValueChange={(value) => setNewDoctor(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.firstName} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRescheduleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleRescheduleConfirm}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPatientInfoDialogOpen}
        onOpenChange={setIsPatientInfoDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Patient Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-6 -mr-6">
            {selectedAppointment && (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Full Name</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.fullName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Age</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.age}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Date of Birth</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Sex</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.sex}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Phone Number</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Email</Label>
                      <p className="text-sm font-medium">
                        {selectedAppointment.patient.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    Medical History
                  </h4>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedAppointment.patient.medicalHistory}
                  </p>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPatientInfoDialogOpen(false)}
              className="transition-all duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Component;
