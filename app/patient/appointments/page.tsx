// src/components/MainFile.tsx
"use client";

import { use, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import BookNew from "./bookNew";
import Waiting from "./waiting";
import Upcoming from "./upcoming";
import History from "./history";
import Reminders from "./reminders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Appointment } from "@/app/types/appointment";
import BASE_URL from "@/lib/config";
import { Doctor } from "../types/doctor";
import axios from "axios";
export default function MainFile() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor[]>([]);
  const [selectedReason, setSelectedReason] = useState<{ id: number; type: string }[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [waitingAppointments, setWaitingAppointments] = useState<Appointment[]>(
    []
  );
  const [appointmentToReschedule, setAppointmentToReschedule] =
    useState<Appointment | null>(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [appointmentHistory, setAppointmentHistory] = useState([
    {
      id: 1,
      date: "May 20, 2023",
      time: "2:00 PM",
      doctor: "Dr. Smith",
      reason: "Cardiology Checkup",
      outcome: "Completed",
      notes: "Patient reported improved symptoms. Follow-up in 3 months.",
    },
    {
      id: 2,
      date: "May 15, 2023",
      time: "11:00 AM",
      doctor: "Dr. Johnson",
      reason: "Annual Physical",
      outcome: "Completed",
      notes: "All vitals normal. Recommended increased physical activity.",
    },
    {
      id: 3,
      date: "May 10, 2023",
      time: "3:30 PM",
      doctor: "Dr. Davis",
      reason: "Vaccination",
      outcome: "Completed",
      notes: "Administered flu vaccine. No adverse reactions observed.",
    },
    {
      id: 4,
      date: "May 5, 2023",
      time: "10:00 AM",
      doctor: "Dr. Wilson",
      reason: "Dermatology Consult",
      outcome: "Completed",
      notes: "Prescribed topical treatment for eczema. Follow-up in 2 weeks.",
    },
    {
      id: 5,
      date: "May 1, 2023",
      time: "1:00 PM",
      doctor: "Dr. Brown",
      reason: "Orthopedic Evaluation",
      outcome: "Completed",
      notes: "X-rays taken of left knee. Recommended physical therapy.",
    },
  ]);
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] =
    useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("book-new");
  const [reasons, setReasons] = useState<{ id: number; type: string }[]>([]);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

const [doctors,setDoctors] = useState<Doctor[]>([]);
  

const handleConfirmAppointment = async () => {
 // console.log(selectedDoctor, selectedReason, additionalNotes, date, selectedTime);

  if (!date || !selectedTime || !selectedReason || !selectedDoctor) {
    toast({
      title: "Error",
      description: "Please select a new date and time.",
      variant: "destructive",
    });
    return;
  }

  const url = `${BASE_URL}/appointments`;

  try {
    // Send the POST request using Axios
    const response = await axios.post(url, {
      patientId: 1,
      doctorId: selectedDoctor,
      date: format(date, "MMMM d, yyyy"),
      time: selectedTime,
      typeId: selectedReason, 
      status: "WAITING",
    });

    if (response.status === 200) {
      alert("Appointment saved successfully");
      fetchAppointments();
      
      toast({
        title: "Appointment Confirmed",
        description: `Your appointment is scheduled for ${
          date ? format(date, "MMMM d, yyyy") : format(new Date(), "MMMM d, yyyy")
        } at ${selectedTime}`,
      });
    } else {
      alert("Error saving data");
    }
  } catch (error) {
    // Handle error gracefully
    console.error("Error during appointment confirmation:", error);
    alert("Error saving data");
  }

  // Reset form
  setDate(new Date());
  setSelectedTime(null);
  setSelectedDoctor([]);
  setSelectedReason([]);
  setAdditionalNotes("");

  // Switch to the Waiting tab
  setActiveTab("waiting");
};
  const handleCancelBooking = () => {
    // Reset form
    setDate(new Date());
    setSelectedTime(null);
    setSelectedDoctor([]);
    setSelectedReason([]);
    setAdditionalNotes("");

    toast({
      title: "Booking Cancelled",
      description: "Your appointment booking has been cancelled.",
    });
  };

  const handleReschedule = (appointment: Appointment) => {
    setAppointmentToReschedule(appointment);
    setIsRescheduleDialogOpen(true);
  };

  const handleConfirmReschedule = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a new date and time.",
        variant: "destructive",
      });
      return;
    }

    const updatedAppointment = {
      ...appointmentToReschedule,
      date: format(date, "MMMM d, yyyy"),
      time: selectedTime,
    } as Appointment;

    // Remove the appointment from upcomingAppointments
    setUpcomingAppointments((appointments) =>
      appointments.filter((apt) => apt.id !== appointmentToReschedule?.id)
    );

    // Add the updated appointment to waitingAppointments
    setWaitingAppointments((appointments) => [
      ...appointments,
      updatedAppointment,
    ]);

    toast({
      title: "Appointment Rescheduled",
      description: `Your appointment has been rescheduled to ${format(
        date,
        "MMMM d, yyyy"
      )} at ${selectedTime}`,
    });

    setIsRescheduleDialogOpen(false);
    setAppointmentToReschedule(null);
    setDate(new Date());
    setSelectedTime(null);
    setActiveTab("waiting");
  };

  const handleCancel = async (appointmentId: Appointment) => {
    try {
      // Delete the appointment from the backend
      await axios.delete(`${BASE_URL}/appointments/${appointmentId.id}`);
  
      // Update local state
      setUpcomingAppointments((appointments) =>
        appointments.filter((apt) => apt.id !== appointmentId.id)
      );
      setWaitingAppointments((appointments) =>
        appointments.filter((apt) => apt.id !== appointmentId.id)
      );
  
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been cancelled successfully.",
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive",
      });
    }
  };

  const today = new Date();

  const disabledDates = ["2024-11-25", "2024-12-31"];

  // Function to handle date selection, with disabled dates check
  const handleSelectDate = (selectedDate: Date) => {
    const isDisabled = disabledDates.some(
      (disabledDate) =>
        new Date(disabledDate).toDateString() === selectedDate.toDateString()
    );
    if (!isDisabled) {
      setDate(selectedDate);
    }
  };
