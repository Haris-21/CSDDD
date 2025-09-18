"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import { Plus, Globe, AlertTriangle, Database, ExternalLink } from "lucide-react"
import { useState } from "react"

const departmentAnalytics = [
  {
    department: "Engineering",
    totalEmployees: 245,
    maleEmployees: 180,
    femaleEmployees: 65,
    permanentEmployees: 220,
    contractualEmployees: 25,
    promotionGaps: 15,
    hazardExposure: false,
  },
  {
    department: "Manufacturing",
    totalEmployees: 892,
    maleEmployees: 534,
    femaleEmployees: 358,
    permanentEmployees: 670,
    contractualEmployees: 222,
    promotionGaps: 45,
    hazardExposure: true,
  },
  {
    department: "Quality Assurance",
    totalEmployees: 156,
    maleEmployees: 89,
    femaleEmployees: 67,
    permanentEmployees: 145,
    contractualEmployees: 11,
    promotionGaps: 8,
    hazardExposure: false,
  },
]

const riskHeatmapData = [
  { department: "Engineering", riskScore: 25, level: "Low" },
  { department: "Manufacturing", riskScore: 75, level: "High" },
  { department: "Quality Assurance", riskScore: 30, level: "Low" },
  { department: "Logistics", riskScore: 85, level: "High" },
  { department: "HR", riskScore: 40, level: "Medium" },
]

const actionPlans = [
  {
    id: 1,
    riskId: "RISK-001",
    severity: "High",
    description: "Gender pay gap identified in Manufacturing department",
    recommendedAction: "Conduct salary audit and implement pay equity measures",
    assignedTo: "HR Manager",
    deadline: "2024-03-15",
    status: "In Progress",
  },
  {
    id: 2,
    riskId: "RISK-002",
    severity: "Medium",
    description: "High promotion gap in Engineering department",
    recommendedAction: "Implement structured career development program",
    assignedTo: "Engineering Manager",
    deadline: "2024-04-01",
    status: "Open",
  },
]

const COLORS = ["#ef4444", "#f59e0b", "#10b981"]

