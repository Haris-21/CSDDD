"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Factory, Truck, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import { useChain } from "@/Context/chainContext"
import { useProducts } from "@/Context/productContext"

export default function ProductChainPage({ params }: { params: { id: string } }) {
  const router = useRouter()
    const { supplyChainStages, materials } = useChain();
      const { products } = useProducts();

  const product = products.find((p) => p.id === parseInt(params.id))
  if (!product) {
    return (
      <div className="flex h-screen bg-background">
        <SidebarNavigation />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <PageHeader title="Product Not Found" description="The requested product does not exist." />
            <div className="mt-6">
              <Card>
                <CardContent>
                  <div className="text-center text-muted-foreground">No product data available.</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }
    




  // Mock product data
  // const product = {
  //   id: params.id,
  //   name: "Organic Cotton T-Shirt",
  //   category: "Apparel",
  //   productionType: "outsourced",
  // }

  // const supplyChainStages = [
  //   {
  //     stage: "Raw Material",
  //     location: "Gujarat, India",
  //     supplier: "Gujarat Cotton Farms",
  //     process: "Cotton Growing",
  //     coordinates: { lat: 23.0225, lng: 72.5714 },
  //     riskLevel: "low",
  //     certifications: ["GOTS", "Organic"],
  //   },
  //   {
  //     stage: "Fiber Processing",
  //     location: "Tamil Nadu, India",
  //     supplier: "Chennai Textile Mills",
  //     process: "Cotton Ginning & Carding",
  //     coordinates: { lat: 13.0827, lng: 80.2707 },
  //     riskLevel: "medium",
  //     certifications: ["OEKO-TEX"],
  //   },
  //   {
  //     stage: "Fabric Production",
  //     location: "Dhaka, Bangladesh",
  //     supplier: "Dhaka Weaving Co.",
  //     process: "Weaving & Knitting",
  //     coordinates: { lat: 23.8103, lng: 90.4125 },
  //     riskLevel: "high",
  //     certifications: ["WRAP"],
  //   },
  //   {
  //     stage: "Dyeing & Finishing",
  //     location: "Ho Chi Minh City, Vietnam",
  //     supplier: "Vietnam Dye Works",
  //     process: "Fabric Dyeing & Treatment",
  //     coordinates: { lat: 10.8231, lng: 106.6297 },
  //     riskLevel: "medium",
  //     certifications: ["ZDHC"],
  //   },
  //   {
  //     stage: "Cut & Sew",
  //     location: "Phnom Penh, Cambodia",
  //     supplier: "Cambodia Garments Ltd",
  //     process: "Pattern Cutting & Sewing",
  //     coordinates: { lat: 11.5564, lng: 104.9282 },
  //     riskLevel: "high",
  //     certifications: ["SA8000"],
  //   },
  //   {
  //     stage: "Final Assembly",
  //     location: "Bangkok, Thailand",
  //     supplier: "Thai Assembly Co.",
  //     process: "Quality Control & Packaging",
  //     coordinates: { lat: 13.7563, lng: 100.5018 },
  //     riskLevel: "low",
  //     certifications: ["ISO 9001"],
  //   },
  // ]

  // const materials = [
  //   { name: "Organic Cotton", percentage: 95, origin: "India", risk: "low" },
  //   { name: "Elastane", percentage: 5, origin: "China", risk: "medium" },
  // ]

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title={`Supply Chain: ${product.name}`}
            description="Complete supply chain visualization and traceability"
          >
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="visualization" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visualization">Chain Visualization</TabsTrigger>
                <TabsTrigger value="materials">Materials Breakdown</TabsTrigger>
                <TabsTrigger value="suppliers">Supplier Details</TabsTrigger>
              </TabsList>

              <TabsContent value="visualization" className="space-y-6">
                {/* Geographic Supply Chain Map */}
                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Supply Chain Flow</CardTitle>
                    <CardDescription>Visual representation of production stages across regions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-slate-50 rounded-lg p-6 min-h-[400px]">
                      {/* Simplified map visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                          {supplyChainStages.map((stage, index) => (
                            <div key={index} className="relative">
                              <div className="flex flex-col items-center space-y-2">
                                <div
                                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                    stage.riskLevel === "low"
                                      ? "bg-green-100 text-green-600"
                                      : stage.riskLevel === "medium"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {index === 0 && <Package className="h-6 w-6" />}
                                  {index === 1 && <Factory className="h-6 w-6" />}
                                  {index === 2 && <Factory className="h-6 w-6" />}
                                  {index === 3 && <Factory className="h-6 w-6" />}
                                  {index === 4 && <Factory className="h-6 w-6" />}
                                  {index === 5 && <Truck className="h-6 w-6" />}
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-semibold">{stage.stage}</p>
                                  <p className="text-xs text-muted-foreground flex items-center justify-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {stage.location}
                                  </p>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs mt-1 ${
                                      stage.riskLevel === "low"
                                        ? "border-green-300 text-green-600"
                                        : stage.riskLevel === "medium"
                                          ? "border-yellow-300 text-yellow-600"
                                          : "border-red-300 text-red-600"
                                    }`}
                                  >
                                    {stage.riskLevel} risk
                                  </Badge>
                                </div>
                              </div>
                              {index < supplyChainStages.length - 1 && (
                                <div className="absolute top-8 -right-4 w-8 h-0.5 bg-gray-300"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Supply Chain Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Production Timeline</CardTitle>
                    <CardDescription>Step-by-step production process with risk assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supplyChainStages.map((stage, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              stage.riskLevel === "low"
                                ? "bg-green-500"
                                : stage.riskLevel === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{stage.stage}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  stage.riskLevel === "low"
                                    ? "border-green-300 text-green-600"
                                    : stage.riskLevel === "medium"
                                      ? "border-yellow-300 text-yellow-600"
                                      : "border-red-300 text-red-600"
                                }
                              >
                                {stage.riskLevel} risk
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Location:</span> {stage.location}
                              </div>
                              <div>
                                <span className="font-medium">Supplier:</span> {stage.supplier}
                              </div>
                              <div>
                                <span className="font-medium">Process:</span> {stage.process}
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Certifications:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {stage.certifications.map((cert) => (
                                  <Badge key={cert} variant="secondary" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="materials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Material Composition</CardTitle>
                    <CardDescription>Breakdown of materials used in production</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {materials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{material.name}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold">{material.percentage}%</span>
                                <Badge
                                  variant="outline"
                                  className={
                                    material.risk === "low"
                                      ? "border-green-300 text-green-600"
                                      : "border-yellow-300 text-yellow-600"
                                  }
                                >
                                  {material.risk} risk
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              Origin: {material.origin}
                            </div>
                            <div className="mt-2 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${material.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suppliers" className="space-y-6">
                <div className="grid gap-4">
                  {supplyChainStages.map((stage, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">{stage.supplier}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  stage.riskLevel === "low"
                                    ? "border-green-300 text-green-600"
                                    : stage.riskLevel === "medium"
                                      ? "border-yellow-300 text-yellow-600"
                                      : "border-red-300 text-red-600"
                                }
                              >
                                {stage.riskLevel} risk
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Stage:</span> {stage.stage}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span> {stage.location}
                              </div>
                              <div>
                                <span className="font-medium">Process:</span> {stage.process}
                              </div>
                              <div>
                                <span className="font-medium">Certifications:</span> {stage.certifications.join(", ")}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Assess Risk
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
