// app/Context/siteContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Site = {
  id: number;
  name: string;
  country: string;
  address: string;
  website: string;
  employees: number;
  type: string;
  postalcode: string;
  province: string;
};

type SitesContextType = {
  sites: Site[];
  addSite: (site: Site) => void;
  updateSite: (site: Site) => void;
};

const SitesContext = createContext<SitesContextType | undefined>(undefined);

export function SitesProvider({ children }: { children: ReactNode }) {
  const [sites, setSites] = useState<Site[]>([
    {
      id: 1,
      name: "San Francisco Headquarters",
      country: "United States",
      address: "123 Business District, Suite 400, San Francisco, CA 94105",
      website: "https://sf.acmecorp.com",
      employees: 245,
      type: "Headquarters",
      postalcode: "94105",
      province: "California",
    },
    {
      id: 2,
      name: "Austin Manufacturing Plant",
      country: "United States",
      address: "456 Industrial Blvd, Austin, TX 78701",
      website: "https://austin.acmecorp.com",
      employees: 892,
      type: "Manufacturing",
      postalcode: "78701",
      province: "Texas",
    },
    {
      id: 3,
      name: "London Office",
      country: "United Kingdom",
      address: "789 Canary Wharf, London E14 5AB",
      website: "https://london.acmecorp.com",
      employees: 156,
      type: "Office",
      postalcode: "34566",
      province: "England",
    },
  ]);

  const addSite = (site: Site) => setSites((prev) => [...prev, site]);

  const updateSite = (site: Site) =>
    setSites((prev) => prev.map((s) => (s.id === site.id ? site : s)));

  return (
    <SitesContext.Provider value={{ sites, addSite, updateSite }}>
      {children}
    </SitesContext.Provider>
  );
}

export function useSites() {
  const ctx = useContext(SitesContext);
  if (!ctx) throw new Error("useSites must be used within a SitesProvider");
  return ctx;
}
