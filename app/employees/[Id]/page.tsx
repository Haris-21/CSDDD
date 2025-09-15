"use client";

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Download, User, Briefcase, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { useEmployees } from "@/Context/EmployeeContext"
import { use } from "react"
import { useParams } from "next/navigation"

// Mock employee data - in real app this would come from database
const employeedetail = {
  id: 1,
  name: "John Smith",
  title: "Mr.",
  firstName: "John",
  middleName: "Michael",
  lastName: "Smith",
  gender: "Male",
  age: 32,
  designation: "Senior Developer",
  department: "Engineering",
  site: "San Francisco HQ",
  workerType: "Local",
  employmentType: "Permanent",
  workMode: "Hybrid",
  wageType: "Monthly",
  compensation: "$85,000/year",
  reportingTo: "Jane Doe",
  benefits: ["Medical", "Retirement", "Bonus"],
  recruitingAgency: "Tech Talent Solutions",
  joinDate: "2022-03-15",
  email: "john.smith@company.com",
  phone: "+1 (555) 123-4567",
}

export default function EmployeeDetailPage() {

    const params = useParams();
    const { employees } = useEmployees();

    console.log("Params:", params);
    console.log("Employees from context:", employees);
    const employeeId = Number(params.Id);
    console.log("Employee ID from URL:", employeeId);
    const employee = employees.find((e) => e.id === employeeId);
    console.log("Employee :", employee);

    if (!employee) {
        return (
            <div className="flex h-screen bg-background">
                <SidebarNavigation />
                <main className="flex-1 p-6">
                    <p className="text-muted-foreground">Employee not found.</p>
                    <Link href="/employees">
                        <Button className="mt-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Employees
                        </Button>
                    </Link>
                </main>
            </div>
        );
    }



  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/employees">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Employees
              </Button>
            </Link>
          </div>

          <PageHeader title={employee.name} description={`${employee.designation} • ${employee.department}`}>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Profile
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Employee
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="personal-info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                <TabsTrigger value="work-details">Work Details</TabsTrigger>
                <TabsTrigger value="compensation">Compensation</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="personal-info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="text-lg font-semibold">
                          {employee.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Gender</label>
                        <p className="text-lg">{employeedetail.gender}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Age</label>
                        <p className="text-lg">{employeedetail.age} years</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg">{employeedetail.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-lg">{employeedetail.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="work-details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Work Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Designation</label>
                        <p className="text-lg font-semibold">{employee.designation}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Department</label>
                        <p className="text-lg">{employee.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Site</label>
                        <p className="text-lg">{employee.site}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Worker Type</label>
                        <Badge variant="outline">{employee.workerType}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Employment Type</label>
                        <Badge variant="outline">{employee.employmentType}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Work Mode</label>
                        <Badge variant="outline">{employeedetail.workMode}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Reporting To</label>
                        <p className="text-lg">{employeedetail.reportingTo}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                        <p className="text-lg flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {employeedetail.joinDate}
                        </p>
                      </div>
                    </div>

                    {employeedetail.recruitingAgency && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Recruiting Agency</label>
                        <p className="text-lg">{employeedetail.recruitingAgency}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compensation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Compensation & Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Wage Type</label>
                        <p className="text-lg">{employee.wage}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Compensation</label>
                        <p className="text-2xl font-bold text-green-600">{employeedetail.compensation}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Benefits</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {employeedetail.benefits.map((benefit) => (
                          <Badge key={benefit} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Employee Documents</CardTitle>
                    <CardDescription>Manage employee-related documents and files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No documents uploaded yet</p>
                      <Button className="mt-4">Upload Documents</Button>
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
