'use client'

import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Navbar } from "@/components/Navbar"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ActionPanel } from "@/components/dashboard/ActionPanel"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Grid utama */}
      <div className="flex-1 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[280px_1fr_280px] gap-4 h-[calc(100vh-4rem)]">
        {/* Sidebar kiri */}
        <DashboardSidebar activePath={pathname} />

        {/* Konten utama */}
        <main className="flex flex-col flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <StatsCards />
          <div className="mt-6 w-full flex-1">{children}</div>
        </main>

        {/* Action Panel kanan */}
        <ActionPanel />
      </div>
    </div>
  )
}