/*                        PREV SNIPPET
  const updateAppointmentHistory = (appointment: Appointment) => {
    if (appointment.time) {
      const historyEntry = {
        id: appointment.id,
        date: appointment.date,
        time: appointment.time as string,
        doctor: appointment.doctor || "",
        reason: appointment.reason || "",
        outcome: "Completed",
        notes: appointment.notes || "",
      };
      setAppointmentHistory((prev) => [...prev, historyEntry]);
    }
  }; */ 
  const updateAppointmentHistory = async (appointment: Appointment) => {
    if (appointment.time) {
      const historyEntry = {
        id: appointment.id,
        date: appointment.date,
        time: appointment.time as string,
        doctor: appointment.doctor || "",
        reason: appointment.reason || "",
        outcome: "Completed",
        notes: appointment.notes || "",
      };
      
      try {
        // Update the appointment history in the backend
        await axios.post(`${BASE_URL}/appointment-history`, historyEntry);
        setAppointmentHistory((prev) => [...prev, historyEntry]);
      } catch (error) {
        console.error("Error updating appointment history:", error);
        toast({
          title: "Error",
          description: "Failed to update appointment history",
          variant: "destructive",
        });
      }
    }
  };
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/appointments`);
      const appointmentsData = response.data;
  
      setUpcomingAppointments(
        appointmentsData.filter((app: Appointment) => {
          return app.status === "UPCOMING";
        })
      );
      setWaitingAppointments(
        appointmentsData.filter((app: Appointment) => {
          return app.status === "WAITING";
        })
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    }
  };
  
  const fetchAllDoctors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast({
        title: "Error",
        description: "Failed to fetch doctors list",
        variant: "destructive",
      });
    }
  };
  
  const fetchAppointmentTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/types`);
      setReasons(response.data);
    } catch (error) {
      console.error("Error fetching appointment types:", error);
      toast({
        title: "Error",
        description: "Failed to fetch appointment types",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    fetchAllDoctors();
  }, []);
  
  useEffect(() => {
    fetchAppointmentTypes();
  }, []);

  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <main>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
          Appointments
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <TabsTrigger
              value="book-new"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Book New
            </TabsTrigger>
            <TabsTrigger
              value="waiting"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Waiting
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-white"
            >
              Reminders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book-new">
          <BookNew
                      date={date}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      selectedDoctor={selectedDoctor}
                      setSelectedDoctor={setSelectedDoctor}
                      selectedReason={selectedReason}
                      setSelectedReason={setSelectedReason}
                      additionalNotes={additionalNotes}
                      setAdditionalNotes={setAdditionalNotes}
                      handleConfirmAppointment={handleConfirmAppointment}
                      handleCancelBooking={handleCancelBooking}
                      timeSlots={timeSlots}
                      handleSelectDate={handleSelectDate}
                      reasons={reasons}
                      doctors={doctors}
/>
          </TabsContent>

          <TabsContent value="waiting">
            <Waiting
              waitingAppointments={waitingAppointments}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="upcoming">
            <Upcoming
              upcomingAppointments={upcomingAppointments}
              handleReschedule={handleReschedule}
              handleCancel={handleCancel}
            />
          </TabsContent>

          <TabsContent value="history">
            <History
              appointmentHistory={appointmentHistory}
              handleViewDetails={handleViewDetails}
            />
          </TabsContent>

          <TabsContent value="reminders">
            <Reminders />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={setIsRescheduleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Please select a new date and time for your appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate: Date | undefined) =>
                    newDate && setDate(newDate)
                  }
                  fromDate={today}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Time
              </Label>
              <Select
                value={selectedTime || ""}
                onValueChange={setSelectedTime}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
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
            <Button onClick={handleConfirmReschedule}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointmentDetails && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Date:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Time:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.time}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Doctor:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.doctor}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Reason:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.reason}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Outcome:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.outcome}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-bold">Notes:</Label>
                <div className="col-span-3">
                  {selectedAppointmentDetails.notes}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
