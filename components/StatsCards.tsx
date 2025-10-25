'use client'

import { Card } from "@/components/ui/card"

interface StatItem {
  value: string
  label: string
  color: string
}

interface StatsCardData {
  items: StatItem[]
}

const statsData: StatsCardData[] = [
  {
    items: [
      { value: "55", label: "Total Users", color: "text-foreground" },
      { value: "$30,000.00", label: "Net Profit", color: "text-success" },
    ],
  },
  {
    items: [
      { value: "247", label: "Pending Deposit", color: "text-primary" },
      { value: "118", label: "Pending Withdrawal", color: "text-destructive" },
    ],
  },
  {
    items: [
      { value: "$30,000.00", label: "Total Deposit", color: "text-primary" },
      { value: "$30,000.00", label: "Total Withdrawal", color: "text-destructive" },
    ],
  },
]

export const StatsCards = () => {
  return (
    <div className="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {statsData.map((card, idx) => (
        <Card key={idx} className="p-2 sm:p-4 border-2 border-blue-500">
          <div className="flex flex-col sm:flex-row justify-around items-center sm:divide-x divide-border">
            {card.items.map((item, itemIdx) => {
              // Tentukan ukuran text
              const sizeClass = item.value.startsWith("$") ? "text-[16px]" : "text-[32px]"

              return (
                <div
                  key={itemIdx}
                  className="text-center flex-1 px-2 sm:px-4 mb-2 sm:mb-0 first:pl-0 last:pr-0"
                >
                  <div className={`${sizeClass} font-bold ${item.color} mb-1 truncate`}>
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{item.label}</div>
                </div>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}
