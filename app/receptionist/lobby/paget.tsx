"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WebSocketTimer() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState(20);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("timer_update", (updatedTime: number) => {
      setTime(updatedTime);
    });

    newSocket.emit("start_timer", inputTime);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const startTimer = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && !isNaN(inputTime) && inputTime > 0) {
      socket.emit("start_timer", inputTime);
      setInputTime(0);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>WebSocket Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center mb-6">{time}</div>
        <form onSubmit={startTimer} className="flex gap-2">
          <Input
            type="number"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            placeholder="Enter seconds"
            className="flex-grow"
          />
          <Button type="submit">Start Timer</Button>
        </form>
      </CardContent>
    </Card>
  );
}
