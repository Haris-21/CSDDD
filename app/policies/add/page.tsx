
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
import { Plus, Edit, Trash2, FileText, Search, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const designationsList = [
  "All Employees",
  "Manager",
  "Senior Developer",
  "Team Lead",
  "HR Manager",
  "Operations Manager",
  "Senior Management",
  "Permanent Employees",
  "Contract Employees",
]

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([
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
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    dataType: "",
    defaultValue: "",
    applicableDesignations: [] as string[],
    status: "active",
  })

  const handleCheckboxChange = (designation: string) => {
    setFormData((prev) => {
      if (prev.applicableDesignations.includes(designation)) {
        return {
          ...prev,
          applicableDesignations: prev.applicableDesignations.filter((d) => d !== designation),
        }
      } else {
        return { ...prev, applicableDesignations: [...prev.applicableDesignations, designation] }
      }
    })
  }

  const handleSave = () => {
    if (!formData.name || !formData.dataType || !formData.defaultValue) return

    if (editingIndex !== null) {
      // update existing
      const updated = [...policies]
      updated[editingIndex] = { ...updated[editingIndex], ...formData }
      setPolicies(updated)
    } else {
      // add new
      const newPolicy = { id: Date.now(), ...formData }
      setPolicies((prev) => [...prev, newPolicy])
    }

    // reset
    setFormData({ name: "", dataType: "", defaultValue: "", applicableDesignations: [], status: "active" })
    setEditingIndex(null)
    setShowForm(false)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(policies[index])
    setShowForm(true)
  }

  const handleDelete = (index: number) => {
    setPolicies((prev) => prev.filter((_, i) => i !== index))
  }

  // 🔹 NEW STATES FOR SEARCH & FILTER
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 🔹 FILTERED POLICIES
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.dataType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.applicableDesignations.some((d) =>
        d.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesStatus =
      statusFilter === "all" ? true : policy.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Organization Policies"
            description="Manage HR and compliance policies that apply to your workforce"
          >
            <Button onClick={() => { setShowForm(!showForm); setEditingIndex(null) }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </PageHeader>

        
          

          <div className="mt-6 space-y-6">
          
   
            {/* Add Policy Form */}
               <Card>
                <CardHeader>
                  <CardTitle>{editingIndex !== null ? "Edit Policy" : "Add New Policy"}</CardTitle>
                  <CardDescription>
                    {editingIndex !== null ? "Update the policy details" : "Define a new organizational policy"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Policy Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Annual Bonus, Health Insurance"
                        className="border border-neutral-300 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Data Type *</Label>
                      <Select
                        value={formData.dataType}
                        onValueChange={(value) => setFormData({ ...formData, dataType: value })}
                      >
                        <SelectTrigger className="border border-neutral-300 bg-white">
                          <SelectValue placeholder="Select data type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="currency">Currency</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="yes/no">Yes/No</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Value *</Label>
                    <Input
                      value={formData.defaultValue}
                      onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
                      placeholder="Enter default value"
                      className="border border-neutral-300 bg-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Applicable Designations *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {designationsList.map((designation) => (
                        <div key={designation} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.applicableDesignations.includes(designation)}
                            onCheckedChange={() => handleCheckboxChange(designation)}
                          />
                          <Label className="text-sm">{designation}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave}>
                      {editingIndex !== null ? "Update Policy" : "Save Policy"}
                    </Button>
                    <Button variant="outline" onClick={() => { setShowForm(false); setEditingIndex(null) }}>
                      Cancel
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
