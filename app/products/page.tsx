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
import { useRouter, useSearchParams } from "next/navigation"
import { useVendors } from "@/Context/vendorContext";
import { useChain } from "@/Context/chainContext";
import { useProducts } from "@/Context/productContext";
import { useEffect, useState } from "react";

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
  


  const { vendors, addVendor, updateVendor, deleteVendor } = useVendors();
  const { supplyChainStages, materials } = useChain();


  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const { products, addProduct, updateProduct, editProduct, viewChain } = useProducts();
  const productToEdit = products.find((p) => p.id === Number(productId));

  // state for form fields
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [articleId, setArticleId] = useState("");
  const [sku, setSku] = useState("");
  const [source, setSource] = useState<string>("");
  const [vendor, setVendor] = useState("");
  const [vendorCountry, setVendorCountry] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setProductCode(productToEdit.productId);
      setArticleId(productToEdit.articleId);
      setSku(productToEdit.sku);
      setSource(productToEdit.source);
      setVendor(productToEdit.vendor || "");
      setVendorCountry(productToEdit.vendorCountry || "");
      setRiskLevel(productToEdit.riskLevel || "");
    }
  }, [productToEdit]);

  const handleSave = () => {
    const updatedProduct = {
      id: productToEdit?.id ?? Date.now(),
      name,
      productId: productCode,
      articleId,
      sku,
      source,
      vendor,
      vendorCountry,
      riskLevel,
      processes: productToEdit?.processes ?? [],
      materials: productToEdit?.materials ?? [],
    };

    if (productToEdit) {
      updateProduct(updatedProduct);
    } else {
      addProduct(updatedProduct);
    }

    router.push("/products");
  };


  // --- Add state for search and filter ---
const [searchTerm, setSearchTerm] = useState("");
const [sourceFilter, setSourceFilter] = useState("all-sources");

// --- Derived filtered products ---
const filteredProducts = products.filter((p) => {
  const matchesSearch =
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesSource =
    sourceFilter === "all-sources" || p.source.toLowerCase() === sourceFilter;

  return matchesSearch && matchesSource;
});


  const handleViewVender = (vendorId: number) => {
    router.push(`/products/vendor-risk/${vendorId}`)
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
          </PageHeader>

          <div className="mt-6">
                {/* Search and Filter */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search products..." className="pl-10 border border-neutral-300 bg-white" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}/>
                        </div>
                      </div>
                      <Select defaultValue="all-sources" value={sourceFilter} onValueChange={setSourceFilter}>
                        <SelectTrigger className="w-48 border border-neutral-300 bg-white">
                          <SelectValue placeholder="Source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-sources">All Sources</SelectItem>
                          <SelectItem value="in-house">In-house</SelectItem>
                          <SelectItem value="outsourced">Outsourced</SelectItem>
                        </SelectContent>
                      </Select>
                      
                    </div>
                  </CardContent>
                </Card>

                {/* Product Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 mb-4">
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
                  {filteredProducts.map((product) => (
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
                            <Button variant="outline" size="sm" onClick={() => editProduct(product.id)}>
                              Edit Product
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => viewChain(product.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Chain
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}
