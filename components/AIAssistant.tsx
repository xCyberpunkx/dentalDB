"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const suggestionCards = [
  {
    title: "Patient Analysis",
    description: "Analyze patient trends and demographics",
    question: "Can you provide an analysis of patient demographics and visit frequency over the last 6 months?"
  },
  {
    title: "Treatment Recommendations",
    description: "Get AI-powered treatment suggestions",
    question: "Based on the symptoms of tooth sensitivity and recurring gum inflammation, what treatment plan would you recommend?"
  },
  {
    title: "Inventory Optimization",
    description: "Optimize your dental supplies inventory",
    question: "How can we optimize our dental supplies inventory to reduce waste and ensure we always have essential items in stock?"
  }
]

export default function AIAssistant() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would call an AI service here
    setResponse(`AI response to: "${query}"`)
    setQuery("")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Assistant</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestionCards.map((card, index) => (
          <Card key={index} className="cursor-pointer" onClick={() => setQuery(card.question)}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{card.question}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ask the AI Assistant</CardTitle>
          <CardDescription>Get help with tasks, analysis, and decision-making.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Ask a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
          {response && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <h3 className="font-semibold">AI Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

