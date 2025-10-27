'use client'

import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Navbar } from "@/components/Navbar"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ActionPanel } from "@/components/dashboard/ActionPanel"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Grid utama */}
      <div className="flex-1 grid grid-cols-[260px_1fr_280px] gap-0 h-[calc(100vh-4rem)] relative">
        {/* Sidebar kiri */}
        <DashboardSidebar activePath={pathname} />

        {/* Main content */}
        <main className="flex flex-col flex-1 overflow-y-auto py-6 relative z-10 p-4">
          <StatsCards />
          <div className="mt-6 flex-1">
            {children}
          </div>
        </main>

        {/* Action Panel kanan */}
        <ActionPanel />
      </div>
    </div>
  )
}
