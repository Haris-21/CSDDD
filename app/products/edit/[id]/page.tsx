"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock product data - in real app, fetch based on params.id
  const [product, setProduct] = useState({
    id: params.id,
    name: "Premium Cotton T-Shirt",
    productId: "PROD-001",
    articleId: "ART-TSH-001",
    sku: "TSH-COTTON-001",
    source: "In-house",
    description: "High-quality organic cotton t-shirt with sustainable production methods",
    processes: ["Cutting", "Stitching", "Quality Check"],
    materials: ["Organic Cotton", "Polyester Thread"],
    riskLevel: "Low",
    vendor: "",
    vendorCountry: "",
    productionSite: "austin-plant",
  })

  const handleSave = () => {
    // Save logic here
    console.log("Saving product:", product)
    alert("Product updated successfully!")
    router.push("/products")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Delete logic here
      console.log("Deleting product:", product.id)
      router.push("/products")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader title="Edit Product" description="Modify product information and supply chain details">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Basic product details and identifiers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name *</Label>
                    <Input
                      id="product-name"
                      value={product.name}
                      onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-id">Product ID *</Label>
                    <Input
                      id="product-id"
                      value={product.productId}
                      onChange={(e) => setProduct({ ...product, productId: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="article-id">Article ID *</Label>
                    <Input
                      id="article-id"
                      value={product.articleId}
                      onChange={(e) => setProduct({ ...product, articleId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={product.sku}
                      onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Details</CardTitle>
                <CardDescription>Source of production and manufacturing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Source of Production</Label>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="in-house"
                        name="source"
                        value="In-house"
                        checked={product.source === "In-house"}
                        onChange={(e) => setProduct({ ...product, source: e.target.value })}
                      />
                      <Label htmlFor="in-house">In-house Production</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="outsourced"
                        name="source"
                        value="Outsourced"
                        checked={product.source === "Outsourced"}
                        onChange={(e) => setProduct({ ...product, source: e.target.value })}
                      />
                      <Label htmlFor="outsourced">Outsourced to Vendor</Label>
                    </div>
                  </div>
                </div>

                {product.source === "Outsourced" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-name">Vendor Name</Label>
                      <Input
                        id="vendor-name"
                        value={product.vendor}
                        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
                        placeholder="Enter vendor company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor-country">Vendor Country</Label>
                      <Select
                        value={product.vendorCountry}
                        onValueChange={(value) => setProduct({ ...product, vendorCountry: value })}
                      >
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
                )}

                {product.source === "In-house" && (
                  <div className="space-y-2">
                    <Label htmlFor="production-site">Production Site</Label>
                    <Select
                      value={product.productionSite}
                      onValueChange={(value) => setProduct({ ...product, productionSite: value })}
                    >
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
                )}

                <div className="space-y-3">
                  <Label>Production Processes</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Weaving",
                      "Knitting",
                      "Cutting",
                      "Stitching",
                      "Dyeing",
                      "Finishing",
                      "Quality Check",
                      "Packaging",
                    ].map((process) => (
                      <div key={process} className="flex items-center space-x-2">
                        <Checkbox
                          id={process}
                          checked={product.processes.includes(process)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setProduct({
                                ...product,
                                processes: [...product.processes, process],
                              })
                            } else {
                              setProduct({
                                ...product,
                                processes: product.processes.filter((p) => p !== process),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={process} className="text-sm">
                          {process}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Materials Used</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Organic Cotton",
                      "Polyester Thread",
                      "Denim Fabric",
                      "Metal Buttons",
                      "Merino Wool",
                      "Synthetic Blend",
                      "Elastic",
                      "Zippers",
                    ].map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={material}
                          checked={product.materials.includes(material)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setProduct({
                                ...product,
                                materials: [...product.materials, material],
                              })
                            } else {
                              setProduct({
                                ...product,
                                materials: product.materials.filter((m) => m !== material),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={material} className="text-sm">
                          {material}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
