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
import Link from "next/link"
import { useState } from "react"




export default function ProductsPage() {
  const router = useRouter()

  const { vendors, addVendor, updateVendor, deleteVendor } = useVendors();
  const { supplyChainStages, materials } = useChain();

    // --- add these states at the top of EmployeesPage ---
  const [searchTerm, setSearchTerm] = useState("");
  const [ProcessFilter, setRiskFilter] = useState("All Process");
  
  // --- filtered employees derived from employees state ---
  const filteredVendor = vendors.filter((vend) => {
  
    const matchesSearch =
      vend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vend.country || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vend.processes || "").includes(searchTerm.toLowerCase());
  
    const matchesDepartment =
      ProcessFilter === "All Process" ||
      (vend.processes || "") === ProcessFilter;
  
    return matchesSearch && matchesDepartment;
  });


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
              <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search employees..." className="pl-10 border border-neutral-300 bg-white w-full" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <Select defaultValue="All Process"
                          value={ProcessFilter}
                          onValueChange={(val) => setRiskFilter(val)}
                      >
                        <SelectTrigger className="w-48 border border-neutral-300 bg-white">
                          <SelectValue placeholder="Processes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Process">All Process</SelectItem>
                          <SelectItem value="Dyeing">Dyeing</SelectItem>
                          <SelectItem value="Cutting">Cutting</SelectItem>
                          <SelectItem value="Stitching">Stitching</SelectItem>
                          <SelectItem value="Finishing">Finishing</SelectItem>
                          <SelectItem value="Knitting">Knitting</SelectItem>
                          <SelectItem value="Quality Control">Quality Control</SelectItem>
                          <SelectItem value="Assembly">Assembly</SelectItem>
                          <SelectItem value="Packaging">Packaging</SelectItem>
                          <SelectItem value="Logistics">Logistics</SelectItem>
                          <SelectItem value="Packaging">Packaging</SelectItem>
                          <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredVendor.map((vendor) => (
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
                                onClick={() => router.push(`/vendor/vendor-risk/${vendor.id}`)}
                              >
                                Assess Risk
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Link href={"/vendor/add"}>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Vendor
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
