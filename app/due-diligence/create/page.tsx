"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, Eye, FileText, Calendar, Target } from "lucide-react"

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

export default function CreateSurveyPage() {

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

  const [targetingData, setTargetingData] = useState({
    departments: [],
    ageRange: { min: "", max: "" },
    gender: "all",
    jobTitles: [],
    employmentType: "all",
    designation: "",
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

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Create Survey / Due Diligence"
            description="Design and configure a new survey or due diligence assessment"
          >
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save & Deploy
              </Button>
            </div>
          </PageHeader>

          <Tabs defaultValue="basic" className="mt-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="targeting">Targeting</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Survey Information
                  </CardTitle>
                  <CardDescription>
                    Configure the basic details of your survey or due diligence assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Survey Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter survey title"
                        value={surveyData.title}
                        onChange={(e) => setSurveyData((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Survey Type *</Label>
                      <Select
                        value={surveyData.type}
                        onValueChange={(value) => setSurveyData((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select survey type" />
                        </SelectTrigger>
                        <SelectContent>
                          {surveyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={surveyData.category}
                      onValueChange={(value) => setSurveyData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose and scope of this survey"
                      value={surveyData.description}
                      onChange={(e) => setSurveyData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Question</CardTitle>
                  <CardDescription>Create questions for your survey or assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question-text">Question Text *</Label>
                    <Textarea
                      id="question-text"
                      placeholder="Enter your question"
                      value={currentQuestion.text}
                      onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, text: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="question-type">Question Type</Label>
                      <Select
                        value={currentQuestion.type}
                        onValueChange={(value) => setCurrentQuestion((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {questionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={addQuestion} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions List */}
              {surveyData.questions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Questions ({surveyData.questions.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {surveyData.questions.map((question, index) => (
                      <div key={question.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">Q{index + 1}.</span>
                            <Badge variant="outline" className="text-xs">
                              {questionTypes.find((t) => t.value === question.type)?.label}
                            </Badge>
                          </div>
                          <p className="text-sm">{question.text}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="targeting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Target Audience
                  </CardTitle>
                  <CardDescription>Define who should receive this survey or assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Departments</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
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
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}
