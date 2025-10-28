'use client'

import { useEffect, useState } from "react"
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
      { value: "55", label: "Total Users", color: "!text-black" },
      { value: "$30000.00", label: "Net\nProfit", color: "!text-green-500" },
    ],
  },
  {
    items: [
      { value: "247", label: "Pending\nDeposit", color: "!text-blue-500" },
      { value: "118", label: "Pending\nWithdrawal", color: "!text-red-500" },
    ],
  },
  {
    items: [
      { value: "$30000.00", label: "Total\nDeposit", color: "!text-blue-500" },
      { value: "$30000.00", label: "Total\nWithdrawal", color: "!text-red-500" },
    ],
  },
]

export const StatsCards = () => {
  return (
    <div className="grid gap-4 mb-3 mt-4 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {statsData.map((card, idx) => (
        <Card
          key={idx}
          className="p-0 border-2 border-blue-500 w-full mx-auto bg-white"
          style={{ width: 'clamp(220px, 18vw, 320px)' }}
        >
          <div className="flex relative h-full w-full">
            {card.items.map((item, itemIdx) => (
              <AnimatedStat key={itemIdx} item={item} isMoney={item.value.startsWith("$")} hasDivider={itemIdx === 0} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

// 💫 Komponen untuk efek angka naik
const AnimatedStat = ({ item, isMoney, hasDivider }: { item: StatItem; isMoney: boolean; hasDivider: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseFloat(item.value.replace(/\$/g, "").replace(/,/g, ""))
    if (isNaN(end)) return // skip kalau bukan angka

    const duration = 1000 // durasi animasi (ms)
    const increment = end / (duration / 16) // naik tiap 16ms (~60fps)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        clearInterval(timer)
        setDisplayValue(end)
      } else {
        setDisplayValue(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [item.value])

  const sizeClass = isMoney ? "text-[16px] md:text-[18px]" : "text-[32px]"

  const formattedValue = isMoney
    ? `$${displayValue.toFixed(2)}`
    : Math.floor(displayValue).toString()

  return (
    <div className={`flex-1 flex flex-col items-center justify-center text-center py-4 relative`}>
      {hasDivider && <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] border-r border-blue-500" />}
      <div className={`${sizeClass} font-bold ${item.color} h-[43px] flex items-center justify-center transition-all duration-300`}>
        {formattedValue}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line">{item.label}</div>
    </div>
  )
}
