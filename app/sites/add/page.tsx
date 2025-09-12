"use client";

import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { sites } from "../page";


export default function AddSitePage() {

  const searchParams = useSearchParams()
  const siteId = searchParams.get("id")
  const siteToEdit =  (sites ?? []).find((site) => site.id === Number(siteId))

  // state for form fields
  const [siteName, setSiteName] = useState("")
  const [siteWebsite, setSiteWebsite] = useState("")
  const [siteAddress, setSiteAddress] = useState("")
const [siteCountry, setSiteCountry] = useState<string>("")
  const [postalCode, setPostalCode] = useState("")

  useEffect(() => {
    if (siteToEdit) {
      setSiteName(siteToEdit.name)
      setSiteWebsite(siteToEdit.website || "")
      setSiteAddress(siteToEdit.address)
      // setSiteCountry(siteToEdit.country)
      setPostalCode("12345") // example: you may add this in sites data later
    }

    if (siteToEdit?.country) {
    setSiteCountry(siteToEdit.country) // pre-fill when editing
  }
  }, [siteToEdit])

  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader title="Add New Site" description="Register a new company location, factory, warehouse, or office">
            <div className="flex gap-2">
              <Link href="/sites">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sites
                </Button>
              </Link>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                        {siteToEdit ? "Update Site" : "Save Site"}
              </Button>
            </div>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="site-info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="site-info">Site Information</TabsTrigger>
                <TabsTrigger value="contact-person">Contact Person</TabsTrigger>
              </TabsList>

              <TabsContent value="site-info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Site Information</CardTitle>
                    <CardDescription>Basic information about the site location and operations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name *</Label>
                        <Input id="site-name"    
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)} placeholder="e.g., Austin Manufacturing Plant" 
                        className="border border-neutral-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="site-website">Site Website</Label>
                        <Input id="site-website" 
                        value={siteWebsite}
                        onChange={(e) => setSiteWebsite(e.target.value)} type="url" placeholder="https://site.example.com"
                        className="border border-neutral-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="site-address">Site Address *</Label>
                      <Textarea id="site-address"   
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)} className="border border-neutral-300"
                       placeholder="Enter complete site address" rows={3} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="site-country">Country *</Label>
                        <Select  onValueChange={setSiteCountry} >
                          <SelectTrigger className="border border-neutral-300">
                            {/* <SelectValue className="text-black" placeholder="Select country" /> */}
                            {siteCountry}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="site-state">State/Province *</Label>
                        <Select>
                          <SelectTrigger className="border border-neutral-300">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                            <SelectItem value="il">Illinois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="site-postal">Postal Code *</Label>
                        <Input id="site-postal"  
                        value={postalCode}
                        className="border border-neutral-300 bg-white"
                        onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter postal code" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact-person" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Site Contact Person</CardTitle>
                    <CardDescription>Primary contact person for this site location</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Contact Person Name *</Label>
                        <Input id="contact-name" placeholder="Enter full name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation *</Label>
                        <Select>
                          <SelectTrigger className="border border-neutral-300 bg-white">
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="site-manager">Site Manager</SelectItem>
                            <SelectItem value="operations-manager">Operations Manager</SelectItem>
                            <SelectItem value="plant-manager">Plant Manager</SelectItem>
                            <SelectItem value="facility-manager">Facility Manager</SelectItem>
                            <SelectItem value="hr-manager">HR Manager</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email Address *</Label>
                        <Input id="contact-email" type="email" placeholder="contact@site.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-alt-email">Alternative Email</Label>
                        <Input id="contact-alt-email" type="email" placeholder="alternative@site.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-mobile">Mobile Number *</Label>
                      <Input id="contact-mobile" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div className="flex justify-end pt-4">
                         <Button>{siteToEdit ? "Update Site & Continue" : "Save Site & Continue"}</Button>
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
