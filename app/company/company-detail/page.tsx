"use client";
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Download, MapPin, Globe, Users, Building, Phone, Mail, Flag, Factory, MapPinHouse, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCompany } from "@/Context/companyContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";



export default function SiteDetailPage() {

    const sitedetail = {
  id: 1,
  name: "San Francisco Headquarters",
  type: "Headquarters",
  country: "United States",
  address: "123 Business District, Suite 400, San Francisco, CA 94105",
  website: "https://sf.acmecorp.com",
  employees: 245,
  phone: "+1 (415) 555-0123",
  email: "sf.office@acmecorp.com",
  manager: "Sarah Johnson",
  established: "2018-01-15",
  departments: ["Engineering", "Sales", "Marketing", "HR"],
  facilities: ["Office Space", "Conference Rooms", "Cafeteria", "Parking"],
  certifications: ["ISO 9001", "LEED Gold", "SOC 2"],
}
      const { company } = useCompany();

  if (!company) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No company info saved. Please go back and fill the form.</p>
      </div>
    );
  }



  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/company/info">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Info
              </Button>
            </Link>
          </div>

          <PageHeader title="Company Detail" description="">
            <div className="flex gap-2">
              <Link href="/company/info">
                    <Button>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Info
                    </Button>
                    </Link>
            </div>
          </PageHeader>

          
           <div className="mt-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="mt-6">

                        <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                Company Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 grid grid-cols-2">
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                                <p className="text-lg font-semibold">{company.name}</p>
                                </div>

                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Type</label>
                                <p className="text-sm flex items-start gap-2 font-semibold">
                                    {company.type}
                                    
                                </p>
                                
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Sector</label>
                                <p className="text-sm flex items-start gap-2 font-semibold">
                                    <Factory className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                    {company.sector}
                                </p>
                                
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Address</label>
                                <p className="text-sm flex items-start gap-2 font-semibold">
                                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                    {company.address}
                                    
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Country</label>
                                <p className="text-sm flex items-start gap-2 font-semibold">
                                        <Flag className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                        {company.country}
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Postal Code</label>
                                <p className="text-sm font-semibold">
                                    {company.postalCode}
                                        
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">State/Province</label>
                                <p className="text-sm flex items-start gap-2 font-semibold">
                                        <MapPinHouse className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                        {company.state}
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">City</label>
                                <p className="text-sm flex items-start gap-2 font-semibold">
                                        <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                        {company.city}
                                </p>
                                </div>
                            </CardContent>
                            </Card>

                            <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                <p className="text-sm flex items-center gap-2 font-semibold">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {company.phone}
                                
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-sm flex items-center gap-2 font-semibold">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    {company.email}
                                
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Alternative Email</label>
                                <p className="text-sm flex items-center gap-2 font-semibold">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                
                                    {company.altEmail}

                                
                                </p>
                                </div>
                                <div>
                                <label className="text-sm font-medium text-muted-foreground">Website</label>
                                <p className="text-sm flex items-center gap-2 font-semibold">
                                        <Globe className="h-4 w-4 text-muted-foreground"/>
                                    <a
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                    >
                                    {company.website}

                                    </a>
                                
                                </p>
                                </div>
                            </CardContent>
                            </Card>
                        </div>

                        
                        
                        </div>

          

                 </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {sitedetail.departments.map((dept) => (
                        <Badge key={dept} variant="outline">
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="employees" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Employee Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">204</p>
                        <p className="text-sm text-muted-foreground">Total Employees</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">89%</p>
                        <p className="text-sm text-muted-foreground">Permanent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">11%</p>
                        <p className="text-sm text-muted-foreground">Contract</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600">42%</p>
                        <p className="text-sm text-muted-foreground">Female</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>


              <TabsContent value="compliance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications & Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Current Certifications</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {sitedetail.certifications.map((cert) => (
                            <Badge key={cert} variant="default" className="bg-green-100 text-green-800">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline">View Compliance Reports</Button>
                      </div>
                    </div>
                    
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
             <div className="flex justify-end">
                      <Link href="/sites/add">
                        <Button>
                          Continue to Site Setup
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
