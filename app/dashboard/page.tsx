'use client'

import { useState } from "react"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { StatsCards } from "@/components/StatsCards"
import { TradersTable } from "@/components/TradersTable"
import { DepositSetup } from "@/components/DepositSetup"
import { Administration } from "@/components/AdminisTration"
import { UserVerification } from "@/components/UserVerification"
import { Navbar } from "@/components/Navbar"
import { ActionPanel } from "@/components/ActionPanel"

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Grid utama: Sidebar kiri, Main Content, Action Panel kanan */}
      <div className="flex-1 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[280px_1fr_280px] gap-4 h-[calc(100vh-4rem)]">
        {/* Sidebar kiri */}
        <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        {/* Konten utama */}
        <main className="flex flex-col flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* StatsCards di atas */}
          <StatsCards />

          {/* Konten utama di bawah StatsCards */}
          <div className="mt-6 w-full flex-1">
            {activeItem === "Dashboard" && <TradersTable />}
            {activeItem === "Users Verification" && <UserVerification />}
            {activeItem === "Deposit Setup" && <DepositSetup />}
            {activeItem === "Administration" && <Administration />}
          </div>
        </main>

        {/* Action Panel kanan */}
        <ActionPanel />
      </div>
    </div>
  )
}
