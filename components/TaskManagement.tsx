"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Task {
  id: string
  content: string
  description: string
  priority: "Low" | "Medium" | "High"
  dueDate: string
  assignee: string
  completed: boolean
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const staff = [
  { id: "1", name: "Dr. Smith", avatar: "/avatars/smith.jpg" },
  { id: "2", name: "Dr. Johnson", avatar: "/avatars/johnson.jpg" },
  { id: "3", name: "Nurse Williams", avatar: "/avatars/williams.jpg" },
  { id: "4", name: "Receptionist Brown", avatar: "/avatars/brown.jpg" },
]

export default function TaskManagement() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task1', content: 'Order new dental supplies', description: 'Check inventory and place order', priority: "Medium", dueDate: "2023-07-20", assignee: "Dr. Smith", completed: false },
        { id: 'task2', content: 'Follow up with patient John Doe', description: 'Call regarding treatment plan', priority: "High", dueDate: "2023-07-15", assignee: "Dr. Johnson", completed: false },
      ],
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        { id: 'task3', content: 'Prepare monthly financial report', description: 'Compile data and create charts', priority: "Medium", dueDate: "2023-07-25", assignee: "Receptionist Brown", completed: false },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task4', content: 'Update patient records', description: 'Enter new patient information', priority: "Low", dueDate: "2023-07-10", assignee: "Nurse Williams", completed: true },
      ],
    },
  ])

  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({ 
    content: '', 
    description: '', 
    priority: "Medium", 
    dueDate: '', 
    assignee: ''
  })

  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (source.droppableId === destination.droppableId) {
      const column = columns.find(col => col.id === source.droppableId)
      if (!column) return

      const newTasks = Array.from(column.tasks)
      const [reorderedItem] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, reorderedItem)

      const newColumns = columns.map(col =>
        col.id === source.droppableId ? { ...col, tasks: newTasks } : col
      )

      setColumns(newColumns)
    } else {
      const sourceColumn = columns.find(col => col.id === source.droppableId)
      const destColumn = columns.find(col => col.id === destination.droppableId)
      if (!sourceColumn || !destColumn) return

      const sourceTasks = Array.from(sourceColumn.tasks)
      const destTasks = Array.from(destColumn.tasks)
      const [movedItem] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, movedItem)

      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks }
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks }
        }
        return col
      })

      setColumns(newColumns)
    }
  }

  const addTask = () => {
    const newTaskWithId = { ...newTask, id: `task${Date.now()}`, completed: false }
    const newColumns = columns.map(col =>
      col.id === 'todo' ? { ...col, tasks: [...col.tasks, newTaskWithId] } : col
    )
    setColumns(newColumns)
    setNewTask({ content: '', description: '', priority: "Medium", dueDate: '', assignee: '' })
  }

  const updateTask = (task: Task) => {
    const newColumns = columns.map(col => ({
      ...col,
      tasks: col.tasks.map(t => t.id === task.id ? task : t)
    }))
    setColumns(newColumns)
    setEditingTask(null)
  }

  const deleteTask = (taskId: string) => {
    const newColumns = columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(t => t.id !== taskId)
    }))
    setColumns(newColumns)
  }

  const toggleTaskCompletion = (taskId: string) => {
    const newColumns = columns.map(col => ({
      ...col,
      tasks: col.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    }))
    setColumns(newColumns)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Task Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                id="task"
                value={newTask.content}
                onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                onValueChange={(value) => setNewTask({ ...newTask, priority: value as "Low" | "Medium" | "High" })}
                defaultValue={newTask.priority}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee
              </Label>
              <Select
                onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                defaultValue={newTask.assignee}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map(member => (
                    <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addTask}>Add Task</Button>
        </DialogContent>
      </Dialog>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(column => (
            <Card key={column.id}>
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-secondary p-2 rounded"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{task.content}</h3>
                                <Checkbox
                                  checked={task.completed}
                                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                                />
                              </div>
                              <p className="text-sm text-gray-500">{task.description}</p>
                              <div className="flex justify-between mt-2">
                                <span className={`text-xs font-semibold ${
                                  task.priority === "High" ? "text-red-500" :
                                  task.priority === "Medium" ? "text-yellow-500" :
                                  "text-green-500"
                                }`}>
                                  {task.priority}
                                </span>
                                <span className="text-xs">{task.dueDate}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={staff.find(s => s.name === task.assignee)?.avatar} />
                                  <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <Button size="sm" variant="outline" className="mr-2" onClick={() => setEditingTask(task)}>Edit</Button>
                                  <Button size="sm" variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTask" className="text-right">
                  Task
                </Label>
                <Input
                  id="editTask"
                  value={editingTask.content}
                  onChange={(e) => setEditingTask({ ...editingTask, content: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="editDescription"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editPriority" className="text-right">
                  Priority
                </Label>
                <Select
                  onValueChange={(value) => setEditingTask({ ...editingTask, priority: value as "Low" | "Medium" | "High" })}
                  defaultValue={editingTask.priority}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editDueDate" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="editDueDate"
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editAssignee" className="text-right">
                  Assignee
                </Label>
                <Select
                  onValueChange={(value) => setEditingTask({ ...editingTask, assignee: value })}
                  defaultValue={editingTask.assignee}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map(member => (
                      <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => updateTask(editingTask)}>Update Task</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

