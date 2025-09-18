"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Template = {
  id: number;
  title: string;
  description: string;
  category: string;
};

export type Diligence = {
  id: number;
  title: string;
  description: string;
  category: string;
  questions: string[];
};

type DiligenceContextType = {
  templates: Template[];
  selectedTemplate: Template | null;
  activeDiligences: Diligence[];
  selectTemplate: (template: Template) => void;
  addDiligence: (diligence: Omit<Diligence, "id">) => void;
};

const DiligenceContext = createContext<DiligenceContextType | undefined>(
  undefined
);

export const DiligenceProvider = ({ children }: { children: ReactNode }) => {
  const [templates] = useState<Template[]>([
    { id: 1, title: "Supplier Audit", description: "Audit of supplier facilities.", category: "Audit" },
    { id: 2, title: "Risk Assessment", description: "Identify potential risks in supply chain.", category: "Assessment" },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeDiligences, setActiveDiligences] = useState<Diligence[]>([]);

  const selectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const addDiligence = (diligence: Omit<Diligence, "id">) => {
    setActiveDiligences((prev) => [
      ...prev,
      { ...diligence, id: prev.length + 1 },
    ]);
    setSelectedTemplate(null); // clear after submission
  };

  return (
    <DiligenceContext.Provider
      value={{ templates, selectedTemplate, activeDiligences, selectTemplate, addDiligence }}
    >
      {children}
    </DiligenceContext.Provider>
  );
};

export const useDiligence = () => {
  const context = useContext(DiligenceContext);
  if (!context) throw new Error("useDiligence must be used within DiligenceProvider");
  return context;
};
