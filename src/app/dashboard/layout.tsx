import NavBar from "@/shared/components/Navbar"
import Sidebar from "@/shared/components/Sidebar"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="page-bg dashboard-layout">
      <NavBar />
      <Sidebar />
      {children}
    </section>
  )
}