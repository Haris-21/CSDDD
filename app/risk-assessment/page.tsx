"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Calendar, Plus } from "lucide-react"
import { useState } from "react"

const departmentAnalytics = [
  {
    department: "Engineering",
    totalEmployees: 245,
    maleEmployees: 180,
    femaleEmployees: 65,
    permanentEmployees: 220,
    contractualEmployees: 25,
    promotionGaps: 15,
    hazardExposure: false,
  },
  {
    department: "Manufacturing",
    totalEmployees: 892,
    maleEmployees: 534,
    femaleEmployees: 358,
    permanentEmployees: 670,
    contractualEmployees: 222,
    promotionGaps: 45,
    hazardExposure: true,
  },
  {
    department: "Quality Assurance",
    totalEmployees: 156,
    maleEmployees: 89,
    femaleEmployees: 67,
    permanentEmployees: 145,
    contractualEmployees: 11,
    promotionGaps: 8,
    hazardExposure: false,
  },
]

const riskHeatmapData = [
  { department: "Engineering", riskScore: 25, level: "Low" },
  { department: "Manufacturing", riskScore: 75, level: "High" },
  { department: "Quality Assurance", riskScore: 30, level: "Low" },
  { department: "Logistics", riskScore: 85, level: "High" },
  { department: "HR", riskScore: 40, level: "Medium" },
]

const actionPlans = [
  {
    id: 1,
    riskId: "RISK-001",
    severity: "High",
    description: "Gender pay gap identified in Manufacturing department",
    recommendedAction: "Conduct salary audit and implement pay equity measures",
    assignedTo: "HR Manager",
    deadline: "2024-03-15",
    status: "In Progress",
  },
  {
    id: 2,
    riskId: "RISK-002",
    severity: "Medium",
    description: "High promotion gap in Engineering department",
    recommendedAction: "Implement structured career development program",
    assignedTo: "Engineering Manager",
    deadline: "2024-04-01",
    status: "Open",
  },
]

const COLORS = ["#ef4444", "#f59e0b", "#10b981"]

