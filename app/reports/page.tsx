"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Download, FileText, Shield, Building, AlertTriangle, Eye } from "lucide-react"

const complianceData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 87 },
  { month: "May", score: 89 },
  { month: "Jun", score: 87 },
]

const riskData = [
  { category: "Labor Rights", high: 2, medium: 5, low: 8 },
  { category: "Safety", high: 1, medium: 3, low: 12 },
  { category: "Human Rights", high: 0, medium: 2, low: 6 },
  { category: "Environmental", high: 1, medium: 4, low: 7 },
]

const reports = [
  {
    id: 1,
    name: "Q1 2024 CSDDD Compliance Report",
    type: "Quarterly",
    format: "PDF",
    generatedDate: "2024-03-31",
    status: "Published",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Annual Sustainability Report 2023",
    type: "Annual",
    format: "PDF + XML",
    generatedDate: "2024-01-15",
    status: "Published",
    size: "5.8 MB",
  },
  {
    id: 3,
    name: "Supply Chain Risk Assessment",
    type: "Ad-hoc",
    format: "Excel",
    generatedDate: "2024-02-20",
    status: "Draft",
    size: "1.2 MB",
  },
]

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Governance & Reporting"
            description="Generate compliance reports and monitor governance metrics"
          >
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview Report
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="governance-dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="governance-dashboard">Governance Dashboard</TabsTrigger>
                <TabsTrigger value="report-generator">Report Generator</TabsTrigger>
                <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
              </TabsList>

              <TabsContent value="governance-dashboard" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Compliance Score</p>
                          <p className="text-2xl font-bold text-green-600">87%</p>
                        </div>
                        <Shield className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="mt-2">
                        <Progress value={87} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pending Risks</p>
                          <p className="text-2xl font-bold text-orange-600">23</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-orange-600" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">5 high priority</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Sites Assessed</p>
                          <p className="text-2xl font-bold">12/12</p>
                        </div>
                        <Building className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">100% coverage</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Reports Generated</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">This quarter</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Score Trend</CardTitle>
                      <CardDescription>Monthly compliance performance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={complianceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Distribution by Category</CardTitle>
                      <CardDescription>Current risk levels across compliance areas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={riskData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="high" fill="#ef4444" />
                          <Bar dataKey="medium" fill="#f59e0b" />
                          <Bar dataKey="low" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Board-Level Approvals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Board-Level Approvals</CardTitle>
                    <CardDescription>Recent governance decisions and approvals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Q1 2024 Sustainability Strategy</h4>
                          <p className="text-sm text-muted-foreground">
                            Approved new sustainability targets and investment allocation
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                          <span className="text-sm text-muted-foreground">2024-03-15</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Supply Chain Risk Mitigation Plan</h4>
                          <p className="text-sm text-muted-foreground">
                            Enhanced due diligence procedures for high-risk suppliers
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                          <span className="text-sm text-muted-foreground">2024-02-28</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Employee Grievance Policy Update</h4>
                          <p className="text-sm text-muted-foreground">
                            Revised grievance handling procedures and anonymous reporting
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                          <span className="text-sm text-muted-foreground">2024-03-20</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="report-generator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Compliance Report</CardTitle>
                    <CardDescription>
                      Create comprehensive reports for regulatory compliance and stakeholder communication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="reporting-period">Reporting Period *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="q1-2024">Q1 2024</SelectItem>
                            <SelectItem value="q2-2024">Q2 2024</SelectItem>
                            <SelectItem value="annual-2023">Annual 2023</SelectItem>
                            <SelectItem value="annual-2024">Annual 2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="export-format">Export Format *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Report</SelectItem>
                            <SelectItem value="excel">Excel Workbook</SelectItem>
                            <SelectItem value="csrd-xml">CSRD/EU XML</SelectItem>
                            <SelectItem value="combined">PDF + XML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Report Sections</Label>
                      <p className="text-sm text-muted-foreground">
                        Select the sections to include in your compliance report
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Executive Summary",
                          "Company Information",
                          "Sites & Operations",
                          "Employee Demographics",
                          "Departments & Compliance Mapping",
                          "Risk Assessment Results",
                          "Product & Supply Chain Analysis",
                          "Grievance & Remediation Actions",
                          "Governance Oversight",
                          "Audit Trail & Documentation",
                        ].map((section) => (
                          <div key={section} className="flex items-center space-x-3">
                            <Checkbox id={section} defaultChecked />
                            <Label htmlFor={section} className="text-sm font-normal">
                              {section}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-title">Custom Report Title</Label>
                      <Input
                        id="report-title"
                        placeholder="e.g., Q1 2024 Corporate Sustainability Due Diligence Report"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Previously generated compliance and governance reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <h4 className="font-semibold">{report.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{report.type}</span>
                                <span>•</span>
                                <span>{report.format}</span>
                                <span>•</span>
                                <span>{report.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={report.status === "Published" ? "default" : "secondary"}
                              className={
                                report.status === "Published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {report.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{report.generatedDate}</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audit-trail" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Trail</CardTitle>
                    <CardDescription>Complete log of system changes and user activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold">Risk Assessment Updated</h4>
                            <p className="text-sm text-muted-foreground">
                              Manufacturing department risk score updated from 70 to 75
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>John Smith</div>
                          <div>2024-03-20 14:30</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold">New Employee Added</h4>
                            <p className="text-sm text-muted-foreground">
                              Employee Maria Garcia added to Quality Assurance department
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>HR Manager</div>
                          <div>2024-03-20 11:15</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold">Grievance Status Changed</h4>
                            <p className="text-sm text-muted-foreground">
                              Complaint GRV-002 status changed from Open to In Progress
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Safety Officer</div>
                          <div>2024-03-19 16:45</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold">Report Generated</h4>
                            <p className="text-sm text-muted-foreground">
                              Q1 2024 CSDDD Compliance Report generated and published
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Compliance Officer</div>
                          <div>2024-03-31 09:00</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button variant="outline">Load More Activities</Button>
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
