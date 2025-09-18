"use client";
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
import { Upload, UserPlus, Download, Users, Search, Filter, ArrowRight } from "lucide-react"
import { use, useEffect, useState } from "react";
import { useEmployees } from "@/Context/EmployeeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";


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

  const { employees, addEmployee , updateEmployee} = useEmployees();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [site, setSite] = useState("");
  const [workerType, setWorkerType] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [wage, setWage] = useState("");

  
const [tab, setTab] = useState("import-options");
const [selectedEmployee, setSelectedEmployee] = useState(null);

  // const handleSaveEmployee = () => {
  //   // if (!firstName || !lastName) return alert("Name is required!");

  //   // addEmployee({
  //   //   id: Date.now(),
  //   //   name: `${firstName} ${middleName} ${lastName} `,
  //   //   designation: designation || "Unknown",
  //   //   department: department || "Unknown",
  //   //   workerType: workerType || "Local",
  //   //   employmentType: employmentType || "Permanent",
  //   //   wage: wage || "N/A",
  //   //   site: site || "Unknown",
  //   // });

  //   // // Reset form
  //   // setFirstName("");
  //   // setMiddleName("");
  //   // setLastName("");
  //   // setDesignation("");
  //   // setDepartment("");
  //   // setSite("");
  //   // setWorkerType("");
  //   // setEmploymentType("");
  //   // setWage("");

  //   if (!firstName || !lastName) return alert("First and Last Name are required!");

  // addEmployee({
  //   id: selectedEmployee ? selectedEmployee.id : Date.now(),
  //   firstName,
  //   middleName,
  //   lastName,
  //   designation: designation || "Unknown",
  //   department: department || "Unknown",
  //   workerType: workerType || "Local",
  //   employmentType: employmentType || "Permanent",
  //   wage: wage || "N/A",
  //   site: site || "Unknown",
  // });

  // // reset form
  // setFirstName("");
  // setMiddleName("");
  // setLastName("");
  // setDesignation("");
  // setDepartment("");
  // setSite("");
  // setWorkerType("");
  // setEmploymentType("");
  // setWage("");

  // setSelectedEmployee(null);
  // setTab("employee-list");
  // };


const router = useRouter();

const handleSaveEmployee = () => {
  if (!firstName || !lastName) return alert("First and Last Name are required!");

  const employeeData = {
    id: selectedEmployee ? selectedEmployee.id : Date.now(),
    name: `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, " ").trim(),
    designation: designation || "Unknown",
    department: department || "Unknown",
    workerType: workerType || "Local",
    employmentType: employmentType || "Permanent",
    wage: wage || "N/A",
    site: site || "Unknown",
  };

  if (selectedEmployee) {
    updateEmployee(employeeData);
  } else {
    addEmployee(employeeData);
  }

  // Reset form
  setFirstName("");
  setMiddleName("");
  setLastName("");
  setDesignation("");
  setDepartment("");
  setSite("");
  setWorkerType("");
  setEmploymentType("");
  setWage("");

  setSelectedEmployee(null);
  setTab("employee-list");
};

  // --- add these states at the top of EmployeesPage ---
const [searchTerm, setSearchTerm] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("all-departments");

// --- filtered employees derived from employees state ---
const filteredEmployees = employees.filter((emp) => {

  const matchesSearch =
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.designation || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.department || "").toLowerCase().includes(searchTerm.toLowerCase());

  const matchesDepartment =
    departmentFilter === "all-departments" ||
    (emp.department || "").toLowerCase() === departmentFilter;

  return matchesSearch && matchesDepartment;
});


useEffect(() => {
  if (selectedEmployee) {
   const parts = selectedEmployee.name.split(" ");
    setFirstName(parts[0] || "");
    setMiddleName(parts.length === 3 ? parts[1] : "");
    setLastName(parts.length === 3 ? parts[2] : parts[1] || "");
    setDesignation(selectedEmployee.designation || "");
    setDepartment(selectedEmployee.department || "");
    setSite(selectedEmployee.site || "");
    setWorkerType(selectedEmployee.workerType || "");
    setEmploymentType(selectedEmployee.employmentType || "");
    setWage(selectedEmployee.wage || "");
  }
}, [selectedEmployee]);



  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Employee List"
            description="Manage workforce data, onboarding, and employee information"
          >

          </PageHeader>

          <div className="mt-6">
          
                {/* Search and Filter */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search employees..." className="pl-10 border border-neutral-300 bg-white w-full" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <Select defaultValue="all-departments"
                          value={departmentFilter}
                          onValueChange={(val) => setDepartmentFilter(val)}
                      >
                        <SelectTrigger className="w-48 border border-neutral-300 bg-white">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-departments">All Departments</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                  {filteredEmployees.map((employee) => (
                     <Card key={employee.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {employee.name
                                    .trim()
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                    {`${employee.firstName || ""} ${employee.middleName || ""} ${employee.lastName || ""}`
                                    .trim()
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {employee.name}
                                 {`${employee.firstName || ""} ${employee.middleName || ""} ${employee.lastName || ""}`.trim()}


                              </h3>
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
                          <div className="flex space-x-2">
                          
                            <Button  variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  router.push(`/employees/add`);
                                }}>
                              Edit Employee
                            </Button>
                          
                          <Link href={`/employees/${employee.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredEmployees.length === 0 && (
                    <p className="text-sm text-muted-foreground">No employees found.</p>
                  )}

                </div>
                <div className="mt-4 flex justify-end">
                    <Link href="/policies/add" >
                            <Button variant="outline" size="sm" className="flex-1 w-full bg-primary text-primary-foreground hover:bg-primary/90 p-5">
                                Continue to Policy Setup
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                      </Link>
                </div>
          
          </div>
        </div>
      </main>
    </div>
  )
}
