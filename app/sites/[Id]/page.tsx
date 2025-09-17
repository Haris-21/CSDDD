"use client";
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Download, MapPin, Globe, Users, Building, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useSites } from "@/Context/siteContext"
import { useParams } from "next/navigation";

// Mock site data - in real app this would come from database
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

export default function SiteDetailPage() {

        const params = useParams()
        const { sites } = useSites()

        console.log("Params:", params)
        console.log("Sites from context:", sites)

        // Get the site ID from URL
        const siteId = Number(params.Id)
        console.log("Site ID from URL:", siteId)
        const site = sites.find((s) => s.id === siteId)
        console.log("Site :", site)


        if (!site) {
            return (
            <div className="flex h-screen bg-background">
                <SidebarNavigation />
                <main className="flex-1 overflow-auto p-6">
                <p className="text-muted-foreground">Site not found.</p>
                <Link href="/sites">
                    <Button className="mt-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sites
                    </Button>
                </Link>
                </main>
            </div>
            )
        }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/sites">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sites
              </Button>
            </Link>
          </div>

          <PageHeader title={site.name} description={`${site.type} • ${site.country}`}>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Site
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                {/* <TabsTrigger value="facilities">Facilities</TabsTrigger> */}
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Site Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Site Name</label>
                        <p className="text-lg font-semibold">{site.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Type</label>
                        <Badge variant="secondary">{site.type}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Address</label>
                        <p className="text-sm flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          {site.address}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Established</label>
                        <p className="text-sm">{sitedetail.established}</p>
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
                        <p className="text-sm flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {sitedetail.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-sm flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {sitedetail.email || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Website</label>
                        <p className="text-sm flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={sitedetail.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {sitedetail.website || "Not provided"}
                          </a>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Site Manager</label>
                        <p className="text-sm">{sitedetail.manager}</p>
                      </div>
                    </CardContent>
                  </Card>
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
                        <p className="text-3xl font-bold text-primary">{site.employees}</p>
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

              {/* <TabsContent value="facilities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sitedetail.facilities.map((facility) => (
                        <div key={facility} className="flex items-center gap-2 p-3 border rounded">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}

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
          </div>
        </div>
      </main>
    </div>
  )
}
