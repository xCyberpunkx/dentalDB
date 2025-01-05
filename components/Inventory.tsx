"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  reorderPoint: number
  supplier: string
  lastOrderDate: string
  expirationDate: string
  category: string
  location: string
  cost: number
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { "id": "1", "name": "Dental Floss", "quantity": 100, "unit": "Piece", "reorderPoint": 20, "supplier": "Dental Supplies Company", "lastOrderDate": "2023-06-15", "expirationDate": "2024-06-15", "category": "Hygiene", "location": "Storage A", "cost": 150 },
    { "id": "2", "name": "Toothbrush", "quantity": 50, "unit": "Piece", "reorderPoint": 10, "supplier": "Oral Care Company", "lastOrderDate": "2023-06-01", "expirationDate": "2025-06-01", "category": "Hygiene", "location": "Storage B", "cost": 200 },
    { "id": "3", "name": "Dental Implant", "quantity": 25, "unit": "Piece", "reorderPoint": 5, "supplier": "Implant Solutions", "lastOrderDate": "2023-05-20", "expirationDate": "2026-05-20", "category": "Surgery", "location": "Storage C", "cost": 15000 },
    { "id": "4", "name": "Topical Anesthetic", "quantity": 30, "unit": "Bottle", "reorderPoint": 10, "supplier": "Medical Supplies", "lastOrderDate": "2023-06-10", "expirationDate": "2024-06-10", "category": "Medications", "location": "Storage D", "cost": 3000 },
    { "id": "5", "name": "Dental Chair", "quantity": 5, "unit": "Piece", "reorderPoint": 1, "supplier": "Dental Equipment", "lastOrderDate": "2023-01-15", "expirationDate": "2033-01-15", "category": "Equipment", "location": "Clinic Floor", "cost": 500000 }
]
)
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>({ 
    name: "", 
    quantity: 0, 
    unit: "", 
    reorderPoint: 0, 
    supplier: "", 
    lastOrderDate: "", 
    expirationDate: "", 
    category: "",
    location: "",
    cost: 0
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  useEffect(() => {
    // Simulating fetching inventory data from an API
    
  }, [])

  const addItem = () => {
    setInventory([...inventory, { ...newItem, id: Date.now().toString() }])
    setNewItem({ name: "", quantity: 0, unit: "", reorderPoint: 0, supplier: "", lastOrderDate: "", expirationDate: "", category: "", location: "", cost: 0 })
  }

  const updateQuantity = (id: string, change: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ))
  }

  const deleteItem = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id))
  }

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "All" || item.category === filterCategory)
  )

  const categories = ["All", ...new Set(inventory.map(item => item.category))]

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderPoint)

  const totalValue = inventory.reduce((total, item) => total + item.quantity * item.cost, 0)

  const categoryData = {
    labels: categories.filter(category => category !== "All"),
    datasets: [
      {
        data: categories
          .filter(category => category !== "All")
          .map(category => 
            inventory
              .filter(item => item.category === category)
              .reduce((sum, item) => sum + item.quantity * item.cost, 0)
          ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)'
        ],
      },
    ],
  }

  const quantityData = {
    labels: inventory.map(item => item.name),
    datasets: [
      {
        label: 'Quantity',
        data: inventory.map(item => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Inventory Management</h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalValue.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>توزيع الفئات</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px', width: '100%' }}>
                <Doughnut 
                  data={categoryData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="items">
          <div className="flex space-x-2 mb-4">
            <Input 
              placeholder="Search inventory..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setFilterCategory} defaultValue={filterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reorderPoint" className="text-right">Reorder Point</Label>
                  <Input
                    id="reorderPoint"
                    type="number"
                    value={newItem.reorderPoint}
                    onChange={(e) => setNewItem({ ...newItem, reorderPoint: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier" className="text-right">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cost" className="text-right">Cost (DZD)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newItem.cost}
                    onChange={(e) => setNewItem({ ...newItem, cost: Number(e.target.value) })}
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
                <TableHead>Reorder Point</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Cost (DZD)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => console.log(`Clicked item: ${item.name}`)}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.cost.toLocaleString('ar-DZ', { style: 'currency', currency: 'DZD' })}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button className="bg-green-500 hover:bg-green-600" onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}>+</Button>
                      <Button className="bg-red-500 hover:bg-red-600" onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}>-</Button>
                      <Button className="bg-gray-500 hover:bg-gray-600" onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}>حذف</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Quantity by Item</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={quantityData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

