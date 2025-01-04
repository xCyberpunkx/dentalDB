"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Document {
  id: string
  name: string
  type: string
  patientName: string
  date: string
  fileSize: string
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "X-Ray_001.jpg", type: "X-Ray", patientName: "Mohammed Larbi", date: "2023-07-01", fileSize: "5.2 MB" },
    { id: "2", name: "Dental_Chart_002.pdf", type: "Chart", patientName: "Amina Beloufa", date: "2023-07-02", fileSize: "1.8 MB" },
    { id: "3", name: "Treatment_Plan_003.docx", type: "Plan", patientName: "Youcef Kaddour", date: "2023-07-03", fileSize: "567 KB" },
  ])

  const [newDocument, setNewDocument] = useState<Omit<Document, 'id'>>({
    name: "",
    type: "",
    patientName: "",
    date: "",
    fileSize: ""
  })

  const addDocument = () => {
    setDocuments([...documents, { ...newDocument, id: Date.now().toString() }])
    setNewDocument({ name: "", type: "", patientName: "", date: "", fileSize: "" })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Documents</h2>
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Document</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Document</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Input
                    id="type"
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patientName" className="text-right">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={newDocument.patientName}
                    onChange={(e) => setNewDocument({ ...newDocument, patientName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newDocument.date}
                    onChange={(e) => setNewDocument({ ...newDocument, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fileSize" className="text-right">File Size</Label>
                  <Input
                    id="fileSize"
                    value={newDocument.fileSize}
                    onChange={(e) => setNewDocument({ ...newDocument, fileSize: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={addDocument}>Add Document</Button>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>File Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.patientName}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{doc.fileSize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

