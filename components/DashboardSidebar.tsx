'use client'

import { useState } from "react"
import { LayoutDashboard, Users, Wallet, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PendingWithdrawalDialog } from "@/components/PendingWithdrawalDialog"

interface DashboardSidebarProps {
  activeItem: string
  setActiveItem: (item: string) => void
}

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Users Verification" },
  { icon: Wallet, label: "Deposit Setup" },
  { icon: Settings, label: "Administration" },
]

const pendingDeposits = [
  { user: "Kutay Can", type: "Bank", amount: "$500", approved: "$500" },
  { user: "Ahmet Amca", type: "Crypto", amount: "$500", approved: "$500" },
]

const pendingWithdrawals = [
  { user: "Kutay Can", type: "Bank" },
  { user: "Kutay Can", type: "Crypto" },
]

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeItem, setActiveItem }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCheckClick = () => {
    setIsDialogOpen(true)
  }

  return (
    <>
      <aside className="w-80 bg-sidebar border-sidebar-border flex flex-col h-screen">
        <div className="p-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sidebar-foreground">Dominique Ch.</span>
            <svg
              className="w-4 h-4 text-sidebar-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="py-4 bg-white p-4">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors ${
                  activeItem === item.label
                    ? "bg-blue-500/20 text-blue-500 font-semibold"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-sidebar-border p-4 space-y-6">
            {/* Pending Deposit */}
            <div className="bg-white h-64 rounded-md p-1">
              <h3 className="font-semibold text-sm mb-3 text-sidebar-foreground text-center">Pending Deposit</h3>
              <div className="space-y-0">
                <div className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8" style={{ backgroundColor: '#D1D1D6' }}>
                  <span className="flex-1">User</span>
                  <span className="flex-1 text-center">Type</span>
                  <span className="flex-1 text-right whitespace-nowrap">Approve Amount</span>
                </div>
                {pendingDeposits.map((item, idx) => {
                  const isEven = idx % 2 === 0
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-100'
                  const rowRounded = idx === pendingDeposits.length - 1 ? 'rounded-b-lg' : ''
                  return (
                    <div key={idx} className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`} style={{ minHeight: '44px' }}>
                      <span className="text-sidebar-foreground flex-1 px-2">{item.user}</span>
                      <span className="text-sidebar-foreground flex-1 text-center">{item.type}</span>
                      <div className="flex gap-1 flex-1 justify-end px-2 whitespace-nowrap">
                        <Badge variant="destructive" className="text-xs px-2 py-0 h-5">{item.amount}</Badge>
                        <Badge className="bg-green-500 text-white text-xs px-2 py-0 h-5">{item.approved}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pending Withdrawal */}
            <div className="bg-white h-64 rounded-md p-1">
              <h3 className="font-semibold text-center text-sm mb-3 text-sidebar-foreground">Pending Withdrawal</h3>
              <div className="space-y-0">
                <div className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8" style={{ backgroundColor: '#D1D1D6' }}>
                  <span className="flex-1">User</span>
                  <span className="flex-1 text-center">Type</span>
                  <span className="flex-1 text-right whitespace-nowrap">Action</span>
                </div>
                {pendingWithdrawals.map((item, idx) => {
                  const isEven = idx % 2 === 0
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-100'
                  const rowRounded = idx === pendingWithdrawals.length - 1 ? 'rounded-b-lg' : ''
                  return (
                    <div key={idx} className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`} style={{ minHeight: '44px' }}>
                      <span className="text-sidebar-foreground flex-1 px-2">{item.user}</span>
                      <span className="text-sidebar-foreground flex-1 text-center">{item.type}</span>
                      <div className="flex justify-end flex-1 px-2">
                        <Button
                          size="sm"
                          className="h-6 text-xs px-4 bg-blue-500 hover:bg-primary/90"
                          onClick={handleCheckClick}
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
        </div>

        <div className="p-4 border-t border-sidebar-border shrink-0">
          <span className="text-sm font-semibold text-sidebar-foreground">isfinans.trade</span>
        </div>
      </aside>

      {/* ✅ Popup Dialog */}
      <PendingWithdrawalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
