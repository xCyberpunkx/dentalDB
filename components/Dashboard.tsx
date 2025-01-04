/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Stethoscope, Users, Calendar, Package, CreditCard, MessageSquare, UserCheck, BarChart2, Link, DollarSign, Truck, UserPlus, CheckSquare, Brain, FileText, Activity, Settings, HelpCircle, Moon, Sun, LogOut } from 'lucide-react'
import PatientManagement from "./PatientManagement"
import Inventory from "./Inventory"
import Billing from "./Billing"
import Messages from "./Messages"
import QueueLobby from "./QueueLobby"
import Reports from "./Reports"
import Integrations from "./Integrations"
import FinancialManagement from "./FinancialManagement"
import SupplyManagement from "./SupplyManagement"
import StaffManagement from "./StaffManagement"
import TaskManagement from "./TaskManagement"
import SettingsPage from "./SettingsPage"
import Help from "./Help"
import AIAssistant from "./AIAssistant"
import CalendarView from "./CalendarView"
import Documents from "./Documents"
import MonitoringSystem from "./MonitoringSystem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const tabItems = [
  { id: "dashboard", label: "Dashboard", icon: Stethoscope },
  { id: "patients", label: "Patients", icon: Users },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "queue", label: "Queue", icon: UserCheck },
  { id: "reports", label: "Reports", icon: BarChart2 },
  { id: "integrations", label: "Integrations", icon: Link },
  { id: "financial", label: "Financial", icon: DollarSign },
  { id: "supply", label: "Supply", icon: Truck },
  { id: "staff", label: "Staff", icon: UserPlus },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "aiAssistant", label: "AI Assistant", icon: Brain },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "monitoring", label: "Monitoring", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help", icon: HelpCircle },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [notifications, setNotifications] = useState(3)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", dentist: "Dr. Smith", date: "2023-07-15", time: "10:00 AM", type: "Checkup" },
    { id: 2, patient: "Jane Smith", dentist: "Dr. Johnson", date: "2023-07-15", time: "11:30 AM", type: "Cleaning" },
    { id: 3, patient: "Mike Brown", dentist: "Dr. Davis", date: "2023-07-15", time: "2:00 PM", type: "Filling" },
  ])

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      setNotifications(prev => (prev + 1) % 10)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (DZD)',
        data: [120000, 190000, 150000, 220000, 180000, 240000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const patientData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [20, 25, 18, 30, 22, 28],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, id: Date.now() }])
  }

  const editAppointment = (id, updatedAppointment) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, ...updatedAppointment } : app))
  }

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id))
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DentaCare Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Dr. Smith" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. Smith</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      dr.smith@dentacare.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("help")}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 h-screen sticky top-14 dark:bg-gray-800">
          <nav className="p-4">
            <ul className="space-y-2">
              {tabItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard">
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="bg-blue-100 dark:bg-blue-900">
                  <CardHeader>
                    <CardTitle>Today&apos;s Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{appointments.length}</p>
                    <Button className="mt-2" onClick={() => setActiveTab("calendar")}>View Calendar</Button>
                  </CardContent>
                </Card>
                <Card className="bg-green-100 dark:bg-green-900">
                  <CardHeader>
                    <CardTitle>Pending Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">5</p>
                    <Button className="mt-2" onClick={() => setActiveTab("tasks")}>Manage Tasks</Button>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-100 dark:bg-yellow-900">
                  <CardHeader>
                    <CardTitle>Unread Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{notifications}</p>
                    <Button className="mt-2" onClick={() => setActiveTab("messages")}>View Messages</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Bar data={revenueData} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>New Patients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Line data={patientData} />
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Today&apos;s Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Dentist</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(app => (
                        <tr key={app.id}>
                          <td>{app.patient}</td>
                          <td>{app.dentist}</td>
                          <td>{app.time}</td>
                          <td>{app.type}</td>
                          <td>
                            <Button size="sm" onClick={() => editAppointment(app.id, { ...app })}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteAppointment(app.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button className="mt-4" onClick={() => addAppointment({ patient: "New Patient", dentist: "Dr. Smith", date: "2023-07-15", time: "3:00 PM", type: "Checkup" })}>
                    Add Appointment
                  </Button>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button onClick={() => setActiveTab("patients")}>Manage Patients</Button>
                <Button onClick={() => setActiveTab("inventory")}>Check Inventory</Button>
                <Button onClick={() => setActiveTab("billing")}>Process Billing</Button>
                <Button onClick={() => setActiveTab("reports")}>Generate Reports</Button>
              </div>
            </TabsContent>
            <TabsContent value="patients"><PatientManagement /></TabsContent>
            <TabsContent value="inventory"><Inventory /></TabsContent><TabsContent value="inventory"><Inventory /></TabsContent>
            <TabsContent value="billing"><Billing /></TabsContent>
           {/*TabsContent value="messages"><Messages /></TabsContent> */} 
            <TabsContent value="queue"><QueueLobby /></TabsContent>
            <TabsContent value="reports"><Reports /></TabsContent>
            <TabsContent value="integrations"><Integrations /></TabsContent>
            <TabsContent value="financial"><FinancialManagement /></TabsContent>
            <TabsContent value="supply"><SupplyManagement /></TabsContent>
            <TabsContent value="staff"><StaffManagement /></TabsContent>
            <TabsContent value="tasks"><TaskManagement /></TabsContent>
            <TabsContent value="aiAssistant"><AIAssistant /></TabsContent>
            <TabsContent value="documents"><Documents /></TabsContent>
            <TabsContent value="monitoring"><MonitoringSystem /></TabsContent>
            <TabsContent value="settings"><SettingsPage /></TabsContent>
            <TabsContent value="help"><Help /></TabsContent>
            <TabsContent value="calendar"><CalendarView /></TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

