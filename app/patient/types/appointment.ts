export interface Appointment {
  id: string;
  date: string; // Adjust types as necessary
  time: string;
  doctorId: string;
  reason: string;
  notes: string;
  status: { status: string };
} 