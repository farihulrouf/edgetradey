'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Wallet, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PendingWithdrawalDialog } from "@/components/dashboard/PendingWithdrawalDialog"

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
    { user: "Kutay Can", type: "Bank" },
    { user: "Kutay Can", type: "Crypto" },
  ]

  return (
    <>
      <aside className="w-80 min-w-[300px] border-r border-border flex flex-col">
        {/* Navigation */}
        <nav className="py-4 bg-white p-4 border-b">
          {navigationItems.map((item) => {
            const active = activePath === item.path
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
                  active
                    ? "bg-blue-500/20 text-blue-600 font-semibold"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Pending Deposit */}
          <div className="bg-white rounded-md p-1 border">
            <h3 className="font-semibold text-sm mb-3 text-center text-sidebar-foreground">
              Pending Deposit
            </h3>
            <div className="space-y-0">
              <div
                className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8"
                style={{ backgroundColor: "#D1D1D6" }}
              >
                <span className="flex-1">User</span>
                <span className="flex-1 text-center">Type</span>
                <span className="flex-1 text-right whitespace-nowrap">Approve Amount</span>
              </div>
              {pendingDeposits.map((item, idx) => {
                const isEven = idx % 2 === 0
                const rowBg = isEven ? "bg-white" : "bg-gray-100"
                const rowRounded = idx === pendingDeposits.length - 1 ? "rounded-b-lg" : ""
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`}
                    style={{ minHeight: "44px" }}
                  >
                    <span className="flex-1 px-2">{item.user}</span>
                    <span className="flex-1 text-center">{item.type}</span>
                    <div className="flex gap-1 flex-1 justify-end px-2 whitespace-nowrap">
                      <Badge variant="destructive" className="text-xs px-2 py-0 h-5">
                        {item.amount}
                      </Badge>
                      <Badge className="bg-green-500 text-white text-xs px-2 py-0 h-5">
                        {item.approved}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pending Withdrawal */}
          <div className="bg-white rounded-md p-1 border">
            <h3 className="font-semibold text-center text-sm mb-3 text-sidebar-foreground">
              Pending Withdrawal
            </h3>
            <div className="space-y-0">
              <div
                className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8"
                style={{ backgroundColor: "#D1D1D6" }}
              >
                <span className="flex-1">User</span>
                <span className="flex-1 text-center">Type</span>
                <span className="flex-1 text-right whitespace-nowrap">Action</span>
              </div>
              {pendingWithdrawals.map((item, idx) => {
                const isEven = idx % 2 === 0
                const rowBg = isEven ? "bg-white" : "bg-gray-100"
                const rowRounded = idx === pendingWithdrawals.length - 1 ? "rounded-b-lg" : ""
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`}
                    style={{ minHeight: "44px" }}
                  >
                    <span className="flex-1 px-2">{item.user}</span>
                    <span className="flex-1 text-center">{item.type}</span>
                    <div className="flex justify-end flex-1 px-2">
                      <Button
                        size="sm"
                        className="h-6 text-xs px-4 bg-blue-500 hover:bg-primary/90"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        Check
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border text-sm font-semibold text-sidebar-foreground">
          isfinans.trade
        </div>
      </aside>

      {/* Dialog Popup */}
      <PendingWithdrawalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
