import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SitesProvider } from "@/Context/siteContext"
import { EmployeesProvider } from "@/Context/EmployeeContext"
import { VendorProvider } from "@/Context/vendorContext"
import { ChainProvider } from "@/Context/chainContext"
import { ProductProvider } from "@/Context/productContext"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "CSDDD Compliance Platform",
  description: "Corporate Sustainability Due Diligence Directive Compliance Management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable} ${GeistMono.variable}`}>
           <Suspense fallback={null}>
            <SitesProvider>
                <EmployeesProvider>
                  <VendorProvider>
                          <ChainProvider>
                              <ProductProvider>
                                  {children}
                              </ProductProvider>
                          </ChainProvider>
                  </VendorProvider>
                </EmployeesProvider>
            </SitesProvider>
            </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
