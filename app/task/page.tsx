"use client";

import { PageHeader } from "@/components/page-header";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@radix-ui/react-checkbox";
import { AlertTriangle, Badge, Calendar, CheckCircle, Clock, Filter, Globe, LineChart, Plus, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { CartesianGrid, Label, Line, ResponsiveContainer,  Tooltip,  XAxis, YAxis } from "recharts";



const riskHeatmapData = [
  { department: "Engineering", riskScore: 25, level: "Low" },
  { department: "Manufacturing", riskScore: 75, level: "High" },
  { department: "Quality Assurance", riskScore: 30, level: "Low" },
  { department: "Logistics", riskScore: 85, level: "High" },
  { department: "HR", riskScore: 40, level: "Medium" },
]

  interface ActionPlan {
    id: string;
    title: string;
    linkedSurvey: string;
    category: string;
    assignedTo: string;
    department: string;
    status: string;
    priority: string;
    startDate: string;
    endDate: string;
    completionPercentage: number;
    notes: string;
    overdue: boolean;
    }
    

const actionPlans  = [
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

const actionPlansData : ActionPlan[] = [
  {
    id: "AP-001",
    title: "Implement Age Verification System",
    linkedSurvey: "Child Labor Risk Assessment",
    category: "Human Rights",
    assignedTo: "Compliance Officer",
    department: "Manufacturing",
    status: "In Progress",
    priority: "High",
    startDate: "2024-03-01",
    endDate: "2024-04-15",
    completionPercentage: 65,
    notes: "Age verification documents being collected from all suppliers",
    overdue: false,
  },
  {
    id: "AP-002",
    title: "Install Water Treatment Systems",
    linkedSurvey: "Environmental Impact Assessment",
    category: "Environment",
    assignedTo: "Operations Manager",
    department: "Manufacturing",
    status: "Assigned",
    priority: "High",
    startDate: "2024-03-15",
    endDate: "2024-05-30",
    completionPercentage: 0,
    notes: "Awaiting budget approval for treatment equipment",
    overdue: false,
  },
  {
    id: "AP-003",
    title: "Conduct Labor Rights Training",
    linkedSurvey: "Worker Rights Survey",
    category: "Labour",
    assignedTo: "HR Manager",
    department: "HR",
    status: "Completed",
    priority: "Medium",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    completionPercentage: 100,
    notes: "Training completed for all departments. Certificates issued.",
    overdue: false,
  },
  {
    id: "AP-004",
    title: "Establish Grievance Mechanism",
    linkedSurvey: "Employee Satisfaction Survey",
    category: "HR",
    assignedTo: "HR Director",
    department: "HR",
    status: "Assigned",
    priority: "Medium",
    startDate: "2024-02-15",
    endDate: "2024-03-01",
    completionPercentage: 20,
    notes: "System design in progress",
    overdue: true,
  },
  {
    id: "AP-005",
    title: "Supplier Audit Program",
    linkedSurvey: "Supply Chain Due Diligence",
    category: "Supply Chain",
    assignedTo: "Procurement Manager",
    department: "Procurement",
    status: "In Progress",
    priority: "High",
    startDate: "2024-03-10",
    endDate: "2024-06-30",
    completionPercentage: 35,
    notes: "15 suppliers audited, 25 remaining",
    overdue: false,
  },
]

interface ProgressData {
    month: string;
    completed: number;
    assigned: number;
}

const progressTrend : ProgressData[] = [
  { month: "Jan", completed: 0, assigned: 1 },
  { month: "Feb", completed: 1, assigned: 2 },
  { month: "Mar", completed: 1, assigned: 4 },
  { month: "Apr", completed: 1, assigned: 5 },
]

const data = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 35 },
  { month: "Mar", progress: 50 },
  { month: "Apr", progress: 65 },
  { month: "May", progress: 80 },
  { month: "Jun", progress: 95 },
];


interface RiskSeverity {
    risk: string;
    scale: number;
    scope: number;
    irremediability: number;
    probability: number;
    finalRisk: number;
}



const riskSeverityData : RiskSeverity[] = [
    { risk: "Child Labor", scale: 4, scope: 5, irremediability: 5, probability: 0.3, finalRisk: 4.2 },
    { risk: "Water Pollution", scale: 3, scope: 4, irremediability: 2, probability: 0.7, finalRisk: 2.1 },
    { risk: "Labor Rights", scale: 4, scope: 3, irremediability: 3, probability: 0.6, finalRisk: 2.0 },
    { risk: "Discrimination", scale: 2, scope: 3, irremediability: 2, probability: 0.4, finalRisk: 0.9 },
  ]

