"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, BrainCircuit } from "lucide-react"
import Link from "next/link"

export default function EligibilityCheckPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isScoring, setIsScoring] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const questions = [
    {
      id: "q1",
      text: "Did you use TechCorp services between January 1, 2020, and December 31, 2025?",
      options: ["Yes", "No", "Not Sure"]
    },
    {
      id: "q2",
      text: "Were you a resident of the United States during this time period?",
      options: ["Yes", "No"]
    },
    {
      id: "q3",
      text: "Can you provide proof of account ownership (e.g., email receipt, account screenshot)?",
      options: ["Yes, I have it ready", "I can get it later", "No"]
    }
  ]

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1)
    } else {
      // Simulate AI Scoring
      setIsScoring(true)
      setTimeout(() => {
        setIsScoring(false)
        setScore(95) // Mock score
      }, 2000)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link href={`/dashboard/claims/${id}`} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Settlement Details
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
          <BrainCircuit className="mr-3 h-8 w-8 text-primary" />
          AI Eligibility Check
        </h1>
        <p className="text-muted-foreground">
          Answer a few questions to determine your eligibility and get personalized document recommendations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {score !== null 
              ? "Eligibility Results" 
              : isScoring 
                ? "Analyzing Responses..." 
                : `Question ${step + 1} of ${questions.length}`}
          </CardTitle>
          <CardDescription>
            {score !== null 
              ? "Based on your answers, here is your estimated eligibility." 
              : isScoring 
                ? "Our AI is processing your answers to determine eligibility." 
                : questions[step].text}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {score !== null ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4 dark:bg-green-900/30 dark:text-green-400">
                <span className="text-4xl font-bold">{score}%</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Highly Eligible</h3>
              <p className="text-muted-foreground mb-6">
                Based on your responses, you have a high probability of qualifying for this settlement.
              </p>
              <div className="bg-muted p-4 rounded-lg text-left">
                <h4 className="font-medium mb-2">Next Steps & Required Documents:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Upload proof of residence (Utility bill, ID)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Upload account screenshot or email receipt
                  </li>
                </ul>
              </div>
            </div>
          ) : isScoring ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {questions[step].options.map((option) => (
                <Button
                  key={option}
                  variant={answers[questions[step].id] === option ? "default" : "outline"}
                  className="w-full justify-start h-auto py-4 px-6 text-left"
                  onClick={() => handleAnswer(questions[step].id, option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        {score === null && !isScoring && (
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(prev => Math.max(0, prev - 1))} disabled={step === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!answers[questions[step].id]}>
              {step === questions.length - 1 ? "Get Results" : "Next"}
            </Button>
          </CardFooter>
        )}
        {score !== null && (
          <CardFooter>
            <Link href={`/dashboard/claims/${id}/upload`} className="w-full">
              <Button className="w-full">
                Proceed to Document Upload
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
