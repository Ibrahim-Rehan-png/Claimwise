import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Info, Calendar as CalendarIcon, FileText } from "lucide-react"
import Link from "next/link"

export default async function SettlementDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Mock data for the specific settlement
  const settlement = {
    id: id,
    title: "TechCorp Privacy Settlement",
    company: "TechCorp Inc.",
    industry: "Technology",
    claimValue: "$50 - $150",
    deadline: "2026-08-15",
    status: "Active",
    description: "TechCorp Inc. has agreed to a $50 million settlement to resolve claims that it violated user privacy by sharing data with third parties without consent. If you used TechCorp services between 2020 and 2025, you may be eligible.",
    requirements: [
      "Must be a resident of the United States",
      "Must have created an account before January 1, 2025",
      "Must provide proof of account ownership (email receipt or screenshot)",
    ],
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link href="/dashboard/claims" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Claims Database
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{settlement.title}</h1>
            <p className="text-muted-foreground">{settlement.company} • {settlement.industry}</p>
          </div>
          <Badge variant="default" className="text-sm px-3 py-1">{settlement.status}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-primary" />
                About this Settlement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{settlement.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Eligibility Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {settlement.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border bg-muted text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="mt-0.5">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Estimated Value</p>
                  <p className="text-sm text-muted-foreground mt-1">{settlement.claimValue}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium leading-none">Claim Deadline</p>
                  <p className="text-sm text-red-500 mt-1">{settlement.deadline}</p>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full" size="lg">Start AI Eligibility Check</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
