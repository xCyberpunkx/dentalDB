"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface SystemStatus {
  cpu: number
  memory: number
  storage: number
  network: number
}

interface Alert {
  id: string
  type: "info" | "warning" | "error"
  message: string
  timestamp: string
}

export default function MonitoringSystem() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0
  })

  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Simulating real-time system status updates
    const interval = setInterval(() => {
      setSystemStatus({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        storage: Math.random() * 100,
        network: Math.random() * 100
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Simulating alerts based on system status
    if (systemStatus.cpu > 90) {
      addAlert("warning", "High CPU usage detected")
    }
    if (systemStatus.memory > 85) {
      addAlert("warning", "High memory usage detected")
    }
    if (systemStatus.storage > 95) {
      addAlert("error", "Critical: Storage nearly full")
    }
  }, [systemStatus])

  const addAlert = (type: "info" | "warning" | "error", message: string) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString()
    }
    setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 9)])
  }

  const chartData = {
    labels: ['1m', '2m', '3m', '4m', '5m'],
    datasets: [
      {
        label: 'CPU Usage',
        data: [65, 59, 80, 81, systemStatus.cpu],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Memory Usage',
        data: [28, 48, 40, 19, systemStatus.memory],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">System Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{systemStatus.cpu.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{systemStatus.memory.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{systemStatus.storage.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Network Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{systemStatus.network.toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      alert.type === 'info' ? 'bg-blue-100 text-blue-800' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {alert.type}
                    </span>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button onClick={() => addAlert("info", "System check performed")}>
        Perform System Check
      </Button>
    </div>
  )
}

