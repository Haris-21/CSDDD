import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Target, Building, Truck, Globe, CheckCircle } from "lucide-react"

const scopeOptions = [
  {
    id: "own-site",
    title: "Own Site Operations",
    description: "Focus due diligence on company-owned facilities and direct operations",
    icon: Building,
    coverage: ["San Francisco HQ", "Austin Manufacturing Plant", "London Office"],
    riskLevel: "Low",
    recommended: true,
  },
  {
    id: "upstream",
    title: "Upstream Operations",
    description: "Include suppliers, vendors, and raw material sources in due diligence scope",
    icon: Truck,
    coverage: ["24 Suppliers", "15 Material Sources", "8 Countries"],
    riskLevel: "Medium",
    recommended: true,
  },
  {
    id: "downstream",
    title: "Downstream Value Chain",
    description: "Extend due diligence to distribution, retail partners, and end-of-life management",
    icon: Globe,
    coverage: ["8 Distribution Centers", "45 Retail Partners", "12 Countries"],
    riskLevel: "High",
    recommended: false,
  },
]

const selectedScope = {
  sites: [
    { name: "San Francisco HQ", type: "Headquarters", employees: 245, riskScore: 15 },
    { name: "Austin Manufacturing Plant", type: "Manufacturing", employees: 892, riskScore: 45 },
    { name: "London Office", type: "Office", employees: 156, riskScore: 20 },
  ],
  departments: [
    { name: "Engineering", employees: 245, complianceFrameworks: 2 },
    { name: "Manufacturing", employees: 892, complianceFrameworks: 4 },
    { name: "Quality Assurance", employees: 156, complianceFrameworks: 2 },
    { name: "Logistics", employees: 324, complianceFrameworks: 3 },
  ],
  suppliers: [
    { name: "Global Textile Co.", country: "Bangladesh", riskScore: 75, products: 15 },
    { name: "European Knits Ltd.", country: "Italy", riskScore: 35, products: 8 },
    { name: "Asian Manufacturing Hub", country: "Vietnam", riskScore: 60, products: 22 },
  ],
}

export default function DueDiligencePage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Due Diligence Scope"
            description="Define the boundaries and scope of your due diligence assessment"
          >
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Scope
            </Button>
          </PageHeader>

          <div className="mt-6 space-y-6">
            {/* Scope Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Due Diligence Scope</CardTitle>
                <CardDescription>
                  Choose the operational boundaries for your Corporate Sustainability Due Diligence assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {scopeOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <div
                        key={option.id}
                        className={`p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          option.recommended ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <Checkbox id={option.id} defaultChecked={option.recommended} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">{option.title}</h3>
                              {option.recommended && <Badge className="bg-green-100 text-green-800">Recommended</Badge>}
                              <Badge
                                variant={
                                  option.riskLevel === "High"
                                    ? "destructive"
                                    : option.riskLevel === "Medium"
                                      ? "secondary"
                                      : "default"
                                }
                                className={
                                  option.riskLevel === "High"
                                    ? "bg-red-100 text-red-800"
                                    : option.riskLevel === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {option.riskLevel} Risk
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{option.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {option.coverage.map((item) => (
                                <Badge key={item} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Scope Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sites in Scope */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Sites in Scope
                  </CardTitle>
                  <CardDescription>Company-owned facilities and locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedScope.sites.map((site) => (
                    <div key={site.name} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{site.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {site.type} • {site.employees} employees
                        </div>
                      </div>
                      <Badge
                        variant={site.riskScore >= 40 ? "destructive" : site.riskScore >= 25 ? "secondary" : "default"}
                        className={
                          site.riskScore >= 40
                            ? "bg-red-100 text-red-800"
                            : site.riskScore >= 25
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {site.riskScore}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Departments in Scope */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Departments in Scope
                  </CardTitle>
                  <CardDescription>Organizational units and compliance mapping</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedScope.departments.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {dept.employees} employees • {dept.complianceFrameworks} frameworks
                        </div>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suppliers in Scope */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Suppliers in Scope
                  </CardTitle>
                  <CardDescription>External vendors and supply chain partners</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedScope.suppliers.map((supplier) => (
                    <div key={supplier.name} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {supplier.country} • {supplier.products} products
                        </div>
                      </div>
                      <Badge
                        variant={
                          supplier.riskScore >= 70 ? "destructive" : supplier.riskScore >= 40 ? "secondary" : "default"
                        }
                        className={
                          supplier.riskScore >= 70
                            ? "bg-red-100 text-red-800"
                            : supplier.riskScore >= 40
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {supplier.riskScore}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Scope Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Due Diligence Impact Summary</CardTitle>
                <CardDescription>Overview of the selected scope and its implications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Sites Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1,617</div>
                    <div className="text-sm text-muted-foreground">Employees in Scope</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Supplier Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-sm text-muted-foreground">Products Tracked</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommended Next Steps</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Conduct risk assessment for all sites and suppliers in scope</li>
                    <li>• Implement monitoring systems for high-risk suppliers (Bangladesh operations)</li>
                    <li>• Establish regular audit schedules for manufacturing facilities</li>
                    <li>• Set up grievance mechanisms for all locations in scope</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
