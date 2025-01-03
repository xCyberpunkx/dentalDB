"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { io } from "socket.io-client";

interface Patient {
  firstName: string;
  lastName: string;
}
interface QueueItem {
  id: string;
  patient: Patient;
  status: "WAITING" | "IN_PROGRESS" | "COMPLETED";
  estimatedTimeToDoctor: number;
  estimatedWaitTime: number;
}

const ReceptionistLobby = () => {
  const [patientQueue, setPatientQueue] = React.useState<QueueItem[]>([]);

  React.useEffect(() => {
    const newSocket = io("http://localhost:4000");
    newSocket.on("initialTimes", (initialTimes: QueueItem[]) => {
      setPatientQueue(initialTimes);
    });

    newSocket.on("timeUpdate", (updatedTimes: QueueItem[]) => {
      setPatientQueue(updatedTimes);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const updatePatientStatus = async (
    id: string,
    newStatus: "WAITING" | "IN_PROGRESS" | "COMPLETED"
  ) => {};

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Lobby Management
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Lobby Management</CardTitle>
          <CardDescription>
            View and manage patient flow in the clinic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Estimated Wait Time</TableHead>
                <TableHead>Time to Doctor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientQueue.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    {patient.patient.firstName} {patient.patient.lastName}
                  </TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>{patient.estimatedWaitTime} mins</TableCell>
                  <TableCell>{patient.estimatedTimeToDoctor} mins</TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updatePatientStatus(
                          patient.id,
                          value as "WAITING" | "IN_PROGRESS" | "COMPLETED"
                        )
                      }
                      defaultValue={patient.status}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WAITING">WAITING</SelectItem>
                        <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistLobby;
