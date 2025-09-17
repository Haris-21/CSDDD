"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, Users, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react"

const responseData = [
  { name: "Week 1", responses: 45, target: 50 },
  { name: "Week 2", responses: 78, target: 80 },
  { name: "Week 3", responses: 92, target: 90 },
  { name: "Week 4", responses: 156, target: 120 },
]

const categoryData = [
  { name: "Employee Satisfaction", value: 35, color: "#3b82f6" },
  { name: "Environment", value: 25, color: "#10b981" },
  { name: "Human Rights", value: 20, color: "#8b5cf6" },
  { name: "Labour", value: 15, color: "#f59e0b" },
  { name: "Supply Chain", value: 5, color: "#ef4444" },
]

const departmentResponseRates = [
  { department: "Engineering", rate: 85, responses: 245, total: 288 },
  { department: "Manufacturing", rate: 72, responses: 642, total: 892 },
  { department: "HR", rate: 91, responses: 142, total: 156 },
  { department: "Finance", rate: 68, responses: 89, total: 131 },
  { department: "Operations", rate: 79, responses: 256, total: 324 },
]

export default function SurveyAnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Survey & Due Diligence Analytics"
            description="Comprehensive analytics and insights from your surveys and assessments"
          >
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </PageHeader>

          <div className="mt-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
                      <p className="text-2xl font-bold">1,820</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">+12%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Responses</p>
                      <p className="text-2xl font-bold">1,374</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">+8%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Response Rate</p>
                      <p className="text-2xl font-bold">75.5%</p>
                    </div>
                    <BarChart className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">+3.2%</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold">8.5m</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 text-orange-600 mr-1" />
                    <span className="text-orange-600">-1.2m</span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="responses">Response Analysis</TabsTrigger>
                <TabsTrigger value="departments">Department Breakdown</TabsTrigger>
                <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Response Trends</CardTitle>
                      <CardDescription>Weekly response rates vs targets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={responseData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="responses" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Survey Categories</CardTitle>
                      <CardDescription>Distribution by category type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent  }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="departments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Response Rates</CardTitle>
                    <CardDescription>Response rates and participation by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentResponseRates.map((dept) => (
                        <div key={dept.department} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{dept.department}</span>
                              <Badge variant="outline" className="text-xs">
                                {dept.responses}/{dept.total}
                              </Badge>
                            </div>
                            <span className="text-sm font-medium">{dept.rate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${dept.rate}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryData.map((category) => (
                    <Card key={category.name}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>Topic-wise response analysis</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Surveys</span>
                          <span className="font-medium">{Math.floor(category.value / 5)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Responses</span>
                          <span className="font-medium">{category.value * 12}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Avg Response Rate</span>
                          <span className="font-medium">{category.value + 45}%</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
