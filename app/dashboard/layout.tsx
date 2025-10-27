// app/dashboard/layout.tsx
'use client'

import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Navbar } from "@/components/Navbar"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ActionPanel } from "@/components/dashboard/ActionPanel"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen bg-[#EAEAEA]">
      {/* Navbar */}
      <Navbar />

      {/* Grid utama: sidebar kiri, main, action panel kanan */}
      <div className="flex-1 grid grid-cols-[260px_1fr_260px] gap-4 h-[calc(100vh-4rem)]">
        {/* Sidebar kiri */}
        <DashboardSidebar activePath={pathname} />

        {/* Main content */}
        <main className="flex bg-[#EAEAEA] flex-col flex-1 overflow-y-auto overflow-x-auto p-4 rounded-xl relative z-10">
          <StatsCards />
          <div className="mt-6 flex-1 min-w-full">
            {children}
          </div>
        </main>

        {/* Action Panel kanan */}
        <ActionPanel />
      </div>
    </div>
  )
}
