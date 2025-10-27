'use client'

import { Button } from "@/components/ui/button"

interface Withdrawal {
  user: string
  type: string
  onCheck?: () => void
}

interface PendingWithdrawalProps {
  withdrawals: Withdrawal[]
}

export const PendingWithdrawal = ({ withdrawals }: PendingWithdrawalProps) => {
  return (
    <div className="bg-white rounded-md p-2">
      <h3 className="font-semibold text-center text-sm mb-3">Pending Withdrawal</h3>
      <div className="space-y-0">
        <div className="flex items-center justify-between text-xs font-medium px-2 rounded-t-lg h-8 bg-gray-200">
          <span className="flex-1">User</span>
          <span className="flex-1 text-center">Type</span>
          <span className="flex-1 text-right">Action</span>
        </div>
        {withdrawals.map((w, idx) => {
          const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-100"
          const rowRounded = idx === withdrawals.length - 1 ? "rounded-b-lg" : ""
          return (
            <div
              key={idx}
              className={`flex items-center justify-between text-xs ${rowBg} ${rowRounded}`}
              style={{ minHeight: "44px" }}
            >
              <span className="flex-1 px-2">{w.user}</span>
              <span className="flex-1 text-center">{w.type}</span>
              <div className="flex justify-end flex-1 px-2">
                <Button
                  size="sm"
                  className="h-6 text-xs px-4 bg-blue-500 hover:bg-blue-600"
                  onClick={w.onCheck}
                >
                  Check
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
