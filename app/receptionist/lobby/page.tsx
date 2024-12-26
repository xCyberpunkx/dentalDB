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

interface Patient {
  id: string;
  name: string;
  status: "WAITING" | "IN_PROGRESS" | "COMPLETED";
  estimatedTimeToDoctor: number;
  estimatedWaitTime: number;
}

const ReceptionistLobby = () => {
  const [patientQueue, setPatientQueue] = React.useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      status: "WAITING",
      estimatedTimeToDoctor: 5,
      estimatedWaitTime: 20,
    },
    {
      id: "2",
      name: "lolsi Smith",
      status: "WAITING",
      estimatedTimeToDoctor: 10,
      estimatedWaitTime: 25,
    },
    {
      id: "3",
      name: "Bob Johnson",
      status: "WAITING",
      estimatedTimeToDoctor: 15,
      estimatedWaitTime: 35,
    },
    {
      id: "4",
      name: "alex forx",
      status: "WAITING",
      estimatedTimeToDoctor: 20,
      estimatedWaitTime: 50,
    },
  ]);

  const sortPatientQueue = (patients: Patient[]): Patient[] => {
    return [...patients]
      .sort((a, b) => {
        if (a.status === "IN_PROGRESS" && b.status !== "IN_PROGRESS") return -1;
        if (a.status !== "IN_PROGRESS" && b.status === "IN_PROGRESS") return 1;
        if (a.status === "COMPLETED" && b.status !== "COMPLETED") return 1;
        if (a.status !== "COMPLETED" && b.status === "COMPLETED") return -1;
        return 0;
      })
      .map((patient) =>
        patient.status === "COMPLETED"
          ? { ...patient, estimatedWaitTime: 0, estimatedTimeToDoctor: 0 }
          : patient
      );
  };

  const updatePatientStatus = (
    id: string,
    newStatus: "WAITING" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    setPatientQueue((prevQueue) => {
      const updatedQueue = prevQueue.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status: newStatus,
              estimatedWaitTime:
                newStatus === "COMPLETED" ? 0 : patient.estimatedWaitTime,
            }
          : patient
      );
      return sortPatientQueue(updatedQueue);
    });
  };

  const calculateEstimatedTimeToDoctor = (
    patient: Patient,
    index: number
  ): number => {
    if (
      (index === 0 && patient.status === "IN_PROGRESS") ||
      patient.status === "COMPLETED"
    ) {
      return 0;
    }
    if (index === 1 && patient.status === "WAITING") {
      return patientQueue[0].estimatedWaitTime;
    }
    let totalTime = 0;
    for (let i = 1; i < index; i++) {
      const currentPatient = patientQueue[i];
      if (currentPatient.status === "WAITING") {
        totalTime += currentPatient.estimatedTimeToDoctor;
      }
    }
    return totalTime;
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPatientQueue((prevQueue) =>
        sortPatientQueue(
          prevQueue.map((patient) => {
            if (patient.status === "IN_PROGRESS") {
              return {
                ...patient,
                estimatedWaitTime: Math.max(0, patient.estimatedWaitTime - 1),
              };
            } else if (patient.status === "COMPLETED") {
              return { ...patient, estimatedWaitTime: 0 };
            }
            return patient;
          })
        )
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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
                <TableHead>ch7al yb9a 3nd tbibb apipri</TableHead>
                <TableHead>ch7al mazal bah ji dalto</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortPatientQueue(patientQueue).map((patient, index) => {
                const estimatedTimeToDoctor = calculateEstimatedTimeToDoctor(
                  patient,
                  index
                );

                return (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.status}</TableCell>
                    <TableCell>{patient.estimatedWaitTime} mins</TableCell>
                    <TableCell>{estimatedTimeToDoctor} mins</TableCell>
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
                          <SelectItem value="IN_PROGRESS">
                            IN_PROGRESS
                          </SelectItem>
                          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistLobby;