export default function RiskAssessmentPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("")

  const genderData = departmentAnalytics.map((dept) => ({
    name: dept.department,
    Male: dept.maleEmployees,
    Female: dept.femaleEmployees,
  }))

  const workerTypeData = departmentAnalytics.map((dept) => ({
    name: dept.department,
    Permanent: dept.permanentEmployees,
    Contractual: dept.contractualEmployees,
  }))

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Risk Assessment & Analytics"
            description="Analyze compliance risks and track remediation actions"
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="department-analytics" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="department-analytics">Department Analytics</TabsTrigger>
                <TabsTrigger value="risk-questionnaire">Risk Questionnaire</TabsTrigger>
                <TabsTrigger value="risk-heatmap">Risk Heatmap</TabsTrigger>
                <TabsTrigger value="action-plans">Action Plans</TabsTrigger>
              </TabsList>

              <TabsContent value="department-analytics" className="space-y-6">
                {/* Department Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {departmentAnalytics.map((dept) => (
                    <Card key={dept.department}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {dept.department}
                          {dept.hazardExposure && (
                            <Badge variant="destructive" className="text-xs">
                              Hazard Zone
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{dept.totalEmployees} total employees</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Gender Balance</span>
                            <span>{Math.round((dept.femaleEmployees / dept.totalEmployees) * 100)}% Female</span>
                          </div>
                          <Progress value={(dept.femaleEmployees / dept.totalEmployees) * 100} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Permanent Workers</span>
                            <span>{Math.round((dept.permanentEmployees / dept.totalEmployees) * 100)}%</span>
                          </div>
                          <Progress value={(dept.permanentEmployees / dept.totalEmployees) * 100} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span>Promotion Gaps (1+ years)</span>
                          <Badge variant={dept.promotionGaps > 30 ? "destructive" : "secondary"}>
                            {dept.promotionGaps}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gender Distribution by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={genderData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="Male" fill="#3b82f6" />
                          <Bar dataKey="Female" fill="#ec4899" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Worker Classification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={workerTypeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="Permanent" fill="#10b981" />
                          <Bar dataKey="Contractual" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="risk-questionnaire" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dynamic Risk Assessment</CardTitle>
                    <CardDescription>
                      Answer questions based on your sector, location, and worker types to identify potential risks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sector">Select Sector *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="textile">Textile</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Select Location *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="bangladesh">Bangladesh</SelectItem>
                            <SelectItem value="vietnam">Vietnam</SelectItem>
                            <SelectItem value="mexico">Mexico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="worker-type">Select Worker Type *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose worker type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="migrant">Migrant Workers</SelectItem>
                            <SelectItem value="local">Local Workers</SelectItem>
                            <SelectItem value="seasonal">Seasonal Workers</SelectItem>
                            <SelectItem value="contract">Contract Workers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Predefined Risk Categories</Label>
                      <p className="text-sm text-muted-foreground">
                        Select all risk categories that may apply to your operations
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Forced Labor",
                          "Child Labor",
                          "Discrimination",
                          "Safety Violations",
                          "Environmental Damage",
                          "Wage Theft",
                          "Excessive Working Hours",
                          "Freedom of Association",
                          "Gender-based Violence",
                          "Occupational Health Risks",
                        ].map((risk) => (
                          <div key={risk} className="flex items-center space-x-3">
                            <Checkbox id={risk} />
                            <Label htmlFor={risk} className="text-sm font-normal">
                              {risk}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Generate Risk Assessment</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk-heatmap" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Heatmap Visualization</CardTitle>
                    <CardDescription>Visual representation of risk levels across departments and sites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Risk Levels by Department</h4>
                        <div className="space-y-3">
                          {riskHeatmapData.map((item) => (
                            <div key={item.department} className="flex items-center justify-between p-3 border rounded">
                              <span className="font-medium">{item.department}</span>
                              <div className="flex items-center gap-3">
                                <div className="w-24">
                                  <Progress
                                    value={item.riskScore}
                                    className={`h-2 ${
                                      item.riskScore >= 70
                                        ? "[&>div]:bg-red-500"
                                        : item.riskScore >= 40
                                          ? "[&>div]:bg-yellow-500"
                                          : "[&>div]:bg-green-500"
                                    }`}
                                  />
                                </div>
                                <Badge
                                  variant={
                                    item.level === "High"
                                      ? "destructive"
                                      : item.level === "Medium"
                                        ? "secondary"
                                        : "default"
                                  }
                                  className={
                                    item.level === "High"
                                      ? "bg-red-100 text-red-800"
                                      : item.level === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }
                                >
                                  {item.level}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Risk Distribution</h4>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: "High Risk", value: riskHeatmapData.filter((d) => d.level === "High").length },
                                {
                                  name: "Medium Risk",
                                  value: riskHeatmapData.filter((d) => d.level === "Medium").length,
                                },
                                { name: "Low Risk", value: riskHeatmapData.filter((d) => d.level === "Low").length },
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label
                            >
                              {COLORS.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button variant="outline">Filter by Site</Button>
                      <Button variant="outline">Filter by Department</Button>
                      <Button variant="outline">Export Heatmap</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="action-plans" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Action Plans</CardTitle>
                    <CardDescription>Track and manage remediation actions for identified risks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {actionPlans.map((plan) => (
                        <div key={plan.id} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline">{plan.riskId}</Badge>
                                <Badge
                                  variant={plan.severity === "High" ? "destructive" : "secondary"}
                                  className={
                                    plan.severity === "High"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {plan.severity} Severity
                                </Badge>
                                <Badge
                                  variant={plan.status === "In Progress" ? "default" : "secondary"}
                                  className={
                                    plan.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {plan.status}
                                </Badge>
                              </div>
                              <h4 className="font-semibold mb-1">{plan.description}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{plan.recommendedAction}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>Assigned to: {plan.assignedTo}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>Due: {plan.deadline}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Action Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Add New Action Plan Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Create Action Plan</CardTitle>
                    <CardDescription>Define remediation actions for identified risks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="risk-severity">Risk Severity *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="assigned-to">Assigned To *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hr-manager">HR Manager</SelectItem>
                            <SelectItem value="operations-manager">Operations Manager</SelectItem>
                            <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="risk-description">Risk Description *</Label>
                      <Textarea id="risk-description" placeholder="Describe the identified risk..." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recommended-action">Recommended Action *</Label>
                      <Textarea id="recommended-action" placeholder="Describe the recommended remediation action..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline *</Label>
                        <Input id="deadline" type="date" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Create Action Plan</Button>
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
