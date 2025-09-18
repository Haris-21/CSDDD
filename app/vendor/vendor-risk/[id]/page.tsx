"use client"
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
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useVendors } from "@/Context/vendorContext"

const vendor = {
  id: 1,
  name: "Global Textile Co.",
  country: "Bangladesh",
  processes: ["Dyeing", "Cutting", "Stitching", "Finishing"],
  productsCount: 15,
  riskScore: 75,
}

const riskCategories = [
  { id: "labor", name: "Labor Rights", score: 85, status: "High" },
  { id: "environment", name: "Environmental Impact", score: 70, status: "High" },
  { id: "safety", name: "Workplace Safety", score: 60, status: "Medium" },
  { id: "compliance", name: "Legal Compliance", score: 45, status: "Medium" },
  { id: "quality", name: "Quality Standards", score: 30, status: "Low" },
]

export default function VendorRiskAssessmentPage() {

    const params = useParams();
    const { vendors } = useVendors();

    console.log("Params:", params);
    // console.log("vendor from context:", vendors);
    const vendorId = Number(params.id);
    // console.log("vendor ID from URL:", vendorId);
    const vendor = vendors.find((e) => e.id === vendorId);
    // console.log("vendor :", vendor);

    if (!vendor) {
        return (
            <div className="flex h-screen bg-background">
                <SidebarNavigation />
                <main className="flex-1 p-6">
                    <p className="text-muted-foreground">vendor not found.</p>
                    <Link href="/products">
                        <Button className="mt-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Products
                        </Button>
                    </Link>
                </main>
            </div>
        );
    }


  


  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/vendor">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vendor List
              </Button>
            </Link>
          </div>

          <PageHeader
            title={`Risk Assessment: ${vendor.name}`}
            description={`Comprehensive risk evaluation for vendor operations in ${vendor.country}`}
          >
            <Button>Save Assessment</Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="risk-overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="risk-overview">Risk Overview</TabsTrigger>
                <TabsTrigger value="assessment-form">Assessment Form</TabsTrigger>
                <TabsTrigger value="mitigation-plan">Mitigation Plan</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              </TabsList>

              <TabsContent value="risk-overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">{vendor.riskScore}</div>
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          High Risk
                        </Badge>
                        <Progress value={vendor.riskScore} className="mt-4 [&>div]:bg-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {riskCategories.map((category) => (
                          <div key={category.id} className="flex items-center justify-between">
                            <span className="text-sm">{category.name}</span>
                            <Badge
                              variant={
                                category.status === "High"
                                  ? "destructive"
                                  : category.status === "Medium"
                                    ? "secondary"
                                    : "default"
                              }
                              className={
                                category.status === "High"
                                  ? "bg-red-100 text-red-800"
                                  : category.status === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {category.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Vendor Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Company</label>
                        <p className="font-semibold">{vendor.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p>{vendor.country}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Products</label>
                        <p>{vendor.productsCount} active products</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Processes</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {vendor.processes.map((process) => (
                            <Badge key={process} variant="outline" className="text-xs">
                              {process}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Category Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {riskCategories.map((category) => (
                        <div key={category.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{category.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{category.score}/100</span>
                              <Badge
                                variant={
                                  category.status === "High"
                                    ? "destructive"
                                    : category.status === "Medium"
                                      ? "secondary"
                                      : "default"
                                }
                                className={
                                  category.status === "High"
                                    ? "bg-red-100 text-red-800"
                                    : category.status === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {category.status}
                              </Badge>
                            </div>
                          </div>
                          <Progress
                            value={category.score}
                            className={`h-2 ${
                              category.score >= 70
                                ? "[&>div]:bg-red-500"
                                : category.score >= 40
                                  ? "[&>div]:bg-yellow-500"
                                  : "[&>div]:bg-green-500"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessment-form" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment Questionnaire</CardTitle>
                    <CardDescription>Complete the assessment to evaluate vendor risk levels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Labor Rights Assessment</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Does the vendor have documented labor policies?</Label>
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="labor-policies-yes" name="labor-policies" value="yes" />
                              <Label htmlFor="labor-policies-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="labor-policies-no" name="labor-policies" value="no" />
                              <Label htmlFor="labor-policies-no">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="labor-policies-unknown" name="labor-policies" value="unknown" />
                              <Label htmlFor="labor-policies-unknown">Unknown</Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Are there reports of labor violations?</Label>
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="violations-yes" name="violations" value="yes" />
                              <Label htmlFor="violations-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="violations-no" name="violations" value="no" />
                              <Label htmlFor="violations-no">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="violations-unknown" name="violations" value="unknown" />
                              <Label htmlFor="violations-unknown">Unknown</Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="working-hours">Average working hours per week</Label>
                          <Input id="working-hours" type="number" placeholder="Enter hours" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Environmental Impact Assessment</h3>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label>Environmental certifications held</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {["ISO 14001", "OEKO-TEX", "GOTS", "Cradle to Cradle", "GREENGUARD", "Energy Star"].map(
                              (cert) => (
                                <div key={cert} className="flex items-center space-x-2">
                                  <Checkbox id={cert} />
                                  <Label htmlFor={cert} className="text-sm">
                                    {cert}
                                  </Label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="waste-management">Waste management practices</Label>
                          <Textarea id="waste-management" placeholder="Describe waste management practices..." />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Workplace Safety Assessment</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Safety incident rate (per 1000 employees)</Label>
                          <Input type="number" placeholder="Enter incident rate" />
                        </div>

                        <div className="space-y-3">
                          <Label>Safety measures in place</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              "Fire safety systems",
                              "Emergency exits",
                              "First aid stations",
                              "Safety training programs",
                              "Personal protective equipment",
                              "Regular safety audits",
                            ].map((measure) => (
                              <div key={measure} className="flex items-center space-x-2">
                                <Checkbox id={measure} />
                                <Label htmlFor={measure} className="text-sm">
                                  {measure}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Calculate Risk Score</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mitigation-plan" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Mitigation Plan</CardTitle>
                    <CardDescription>Define actions to reduce identified risks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {riskCategories
                        .filter((cat) => cat.status === "High" || cat.status === "Medium")
                        .map((category) => (
                          <div key={category.id} className="p-4 border rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{category.name}</h4>
                              <Badge
                                variant={category.status === "High" ? "destructive" : "secondary"}
                                className={
                                  category.status === "High"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {category.status} Risk
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label>Recommended Actions</Label>
                                <Textarea
                                  placeholder={`Enter mitigation actions for ${category.name.toLowerCase()}...`}
                                  defaultValue={
                                    category.id === "labor"
                                      ? "1. Conduct on-site labor audit\n2. Implement worker grievance system\n3. Provide labor rights training"
                                      : category.id === "environment"
                                        ? "1. Environmental impact assessment\n2. Implement waste reduction program\n3. Obtain environmental certifications"
                                        : ""
                                  }
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Assigned To</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="procurement">Procurement Manager</SelectItem>
                                      <SelectItem value="compliance">Compliance Officer</SelectItem>
                                      <SelectItem value="quality">Quality Manager</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label>Target Completion</Label>
                                  <Input type="date" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Save Mitigation Plan</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ongoing Monitoring</CardTitle>
                    <CardDescription>Track progress and schedule regular assessments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Next Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">Mar 15, 2024</p>
                          <p className="text-sm text-muted-foreground">Quarterly review scheduled</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Action Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-orange-600">5</p>
                          <p className="text-sm text-muted-foreground">Pending completion</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Compliance Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-yellow-600">65%</p>
                          <p className="text-sm text-muted-foreground">Improvement needed</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Monitoring Schedule</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">Initial Risk Assessment</p>
                              <p className="text-sm text-muted-foreground">Completed on Jan 15, 2024</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Complete
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                            <div>
                              <p className="font-medium">Quarterly Review</p>
                              <p className="text-sm text-muted-foreground">Due Mar 15, 2024</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            Pending
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <XCircle className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">Annual Audit</p>
                              <p className="text-sm text-muted-foreground">Scheduled for Jun 15, 2024</p>
                            </div>
                          </div>
                          <Badge variant="outline">Scheduled</Badge>
                        </div>
                      </div>
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
