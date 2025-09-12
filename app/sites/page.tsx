import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Globe, Users, Building, SquarePen, Eye } from "lucide-react"
import Link from "next/link"

type Site = {
  id: number
  name: string
  country: string
  address: string
  website: string
  employees: number
  type: string
  postalcode : string
  province : string
}

 
export const sites: Site[] = [
  {
    id: 1,
    name: "San Francisco Headquarters",
    country: "United States",
    address: "123 Business District, Suite 400, San Francisco, CA 94105",
    website: "https://sf.acmecorp.com",
    employees: 245,
    type: "Headquarters",
    postalcode: "94105",
    province : "California"
  },
  {
    id: 2,
    name: "Austin Manufacturing Plant",
    country: "United States",
    address: "456 Industrial Blvd, Austin, TX 78701",
    website: "https://austin.acmecorp.com",
    employees: 892,
    type: "Manufacturing",
    postalcode: "78701",
    province : "Texas"
  },
  {
    id: 3,
    name: "London Office",
    country: "United Kingdom",
    address: "789 Canary Wharf, London E14 5AB",
    website: "https://london.acmecorp.com",
    employees: 156,
    type: "Office",
    postalcode: "34566",
    province : "England"
  },
]


export default function SitesPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Sites Management"
            description="Manage all company locations, factories, warehouses, and offices"
          >
            <Link href="/sites/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Site
              </Button>
            </Link>
          </PageHeader>

          <div className="mt-6">
            {sites.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Sites Added</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by adding your first company site to begin tracking compliance across locations.
                  </p>
                  <Link href="/sites/add">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Site
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map((site) => (
                  <Card key={site.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{site.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {site.country}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{site.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">{site.address}</div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{site.employees} employees</span>
                        </div>

                        {site.website && (
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                            <a
                              href={site.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/sites/add?id=${site.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <SquarePen />
                            Edit Site
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Eye />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
