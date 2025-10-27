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

// Data card dengan warna yang sesuai
const statsData: StatsCardData[] = [
  {
    items: [
      { value: "55", label: "Total Users", color: "text-black" },       // hitam
      { value: "$30,000.00", label: "Net\nProfits", color: "text-green-500" }, // hijau
    ],
  },
  {
    items: [
      { value: "247", label: "Pending\nDeposit", color: "text-blue-500" },  // biru
      { value: "118", label: "Pending\nWithdrawal", color: "text-red-500" }, // merah
    ],
  },
  {
    items: [
      { value: "$30,000.00", label: "Total\nDeposit", color: "text-blue-500" }, // biru
      { value: "$30,000.00", label: "Total\nWithdrawal", color: "text-red-500" }, // merah
    ],
  },
]

export const StatsCards = () => {
  return (
    <div className="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {statsData.map((card, idx) => (
        <Card
          key={idx}
          className="p-4 border-2 border-blue-500 min-w-[260px]"
        >
          {/* Flex row kiri-kanan */}
          <div className="flex flex-col sm:flex-row divide-x divide-blue-500">
            {card.items.map((item, itemIdx) => {
              // Jika value diawali $ pakai ukuran teks lebih kecil
              const sizeClass = item.value.startsWith("$") 
                ? "text-[16px] md:text-[18px]" 
                : "text-[32px]"

              return (
                <div
                  key={itemIdx}
                  className="flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-4 py-2"
                >
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
