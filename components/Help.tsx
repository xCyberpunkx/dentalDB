"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I add a new patient?",
      answer: "To add a new patient, go to the Patient Management section and click on the 'Add New Patient' button. Fill in the required information and click 'Save'."
    },
    {
      question: "How can I schedule an appointment?",
      answer: "To schedule an appointment, navigate to the Queue & Lobby Management section. Click on 'Add to Queue' and enter the patient's details and appointment time."
    },
    {
      question: "How do I generate a billing report?",
      answer: "To generate a billing report, go to the Billing section. You can filter the records by date range and click on 'Generate Report' to create a printable report."
    },
    {
      question: "How can I update the inventory?",
      answer: "To update the inventory, go to the Inventory Management section. You can add new items, update quantities, or mark items as out of stock."
    },
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Help Center</h2>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about using the dental practice management system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          <Accordion type="single" collapsible>
            {filteredFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>Contact our support team for personalized assistance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  )
}

