"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Stage = {
  id: number;
  stage: string;
  location: string;
  supplier: string;
  process: string;
  coordinates: { lat: number; lng: number };
  riskLevel: "low" | "medium" | "high";
  certifications: string[];
};

type Material = {
  id: number;
  name: string;
  percentage: number;
  origin: string;
  risk: "low" | "medium" | "high";
};

type ChainContextType = {
  supplyChainStages: Stage[];
  materials: Material[];
  addStage: (stage: Stage) => void;
  updateStage: (stage: Stage) => void;
  deleteStage: (id: number) => void;
  addMaterial: (material: Material) => void;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (id: number) => void;
};

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const ChainProvider = ({ children }: { children: ReactNode }) => {
  const [supplyChainStages, setStages] = useState<Stage[]>([
    {
      id: 1,
      stage: "Raw Material",
      location: "Gujarat, India",
      supplier: "Gujarat Cotton Farms",
      process: "Cotton Growing",
      coordinates: { lat: 23.0225, lng: 72.5714 },
      riskLevel: "low",
      certifications: ["GOTS", "Organic"],
    },
    {
      id: 2,
      stage: "Fiber Processing",
      location: "Tamil Nadu, India",
      supplier: "Chennai Textile Mills",
      process: "Cotton Ginning & Carding",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      riskLevel: "medium",
      certifications: ["OEKO-TEX"],
    },
    {
      id: 3,
      stage: "Fabric Production",
      location: "Dhaka, Bangladesh",
      supplier: "Dhaka Weaving Co.",
      process: "Weaving & Knitting",
      coordinates: { lat: 23.8103, lng: 90.4125 },
      riskLevel: "high",
      certifications: ["WRAP"],
    },
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, name: "Organic Cotton", percentage: 95, origin: "India", risk: "low" },
    { id: 2, name: "Elastane", percentage: 5, origin: "China", risk: "medium" },
  ]);

  // --- Stage Handlers ---
  const addStage = (stage: Stage) => setStages((prev) => [...prev, { ...stage, id: prev.length + 1 }]);
  const updateStage = (stage: Stage) =>
    setStages((prev) => prev.map((s) => (s.id === stage.id ? stage : s)));
  const deleteStage = (id: number) => setStages((prev) => prev.filter((s) => s.id !== id));

  // --- Material Handlers ---
  const addMaterial = (material: Material) =>
    setMaterials((prev) => [...prev, { ...material, id: prev.length + 1 }]);
  const updateMaterial = (material: Material) =>
    setMaterials((prev) => prev.map((m) => (m.id === material.id ? material : m)));
  const deleteMaterial = (id: number) => setMaterials((prev) => prev.filter((m) => m.id !== id));

  return (
    <ChainContext.Provider
      value={{ supplyChainStages, materials, addStage, updateStage, deleteStage, addMaterial, updateMaterial, deleteMaterial }}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  const context = useContext(ChainContext);
  if (!context) throw new Error("useChain must be used within a ChainProvider");
  return context;
};
