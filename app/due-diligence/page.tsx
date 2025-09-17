"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  FileText,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

const activeSurveys = [
  {
    id: 1,
    title: "Weekly Pulse Check",
    category: "Employee Satisfaction",
    type: "Survey",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    responses: 245,
    totalRecipients: 320,
    successRate: 76.6,
    status: "Active",
    questions: 5,
    avgTime: "2 mins",
  },
  {
    id: 2,
    title: "Environmental Impact Assessment",
    category: "Environment",
    type: "Due Diligence",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    responses: 89,
    totalRecipients: 150,
    successRate: 59.3,
    status: "Active",
    questions: 25,
    avgTime: "15 mins",
  },
  {
    id: 3,
    title: "Supply Chain Labor Practices",
    category: "Human Rights",
    type: "Due Diligence",
    startDate: "2024-01-05",
    endDate: "2024-01-25",
    responses: 156,
    totalRecipients: 200,
    successRate: 78.0,
    status: "Active",
    questions: 18,
    avgTime: "12 mins",
  },
  {
    id: 4,
    title: "Workplace Safety Audit",
    category: "Labour",
    type: "Survey",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    responses: 298,
    totalRecipients: 350,
    successRate: 85.1,
    status: "Completed",
    questions: 12,
    avgTime: "8 mins",
  },
]

const templates = [
  {
    id: 1,
    title: "Weekly Pulse Check",
    description: "Quick weekly check-in with employees to gauge mood and engagement",
    category: "Employee Satisfaction",
    questions: 5,
    estimatedTime: "2 mins",
    icon: Zap,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Environmental Compliance Audit",
    description: "Comprehensive assessment of environmental practices and compliance",
    category: "Environment",
    questions: 28,
    estimatedTime: "20 mins",
    icon: FileText,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    title: "Human Rights Due Diligence",
    description: "Detailed evaluation of human rights practices across operations",
    category: "Human Rights",
    questions: 35,
    estimatedTime: "25 mins",
    icon: Target,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 4,
    title: "Labor Standards Assessment",
    description: "Assessment of working conditions, wages, and labor practices",
    category: "Labour",
    questions: 22,
    estimatedTime: "15 mins",
    icon: Users,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: 5,
    title: "Supplier Risk Evaluation",
    description: "Comprehensive risk assessment for supply chain partners",
    category: "Supply Chain",
    questions: 30,
    estimatedTime: "18 mins",
    icon: BarChart3,
    color: "bg-red-100 text-red-800",
  },
  {
    id: 6,
    title: "Customer Satisfaction Survey",
    description: "Gather feedback on products, services, and overall experience",
    category: "Customer Experience",
    questions: 15,
    estimatedTime: "10 mins",
    icon: CheckCircle,
    color: "bg-teal-100 text-teal-800",
  },
]

export default function DueDiligencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredSurveys = activeSurveys.filter((survey) => {
    const matchesSearch =
      survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || survey.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", "Employee Satisfaction", "Environment", "Human Rights", "Labour", "Supply Chain"]

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Surveys & Due Diligence"
            description="Manage surveys and due diligence assessments for compliance monitoring"
          >
            <div className="flex gap-2">
              <Link href="/due-diligence/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </Link>
              <Link href="/due-diligence/analytics">
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Tabs defaultValue="active" className="mt-6">
            <TabsList>
              <TabsTrigger value="active">Active Surveys</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search surveys and due diligence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Survey Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSurveys.map((survey) => (
                  <Card key={survey.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{survey.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {survey.type}
                            </Badge>
                            <Badge
                              className={`text-xs ${
                                survey.category === "Environment"
                                  ? "bg-green-100 text-green-800"
                                  : survey.category === "Human Rights"
                                    ? "bg-purple-100 text-purple-800"
                                    : survey.category === "Labour"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {survey.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          variant={survey.status === "Active" ? "default" : "secondary"}
                          className={survey.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {survey.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{survey.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{survey.avgTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {survey.responses}/{survey.totalRecipients}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span>{survey.successRate}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Response Rate</span>
                          <span>{survey.successRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${survey.successRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/due-diligence/${survey.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            View Details
                          </Button>
                        </Link>
                        <Link href={`/due-diligence/${survey.id}/responses`} className="flex-1">
                          <Button size="sm" className="w-full">
                            View Responses
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="text-center py-4">
                <h3 className="text-lg font-semibold mb-2">Survey & Due Diligence Templates</h3>
                <p className="text-muted-foreground">
                  Choose from pre-built templates to quickly create surveys and assessments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => {
                  const Icon = template.icon
                  return (
                    <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${template.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{template.title}</CardTitle>
                            <Badge className={`text-xs ${template.color}`}>{template.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{template.description}</p>

                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{template.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{template.estimatedTime}</span>
                          </div>
                        </div>

                        <Link href={`/due-diligence/create?template=${template.id}`}>
                          <Button className="w-full" size="sm">
                            Use Template
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSurveys
                  .filter((s) => s.status === "Completed")
                  .map((survey) => (
                    <Card key={survey.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{survey.title}</CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {survey.type}
                              </Badge>
                              <Badge className={`text-xs bg-gray-100 text-gray-800`}>{survey.category}</Badge>
                            </div>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{survey.endDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{survey.responses} responses</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Link href={`/due-diligence/${survey.id}/report`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              View Report
                            </Button>
                          </Link>
                          <Link href={`/due-diligence/${survey.id}/responses`} className="flex-1">
                            <Button size="sm" className="w-full">
                              View Responses
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
