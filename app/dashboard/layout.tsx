'use client'

import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Navbar } from "@/components/Navbar"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ActionPanel } from "@/components/dashboard/ActionPanel"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen bg-gray-200 font-roboto overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Grid utama */}
      <div className="flex-1 grid grid-cols-[260px_1fr_260px] gap-1 overflow-hidden">
        {/* Sidebar kiri */}
        <DashboardSidebar activePath={pathname} />

        {/* Main content */}
        <main className="flex flex-col bg-gray-200 rounded-xl overflow-hidden">
          {/* StatsCards di atas */}
          <div className="flex-shrink-0">
            <StatsCards />
          </div>

          {/* Isi konten scrollable */}
          <div className="flex-1 overflow-auto px-1 mb-3 mt-1">
            {children}
          </div>
        </main>

        {/* Action panel kanan */}
        <ActionPanel />
      </div>
    </div>
  )
}
