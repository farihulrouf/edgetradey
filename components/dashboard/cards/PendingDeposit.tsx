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
    <div className="bg-white rounded-md p-2">
      <h3 className="font-semibold text-sm mb-3 text-center">Pending Deposit</h3>
      <div className="space-y-0">
        <div className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8 bg-gray-200">
          <span className="flex-1">User</span>
          <span className="flex-1 text-center">Type</span>
          <span className="flex-1 text-right">Approve Amount</span>
        </div>
        {deposits.map((d, idx) => {
          const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-100"
          const rowRounded = idx === deposits.length - 1 ? "rounded-b-lg" : ""
          return (
            <div
              key={idx}
              className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`}
              style={{ minHeight: "44px" }}
            >
              <span className="flex-1 px-2">{d.user}</span>
              <span className="flex-1 text-center">{d.type}</span>
              <div className="flex gap-1 flex-1 justify-end px-2">
                <Badge variant="destructive" className="text-xs px-2 py-0 h-5">{d.amount}</Badge>
                <Badge className="bg-green-500 text-white text-xs px-2 py-0 h-5">{d.approved}</Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
