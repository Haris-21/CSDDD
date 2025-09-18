"use client";

import { SidebarNavigation } from "@/components/sidebar-navigation";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendors } from "@/Context/vendorContext";

export default function VendorInfoPage() {

    const router = useRouter();
  const { addVendor } = useVendors();

  // Local form state
  const [vendor, setVendor] = useState({
    name: "",
    website: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    sector: "",
    type: "",
    phone: "",
    email: "",
    altEmail: "",
  });

  const handleChange = (field: string, value: string) => {
    setVendor((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
       if (!vendor.name || !vendor.country) {
      alert("Please fill required fields (Vendor Name & Country)");
      return;
    }

    // Map form data → VendorContext type
    addVendor({
      id: Date.now(),
      name: vendor.name,
      country: vendor.country,
      processes: [
        vendor.sector || "N/A",
        vendor.type || "N/A",
        vendor.city || "N/A",
      ],
      productsCount: vendor.postalCode ? Number(vendor.postalCode.length) : 0, // example mapping
      riskScore: Math.floor(Math.random() * 100), // demo score
    });

    router.push("/vendor"); // back to vendor list
  };


  return (
    <div className="flex h-screen bg-background">
      <SidebarNavigation />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <PageHeader
            title="Vendor Setup"
            description="Configure your vendor profile and contact information"
          >
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Add Vendor 
            </Button>
          </PageHeader>

          <div className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Information</CardTitle>
                    <CardDescription>
                      Basic information about your company that will be used
                      across the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Vendor Name *</Label>
                        <Input
                          id="company-name"
                          placeholder="Enter Vendor name"
                          defaultValue="Acme Corporation"
                          className="border border-neutral-300 bg-white"
                          value={vendor.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Vendor-website">Vendor Website</Label>
                        <Input
                          id="company-website"
                          type="url"
                          placeholder="https://www.example.com"
                          defaultValue="https://www.acmecorp.com"
                          className="border border-neutral-300 bg-white"
                          value={vendor.website}
                          onChange={(e) => handleChange("website", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter complete vendor address"
                        defaultValue="123 Business District, Suite 400"
                        rows={3}
                        className="border border-neutral-300 outline-none"
                        value={vendor.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select defaultValue="United States" 
                          onValueChange={(val) => handleChange("country", val)}
                          value={vendor.country}>
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
                        <Select defaultValue="ca"
                          onValueChange={(val) => handleChange("state", val)}
                          value={vendor.state}>
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
                        <Input
                          id="city"
                          placeholder="Enter city"
                          defaultValue="San Francisco"
                          className="border border-neutral-300 bg-white"
                          value={vendor.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code *</Label>
                        <Input
                          id="postal-code"
                          placeholder="Enter postal code"
                          defaultValue="94105"
                          className="border border-neutral-300 bg-white"
                          value={vendor.postalCode}
                      onChange={(e) => handleChange("postalCode", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector *</Label>
                        <Select defaultValue="textile" 
                        onValueChange={(val) => handleChange("sector", val)}
                          value={vendor.sector}>
                          <SelectTrigger className="border border-neutral-300 bg-white">
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="textile">Textile</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="automotive">
                              Automotive
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* <div className="space-y-2">
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
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Details</CardTitle>
                    <CardDescription>
                      Primary contact information for your Vendor
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-phone">
                          Vendor Contact Number *
                        </Label>
                        <Input
                          id="company-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          defaultValue="+1 (415) 555-0123"
                          className="border border-neutral-300 bg-white"
                            value={vendor.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
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
                          value={vendor.email}
                          onChange={(e) => handleChange("email", e.target.value)}
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
                         value={vendor.altEmail}
                        onChange={(e) => handleChange("altEmail", e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSubmit}>
                          Add Vendor & Give Access
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>                       
                    </div>
                  </CardContent>
                </Card>
        
          </div>
        </div>
      </main>
    </div>
  );
}
