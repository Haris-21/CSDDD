"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Company = {
  name: string;
  website?: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  sector: string;
  type: string;
  phone: string;
  email: string;
  altEmail?: string;
};

type CompanyContextType = {
  company: Company | null;
  saveCompany: (data: Company) => void;
    updateCompany: (data: Partial<Company>) => void; // only update given fields
};

const CompanyContext = createContext<CompanyContextType | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company | null>({
    name: "TechNova Solutions",
    website: "https://technova.com",
    address: "123 Innovation Street",
    country: "USA",
    state: "California",
    city: "San Francisco",
    postalCode: "94105",
    sector: "Software",
    type: "Private Limited",
    phone: "+1 (555) 123-4567",
    email: "info@technova.com",
    altEmail: "support@technova.com",
  });

  const saveCompany = (data: Company) => {
    setCompany(data);
  };

   // Update existing company fields
  const updateCompany = (data: Partial<Company>) => {
    setCompany((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <CompanyContext.Provider value={{ company, saveCompany , updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error("useCompany must be used within CompanyProvider");
  return context;
};
