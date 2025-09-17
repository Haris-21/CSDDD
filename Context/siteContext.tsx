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
    }
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
