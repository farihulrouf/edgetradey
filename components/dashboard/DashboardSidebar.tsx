'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Wallet, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { PendingDeposit } from "./cards/PendingDeposit"
import { PendingWithdrawal } from "./cards/PendingWithdrawal"
import { PendingWithdrawalDialog } from "./PendingWithdrawalDialog"

interface DashboardSidebarProps {
  activePath: string
}

export const DashboardSidebar = ({ activePath }: DashboardSidebarProps) => {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const navigationItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Users Verification", icon: Users, path: "/dashboard/user_verification" },
    { label: "Deposit Setup", icon: Wallet, path: "/dashboard/deposit_setup" },
    { label: "Administration", icon: Settings, path: "/dashboard/administration" },
  ]

  const pendingDeposits = [
    { user: "Kutay Can", type: "Bank", amount: "$500", approved: "$500" },
    { user: "Ahmet Amca", type: "Crypto", amount: "$500", approved: "$500" },
  ]

  const pendingWithdrawals = [
    { user: "Kutay Can", type: "Bank", onCheck: () => setIsDialogOpen(true) },
    { user: "Kutay Can", type: "Crypto", onCheck: () => setIsDialogOpen(true) },
  ]

  return (
    <>
      <aside className="w-[260px] flex-shrink-0 flex flex-col  bg-[#EAEAEA] h-full">
        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1">
          <div className="p-2 bg-white shadow-lg ring-1 ring-white/50 rounded">
            {navigationItems.map(item => {
              const active = activePath === item.path
              // Khusus tombol Administration kasih margin top
              const extraMargin = item.label === "Administration" ? "mt-8" : ""

              return (
                <button
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
                    active
                      ? "bg-blue-500/20 text-blue-600 font-semibold"
                      : "text-muted-foreground hover:bg-muted",
                    extraMargin
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              )
            })}
          </div>

        </nav>

        {/* Pending Deposit & Withdrawal */}
        <div className="flex-1 flex flex-col justify-start gap-4 p-2">
          <PendingDeposit deposits={pendingDeposits} />
          <PendingWithdrawal withdrawals={pendingWithdrawals} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-sm font-semibold text-center">
          isfinans.trade
        </div>
      </aside>

      {/* Dialog */}
      <PendingWithdrawalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
