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
import { Plus, Package, Factory, Truck, Search, Filter, Download, ExternalLink, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

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

  const handleViewChain = (productId: number) => {
    router.push(`/products/chain/${productId}`)
  }

  const handleEditProduct = (productId: number) => {
    router.push(`/products/edit/${productId}`)
  }
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Product & Supply Chain Mapping"
            description="Manage products, vendors, and supply chain traceability"
          >
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="product-list" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="product-list">Product List</TabsTrigger>
                <TabsTrigger value="add-product">Add Product</TabsTrigger>
                <TabsTrigger value="vendor-management">Vendor Management</TabsTrigger>
                <TabsTrigger value="value-chain">Value Chain Report</TabsTrigger>
              </TabsList>

              <TabsContent value="product-list" className="space-y-6">
                {/* Search and Filter */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search products..." className="pl-10" />
                        </div>
                      </div>
                      <Select defaultValue="all-sources">
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-sources">All Sources</SelectItem>
                          <SelectItem value="in-house">In-house</SelectItem>
                          <SelectItem value="outsourced">Outsourced</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Products</p>
                          <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">In-house</p>
                          <p className="text-2xl font-bold">{products.filter((p) => p.source === "In-house").length}</p>
                        </div>
                        <Factory className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Outsourced</p>
                          <p className="text-2xl font-bold">
                            {products.filter((p) => p.source === "Outsourced").length}
                          </p>
                        </div>
                        <Truck className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">High Risk</p>
                          <p className="text-2xl font-bold text-red-600">
                            {products.filter((p) => p.riskLevel === "High").length}
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Risk</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Product List */}
                <div className="space-y-4">
                  {products.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Package className="h-5 w-5 text-muted-foreground" />
                              <h3 className="text-lg font-semibold">{product.name}</h3>
                              <Badge variant={product.source === "In-house" ? "default" : "secondary"}>
                                {product.source}
                              </Badge>
                              <Badge
                                variant={
                                  product.riskLevel === "High"
                                    ? "destructive"
                                    : product.riskLevel === "Medium"
                                      ? "secondary"
                                      : "default"
                                }
                                className={
                                  product.riskLevel === "High"
                                    ? "bg-red-100 text-red-800"
                                    : product.riskLevel === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {product.riskLevel} Risk
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <span className="font-medium">Product ID:</span> {product.productId}
                              </div>
                              <div>
                                <span className="font-medium">Article ID:</span> {product.articleId}
                              </div>
                              <div>
                                <span className="font-medium">SKU:</span> {product.sku}
                              </div>
                              {product.vendor && (
                                <div>
                                  <span className="font-medium">Vendor:</span> {product.vendor} ({product.vendorCountry}
                                  )
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">Processes:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product.processes.map((process) => (
                                    <Badge key={process} variant="outline" className="text-xs">
                                      {process}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Materials:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product.materials.map((material) => (
                                    <Badge key={material} variant="outline" className="text-xs">
                                      {material}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditProduct(product.id)}>
                              Edit Product
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleViewChain(product.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Chain
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="add-product" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                    <CardDescription>Register a new product and define its supply chain mapping</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Product Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Product Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="product-name">Product Name *</Label>
                          <Input id="product-name" placeholder="e.g., Premium Cotton T-Shirt" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-id">Product ID *</Label>
                          <Input id="product-id" placeholder="e.g., PROD-001" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="article-id">Article ID *</Label>
                          <Input id="article-id" placeholder="e.g., ART-TSH-001" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sku">SKU *</Label>
                          <Input id="sku" placeholder="e.g., TSH-COTTON-001" />
                        </div>
                      </div>
                    </div>

                    {/* Source of Production */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Source of Production</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="in-house" name="source" value="in-house" className="text-primary" />
                            <Label htmlFor="in-house">In-house Production</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="outsourced"
                              name="source"
                              value="outsourced"
                              className="text-primary"
                            />
                            <Label htmlFor="outsourced">Outsourced to Vendor</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outsourced Vendor Section */}
                    <Card className="border-dashed">
                      <CardHeader>
                        <CardTitle className="text-base">Outsourced Vendor Details</CardTitle>
                        <CardDescription>Complete this section if production is outsourced</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="vendor-name">Vendor Name</Label>
                            <Input id="vendor-name" placeholder="Enter vendor company name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vendor-country">Vendor Country</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                <SelectItem value="vietnam">Vietnam</SelectItem>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="china">China</SelectItem>
                                <SelectItem value="italy">Italy</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Vendor Processes</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {["Cutting", "Stitching", "Dyeing", "Finishing", "Quality Control", "Packaging"].map(
                              (process) => (
                                <div key={process} className="flex items-center space-x-2">
                                  <Checkbox id={process} />
                                  <Label htmlFor={process} className="text-sm">
                                    {process}
                                  </Label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="brand-supplied" />
                            <Label htmlFor="brand-supplied">Brand-Supplied Materials</Label>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="material-name">Material Name</Label>
                              <Input id="material-name" placeholder="e.g., Organic Cotton" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="material-source">Material Source</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="brand">Brand</SelectItem>
                                  <SelectItem value="external-vendor">External Vendor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* In-house Production Section */}
                    <Card className="border-dashed">
                      <CardHeader>
                        <CardTitle className="text-base">In-house Production Details</CardTitle>
                        <CardDescription>Complete this section if production is done in-house</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <Label>Internal Processes</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              "Weaving",
                              "Knitting",
                              "Cutting",
                              "Stitching",
                              "Dyeing",
                              "Finishing",
                              "Quality Check",
                            ].map((process) => (
                              <div key={process} className="flex items-center space-x-2">
                                <Checkbox id={`internal-${process}`} />
                                <Label htmlFor={`internal-${process}`} className="text-sm">
                                  {process}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="production-site">Production Site</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select production site" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sf-hq">San Francisco HQ</SelectItem>
                              <SelectItem value="austin-plant">Austin Manufacturing Plant</SelectItem>
                              <SelectItem value="london-office">London Office</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end pt-4">
                      <Button>Save Product</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vendor-management" className="space-y-6">
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
                              <Button variant="outline" size="sm">
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
              </TabsContent>

              <TabsContent value="value-chain" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Value Chain Report</CardTitle>
                    <CardDescription>
                      Comprehensive view of your supply chain from upstream to downstream operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Value Chain Visualization */}
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-semibold">Supply Chain Flow</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Excel
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader className="text-center">
                            <CardTitle className="text-base text-blue-600">Upstream</CardTitle>
                            <CardDescription>Raw Materials & Suppliers</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-sm">
                              <div className="font-medium">Material Suppliers</div>
                              <ul className="text-muted-foreground mt-1 space-y-1">
                                <li>• Organic Cotton Farms (India)</li>
                                <li>• Textile Mills (Bangladesh)</li>
                                <li>• Dye Manufacturers (China)</li>
                              </ul>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Risk Factors</div>
                              <ul className="text-muted-foreground mt-1 space-y-1">
                                <li>• Water usage in dyeing</li>
                                <li>• Labor conditions</li>
                                <li>• Chemical compliance</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="text-center">
                            <CardTitle className="text-base text-green-600">Manufacturing</CardTitle>
                            <CardDescription>Production & Assembly</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-sm">
                              <div className="font-medium">Production Sites</div>
                              <ul className="text-muted-foreground mt-1 space-y-1">
                                <li>• Austin Manufacturing Plant</li>
                                <li>• Global Textile Co. (Bangladesh)</li>
                                <li>• European Knits Ltd. (Italy)</li>
                              </ul>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Processes</div>
                              <ul className="text-muted-foreground mt-1 space-y-1">
                                <li>• Cutting & Stitching</li>
                                <li>• Quality Control</li>
                                <li>• Packaging</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="text-center">
                            <CardTitle className="text-base text-purple-600">Downstream</CardTitle>
                            <CardDescription>Distribution & Retail</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-sm">
                              <div className="font-medium">Distribution Centers</div>
                              <ul className="text-muted-foreground mt-1 space-y-1">
                                <li>• North America Hub (USA)</li>
                                <li>• European Hub (Netherlands)</li>
                                <li>• Asia-Pacific Hub (Singapore)</li>
                              </ul>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Retail Channels</div>
                              <ul className="text-muted-foreground mt-1 space-y-1">
                                <li>• Direct-to-Consumer</li>
                                <li>• Retail Partners</li>
                                <li>• E-commerce Platforms</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Supply Chain Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">24</p>
                            <p className="text-sm text-muted-foreground">Upstream Suppliers</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">12</p>
                            <p className="text-sm text-muted-foreground">Manufacturing Sites</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">8</p>
                            <p className="text-sm text-muted-foreground">Distribution Centers</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold">87%</p>
                            <p className="text-sm text-muted-foreground">Traceability Coverage</p>
                          </div>
                        </CardContent>
                      </Card>
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
