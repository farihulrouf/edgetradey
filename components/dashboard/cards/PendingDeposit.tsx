'use client'

import { Badge } from "@/components/ui/badge"

interface Deposit {
  user: string
  type: string
  amount: string
  approved: string
}

interface PendingDepositProps {
  deposits: Deposit[]
}

export const PendingDeposit = ({ deposits }: PendingDepositProps) => {
  return (
    <div className="bg-white mt-2 rounded-md p-2 h-[220px] shadow-lg ring-1 ring-white/50 rounded">
      <h3 className="font-semibold text-md mb-3 text-center">Pending Deposit</h3>
      <div className="space-y-0">
        {/* Header */}
        <div className="flex items-center text-black justify-between text-[12px] font-medium px-2 rounded-t-lg h-8 bg-gray-200">
          <span className="flex-[2] whitespace-nowrap">User</span>
          <span className="flex-[1] text-center whitespace-nowrap">Type</span>
          <span className="flex-[2] text-right whitespace-nowrap">Approve Amount</span>

        </div>

        {/* Rows */}
        {deposits.map((d, idx) => {
          const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-100"
          const rowRounded = idx === deposits.length - 1 ? "rounded-b-lg" : ""
          return (
            <div
              key={idx}
              className={`flex items-center justify-between text-[10px] ${rowBg} ${rowRounded}`}
              style={{ minHeight: "44px" }}
            >
              <span className="flex-1 px-2">{d.user}</span>
              <span className="flex-1 text-center">{d.type}</span>
              <div className="flex gap-1 flex-1 justify-end px-2">
                <Badge variant="destructive" className="text-[11px] bg-red-600 text-white px-2 py-0 h-5">{d.amount}</Badge>
                <Badge className="bg-green-600 text-white text-[11px] px-2 py-0 h-5">{d.approved}</Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
