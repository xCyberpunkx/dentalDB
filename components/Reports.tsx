"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("patientVisits")

  const patientVisitsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patient Visits',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (DZD)',
        data: [1200000, 1900000, 1500000, 2200000, 1800000, 2400000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const treatmentDistributionData = {
    labels: ['Cleanings', 'Fillings', 'Root Canals', 'Extractions', 'Crowns'],
    datasets: [
      {
        data: [300, 150, 100, 80, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  }

  const ageDistributionData = {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [120, 200, 180, 150, 100],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  const patientRetentionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [20, 25, 18, 30, 22, 28],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Returning Patients',
        data: [45, 34, 62, 51, 34, 27],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  }

  const appointmentTypeData = {
    labels: ['Regular Checkup', 'Emergency', 'Cosmetic', 'Orthodontic', 'Surgical'],
    datasets: [
      {
        data: [250, 50, 100, 75, 25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  }

  const renderChart = () => {
    switch (selectedReport) {
      case "patientVisits":
        return <Bar data={patientVisitsData} />
      case "revenue":
        return <Line data={revenueData} />
      case "treatmentDistribution":
        return <Pie data={treatmentDistributionData} />
      case "ageDistribution":
        return <Bar data={ageDistributionData} />
      case "patientRetention":
        return <Bar data={patientRetentionData} />
      case "appointmentType":
        return <Doughnut data={appointmentTypeData} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reports & Insights</h2>
      <Select onValueChange={setSelectedReport} defaultValue={selectedReport}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select report" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="patientVisits">Patient Visits</SelectItem>
          <SelectItem value="revenue">Revenue</SelectItem>
          <SelectItem value="treatmentDistribution">Treatment Distribution</SelectItem>
          <SelectItem value="ageDistribution">Age Distribution</SelectItem>
          <SelectItem value="patientRetention">Patient Retention</SelectItem>
          <SelectItem value="appointmentType">Appointment Types</SelectItem>
        </SelectContent>
      </Select>
      <Card>
        <CardHeader>
          <CardTitle>{selectedReport.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {renderChart()}
        </CardContent>
      </Card>
      <Button onClick={() => window.print()}>Print Report</Button>
    </div>
  )
}

