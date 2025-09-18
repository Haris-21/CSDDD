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
import { Save, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCompany } from "@/Context/companyContext"
import { useEffect, useState } from "react"

export default function CompanyInfoPage() {

  const [form, setForm] = useState({
    name: "Acme Corporation",
    website: "https://www.acmecorp.com",
    address: "123 Business District, Suite 400",
    country: "us",
    state: "ca",
    city: "San Francisco",
    postalCode: "94105",
    sector: "textile",
    type: "buyer",
    phone: "+1 (415) 555-0123",
    email: "contact@acmecorp.com",
    altEmail: "info@acmecorp.com",
  });

  const { company, saveCompany, updateCompany } = useCompany();

  // state for form fields
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [sector, setSector] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [altEmail, setAltEmail] = useState("");

  // prefill when editing
  useEffect(() => {
    if (company) {
      setName(company.name);
      setWebsite(company.website || "");
      setAddress(company.address);
      setCountry(company.country);
      setState(company.state);
      setCity(company.city);
      setPostalCode(company.postalCode);
      setSector(company.sector);
      setType(company.type);
      setPhone(company.phone);
      setEmail(company.email);
      setAltEmail(company.altEmail || "");
    }
  }, [company]);

  const handleSave = () => {
    const formData = {
      name,
      website,
      address,
      country,
      state,
      city,
      postalCode,
      sector,
      type,
      phone,
      email,
      altEmail,
    };

    if (company) {
      updateCompany(formData); // update existing
    } else {
      saveCompany(formData); // first-time save
    }
  };
  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader title="Company Setup" description="Configure your company profile and contact information">
            <Button  onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </PageHeader>

          <div className="mt-6 space-y-6">  
             
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>
                      Basic information about your company that will be used across the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name *</Label>
                        <Input id="company-name" placeholder="Enter company name" defaultValue="Acme Corporation" className="border border-neutral-300 bg-white"
                        value={name} onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-website">Company Website</Label>
                        <Input
                          id="company-website"
                          type="url"
                          placeholder="https://www.example.com"
                          defaultValue="https://www.acmecorp.com"
                          className="border border-neutral-300 bg-white"
                          value={website} onChange={(e) => setWebsite(e.target.value)}
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
                         value={address} onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select defaultValue="United States"  value={country} onValueChange={(e) => setCountry(e)}>
                          <SelectTrigger className="border border-neutral-300">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Japan">Japan</SelectItem>
                            <SelectItem value="India">India</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province *</Label>
                        <Select defaultValue="California" value={state} onValueChange={(e) => setState(e)}>
                          <SelectTrigger className="border border-neutral-300">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="California">California</SelectItem>
                            <SelectItem value="New York">New York</SelectItem>
                            <SelectItem value="Texas">Texas</SelectItem>
                            <SelectItem value="Florida">Florida</SelectItem>
                            <SelectItem value="Illinois">Illinois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Enter city" defaultValue="San Francisco" className="border border-neutral-300 bg-white"
                        value={city} onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code *</Label>
                        <Input id="postal-code" placeholder="Enter postal code" defaultValue="94105" className="border border-neutral-300 bg-white"
                        value={postalCode}  onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector *</Label>
                        <Select defaultValue="Textile" value={sector} onValueChange={(e) => setSector(e)}>
                          <SelectTrigger className="border border-neutral-300 bg-white">
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Textile">Textile</SelectItem>
                            <SelectItem value="Logistics">Logistics</SelectItem>
                            <SelectItem value="Medicine">Medicine</SelectItem>
                            <SelectItem value="Automotive">Automotive</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-type">Company Type *</Label>
                        <Select defaultValue="Buyer/Brand" value={type} onValueChange={(e) => setType(e)}>
                          <SelectTrigger className="border border-neutral-300 bg-white">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Buyer/Brand">Buyer/Brand</SelectItem>
                            <SelectItem value="Supplier">Supplier</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>         
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>Primary contact information for your company</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-phone">Company Contact Number *</Label>
                        <Input
                          id="company-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          defaultValue="+1 (415) 555-0123"
                          className="border border-neutral-300 bg-white"
                          value={phone}  onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-email">Company Email *</Label>
                        <Input
                          id="company-email"
                          type="email"
                          placeholder="contact@company.com"
                          defaultValue="contact@acmecorp.com"
                          className="border border-neutral-300 bg-white"
                          value={email} onChange={(e) => setEmail(e.target.value)}
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
                        value={altEmail} onChange={(e) => setAltEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Link href="/company/company-detail">
                        <Button>
                          View Company Details
                          <ArrowRight className="h-4 w-4 ml-2" />
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
