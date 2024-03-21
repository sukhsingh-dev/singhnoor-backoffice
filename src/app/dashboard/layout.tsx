import NavBar from "@/shared/components/Navbar"
import Sidebar from "@/shared/components/Sidebar"
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  if (!session || !session?.user) {
    redirect('/')
  }

  return (
    <section className="page-bg dashboard-layout">
      <NavBar />
      <Sidebar />
      {children}
    </section>
  )
}