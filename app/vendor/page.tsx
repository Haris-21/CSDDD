"use client"

import { useRouter } from "next/navigation"
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
import { Plus, Package, Factory, Truck, Search, Filter, Download, ExternalLink, Eye } from "lucide-react"
import { useVendors } from "@/Context/vendorContext"
import { useChain } from "@/Context/chainContext"

const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    productId: "PROD-001",
    articleId: "ART-TSH-001",
    sku: "TSH-COTTON-001",
    source: "In-house",
    processes: ["Cutting", "Stitching", "Quality Check"],
    materials: ["Organic Cotton", "Polyester Thread"],
    riskLevel: "Low",
  },
  {
    id: 2,
    name: "Denim Jeans Classic",
    productId: "PROD-002",
    articleId: "ART-JNS-002",
    sku: "JNS-DENIM-002",
    source: "Outsourced",
    vendor: "Global Textile Co.",
    vendorCountry: "Bangladesh",
    processes: ["Dyeing", "Cutting", "Stitching"],
    materials: ["Denim Fabric", "Metal Buttons"],
    riskLevel: "High",
  },
  {
    id: 3,
    name: "Wool Sweater",
    productId: "PROD-003",
    articleId: "ART-SWT-003",
    sku: "SWT-WOOL-003",
    source: "Outsourced",
    vendor: "European Knits Ltd.",
    vendorCountry: "Italy",
    processes: ["Knitting", "Finishing"],
    materials: ["Merino Wool", "Synthetic Blend"],
    riskLevel: "Medium",
  },
]

const vendors = [
  {
    id: 1,
    name: "Global Textile Co.",
    country: "Bangladesh",
    processes: ["Dyeing", "Cutting", "Stitching", "Finishing"],
    productsCount: 15,
    riskScore: 75,
  },
  {
    id: 2,
    name: "European Knits Ltd.",
    country: "Italy",
    processes: ["Knitting", "Finishing", "Quality Control"],
    productsCount: 8,
    riskScore: 35,
  },
  {
    id: 3,
    name: "Asian Manufacturing Hub",
    country: "Vietnam",
    processes: ["Assembly", "Packaging", "Logistics"],
    productsCount: 22,
    riskScore: 60,
  },
]

export default function ProductsPage() {
  const router = useRouter()

  const { vendors, addVendor, updateVendor, deleteVendor } = useVendors();
  const { supplyChainStages, materials } = useChain();


  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Vendors List"
            description="Manage products, vendors, and supply chain traceability"
          >
           
          </PageHeader>

          <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Management</CardTitle>
                    <CardDescription>Manage and assess vendor relationships and risk profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vendors.map((vendor) => (
                        <div key={vendor.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold">{vendor.name}</h4>
                                <Badge variant="outline">{vendor.country}</Badge>
                                <Badge
                                  variant={
                                    vendor.riskScore >= 70
                                      ? "destructive"
                                      : vendor.riskScore >= 40
                                        ? "secondary"
                                        : "default"
                                  }
                                  className={
                                    vendor.riskScore >= 70
                                      ? "bg-red-100 text-red-800"
                                      : vendor.riskScore >= 40
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }
                                >
                                  Risk Score: {vendor.riskScore}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <span className="font-medium">Products:</span> {vendor.productsCount}
                                </div>
                                <div>
                                  <span className="font-medium">Processes:</span> {vendor.processes.join(", ")}
                                </div>
                                <div>
                                  <span className="font-medium">Location:</span> {vendor.country}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/vendor-risk/${vendor.id}`)}
                              >
                                Assess Risk
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Vendor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
