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

export default function PolicyDetailPage() {

        const params = useParams()
        const { sites } = useSites()

        console.log("Params:", params)
        console.log("Sites from context:", sites)

        // Get the site ID from URL
        const siteId = Number(params.Id)
        console.log("Site ID from URL:", siteId)
        const site = sites.find((s) => s.id === siteId)
        console.log("Site :", site)



  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/policies">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Policy
              </Button>
            </Link>
          </div>

          <PageHeader title="Policy Details" description="Detailed view of the selected policy">

          </PageHeader>

          <div className="mt-6">
          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Policy Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Policy Name</label>
                        {/* <p className="text-lg font-semibold">{site.name}</p> */}
                      </div>
                      {/* <div>
                        <label className="text-sm font-medium text-muted-foreground">Type</label>
                        <Badge variant="secondary">{site.type}</Badge>
                      </div> */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Data Type</label>
                        <p className="text-sm flex items-start gap-2">
                   
                          {/* {site.address} */}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Policy Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Default Value</label>
                        <p className="text-sm flex items-center gap-2">
                       
                          {/* {sitedetail.phone || "Not provided"} */}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Applicable To:</label>
                        <p className="text-sm flex items-center gap-2">
                       
                          {/* {sitedetail.email || "Not provided"} */}
                        </p>
                      </div>
                     
                     
                    </CardContent>
                  </Card>
                </div>

            
              

          

              
          </div>
        </div>
      </main>
    </div>
  )
}
