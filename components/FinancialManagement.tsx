"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "Income" | "Expense"
  category: string
}

interface Account {
  id: string
  name: string
  balance: number
  type: "Checking" | "Savings" | "Credit Card"
}

export default function FinancialManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", date: "2023-07-01", description: "Patient payment", amount: 150, type: "Income", category: "Service" },
    { id: "2", date: "2023-07-02", description: "Supplies purchase", amount: 50, type: "Expense", category: "Supplies" },
    { id: "3", date: "2023-07-03", description: "Insurance claim", amount: 200, type: "Income", category: "Insurance" },
    { id: "4", date: "2023-07-04", description: "Staff salary", amount: 1000, type: "Expense", category: "Payroll" },
  ])
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({ date: "", description: "", amount: 0, type: "Income", category: "" })
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "Main Checking", balance: 10000, type: "Checking" },
    { id: "2", name: "Business Savings", balance: 5000, type: "Savings" },
    { id: "3", name: "Credit Card", balance: -1000, type: "Credit Card" },
  ])
  const [newAccount, setNewAccount] = useState<Omit<Account, 'id'>>({ name: "", balance: 0, type: "Checking" })

  const addTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now().toString() }])
    setNewTransaction({ date: "", description: "", amount: 0, type: "Income", category: "" })
  }

  const addAccount = () => {
    setAccounts([...accounts, { ...newAccount, id: Date.now().toString() }])
    setNewAccount({ name: "", balance: 0, type: "Checking" })
  }

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === "Income" ? acc + transaction.amount : acc - transaction.amount
    }, 0)
  }

  const generateProfitLossReport = () => {
    const income = transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0)
    return { income, expenses, profit: income - expenses }
  }

  const generateCashFlowData = () => {
    const monthlyData = transactions.reduce((acc, transaction) => {
      const month = transaction.date.slice(0, 7) // Get YYYY-MM
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 }
      }
      if (transaction.type === "Income") {
        acc[month].income += transaction.amount
      } else {
        acc[month].expense += transaction.amount
      }
      return acc
    }, {} as Record<string, { income: number; expense: number }>)

    const sortedMonths = Object.keys(monthlyData).sort()

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Income',
          data: sortedMonths.map(month => monthlyData[month].income),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Expense',
          data: sortedMonths.map(month => monthlyData[month].expense),
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Financial Management</h2>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${calculateBalance().toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  ${transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  ${transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${generateProfitLossReport().profit.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={generateCashFlowData()} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Add New Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value as "Income" | "Expense" })}
                    defaultValue={newTransaction.type}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  />
                </div>
                <Button onClick={addTransaction}>Add Transaction</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>Add New Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="accountBalance">Initial Balance</Label>
                  <Input
                    id="accountBalance"
                    type="number"
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount({ ...newAccount, balance: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select
                    onValueChange={(value) => setNewAccount({ ...newAccount, type: value as "Checking" | "Savings" | "Credit Card" })}
                    defaultValue={newAccount.type}
                  >
                    <SelectTrigger id="accountType">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Checking">Checking</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addAccount}>Add Account</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>${account.balance.toFixed(2)}</TableCell>
                      <TableCell>{account.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profitLoss">
                <TabsList>
                  <TabsTrigger value="profitLoss">Profit & Loss</TabsTrigger>
                  <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
                </TabsList>
                <TabsContent value="profitLoss">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Profit & Loss Statement</h3>
                    {(() => {
                      const { income, expenses, profit } = generateProfitLossReport()
                      return (
                        <div>
                          <p>Total Income: ${income.toFixed(2)}</p>
                          <p>Total Expenses: ${expenses.toFixed(2)}</p>
                          <p>Net Profit: ${profit.toFixed(2)}</p>
                        </div>
                      )
                    })()}
                  </div>
                </TabsContent>
                <TabsContent value="expenses">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Expense Breakdown</h3>
                    <Bar
                      data={{
                        labels: ['Supplies', 'Payroll', 'Rent', 'Utilities', 'Marketing'],
                        datasets: [
                          {
                            label: 'Expenses',
                            data: [300, 1500, 1000, 200, 500],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.5)',
                              'rgba(54, 162, 235, 0.5)',
                              'rgba(255, 206, 86, 0.5)',
                              'rgba(75, 192, 192, 0.5)',
                              'rgba(153, 102, 255, 0.5)',
                            ],
                          },
                        ],
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

