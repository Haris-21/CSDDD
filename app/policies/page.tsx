"use client"

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, FileText, Search } from "lucide-react"
import { useState } from "react"

const policies = [
  {
    id: 1,
    name: "Annual Bonus",
    dataType: "percentage",
    defaultValue: "15%",
    applicableDesignations: ["Manager", "Senior Developer", "Team Lead"],
    status: "active",
  },
  {
    id: 2,
    name: "Provident Fund",
    dataType: "percentage",
    defaultValue: "12%",
    applicableDesignations: ["All Employees"],
    status: "active",
  },
  {
    id: 3,
    name: "Medical Insurance",
    dataType: "yes/no",
    defaultValue: "Yes",
    applicableDesignations: ["Permanent Employees"],
    status: "active",
  },
  {
    id: 4,
    name: "Retirement Benefits",
    dataType: "currency",
    defaultValue: "$50,000",
    applicableDesignations: ["Senior Management"],
    status: "draft",
  },
]

export default function PoliciesPage() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Organization Policies"
            description="Manage HR and compliance policies that apply to your workforce"
          >
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </PageHeader>

          <div className="mt-6 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search policies..." className="pl-10" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Policies</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Add Policy Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Policy</CardTitle>
                  <CardDescription>Define a new organizational policy with applicable designations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="policy-name">Policy Name *</Label>
                      <Input id="policy-name" placeholder="e.g., Annual Bonus, Health Insurance" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-type">Data Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="currency">Currency</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="yes-no">Yes/No</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-value">Default Value *</Label>
                    <Input id="default-value" placeholder="Enter default value" />
                  </div>

                  <div className="space-y-3">
                    <Label>Applicable Designations *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "All Employees",
                        "Manager",
                        "Senior Developer",
                        "Team Lead",
                        "HR Manager",
                        "Operations Manager",
                        "Senior Management",
                        "Permanent Employees",
                        "Contract Employees",
                      ].map((designation) => (
                        <div key={designation} className="flex items-center space-x-2">
                          <Checkbox id={designation} />
                          <Label htmlFor={designation} className="text-sm">
                            {designation}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button>Save Policy</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Policies List */}
            <div className="grid gap-4">
              {policies.map((policy) => (
                <Card key={policy.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold">{policy.name}</h3>
                          <Badge variant={policy.status === "active" ? "default" : "secondary"}>{policy.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Data Type:</span> {policy.dataType}
                          </div>
                          <div>
                            <span className="font-medium">Default Value:</span> {policy.defaultValue}
                          </div>
                          <div>
                            <span className="font-medium">Applicable To:</span>{" "}
                            {policy.applicableDesignations.join(", ")}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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
