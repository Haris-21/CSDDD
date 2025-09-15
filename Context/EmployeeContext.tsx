"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Employee = {
  id: number;
  name: string;
  designation: string;
  department: string;
  workerType: string;
  employmentType: string;
  wage: string;
  site: string;
};

type EmployeeContextType = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Smith",
      designation: "Senior Developer",
      department: "Engineering",
      workerType: "Local",
      employmentType: "Permanent",
      wage: "$85,000/year",
      site: "San Francisco HQ",
    },
    {
      id: 2,
      name: "Maria Garcia",
      designation: "Operations Manager",
      department: "Operations",
      workerType: "Local",
      employmentType: "Permanent",
      wage: "$75,000/year",
      site: "Austin Plant",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      designation: "Quality Inspector",
      department: "Quality Assurance",
      workerType: "Migrant",
      employmentType: "Contractual",
      wage: "$22/hour",
      site: "Austin Plant",
    },
  ]);

  const addEmployee = (employee: Employee) =>
    setEmployees((prev) => [...prev, { ...employee, id: Date.now() }]);

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("useEmployees must be used within EmployeesProvider");
  return context;
};
