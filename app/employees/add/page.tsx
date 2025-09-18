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
import { Upload, UserPlus, Download, Users, Search, Filter, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react";
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
  setTab("import-options");
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
            title="Employee Management"
            description="Manage workforce data, onboarding, and employee information"
          >
            <div className="flex gap-2">
              <Link href={"/sites"}>
              <Button variant="outline">
                <ArrowLeft />
                Back to Sites
              </Button>
              </Link>
              {
                tab === "employee-form" ?
                
                  <>
              <Button onClick={handleSaveEmployee}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
                  </> : ""
                
              }
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="import-options" className="space-y-6" value={tab} onValueChange={setTab}>
              <TabsList className="grid w-full grid-cols-2" >
                <TabsTrigger value="import-options">Import Options</TabsTrigger>
                <TabsTrigger value="employee-form"> {selectedEmployee ? "Edit Employee" : "Add Employee"}</TabsTrigger>
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
                      <div className="flex gap-4">
                        <Button className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download CSV Template
                        </Button>
                        <Button className="text-primary-foreground bg-primary flex items-center justify-center text-center relative flex-1">
                           <Upload />
                              Choose File
                              <Input type="file" accept=".csv, .xlsx" title="Choose File" className="text-primary-foreground text-center bg-primary absolute top-0 opacity-0 w-full"  />
                        </Button>
                      </div>

                     
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
                      {/* <Button value={"employee-form"} className="w-full">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Employee
                      </Button> */}
                      <TabsList className="w-full">
                          <TabsTrigger value="employee-form" className="w-full bg-primary text-primary-foreground"><UserPlus className="h-4 w-4 mr-2 " /> Add Employee</TabsTrigger>
                      </TabsList>
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
                            <SelectTrigger className="border border-neutral-300 bg-white">
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
                          <Input id="first-name" placeholder="Enter first name" className="border border-neutral-300 bg-white" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="middle-name">Middle Name</Label>
                          <Input id="middle-name" placeholder="Enter middle name" className="border border-neutral-300 bg-white"
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name *</Label>
                          <Input id="last-name" placeholder="Enter last name" className="border border-neutral-300 bg-white"
                           value={lastName}
                          onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select>
                            <SelectTrigger className="border border-neutral-300 bg-white">
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
                          <Input id="age" type="number" placeholder="Enter age" className="border border-neutral-300 bg-white"/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="site">Site *</Label>
                          <Select onValueChange={(val) => setSite(val)} value={site}>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select site" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="San Francisco HQ">San Francisco HQ</SelectItem>
                              <SelectItem value="Austin Plant">Austin Plant</SelectItem>
                              <SelectItem value="London Office">London Office</SelectItem>
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
                          <Select  onValueChange={(val) => setDesignation(val)} value={designation}>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                              <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                              <SelectItem value="Quality Inspector">Quality Inspector</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department *</Label>
                          <Select onValueChange={(val) => setDepartment(val)} value={department}>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                              <SelectItem value="Human Resources">Human Resources</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recruiting-agency">Recruiting Agency</Label>
                          <Input id="recruiting-agency" placeholder="Enter agency name" className="border border-neutral-300 bg-white"/>
                        </div>
                      </div>
                    </div>

                    {/* Wage & Benefits */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Wage & Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="wage-type">Wage Type *</Label>
                          <Select onValueChange={(val) => setWage(val)} value={wage}>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select wage type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Per Piece">Per Piece</SelectItem>
                              <SelectItem value="Per Hour">Per Hour</SelectItem>
                              <SelectItem value="Monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="compensation">Compensation Amount *</Label>
                          <Input id="compensation" placeholder="Enter amount" className="border border-neutral-300 bg-white"/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reporting-to">Reporting To</Label>
                          <Select>
                            <SelectTrigger className="border border-neutral-300 bg-white">
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
                          <Select onValueChange={(val) => setWorkerType(val)} value={workerType}>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Migrant">Migrant</SelectItem>
                              <SelectItem value="Contractual">Contractual</SelectItem>
                              <SelectItem value="Local">Local</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employment-type">Employment Type *</Label>
                          <Select onValueChange={(val) => setEmploymentType(val)} value={employmentType}>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Permanent">Permanent</SelectItem>
                              <SelectItem value="Temporary">Temporary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="work-mode">Mode of Work *</Label>
                          <Select>
                            <SelectTrigger className="border border-neutral-300 bg-white">
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Onsite">Onsite</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                              <SelectItem value="Remote">Remote</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                       <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedEmployee(null);
                            setTab("import-options");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleSaveEmployee();
                            setSelectedEmployee(null);
                            router.push("/employees");
                          }}
                        >
                          {selectedEmployee ? "Update Employee" : "Save Employee"}
                        </Button>
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
