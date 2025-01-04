"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BillingRecord {
  id: string
  patientName: string
  date: string
  amount: number
  status: "Paid" | "Pending" | "Overdue"
  paymentStatus: "Unpaid" | "Partial" | "Paid"
  paymentType: "Cash" | "Credit Card" | "Insurance" | "Bank Transfer"
}

const printInvoice = (record: BillingRecord) => {
  const printContent = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .invoice { border: 1px solid #ccc; padding: 20px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; }
          .details { margin-bottom: 20px; }
          .amount { font-size: 1.2em; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <h1>Invoice</h1>
          </div>
          <div class="details">
            <p><strong>Patient:</strong> ${record.patientName}</p>
            <p><strong>Date:</strong> ${record.date}</p>
            <p><strong>Status:</strong> ${record.status}</p>
            <p><strong>Payment Status:</strong> ${record.paymentStatus}</p>
            <p><strong>Payment Type:</strong> ${record.paymentType}</p>
          </div>
          <div class="amount">
            <p>Total Amount: DZD ${record.amount.toFixed(2)}</p>
          </div>
        </div>
      </body>
    </html>
  `

  const printWindow = window.open('', '_blank')
  printWindow?.document.write(printContent)
  printWindow?.document.close()
  printWindow?.print()
}

export default function Billing() {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([
    { id: "1", patientName: "John Doe", date: "2023-07-01", amount: 15000, status: "Paid", paymentStatus: "Paid", paymentType: "Credit Card" },
    { id: "2", patientName: "Jane Smith", date: "2023-07-05", amount: 20000, status: "Pending", paymentStatus: "Partial", paymentType: "Insurance" },
  ])
  const [newRecord, setNewRecord] = useState<Omit<BillingRecord, 'id'>>({ 
    patientName: "", 
    date: "", 
    amount: 0, 
    status: "Pending", 
    paymentStatus: "Unpaid", 
    paymentType: "Cash" 
  })

  const addRecord = () => {
    setBillingRecords([...billingRecords, { ...newRecord, id: Date.now().toString() }])
    setNewRecord({ patientName: "", date: "", amount: 0, status: "Pending", paymentStatus: "Unpaid", paymentType: "Cash" })
  }

  const calculateTotalBilled = () => {
    return billingRecords.reduce((total, record) => total + record.amount, 0)
  }

  const calculateTotalPaid = () => {
    return billingRecords
      .filter(record => record.paymentStatus === "Paid")
      .reduce((total, record) => total + record.amount, 0)
  }

  const calculateTotalPending = () => {
    return billingRecords
      .filter(record => record.paymentStatus === "Unpaid" || record.paymentStatus === "Partial")
      .reduce((total, record) => total + record.amount, 0)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Billing Management</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="font-bold">Total Billed</h3>
          <p className="text-2xl">${calculateTotalBilled().toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="font-bold">Total Paid</h3>
          <p className="text-2xl">${calculateTotalPaid().toFixed(2)}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <h3 className="font-bold">Total Pending</h3>
          <p className="text-2xl">${calculateTotalPending().toFixed(2)}</p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Billing Record</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Billing Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">Patient Name</Label>
              <Input
                id="patientName"
                value={newRecord.patientName}
                onChange={(e) => setNewRecord({ ...newRecord, patientName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={newRecord.amount}
                onChange={(e) => setNewRecord({ ...newRecord, amount: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select
                onValueChange={(value) => setNewRecord({ ...newRecord, status: value as "Paid" | "Pending" | "Overdue" })}
                defaultValue={newRecord.status}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentStatus" className="text-right">Payment Status</Label>
              <Select
                onValueChange={(value) => setNewRecord({ ...newRecord, paymentStatus: value as "Unpaid" | "Partial" | "Paid" })}
                defaultValue={newRecord.paymentStatus}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentType" className="text-right">Payment Type</Label>
              <Select
                onValueChange={(value) => setNewRecord({ ...newRecord, paymentType: value as "Cash" | "Credit Card" | "Insurance" | "Bank Transfer" })}
                defaultValue={newRecord.paymentType}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addRecord}>Add Record</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billingRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.patientName}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>${record.amount.toFixed(2)}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>{record.paymentStatus}</TableCell>
              <TableCell>{record.paymentType}</TableCell>
              <TableCell>
                <Button onClick={() => printInvoice(record)}>Print Invoice</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

