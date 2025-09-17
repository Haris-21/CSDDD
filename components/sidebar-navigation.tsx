"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Building2,
  MapPin,
  FileText,
  Users,
  Shield,
  TrendingUp,
  Package,
  Target,
  MessageSquare,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Globe,
  Scale,
  ClipboardCheck,
} from "lucide-react"

const navigationItems = [
  {
    title: "Company Setup",
    items: [
      { name: "Company Dashboard", href: "/", icon:  LayoutDashboard  },
      { name: "Company Information", href: "/company/info", icon: Building2 },
      { name: "Company Detail", href: "/company/company-detail", icon: Building2 },
    
    ],
  },
  {
    title: "Sites Management",
    items: [
      { name: "Add Site", href: "/sites/add", icon: MapPin },
      { name: "Site Grid", href: "/sites", icon:  Globe  },
    ],
  },
  {
    title: "Employee Onboarding",
    items: [
      { name: "Add Employee", href: "/employees/add", icon: Users },
      { name: "Employee List", href: "/employees", icon: Users },
      { name: "Add Policies", href: "/policies/add", icon: Scale },
      { name: "Policies List", href: "/policies", icon: Scale },
    ],
  },
   {
    title: "Departments",
    items: [
      { name: "Departments ", href: "/departments", icon: Shield }
    ],
  },
  {
    title: "Supply Chain",
    items: [
      { name: "Add Product", href: "/products/add", icon: Package },
      { name: "Product List", href: "/products", icon: Package },
      { name: "Add Vendor", href: "/vendor/add", icon: Building2 },
      { name: "Vendor List", href: "/vendor", icon: Building2 },
      { name: "Due Diligence Scope", href: "/due-diligence", icon: Target },
    ],
  },
    {
    title: "Compliance & Risk",
    items: [
      { name: "Risk Assessment", href: "/risk-assessment", icon: TrendingUp },
      { name: "Task Management", href: "/task", icon: ClipboardCheck },

    ],
  },
  {
    title: "Governance",
    items: [
      { name: "Grievance System", href: "/grievance", icon: MessageSquare },
      { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
    ],
  },
]

export function SidebarNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <h1 className="text-lg font-semibold text-sidebar-foreground">CSDDD Platform</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-6">
          {navigationItems.map((section, index) => (
            <div key={index} className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-3 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                          isCollapsed && "px-2",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                        {!isCollapsed && <span>{item.name}</span>}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
      
    </div>
  )
}
