"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Task {
  id: string
  content: string
  completed: boolean
  priority: "Low" | "Medium" | "High"
  dueDate: string
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", content: "Order new dental supplies", completed: false, priority: "Medium", dueDate: "2023-07-20" },
    { id: "2", content: "Follow up with patient John Doe", completed: false, priority: "High", dueDate: "2023-07-15" },
    { id: "3", content: "Prepare monthly financial report", completed: true, priority: "Medium", dueDate: "2023-07-25" },
    { id: "4", content: "Schedule team meeting", completed: false, priority: "Low", dueDate: "2023-07-18" },
  ])

  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    content: '',
    priority: "Medium",
    dueDate: '',
  })

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now().toString(), completed: false }])
    setNewTask({ content: '', priority: "Medium", dueDate: '' })
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Task Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter task..."
              value={newTask.content}
              onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
            />
            <Select
              value={newTask.priority}
              onValueChange={(value: "Low" | "Medium" | "High") => setNewTask({ ...newTask, priority: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>Active</Button>
        <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>Completed</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Done</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                />
              </TableCell>
              <TableCell className={task.completed ? "line-through" : ""}>{task.content}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  task.priority === "High" ? "bg-red-100 text-red-800" :
                  task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {task.priority}
                </span>
              </TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

