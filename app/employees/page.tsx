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
import { Upload, UserPlus, Download, Users, Search, Filter } from "lucide-react"

const employees = [
  {
    id: 1,
    name: "John Smith",
    designation: "Senior Developer",
    department: "Engineering",
    workerType: "Local",
    employmentType: "Permanent",
    wage: "$85,000/year",
    site: "San Francisco HQ",
  },
  {
    id: 2,
    name: "Maria Garcia",
    designation: "Operations Manager",
    department: "Operations",
    workerType: "Local",
    employmentType: "Permanent",
    wage: "$75,000/year",
    site: "Austin Plant",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    designation: "Quality Inspector",
    department: "Quality Assurance",
    workerType: "Migrant",
    employmentType: "Contractual",
    wage: "$22/hour",
    site: "Austin Plant",
  },
]

export default function EmployeesPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Employee Management"
            description="Manage workforce data, onboarding, and employee information"
          >
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="import-options" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="import-options">Import Options</TabsTrigger>
                <TabsTrigger value="employee-form">Add Employee</TabsTrigger>
                <TabsTrigger value="employee-list">Employee List</TabsTrigger>
              </TabsList>

              <TabsContent value="import-options" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="text-center">
                      <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
                      <CardTitle>Upload CSV</CardTitle>
                      <CardDescription>Import employee data from CSV file</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Supports .csv, .xlsx files up to 10MB
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="text-center">
                      <UserPlus className="h-12 w-12 mx-auto text-primary mb-4" />
                      <CardTitle>Manual Entry</CardTitle>
                      <CardDescription>Add employees one by one using forms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Employee
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">Recommended for small teams</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="text-center">
                      <div className="h-12 w-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-primary font-bold">API</span>
                      </div>
                      <CardTitle>API Integration</CardTitle>
                      <CardDescription>Connect with existing HR systems</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline">
                        Setup API
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">For enterprise integrations</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="employee-form" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Employee Information</CardTitle>
                    <CardDescription>Enter comprehensive employee details for compliance tracking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Personal Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr">Mr.</SelectItem>
                              <SelectItem value="ms">Ms.</SelectItem>
                              <SelectItem value="dr">Dr.</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name *</Label>
                          <Input id="first-name" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="middle-name">Middle Name</Label>
                          <Input id="middle-name" placeholder="Enter middle name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name *</Label>
                          <Input id="last-name" placeholder="Enter last name" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input id="age" type="number" placeholder="Enter age" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="site">Site *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select site" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sf-hq">San Francisco HQ</SelectItem>
                              <SelectItem value="austin-plant">Austin Plant</SelectItem>
                              <SelectItem value="london-office">London Office</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Work Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Work Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="senior-developer">Senior Developer</SelectItem>
                              <SelectItem value="operations-manager">Operations Manager</SelectItem>
                              <SelectItem value="quality-inspector">Quality Inspector</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="engineering">Engineering</SelectItem>
                              <SelectItem value="operations">Operations</SelectItem>
                              <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                              <SelectItem value="hr">Human Resources</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recruiting-agency">Recruiting Agency</Label>
                          <Input id="recruiting-agency" placeholder="Enter agency name" />
                        </div>
                      </div>
                    </div>

                    {/* Wage & Benefits */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Wage & Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="wage-type">Wage Type *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select wage type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="per-piece">Per Piece</SelectItem>
                              <SelectItem value="per-hour">Per Hour</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="compensation">Compensation Amount *</Label>
                          <Input id="compensation" placeholder="Enter amount" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reporting-to">Reporting To</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select manager" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="john-doe">John Doe</SelectItem>
                              <SelectItem value="jane-smith">Jane Smith</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Benefits</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {["Medical", "Retirement", "Bonus", "Other"].map((benefit) => (
                            <div key={benefit} className="flex items-center space-x-2">
                              <Checkbox id={benefit} />
                              <Label htmlFor={benefit} className="text-sm">
                                {benefit}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Employment Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Employment Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="worker-type">Worker Type *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="migrant">Migrant</SelectItem>
                              <SelectItem value="contractual">Contractual</SelectItem>
                              <SelectItem value="local">Local</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employment-type">Employment Type *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="permanent">Permanent</SelectItem>
                              <SelectItem value="temporary">Temporary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="work-mode">Mode of Work *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="onsite">Onsite</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="remote">Remote</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Save Employee</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="employee-list" className="space-y-6">
                {/* Search and Filter */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search employees..." className="pl-10" />
                        </div>
                      </div>
                      <Select defaultValue="all-departments">
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-departments">All Departments</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Employees</p>
                          <p className="text-2xl font-bold">2,847</p>
                        </div>
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Permanent</p>
                          <p className="text-2xl font-bold">2,156</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">76%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Contractual</p>
                          <p className="text-2xl font-bold">691</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">24%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">New This Month</p>
                          <p className="text-2xl font-bold">47</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">+12%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Employee List */}
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <Card key={employee.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{employee.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {employee.designation} • {employee.department}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-sm">
                            <div>
                              <p className="text-muted-foreground">Worker Type</p>
                              <Badge variant="outline">{employee.workerType}</Badge>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Employment</p>
                              <Badge variant="outline">{employee.employmentType}</Badge>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Wage</p>
                              <p className="font-medium">{employee.wage}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Site</p>
                              <p className="font-medium">{employee.site}</p>
                            </div>
                          </div>

                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
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
