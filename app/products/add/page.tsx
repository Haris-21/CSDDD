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
import { Plus, Package, Factory, Truck, Search, Filter, Download, ExternalLink, Eye, ArrowRight } from "lucide-react"
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
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [materialsList, setMaterialsList] = useState<string[]>([]);
  const [materialName, setMaterialName] = useState("");
  const [materialSource, setMaterialSource] = useState("");

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
      processes: selectedProcesses,
      materials: materialsList,
      sites: selectedSites, // add this field if you want to keep sites too
    };

    if (productToEdit) {
      updateProduct(updatedProduct);
    } else {
      addProduct(updatedProduct);
    }

    router.push("/products");
  };

  const toggleProcess = (process: string) => {
  setSelectedProcesses((prev) =>
    prev.includes(process) ? prev.filter((p) => p !== process) : [...prev, process]
  );
};

const toggleSite = (site: string) => {
  setSelectedSites((prev) =>
    prev.includes(site) ? prev.filter((s) => s !== site) : [...prev, site]
  );
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
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button  onClick={handleSave}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
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
                          <Input id="product-name" placeholder="e.g., Premium Cotton T-Shirt"
                          className="border border-neutral-300 bg-white"
                          value={name}
                          onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-id">Product ID *</Label>
                          <Input id="product-id" placeholder="e.g., PROD-001" 
                          className="border border-neutral-300 bg-white"
                          value={productCode}
                          onChange={(e) => setProductCode(e.target.value)}/>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="article-id">Article ID *</Label>
                          <Input id="article-id" placeholder="e.g., ART-TSH-001" 
                          className="border border-neutral-300 bg-white"
                          value={articleId}
                          onChange={(e) => setArticleId(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sku">SKU *</Label>
                          <Input id="sku" placeholder="e.g., TSH-COTTON-001" 
                          className="border border-neutral-300 bg-white"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}/>
                        </div>
                      </div>

                       
                    </div>

                    {/* Source of Production */}
                      <Card>
                         <CardHeader>
                      <CardTitle>Production Details</CardTitle>
                      <CardDescription>Source of production and vendor details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Source *</Label>
                         <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="in-house"
                                    name="source"
                                    value="In-house"
                                    checked={source === "In-house"}
                                    onChange={(e) => setSource(e.target.value)}
                                    className="text-primary"
                                  />
                                  <Label htmlFor="in-house">In-house Production</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="outsourced"
                                    name="source"
                                    value="Outsourced"
                                    checked={source === "Outsourced"}
                                    onChange={(e) => setSource(e.target.value)}
                                    className="text-primary"
                                  />
                                  <Label htmlFor="outsourced">Outsourced to Vendor</Label>
                                </div>
                              </div>
                      </div>
                    </CardContent>
                </Card>
               
                    {/* Outsourced Vendor Details */}
                    {source === "Outsourced" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Outsourced Vendor Details</CardTitle>
                          <CardDescription>
                            Complete this section if production is outsourced
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="vendor-name">Vendor Name</Label>
                              <Input
                                id="vendor-name"
                                value={vendor}
                                onChange={(e) => setVendor(e.target.value)}
                                placeholder="Enter vendor company name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="vendor-country">Vendor Country</Label>
                              <Select value={vendorCountry} onValueChange={setVendorCountry}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                  <SelectItem value="Vietnam">Vietnam</SelectItem>
                                  <SelectItem value="India">India</SelectItem>
                                  <SelectItem value="China">China</SelectItem>
                                  <SelectItem value="Italy">Italy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          {/* Vendor Processes etc. */}
                        </CardContent>
                      </Card>
                    )}

                    {/* In-house Production Details */}
                    {source === "In-house" && (
                      <Card >
                        <CardHeader>
                          <CardTitle className="text-base">In-house Production Details</CardTitle>
                          <CardDescription>
                            Complete this section if production is done in-house
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                          <Label>Mapped Process With Sites</Label>
                        
                          <div className="">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {/* Sites */}
                                  {["San Francisco Headquarters","Austin Manufacturing Plant","London Office"].map((site) => (
                                    <div key={site} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`site-${site}`}
                                        checked={selectedSites.includes(site)}
                                        onCheckedChange={() => toggleSite(site)}
                                      />
                                      <Label htmlFor={`site-${site}`} className="text-sm">
                                        {site}
                                      </Label>
                                    </div>
                                  ))}           
                              </div>
                        
                          </div>
                        </div>
                         <div className="space-y-3">
                          <Label>Internal Processes</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {/* Processes */}
                              {["Weaving","Knitting","Cutting","Stitching","Dyeing","Finishing","Quality Check"].map((process) => (
                                <div key={process} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`process-${process}`}
                                    checked={selectedProcesses.includes(process)}
                                    onCheckedChange={() => toggleProcess(process)}
                                  />
                                  <Label htmlFor={`process-${process}`} className="text-sm">
                                    {process}
                                  </Label>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="material-name">Material Name</Label>
                              <Input     
                              id="material-name"
                                  value={materialName}
                                  onChange={(e) => setMaterialName(e.target.value)}
                                  placeholder="e.g., Organic Cotton"
                                  className="border border-neutral-300 bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="material-source">Material Source</Label>
                              <Select value={materialSource} onValueChange={setMaterialSource}>
                                <SelectTrigger className="border border-neutral-300 bg-white">
                                  <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="brand">Brand</SelectItem>
                                  <SelectItem value="external-vendor">External Vendor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button
                              variant="outline"
                              onClick={() => {
                                if (materialName) {
                                  setMaterialsList((prev) => [...prev, `${materialName} (${materialSource})`]);
                                  setMaterialName("");
                                  setMaterialSource("");
                                }
                              }}
                            >
                              Add Material
                            </Button>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {materialsList.map((mat, idx) => (
                                <Badge key={idx} variant="secondary">{mat}</Badge>
                              ))}
                            </div>
                      
                        </CardContent>
                      </Card>
                    )}


                    <div className="flex justify-end">
                      <Button onClick={() => {
                        handleSave(); 
                        router.push("/vendor/add"); 
                      }}>Save Product & Add Vendor
                      <ArrowRight className="h-4 w-4 ml-2" />
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
