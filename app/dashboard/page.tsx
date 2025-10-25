'use client'

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatsCards } from "@/components/StatsCards";
import { ActionPanel } from "@/components/ActionPanel";
import { TradersTable } from "@/components/TradersTable";
import { DepositSetup } from "@/components/DepositSetup";
import { Administration } from "@/components/AdminisTration";
import { UserVerification } from "@/components/UserVerification";

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="grid grid-cols-[auto_1fr_auto] min-h-screen">
      {/* Sidebar kiri */}
      <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Konten utama */}
      <main className="flex flex-col flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Search className="text-muted-foreground" />
            <Input placeholder="Cari sesuatu..." className="w-64" disabled />
          </div>
          <Bell className="text-muted-foreground cursor-pointer" />
        </div>

        {/* StatsCards selalu tampil di atas */}
        <StatsCards />

        {/* Konten utama di bawah StatsCards */}
        <div className="mt-6">
          {activeItem === "Dashboard" && <TradersTable />}
          {activeItem === "Users Verification" && <UserVerification />}
          {activeItem === "Deposit Setup" && <DepositSetup />}
          {activeItem === "Administration" && <Administration />}
        </div>
      </main>

      {/* Panel kanan (sticky & responsif) */}
      <div className="hidden lg:block w-[280px] xl:w-[320px] border-l bg-background p-4 sticky top-0 h-screen">
        <ActionPanel />
      </div>
    </div>
  );
}
