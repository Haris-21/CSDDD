import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Shield, AlertTriangle, CheckCircle, Plus } from "lucide-react"

const departments = [
  {
    id: 1,
    name: "Engineering",
    employeeCount: 245,
    complianceTags: ["Labor Rights", "Safety Standards"],
    riskLevel: "low",
  },
  {
    id: 2,
    name: "Manufacturing",
    employeeCount: 892,
    complianceTags: ["Labor Rights", "Child Protection", "Safety Standards", "Human Rights (ILO)"],
    riskLevel: "medium",
  },
  {
    id: 3,
    name: "Quality Assurance",
    employeeCount: 156,
    complianceTags: ["Safety Standards", "Human Rights (UNGP)"],
    riskLevel: "low",
  },
  {
    id: 4,
    name: "Logistics",
    employeeCount: 324,
    complianceTags: ["Labor Rights", "Human Rights (OECD)"],
    riskLevel: "high",
  },
]

const complianceElements = [
  "Labor Rights",
  "Child Protection",
  "Human Rights (ILO)",
  "Human Rights (UNGP)",
  "Human Rights (OECD)",
  "Safety Standards",
  "Environmental Standards",
  "Anti-Discrimination",
  "Fair Wages",
  "Working Hours",
]

export default function DepartmentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Department & Compliance Mapping"
            description="Organize employees into departments and map compliance frameworks"
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="department-list" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="department-list">Department Overview</TabsTrigger>
                <TabsTrigger value="compliance-mapping">Compliance Mapping</TabsTrigger>
              </TabsList>

              <TabsContent value="department-list" className="space-y-6">
                {/* Department Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Departments</p>
                          <p className="text-2xl font-bold">{departments.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Low Risk</p>
                          <p className="text-2xl font-bold text-green-600">
                            {departments.filter((d) => d.riskLevel === "low").length}
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Medium Risk</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {departments.filter((d) => d.riskLevel === "medium").length}
                          </p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">High Risk</p>
                          <p className="text-2xl font-bold text-red-600">
                            {departments.filter((d) => d.riskLevel === "high").length}
                          </p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Department List */}
                <div className="grid gap-4">
                  {departments.map((department) => (
                    <Card key={department.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">{department.name}</h3>
                              <Badge
                                variant={
                                  department.riskLevel === "low"
                                    ? "default"
                                    : department.riskLevel === "medium"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className={
                                  department.riskLevel === "low"
                                    ? "bg-green-100 text-green-800"
                                    : department.riskLevel === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {department.riskLevel} risk
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  <span className="font-medium">{department.employeeCount}</span> employees
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  <span className="font-medium">{department.complianceTags.length}</span> compliance
                                  frameworks
                                </span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="text-sm text-muted-foreground mb-2">Compliance Tags:</p>
                              <div className="flex flex-wrap gap-2">
                                {department.complianceTags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit Mapping
                            </Button>
                            <Button variant="outline" size="sm">
                              View Analytics
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compliance-mapping" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Map Department to Compliance Frameworks</CardTitle>
                    <CardDescription>
                      Select a department and assign relevant compliance elements for risk assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="select-department">Select Department *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose department to map" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name.toLowerCase()}>
                              {dept.name} ({dept.employeeCount} employees)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>Compliance Elements</Label>
                      <p className="text-sm text-muted-foreground">
                        Select all compliance frameworks that apply to this department
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {complianceElements.map((element) => (
                          <div key={element} className="flex items-center space-x-3">
                            <Checkbox id={element} />
                            <Label htmlFor={element} className="text-sm font-normal">
                              {element}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Save Compliance Mapping</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Framework Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Framework Details</CardTitle>
                    <CardDescription>Overview of international compliance standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">International Labour Organization (ILO)</h4>
                        <p className="text-sm text-muted-foreground">
                          Fundamental principles and rights at work, including freedom of association, elimination of
                          forced labor, and abolition of child labor.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">UN Guiding Principles (UNGP)</h4>
                        <p className="text-sm text-muted-foreground">
                          Business responsibility to respect human rights throughout their operations and value chains.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">OECD Guidelines</h4>
                        <p className="text-sm text-muted-foreground">
                          Recommendations for responsible business conduct in areas including human rights, labor
                          rights, and environmental protection.
                        </p>
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
