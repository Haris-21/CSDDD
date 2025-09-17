"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Vendor = {
  id: number;
  name: string;
  country: string;
  processes: string[];
  productsCount: number;
  riskScore: number;
};

type VendorContextType = {
  vendors: Vendor[];
  addVendor: (vendor: Vendor) => void;
  updateVendor: (vendor: Vendor) => void;
  deleteVendor: (id: number) => void;
};

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<Vendor[]>([
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
  ]);

  const addVendor = (vendor: Vendor) => {
    setVendors((prev) => [...prev, { ...vendor, id: prev.length + 1 }]);
  };

  const updateVendor = (vendor: Vendor) => {
    setVendors((prev) => prev.map((v) => (v.id === vendor.id ? vendor : v)));
  };

  const deleteVendor = (id: number) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <VendorContext.Provider value={{ vendors, addVendor, updateVendor, deleteVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendors = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error("useVendors must be used within a VendorProvider");
  return context;
};
