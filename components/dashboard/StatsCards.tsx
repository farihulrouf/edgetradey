'use client'

import { Card } from "@/components/ui/card"

interface StatItem {
  value: string
  label: string
  color: string
}

interface StatsCardData {
  items: [StatItem, StatItem]
}

const statsData: StatsCardData[] = [
  {
    items: [
      { value: "55", label: "Total Users", color: "text-black" },
      { value: "$30,000.00", label: "Net\nProfits", color: "text-green-500" },
    ],
  },
  {
    items: [
      { value: "247", label: "Pending\nDeposit", color: "text-blue-500" },
      { value: "118", label: "Pending\nWithdrawal", color: "text-red-500" },
    ],
  },
  {
    items: [
      { value: "$30,000.00", label: "Total\nDeposit", color: "text-blue-500" },
      { value: "$30,000.00", label: "Total\nWithdrawal", color: "text-red-500" },
    ],
  },
]

export const StatsCards = () => {
  return (
    <div className="grid gap-4 mb-3 mt-4 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {statsData.map((card, idx) => (
        <Card
          key={idx}
          className="p-0 border-2 border-blue-500 w-full mx-auto"
          style={{ width: 'clamp(220px, 18vw, 320px)' }}
        >
          {/* Flex row kiri-kanan dengan garis tengah 75% */}
          <div className="flex relative h-full w-full">
            {card.items.map((item, itemIdx) => {
              const sizeClass = item.value.startsWith("$")
                ? "text-[16px] md:text-[18px]"
                : "text-[32px]"

              return (
                <div
                  key={itemIdx}
                  className={`flex-1 flex flex-col items-center justify-center text-center py-4
                    ${itemIdx === 0 ? 'relative' : ''}`}
                >
                  {/* Divider custom di kiri panel */}
                  {itemIdx === 0 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] border-r border-blue-500"></span>
                  )}

                  <div className={`${sizeClass} font-bold ${item.color} h-[43px] flex items-center justify-center`}>
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
                    {item.label}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}
