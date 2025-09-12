import { redirect } from "next/navigation"

export default function CompanyContactPage() {
  // Redirect to the main company info page with contact tab
  redirect("/company/info#contact-details")
}
