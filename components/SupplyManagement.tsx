"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface SupplyItem {
  id: string
  name: string
  quantity: number
  unit: string
  supplier: string
  reorderPoint: number
}

export default function SupplyManagement() {
  const [supplies, setSupplies] = useState<SupplyItem[]>([
    { id: "1", name: "Dental Floss", quantity: 100, unit: "pcs", supplier: "Dental Supplies Co.", reorderPoint: 20 },
    { id: "2", name: "Toothbrush", quantity: 50, unit: "pcs", supplier: "Oral Care Inc.", reorderPoint: 10 },
  ])
  const [newItem, setNewItem] = useState<Omit<SupplyItem, 'id'>>({ name: "", quantity: 0, unit: "", supplier: "", reorderPoint: 0 })

  const addItem = () => {
    setSupplies([...supplies, { ...newItem, id: Date.now().toString() }])
    setNewItem({ name: "", quantity: 0, unit: "", supplier: "", reorderPoint: 0 })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Supply Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Supply Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Supply Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input
                id="unit"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">
                Supplier
              </Label>
              <Input
                id="supplier"
                value={newItem.supplier}
                onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reorderPoint" className="text-right">
                Reorder Point
              </Label>
              <Input
                id="reorderPoint"
                type="number"
                value={newItem.reorderPoint}
                onChange={(e) => setNewItem({ ...newItem, reorderPoint: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addItem}>Add Item</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Reorder Point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplies.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.reorderPoint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

