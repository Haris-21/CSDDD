"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Upload, User, Calendar, AlertTriangle, CheckCircle, Clock, Plus } from "lucide-react"
import { useState } from "react"

const grievances = [
  {
    id: "GRV-001",
    submittedBy: "Anonymous",
    category: "Labor Rights",
    description: "Excessive overtime hours without proper compensation in Manufacturing department",
    status: "In Progress",
    priority: "High",
    submittedDate: "2024-01-15",
    assignedTo: "HR Manager",
    actionTaken: "Initiated investigation and salary audit",
    deadline: "2024-02-15",
  },
  {
    id: "GRV-002",
    submittedBy: "Maria Garcia",
    category: "Safety",
    description: "Inadequate safety equipment provided for chemical handling processes",
    status: "Open",
    priority: "High",
    submittedDate: "2024-01-20",
    assignedTo: "Safety Officer",
    actionTaken: "Safety equipment audit scheduled",
    deadline: "2024-02-01",
  },
  {
    id: "GRV-003",
    submittedBy: "John Smith",
    category: "Human Rights",
    description: "Discrimination in promotion opportunities based on gender",
    status: "Closed",
    priority: "Medium",
    submittedDate: "2024-01-10",
    assignedTo: "Compliance Officer",
    actionTaken: "Policy review completed, training implemented",
    deadline: "2024-01-31",
  },
]

export default function GrievancePage() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Grievance & Remediation System"
            description="Manage complaints, track remediation actions, and ensure stakeholder voice"
          >
            <Button onClick={() => setShowSubmissionForm(!showSubmissionForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Submit Complaint
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="complaint-dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="complaint-dashboard">Complaint Dashboard</TabsTrigger>
                <TabsTrigger value="submit-complaint">Submit Complaint</TabsTrigger>
                <TabsTrigger value="remediation-tracker">Remediation Tracker</TabsTrigger>
              </TabsList>

              <TabsContent value="complaint-dashboard" className="space-y-6">
                {/* Grievance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Complaints</p>
                          <p className="text-2xl font-bold">{grievances.length}</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Open Cases</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {grievances.filter((g) => g.status === "Open").length}
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {grievances.filter((g) => g.status === "In Progress").length}
                          </p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Resolved</p>
                          <p className="text-2xl font-bold text-green-600">
                            {grievances.filter((g) => g.status === "Closed").length}
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Grievance List */}
                <div className="space-y-4">
                  {grievances.map((grievance) => (
                    <Card key={grievance.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="outline">{grievance.id}</Badge>
                              <Badge variant="outline">{grievance.category}</Badge>
                              <Badge
                                variant={
                                  grievance.status === "Closed"
                                    ? "default"
                                    : grievance.status === "In Progress"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className={
                                  grievance.status === "Closed"
                                    ? "bg-green-100 text-green-800"
                                    : grievance.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-orange-100 text-orange-800"
                                }
                              >
                                {grievance.status}
                              </Badge>
                              <Badge
                                variant={grievance.priority === "High" ? "destructive" : "secondary"}
                                className={
                                  grievance.priority === "High"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {grievance.priority} Priority
                              </Badge>
                            </div>

                            <h3 className="font-semibold mb-2">{grievance.description}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>By: {grievance.submittedBy}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Submitted: {grievance.submittedDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>Assigned: {grievance.assignedTo}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Due: {grievance.deadline}</span>
                              </div>
                            </div>

                            <div className="text-sm">
                              <span className="font-medium">Action Taken:</span> {grievance.actionTaken}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="submit-complaint" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Complaint</CardTitle>
                    <CardDescription>
                      Report concerns about labor rights, safety, human rights, or other workplace issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Confidentiality Notice</h4>
                      <p className="text-sm text-blue-800">
                        Your complaint will be handled confidentially. You can choose to submit anonymously or provide
                        your contact information for follow-up. All complaints are taken seriously and investigated
                        thoroughly.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="anonymous" />
                        <Label htmlFor="anonymous">Submit anonymously</Label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="submitter-name">Your Name (Optional)</Label>
                          <Input id="submitter-name" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="submitter-email">Email Address (Optional)</Label>
                          <Input id="submitter-email" type="email" placeholder="your.email@company.com" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaint-category">Category *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select complaint category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="labor">Labor Rights</SelectItem>
                          <SelectItem value="human-rights">Human Rights</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                          <SelectItem value="discrimination">Discrimination</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="environmental">Environmental</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaint-description">Description *</Label>
                      <Textarea
                        id="complaint-description"
                        placeholder="Please provide detailed information about your complaint, including dates, locations, and people involved..."
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evidence-upload">Evidence Upload (Optional)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload documents, photos, or other evidence to support your complaint
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Supported formats: PDF, DOC, JPG, PNG (Max 10MB per file)
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Submit Complaint</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="remediation-tracker" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Remediation Action Tracker</CardTitle>
                    <CardDescription>Track progress on remediation actions for all complaints</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Remediation Progress Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Overall Progress</span>
                              <span>67%</span>
                            </div>
                            <Progress value={67} className="h-2" />
                            <p className="text-xs text-muted-foreground">2 of 3 cases resolved</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>High Priority Cases</span>
                              <span>50%</span>
                            </div>
                            <Progress value={50} className="h-2 [&>div]:bg-red-500" />
                            <p className="text-xs text-muted-foreground">1 of 2 high priority resolved</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Average Resolution Time</span>
                              <span>18 days</span>
                            </div>
                            <Progress value={75} className="h-2 [&>div]:bg-blue-500" />
                            <p className="text-xs text-muted-foreground">Target: 21 days</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Detailed Remediation Actions */}
                    <div className="space-y-4">
                      {grievances.map((grievance) => (
                        <Card key={grievance.id} className="border-l-4 border-l-primary">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline">{grievance.id}</Badge>
                                  <h4 className="font-semibold">{grievance.category} Complaint</h4>
                                  <Badge
                                    variant={
                                      grievance.status === "Closed"
                                        ? "default"
                                        : grievance.status === "In Progress"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                    className={
                                      grievance.status === "Closed"
                                        ? "bg-green-100 text-green-800"
                                        : grievance.status === "In Progress"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-orange-100 text-orange-800"
                                    }
                                  >
                                    {grievance.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">Due: {grievance.deadline}</div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h5 className="font-medium mb-2">Complaint Details</h5>
                                  <p className="text-sm text-muted-foreground">{grievance.description}</p>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2">Remediation Action</h5>
                                  <p className="text-sm text-muted-foreground">{grievance.actionTaken}</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>Responsible: {grievance.assignedTo}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Submitted: {grievance.submittedDate}</span>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Update Progress
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
