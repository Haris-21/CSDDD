"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Trash2,
  Icon,
} from "lucide-react"
import Link from "next/link"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useDiligence } from "@/Context/DiligenceContext"
import { useRouter } from "next/navigation"

const activeSurveys = [
  {
    id: 1,
    title: "Weekly Pulse Check",
    category: "Employee Satisfaction",
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

const questionTypes = [
  { value: "short-answer", label: "Short Answer" },
  { value: "paragraph", label: "Paragraph" },
  { value: "single-choice", label: "Single Choice" },
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "file-upload", label: "File Upload" },
  { value: "linear-scale", label: "Linear Scale" },
  { value: "rating", label: "Rating" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
]

const categories = [
  "Human Rights",
  "Environment",
  "Employee Satisfaction",
  "Labour",
  "Supply Chain",
  "Customer Experience",
]

  

const surveyTypes = ["Survey", "Due Diligence", "Pulse Survey", "Assessment", "Audit"]

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

  
  const [targetingData, setTargetingData] = useState({
    departments: [],
    ageRange: { min: "", max: "" },
    gender: "all",
    jobTitles: [],
    employmentType: "all",
    designation: "",
  })

   interface Question {
        id: number;
        text: string;
        type: string;
        required: boolean;
        options?: string[];
      }
  

  const [surveyData, setSurveyData] = useState({
    title: "",
    type: "",
    category: "",
    description: "",
    questions: [],
  })

   const [currentQuestion, setCurrentQuestion] = useState({
      text: "",
      type: "short-answer",
      required: false,
      options: [],
    })

      const addQuestion = () => {
        if (currentQuestion.text.trim()) {
          setSurveyData((prev : any) => ({
            ...prev,
            questions: [...prev.questions, { ...currentQuestion, id: Date.now() }],
          }))
          setCurrentQuestion({
            text: "",
            type: "short-answer",
            required: false,
            options: [],
          })
        }
      }
    
      const removeQuestion = (id : number) => {
        setSurveyData((prev) => ({
          ...prev,
          questions: prev.questions.filter((q : number) => q.id !== id),
        }))
      }
  

  const categories = ["All", "Employee Satisfaction", "Environment", "Human Rights", "Labour", "Supply Chain"]


  const router = useRouter()
    const { templates, activeDiligences, selectTemplate } = useDiligence();



  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Due Diligence"
            description="Manage due diligence assessments for compliance monitoring"
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
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="schedule">Schedule & Targeting</TabsTrigger>
              <TabsTrigger value="active">Active Due Diligence</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
                
            <TabsContent value="templates" className="space-y-6">
              <div className="text-center py-4">
                <h3 className="text-lg font-semibold mb-2">Due Diligence Templates</h3>
                <p className="text-muted-foreground">
                  Choose from pre-built templates to quickly create Diligence and assessments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (                
                  
                    <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{template.title}</CardTitle>
                            <Badge className={`text-xs`}>{template.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{template.description}</p>

                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>50 questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>11 mins</span>
                          </div>
                        </div>

                        {/* <Link href={`/due-diligence/create?template=${template.id}`}> */}
                          <Button 
                          onClick={() => {
                            selectTemplate(template);
                            router.push("/due-diligence/create");
                          }}
                          >
                            Use Template
                          </Button>
                        {/* </Link> */}
                      </CardContent>
                    </Card>
    
                        )
                )}
              </div>
            </TabsContent>

               <TabsContent value="schedule" className="space-y-6">
                          <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Target Audience
                  </CardTitle>
                  <CardDescription>Define who should receive this assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Sector</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Own</SelectItem>
                          <SelectItem value="manufacturing">Vendor</SelectItem>
                          {/* <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select
                        value={targetingData.gender}
                        onValueChange={(value) => setTargetingData((prev) => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Genders</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Age Range</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Min age"
                          type="number"
                          value={targetingData.ageRange.min}
                          onChange={(e) =>
                            setTargetingData((prev) => ({
                              ...prev,
                              ageRange: { ...prev.ageRange, min: e.target.value },
                            }))
                          }
                        />
                        <Input
                          placeholder="Max age"
                          type="number"
                          value={targetingData.ageRange.max}
                          onChange={(e) =>
                            setTargetingData((prev) => ({
                              ...prev,
                              ageRange: { ...prev.ageRange, max: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Select
                        value={targetingData.employmentType}
                        onValueChange={(value) => setTargetingData((prev) => ({ ...prev, employmentType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="intern">Intern</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Specific Designation/Role</Label>
                    <Input
                      id="designation"
                      placeholder="Enter specific job titles or designations"
                      value={targetingData.designation}
                      onChange={(e) => setTargetingData((prev) => ({ ...prev, designation: e.target.value }))}
                    />
                  </div>
                </CardContent>
                        </Card>
                           <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule & Timing
                  </CardTitle>
                  <CardDescription>Set when the survey should be active and available</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input id="start-time" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input id="end-time" type="time" />
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Survey Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Title:</span>
                        <span className="ml-2">{surveyData.title || "Untitled Survey"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <span className="ml-2">{surveyData.type || "Not selected"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2">{surveyData.category || "Not selected"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="ml-2">{surveyData.questions.length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </TabsContent>

            <TabsContent value="active" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Searchdue diligence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border border-neutral-300 "
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-md text-sm bg-white border border-neutral-300 "
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
