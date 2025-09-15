"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Shield, TrendingUp, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function DepartmentAnalyticsPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock department data
  const department = {
    id: params.id,
    name: "Manufacturing",
    employeeCount: 892,
    complianceTags: ["Labor Rights", "Child Protection", "Safety Standards", "Human Rights (ILO)"],
    riskLevel: "medium",
  }

  const employeeDistribution = [
    { name: "Permanent", value: 650, percentage: 73 },
    { name: "Contract", value: 180, percentage: 20 },
    { name: "Temporary", value: 62, percentage: 7 },
  ]

  const complianceScores = [
    { framework: "Labor Rights", score: 85, status: "good" },
    { framework: "Child Protection", score: 92, status: "excellent" },
    { framework: "Safety Standards", score: 78, status: "needs improvement" },
    { framework: "Human Rights (ILO)", score: 88, status: "good" },
  ]

  const riskTrends = [
    { month: "Jan", risk: 65 },
    { month: "Feb", risk: 62 },
    { month: "Mar", risk: 58 },
    { month: "Apr", risk: 55 },
    { month: "May", risk: 52 },
    { month: "Jun", risk: 48 },
  ]

  const genderDistribution = [
    { name: "Male", value: 534, percentage: 60 },
    { name: "Female", value: 358, percentage: 40 },
  ]

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title={`${department.name} Analytics`}
            description="Detailed compliance and risk analytics for this department"
          >
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Departments
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="workforce">Workforce</TabsTrigger>
                <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Employees</p>
                          <p className="text-2xl font-bold">{department.employeeCount}</p>
                        </div>
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Compliance Score</p>
                          <p className="text-2xl font-bold text-green-600">86%</p>
                        </div>
                        <Shield className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {department.riskLevel}
                          </Badge>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Improvement</p>
                          <p className="text-2xl font-bold text-green-600">+12%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Employee Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={employeeDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name} ${percentage}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {employeeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Trend (6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={riskTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="risk" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Framework Scores</CardTitle>
                    <CardDescription>Performance across different compliance standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={complianceScores}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="framework" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4">
                  {complianceScores.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{item.framework}</h3>
                            <p className="text-sm text-muted-foreground">
                              Status:{" "}
                              <span
                                className={`font-medium ${
                                  item.status === "excellent"
                                    ? "text-green-600"
                                    : item.status === "good"
                                      ? "text-blue-600"
                                      : "text-yellow-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{item.score}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="workforce" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gender Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={genderDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name} ${percentage}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {genderDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Workforce Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Average Age</span>
                        <span className="font-semibold">34.2 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Tenure</span>
                        <span className="font-semibold">5.8 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Turnover Rate</span>
                        <span className="font-semibold">8.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Training Hours/Employee</span>
                        <span className="font-semibold">42 hours</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="risks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment Summary</CardTitle>
                    <CardDescription>Identified risks and mitigation status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Workplace Safety</h4>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Medium Risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Potential exposure to hazardous materials in production areas
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>Mitigation Progress: 65%</span>
                          <span>Due: June 30, 2024</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Working Hours Compliance</h4>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Low Risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Occasional overtime exceeding regulatory limits
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>Mitigation Progress: 90%</span>
                          <span>Due: May 15, 2024</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Supply Chain Transparency</h4>
                          <Badge variant="destructive" className="bg-red-100 text-red-800">
                            High Risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Limited visibility into tier-2 supplier practices
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>Mitigation Progress: 25%</span>
                          <span>Due: August 31, 2024</span>
                        </div>
                      </div>
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
