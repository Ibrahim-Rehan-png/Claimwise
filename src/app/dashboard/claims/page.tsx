import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

const mockSettlements = [
  {
    id: "1",
    title: "TechCorp Privacy Settlement",
    company: "TechCorp Inc.",
    industry: "Technology",
    claimValue: "$50 - $150",
    deadline: "2026-08-15",
    status: "Active",
  },
  {
    id: "2",
    title: "AutoMaker Emissions Recall",
    company: "AutoMaker Motors",
    industry: "Automotive",
    claimValue: "$500+",
    deadline: "2026-12-01",
    status: "Active",
  },
  {
    id: "3",
    title: "BankFee Overdraft Restitution",
    company: "Global Bank",
    industry: "Finance",
    claimValue: "Up to $35",
    deadline: "2026-07-30",
    status: "Closing Soon",
  },
]

export default function ClaimsDatabasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Claims Database</h1>
        <p className="text-muted-foreground">
          Browse and search for active class-action settlements and consumer rebates.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search settlements by company, industry, or keyword..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSettlements.map((settlement) => (
          <Card key={settlement.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant={settlement.status === "Closing Soon" ? "destructive" : "default"}>
                  {settlement.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{settlement.industry}</span>
              </div>
              <CardTitle className="mt-2 line-clamp-2">{settlement.title}</CardTitle>
              <CardDescription>{settlement.company}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Value:</span>
                  <span className="font-medium">{settlement.claimValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Claim Deadline:</span>
                  <span className="font-medium text-red-500">{settlement.deadline}</span>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="w-full">Check Eligibility</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
