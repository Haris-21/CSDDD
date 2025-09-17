import { SidebarNavigation } from "@/components/sidebar-navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CompanyInfoPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader title="Vendor Setup" description="Configure your vendor profile and contact information">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </PageHeader>

          <div className="mt-6">
            <Tabs defaultValue="company-info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="company-info">Vendor Information</TabsTrigger>
                <TabsTrigger value="contact-details">Vendor Details</TabsTrigger>
              </TabsList>

              <TabsContent value="company-info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Information</CardTitle>
                    <CardDescription>
                      Basic information about your company that will be used across the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Vendor Name *</Label>
                        <Input id="company-name" placeholder="Enter Vendor name" defaultValue="Acme Corporation" className="border border-neutral-300 bg-white"/>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Vendor-website">Vendor Website</Label>
                        <Input
                          id="company-website"
                          type="url"
                          placeholder="https://www.example.com"
                          defaultValue="https://www.acmecorp.com"
                          className="border border-neutral-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter complete company address"
                        defaultValue="123 Business District, Suite 400"
                        rows={3}
                        className="border border-neutral-300 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select defaultValue="us" >
                          <SelectTrigger className="border border-neutral-300">
                            <SelectValue placeholder="Select country" />
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
                        <Label htmlFor="state">State/Province *</Label>
                        <Select defaultValue="ca">
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
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Enter city" defaultValue="San Francisco" className="border border-neutral-300 bg-white"/>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code *</Label>
                        <Input id="postal-code" placeholder="Enter postal code" defaultValue="94105" className="border border-neutral-300 bg-white"/>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector *</Label>
                        <Select defaultValue="textile">
                          <SelectTrigger className="border border-neutral-300 bg-white">
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="textile">Textile</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-type">Vendor Type *</Label>
                        <Select defaultValue="buyer">
                          <SelectTrigger className="border border-neutral-300 bg-white">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="buyer">Buyer/Brand</SelectItem>
                            <SelectItem value="supplier">Supplier</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact-details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>Primary contact information for your Vendor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-phone">Vendor Contact Number *</Label>
                        <Input
                          id="company-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          defaultValue="+1 (415) 555-0123"
                          className="border border-neutral-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-email">Vendor Email *</Label>
                        <Input
                          id="company-email"
                          type="email"
                          placeholder="contact@company.com"
                          defaultValue="contact@acmecorp.com"
                          className="border border-neutral-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alt-email">Alternative Email</Label>
                      <Input
                        id="alt-email"
                        type="email"
                        placeholder="alternative@company.com"
                        defaultValue="info@acmecorp.com"
                        className="border border-neutral-300 bg-white"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Link href="/vendor">
                        <Button>
                          Continue to Vendors 
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
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