export default function RiskAssessmentPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedRiskTopic, setSelectedRiskTopic] = useState("")
  const [assessmentData, setAssessmentData] = useState({
    peopleAffected: "",
    areaImpacted: "",
    removable: "",
    mitigation: "",
    severity: "",
    probability: "",
  })

  const countryRiskData = [
    {
      country: "Bangladesh",
      humanRights: 85,
      environmental: 70,
      sectoral: 75,
      sources: ["ILO Reports 2024", "UN Global Compact", "World Bank ESG Data"],
      lastUpdated: "2024-03-15",
    },
    {
      country: "Vietnam",
      humanRights: 60,
      environmental: 55,
      sectoral: 65,
      sources: ["OECD Guidelines", "Vietnam Labor Watch", "Environmental Protection Agency"],
      lastUpdated: "2024-03-10",
    },
    {
      country: "India",
      humanRights: 70,
      environmental: 80,
      sectoral: 60,
      sources: ["Ministry of Labour Reports", "Central Pollution Control Board", "NITI Aayog"],
      lastUpdated: "2024-03-12",
    },
    {
      country: "China",
      humanRights: 75,
      environmental: 85,
      sectoral: 70,
      sources: ["Ministry of Ecology Reports", "China Labour Bulletin", "State Council Data"],
      lastUpdated: "2024-03-08",
    },
  ]

  const genderData = departmentAnalytics.map((dept) => ({
    name: dept.department,
    Male: dept.maleEmployees,
    Female: dept.femaleEmployees,
  }))

  const workerTypeData = departmentAnalytics.map((dept) => ({
    name: dept.department,
    Permanent: dept.permanentEmployees,
    Contractual: dept.contractualEmployees,
  }))

  const riskTopics = [
    {
      id: "climate",
      name: "Climate Change",
      upstream: false,
      manufacturing: true,
      downstream: false,
      description: "Greenhouse gas emissions and climate impact from operations",
    },
    {
      id: "biodiversity",
      name: "Biodiversity Loss",
      upstream: true,
      manufacturing: false,
      downstream: false,
      description: "Impact on ecosystems and wildlife habitats",
    },
    {
      id: "water",
      name: "Water Pollution",
      upstream: true,
      manufacturing: true,
      downstream: false,
      description: "Contamination of water sources from industrial processes",
    },
    {
      id: "labor",
      name: "Labor Rights",
      upstream: false,
      manufacturing: true,
      downstream: false,
      description: "Worker rights, fair wages, and working conditions",
    },
    {
      id: "discrimination",
      name: "Discrimination",
      upstream: false,
      manufacturing: true,
      downstream: true,
      description: "Workplace discrimination based on gender, race, or other factors",
    },
    {
      id: "child-labor",
      name: "Child Labor",
      upstream: true,
      manufacturing: true,
      downstream: false,
      description: "Employment of children below legal working age",
    },
    {
      id: "forced-labor",
      name: "Forced Labor",
      upstream: true,
      manufacturing: true,
      downstream: false,
      description: "Involuntary work or services under threat of penalty",
    },
    {
      id: "safety",
      name: "Workplace Safety",
      upstream: false,
      manufacturing: true,
      downstream: false,
      description: "Occupational health and safety standards",
    },
  ]

  const riskSeverityData = [
    { risk: "Child Labor", scale: 4, scope: 5, irremediability: 5, probability: 0.3, finalRisk: 4.2 },
    { risk: "Water Pollution", scale: 3, scope: 4, irremediability: 2, probability: 0.7, finalRisk: 2.1 },
    { risk: "Labor Rights", scale: 4, scope: 3, irremediability: 3, probability: 0.6, finalRisk: 2.0 },
    { risk: "Discrimination", scale: 2, scope: 3, irremediability: 2, probability: 0.4, finalRisk: 0.9 },
  ]

  const heatmapData = riskSeverityData.map((risk) => ({
    x: risk.finalRisk,
    y: risk.probability * 100,
    name: risk.risk,
    severity: risk.finalRisk >= 3 ? "High" : risk.finalRisk >= 1.5 ? "Medium" : "Low",
  }))

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Risk Assessment & Analytics"
            description="Comprehensive risk evaluation with country, sector, and topic-specific analysis"
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="country-sector" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="country-sector">Country & Sector</TabsTrigger>
                <TabsTrigger value="risk-topics">Risk Topics</TabsTrigger>
                <TabsTrigger value="severity-calc">Severity Calculation</TabsTrigger>
                <TabsTrigger value="risk-heatmap">Risk Heatmap</TabsTrigger>
                {/* <TabsTrigger value="action-plans">Action Plans</TabsTrigger> */}
              </TabsList>

              <TabsContent value="country-sector" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Country & Sector Risk Overview
                    </CardTitle>
                    <CardDescription>
                      Select your region, country, and sector to view predefined risk exposure levels from verified data
                      sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="region">Select Region *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="americas">Americas</SelectItem>
                            <SelectItem value="africa">Africa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Select Country *</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bangladesh">Bangladesh</SelectItem>
                            <SelectItem value="vietnam">Vietnam</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="china">China</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sector">Select Sector *</Label>
                        <Select value={selectedSector} onValueChange={setSelectedSector}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="textile">Textile & Apparel</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {selectedCountry && (
                      <div className="space-y-6">
                        <Card className="bg-blue-50 border-blue-200">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              Data Sources & Credibility
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium">Risk data collected from verified sources:</p>
                                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                  {countryRiskData
                                    .find((c) => c.country.toLowerCase() === selectedCountry)
                                    ?.sources.map((source, index) => (
                                      <li key={index} className="flex items-center gap-2">
                                        <ExternalLink className="h-3 w-3" />
                                        {source}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Last updated:{" "}
                                {countryRiskData.find((c) => c.country.toLowerCase() === selectedCountry)?.lastUpdated}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Risk Exposure by Country</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                  data={countryRiskData.filter((c) => c.country.toLowerCase() === selectedCountry)}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="country" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="humanRights" fill="#ef4444" name="Human Rights" />
                                  <Bar dataKey="environmental" fill="#10b981" name="Environmental" />
                                  <Bar dataKey="sectoral" fill="#3b82f6" name="Sectoral" />
                                </BarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Country-Specific Risk Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {selectedCountry === "bangladesh" && (
                                  <>
                                    <div className="p-3 border rounded bg-red-50">
                                      <h5 className="font-medium text-red-800">High Risk Areas</h5>
                                      <ul className="text-sm text-red-700 mt-1 space-y-1">
                                        <li>• Labor rights violations in textile sector</li>
                                        <li>• Building safety standards</li>
                                        <li>• Child labor in supply chains</li>
                                      </ul>
                                    </div>
                                    <div className="p-3 border rounded bg-yellow-50">
                                      <h5 className="font-medium text-yellow-800">Medium Risk Areas</h5>
                                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                        <li>• Water pollution from dyeing</li>
                                        <li>• Workplace discrimination</li>
                                      </ul>
                                    </div>
                                  </>
                                )}
                                {selectedCountry === "vietnam" && (
                                  <>
                                    <div className="p-3 border rounded bg-yellow-50">
                                      <h5 className="font-medium text-yellow-800">Medium Risk Areas</h5>
                                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                        <li>• Working hours compliance</li>
                                        <li>• Environmental regulations</li>
                                        <li>• Freedom of association</li>
                                      </ul>
                                    </div>
                                  </>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle>Risk Analysis Summary</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold text-red-600">85</div>
                                <div className="text-sm text-muted-foreground">Human Rights Risk</div>
                              </div>
                              <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold text-green-600">70</div>
                                <div className="text-sm text-muted-foreground">Environmental Risk</div>
                              </div>
                              <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold text-blue-600">75</div>
                                <div className="text-sm text-muted-foreground">Sectoral Risk</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk-topics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Topic Assessment</CardTitle>
                    <CardDescription>
                      Select risk topics and complete detailed assessment with criteria evaluation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Select Risk Topic for Assessment</Label>
                      <Select value={selectedRiskTopic} onValueChange={setSelectedRiskTopic}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a risk topic to assess" />
                        </SelectTrigger>
                        <SelectContent>
                          {riskTopics.map((topic) => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedRiskTopic && (
                      <Card className="border-dashed">
                        <CardHeader>
                          <CardTitle className="text-base">
                            {riskTopics.find((t) => t.id === selectedRiskTopic)?.name} Assessment
                          </CardTitle>
                          <CardDescription>
                            {riskTopics.find((t) => t.id === selectedRiskTopic)?.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="people-affected">How many people are affected?</Label>
                              <Input
                                id="people-affected"
                                placeholder="e.g., 5, 10, 100"
                                value={assessmentData.peopleAffected}
                                onChange={(e) =>
                                  setAssessmentData({ ...assessmentData, peopleAffected: e.target.value })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="area-impact">How much area is impacted?</Label>
                              <Input
                                id="area-impact"
                                placeholder="e.g., local, regional, national"
                                value={assessmentData.areaImpacted}
                                onChange={(e) => setAssessmentData({ ...assessmentData, areaImpacted: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="removable">Is it possible to remove and maintain?</Label>
                            <Textarea
                              id="removable"
                              placeholder="Describe the feasibility of removing this risk and maintaining operations"
                              value={assessmentData.removable}
                              onChange={(e) => setAssessmentData({ ...assessmentData, removable: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="mitigation">How will it be mitigated?</Label>
                            <Textarea
                              id="mitigation"
                              placeholder="Describe specific mitigation strategies and action plans"
                              value={assessmentData.mitigation}
                              onChange={(e) => setAssessmentData({ ...assessmentData, mitigation: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="severity">Severity Level</Label>
                              <Select
                                value={assessmentData.severity}
                                onValueChange={(value) => setAssessmentData({ ...assessmentData, severity: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="probability">Probability of Occurrence</Label>
                              <Select
                                value={assessmentData.probability}
                                onValueChange={(value) => setAssessmentData({ ...assessmentData, probability: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select probability" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex justify-end pt-4">
                            <Button>Save Assessment</Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-center">
                        <div>Risk Topic</div>
                        <div>Upstream</div>
                        <div>Manufacturing</div>
                        <div>Downstream</div>
                      </div>

                      {riskTopics.map((topic) => (
                        <div key={topic.id} className="grid grid-cols-4 gap-4 items-center p-3 border rounded">
                          <div className="font-medium">{topic.name}</div>
                          <div className="text-center">
                            <Checkbox id={`${topic.id}-upstream`} defaultChecked={topic.upstream} />
                          </div>
                          <div className="text-center">
                            <Checkbox id={`${topic.id}-manufacturing`} defaultChecked={topic.manufacturing} />
                          </div>
                          <div className="text-center">
                            <Checkbox id={`${topic.id}-downstream`} defaultChecked={topic.downstream} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Save Risk Topic Selection</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="severity-calc" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Severity Calculation</CardTitle>
                    <CardDescription>
                      Evaluate each selected risk by Scale, Scope, and Irremediability with probability multiplier
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      {riskSeverityData.map((risk, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{risk.risk}</h4>
                            <Badge
                              variant={
                                risk.finalRisk >= 3 ? "destructive" : risk.finalRisk >= 1.5 ? "secondary" : "default"
                              }
                              className={
                                risk.finalRisk >= 3
                                  ? "bg-red-100 text-red-800"
                                  : risk.finalRisk >= 1.5
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {risk.finalRisk >= 3 ? "High" : risk.finalRisk >= 1.5 ? "Medium" : "Low"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>Scale (People Affected)</Label>
                              <Select defaultValue={risk.scale.toString()}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Very Few</SelectItem>
                                  <SelectItem value="2">2 - Few</SelectItem>
                                  <SelectItem value="3">3 - Some</SelectItem>
                                  <SelectItem value="4">4 - Many</SelectItem>
                                  <SelectItem value="5">5 - Very Many</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Scope (Impact Area)</Label>
                              <Select defaultValue={risk.scope.toString()}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Very Limited</SelectItem>
                                  <SelectItem value="2">2 - Limited</SelectItem>
                                  <SelectItem value="3">3 - Moderate</SelectItem>
                                  <SelectItem value="4">4 - Widespread</SelectItem>
                                  <SelectItem value="5">5 - Very Widespread</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Irremediability</Label>
                              <Select defaultValue={risk.irremediability.toString()}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Easily Reversible</SelectItem>
                                  <SelectItem value="2">2 - Reversible</SelectItem>
                                  <SelectItem value="3">3 - Partially Reversible</SelectItem>
                                  <SelectItem value="4">4 - Difficult to Reverse</SelectItem>
                                  <SelectItem value="5">5 - Irreversible</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Probability</Label>
                              <Input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                defaultValue={risk.probability}
                                placeholder="0.0 - 1.0"
                              />
                            </div>
                          </div>

                          <div className="bg-muted/50 p-3 rounded">
                            <div className="text-sm space-y-1">
                              <div>
                                Risk Score = (Scale + Scope + Irremediability) / 3 = ({risk.scale} + {risk.scope} +{" "}
                                {risk.irremediability}) / 3 ={" "}
                                {((risk.scale + risk.scope + risk.irremediability) / 3).toFixed(1)}
                              </div>
                              <div>
                                Final Risk = Risk Score × Probability ={" "}
                                {((risk.scale + risk.scope + risk.irremediability) / 3).toFixed(1)} × {risk.probability}{" "}
                                = <strong>{risk.finalRisk.toFixed(1)}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Recalculate Risk Scores</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk-heatmap" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Heatmap & Priority Ranking</CardTitle>
                    <CardDescription>
                      Visual representation of risks plotted by severity and probability
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Risk Heatmap</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              type="number"
                              dataKey="x"
                              name="Severity"
                              domain={[0, 5]}
                              label={{ value: "Severity", position: "insideBottom", offset: -5 }}
                            />
                            <YAxis
                              type="number"
                              dataKey="y"
                              name="Probability"
                              domain={[0, 100]}
                              label={{ value: "Probability (%)", angle: -90, position: "insideLeft" }}
                            />
                            <Tooltip
                              cursor={{ strokeDasharray: "3 3" }}
                              formatter={(value, name) => [
                                name === "x" ? `${value}` : `${value}%`,
                                name === "x" ? "Severity" : "Probability",
                              ]}
                              labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ""}
                            />
                            <Scatter data={heatmapData} fill="#8884d8">
                              {heatmapData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={
                                    entry.severity === "High"
                                      ? "#ef4444"
                                      : entry.severity === "Medium"
                                        ? "#f59e0b"
                                        : "#10b981"
                                  }
                                />
                              ))}
                            </Scatter>
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Priority Ranking</h4>
                        <div className="space-y-3">
                          {riskSeverityData
                            .sort((a, b) => b.finalRisk - a.finalRisk)
                            .map((risk, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded">
                                <div className="flex items-center gap-3">
                                  <div className="text-sm font-medium">#{index + 1}</div>
                                  <div>
                                    <div className="font-medium">{risk.risk}</div>
                                    <div className="text-sm text-muted-foreground">
                                      Score: {risk.finalRisk.toFixed(1)} | Probability:{" "}
                                      {(risk.probability * 100).toFixed(0)}%
                                    </div>
                                  </div>
                                </div>
                                <Badge
                                  variant={
                                    risk.finalRisk >= 3
                                      ? "destructive"
                                      : risk.finalRisk >= 1.5
                                        ? "secondary"
                                        : "default"
                                  }
                                  className={
                                    risk.finalRisk >= 3
                                      ? "bg-red-100 text-red-800"
                                      : risk.finalRisk >= 1.5
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }
                                >
                                  {risk.finalRisk >= 3 ? "High" : risk.finalRisk >= 1.5 ? "Medium" : "Low"}
                                </Badge>
                              </div>
                            ))}
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