export default function RiskAssessmentPage() {

const [filterStatus, setFilterStatus] = useState("All Statuses")
  const [filterCategory, setFilterCategory] = useState("All Categories")
  const [filterDepartment, setFilterDepartment] = useState("All Departments")
  const [filterPriority, setFilterPriority] = useState("All Priorities")
    


  const heatmapData = riskSeverityData.map((risk) => ({
    x: risk.finalRisk,
    y: risk.probability * 100,
    name: risk.risk,
    severity: risk.finalRisk >= 3 ? "High" : risk.finalRisk >= 1.5 ? "Medium" : "Low",
  }))



const filteredActions = actionPlansData.filter((action) => {
    return (
      (filterStatus === "All Statuses" || action.status === filterStatus) &&
      (filterCategory === "All Categories" || action.category === filterCategory) &&
      (filterDepartment === "All Departments" || action.department === filterDepartment) &&
      (filterPriority === "All Priorities" || action.priority === filterPriority)
    )
  })


   const totalActions = actionPlansData.length
  const completedActions = actionPlansData.filter((a) => a.status === "Completed").length
  const inProgressActions = actionPlansData.filter((a) => a.status === "In Progress").length
  const overdueActions = actionPlansData.filter((a) => a.overdue).length
  const successRate = ((completedActions / totalActions) * 100).toFixed(1)
  const avgCompletionTime = "28 days"

  const generateReport = () => {
    const reportData = {
      header: {
        organizationName: "ACME Corporation",
        reportPeriod: "Q1 2024",
        generatedOn: new Date().toLocaleDateString(),
      },
      summary: {
        totalAssigned: totalActions,
        totalCompleted: completedActions,
        totalInProgress: inProgressActions,
        avgCompletionRate: successRate,
        delayedActions: overdueActions,
      },
      actions: filteredActions,
    }
}
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Task Management"
            // description="Comprehensive risk evaluation with country, sector, and topic-specific analysis"
          >
            <Button onClick={generateReport}>
              <Plus className="h-4 w-4 mr-2" />
              Export Report
            </Button>
             <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Action Plan
              </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="action-plans" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="action-plans">Action Plan</TabsTrigger>
                <TabsTrigger value="action-list">Action list</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>          
              </TabsList>

               <TabsContent value="action-plans" className="space-y-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Action Plan & Remediation Tracker</CardTitle>
                                  <CardDescription>
                                    Auto-suggested mitigation actions with assignment and progress tracking
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  <div className="space-y-4">
                                    {riskSeverityData
                                      .filter((risk) => risk.finalRisk >= 1.5)
                                      .map((risk, index) => (
                                        <div key={index} className="p-4 border rounded-lg space-y-4">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                              <AlertTriangle className="h-5 w-5 text-orange-600" />
                                              <div>
                                                <h4 className="font-semibold">{risk.risk}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                  Risk Score: {risk.finalRisk.toFixed(1)} | Priority: {index + 1}
                                                </p>
                                              </div>
                                            </div>
                                            <Badge
                                              variant={risk.finalRisk >= 3 ? "destructive" : "secondary"}
                                              className={
                                                risk.finalRisk >= 3 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                                              }
                                            >
                                              {risk.finalRisk >= 3 ? "High" : "Medium"} Priority
                                            </Badge>
                                          </div>
              
                                          <div className="space-y-3">
                                            <div>
                                              <Label className="text-sm font-medium">Auto-Suggested Actions</Label>
                                              <div className="mt-2 space-y-2">
                                                {risk.risk === "Child Labor" && (
                                                  <>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-1`} />
                                                      <label htmlFor={`action-${index}-1`}>Implement age verification system</label>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-2`} />
                                                      <label htmlFor={`action-${index}-2`}>Conduct supplier audits</label>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-3`} />
                                                      <label htmlFor={`action-${index}-3`}>Establish grievance mechanism</label>
                                                    </div>
                                                  </>
                                                )}
                                                {risk.risk === "Water Pollution" && (
                                                  <>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-1`} />
                                                      <label htmlFor={`action-${index}-1`}>Install water treatment systems</label>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-2`} />
                                                      <label htmlFor={`action-${index}-2`}>Monitor water quality regularly</label>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-3`} />
                                                      <label htmlFor={`action-${index}-3`}>Obtain environmental certifications</label>
                                                    </div>
                                                  </>
                                                )}
                                                {risk.risk === "Labor Rights" && (
                                                  <>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-1`} />
                                                      <label htmlFor={`action-${index}-1`}>Conduct labor rights training</label>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-2`} />
                                                      <label htmlFor={`action-${index}-2`}>Establish worker committees</label>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                      <Checkbox id={`action-${index}-3`} />
                                                      <label htmlFor={`action-${index}-3`}>Regular compliance audits</label>
                                                    </div>
                                                  </>
                                                )}
                                              </div>
                                            </div>
              
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                              <div className="space-y-2">
                                                <Label>Assign To</Label>
                                                <Select defaultValue={"compliance"}>
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Select assignee" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="compliance">Compliance Officer</SelectItem>
                                                    <SelectItem value="operations">Operations Manager</SelectItem>
                                                    <SelectItem value="procurement">Procurement Manager</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
              
                                              <div className="space-y-2">
                                                <Label>Due Date</Label>
                                                <Input type="date" />
                                              </div>
              
                                              <div className="space-y-2">
                                                <Label>Status</Label>
                                                <Select defaultValue="pending">
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Select Status"/>
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </div>
              
                                            <div className="space-y-2">
                                              <Label>Progress</Label>
                                              <div className="flex items-center gap-3">
                                                <Progress value={25} className="flex-1" />
                                                <span className="text-sm text-muted-foreground">25%</span>
                                              </div>
                                            </div>
              
                                            <div className="space-y-2">
                                              <Label>Evidence Upload</Label>
                                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                                                <p className="text-sm text-muted-foreground">
                                                  Drag and drop files here or click to upload evidence
                                                </p>
                                                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                                                  Choose Files
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
              
                                  <div className="flex justify-end pt-4">
                                    <Button>Save Action Plans</Button>
                                  </div>
                                </CardContent>
                              </Card>
            </TabsContent>

              <TabsContent value="action-list" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filter Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="All statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Statuses">All Statuses</SelectItem>
                            <SelectItem value="Assigned">Assigned</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="All categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Categories">All Categories</SelectItem>
                            <SelectItem value="Environment">Environment</SelectItem>
                            <SelectItem value="Labour">Labour</SelectItem>
                            <SelectItem value="Human Rights">Human Rights</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                          <SelectTrigger>
                            <SelectValue placeholder="All departments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Departments">All Departments</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Procurement">Procurement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={filterPriority} onValueChange={setFilterPriority}>
                          <SelectTrigger>
                            <SelectValue placeholder="All priorities" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Priorities">All Priorities</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Action Plans ({filteredActions.length})</CardTitle>
                    <CardDescription>Detailed list of all action plans with status tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredActions.map((action : any) => (
                        <div key={action.id} className="p-4 border rounded-lg space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{action.id}</Badge>
                                <h4 className="font-semibold">{action.title}</h4>
                                {action.overdue && (
                                  <Badge variant="destructive" className="bg-red-100 text-red-800">
                                    Overdue
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Linked to: <span className="font-medium">{action.linkedSurvey}</span>
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span>
                                  Category: <span className="font-medium">{action.category}</span>
                                </span>
                                <span>
                                  Assigned to: <span className="font-medium">{action.assignedTo}</span>
                                </span>
                                <span>
                                  Department: <span className="font-medium">{action.department}</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={
                                  action.priority === "High"
                                    ? "destructive"
                                    : action.priority === "Medium"
                                      ? "secondary"
                                      : "default"
                                }
                                className={
                                  action.priority === "High"
                                    ? "bg-red-100 text-red-800"
                                    : action.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {action.priority}
                              </Badge>
                              <Badge
                                variant={
                                  action.status === "Completed"
                                    ? "default"
                                    : action.status === "In Progress"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  action.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : action.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {action.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4" />
                                <span>Start: {action.startDate}</span>
                                <span>End: {action.endDate}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm">Progress:</span>
                                <Progress value={action.completionPercentage} className="flex-1" />
                                <span className="text-sm font-medium">{action.completionPercentage}%</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Notes</Label>
                              <p className="text-sm text-muted-foreground">{action.notes}</p>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {action.status !== "Completed" && <Button size="sm">Update Progress</Button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

                 <TabsContent value="dashboard" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                            <p className="text-2xl font-bold text-green-600">{successRate}%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>    
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                            <p className="text-2xl font-bold">{avgCompletionTime}</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-600" />
                        </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-muted-foreground">Active Teams</p>
                            <p className="text-2xl font-bold">3</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-600" />
                        </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-muted-foreground">This Month</p>
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-xs text-muted-foreground">Actions completed</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        </CardContent>
                    </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                        <CardTitle>Progress Trend</CardTitle>
                        <CardDescription>Action plan completion over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                {/* <Tooltip 
                                formatter={(value: number) => [`${value}%`, "Progress"]}
                                labelFormatter={(label) => `Month: ${label}`}
                                /> */}
                                <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
                                <Line type="monotone" dataKey="assigned" stroke="#3b82f6" name="Assigned" />
                            </LineChart>
                        </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                        <CardTitle>Category Distribution</CardTitle>
                        <CardDescription>Action plans by category</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                            {[
                            { category: "Human Rights", count: 2, color: "bg-red-500" },
                            { category: "Environment", count: 1, color: "bg-green-500" },
                            { category: "Labour", count: 1, color: "bg-blue-500" },
                            { category: "Supply Chain", count: 1, color: "bg-purple-500" },
                            ].map((item) => (
                            <div key={item.category} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                <span className="font-medium">{item.category}</span>
                                </div>
                                <Badge variant="outline">{item.count}</Badge>
                            </div>
                            ))}
                        </div>
                        </CardContent>
                    </Card>
                    </div>
              </TabsContent>

            
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
