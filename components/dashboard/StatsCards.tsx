'use client'

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import clsx from "clsx"

export const StatsCards = () => {
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)
  const [netProfit, setNetProfit] = useState(0)
  const [pendingDeposit, setPendingDeposit] = useState(0)
  const [pendingWithdraw, setPendingWithdraw] = useState(0)
  const [totalDeposit, setTotalDeposit] = useState(0)
  const [totalWithdraw, setTotalWithdraw] = useState(0)
  const [animateText, setAnimateText] = useState(false)

  // Simulasi efek animasi angka naik
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    let interval: NodeJS.Timeout

    if (!loading) {
      let t = 0
      interval = setInterval(() => {
        t += 1
        if (t <= 55) setTotalUsers(t)
        if (t <= 30) setNetProfit(t * 1000)
        if (t <= 247) setPendingDeposit(t)
        if (t <= 118) setPendingWithdraw(t)
        if (t <= 30) setTotalDeposit(t * 1000)
        if (t <= 30) setTotalWithdraw(t * 1000)
        if (t === 30) setAnimateText(true)
      }, 10)
    }

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [loading])

  const fadeIn = (delay = 0) =>
    clsx(
      "transition-all duration-700 ease-out",
      animateText
        ? `opacity-100 translate-y-0 delay-[${delay}ms]`
        : "opacity-0 translate-y-2"
    )

  return (
    <div className="grid gap-4 mb-3 mt-4 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* 🧍 Total Users & Net Profit */}
      <Card
        className="p-0 h-[113px] border-2 border-blue-500 w-full mx-auto bg-white shadow-sm hover:shadow-md transition-all duration-500"
        style={{ width: 'clamp(220px, 18vw, 320px)' }}
      >
        <div className="flex relative h-full w-full items-center">
          {/* Total Users */}
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="text-[32px] font-medium text-black transition-all duration-500">
              {loading ? "..." : totalUsers}
            </p>
            <p className={clsx("text-[13px] text-black whitespace-pre-line text-center mt-1", fadeIn(200))}>
              Total{'\n'}Users
            </p>
          </div>

          <span className="absolute right-1/2 top-1/2 -translate-y-1/2 h-[75%] border-r border-blue-500" />

          {/* Net Profit */}
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="text-[16px] md:text-[18px] font-medium text-green-500 transition-all duration-500">
              {loading ? "..." : `$${netProfit.toFixed(2)}`}
            </p>
            <p className={clsx("text-[13px] text-green-500 whitespace-pre-line text-center mt-4", fadeIn(200))}>
              Net{'\n'}Profit
            </p>
          </div>
        </div>
      </Card>

      {/* 💰 Pending Deposit & Withdrawal */}
      <Card
        className="p-0 h-[113px] border-2 border-blue-500 w-full mx-auto bg-white shadow-sm hover:shadow-md transition-all duration-500"
        style={{ width: 'clamp(220px, 18vw, 320px)' }}
      >
        <div className="flex relative h-full w-full items-center">
          {/* Pending Deposit */}
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="text-[32px] font-medium text-blue-500 transition-all duration-500">
              {loading ? "..." : pendingDeposit}
            </p>
            <p className={clsx("text-[13px] text-blue-500 whitespace-pre-line text-center mt-1", fadeIn(200))}>
              Pending{'\n'}Deposit
            </p>
          </div>

          <span className="absolute right-1/2 top-1/2 -translate-y-1/2 h-[75%] border-r border-blue-500" />

          {/* Pending Withdrawal */}
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="text-[32px] font-medium text-red-500 transition-all duration-500">
              {loading ? "..." : pendingWithdraw}
            </p>
            <p className={clsx("text-[13px] text-red-500 whitespace-pre-line text-center mt-1", fadeIn(200))}>
              Pending{'\n'}Withdraw
            </p>
          </div>
        </div>
      </Card>

      {/* 📈 Total Deposit & Withdrawal */}
      <Card
        className="p-0 h-[113px] border-2 border-blue-500 w-full mx-auto bg-white shadow-sm hover:shadow-md transition-all duration-500"
        style={{ width: 'clamp(220px, 18vw, 320px)' }}
      >
        <div className="flex relative h-full w-full items-center">
          {/* Total Deposit */}
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="text-[16px] md:text-[18px] font-medium text-blue-500 transition-all duration-500">
              {loading ? "..." : `$${totalDeposit.toFixed(2)}`}
            </p>
            <p className={clsx("text-[13px] text-blue-500 whitespace-pre-line text-center mt-4", fadeIn(200))}>
              Total{'\n'}Deposit
            </p>
          </div>

          <span className="absolute right-1/2 top-1/2 -translate-y-1/2 h-[75%] border-r border-blue-500" />

          {/* Total Withdrawal */}
          <div className="flex-1 flex flex-col items-center h-full justify-center">
            <p className="text-[16px] md:text-[18px] font-medium text-red-500 transition-all duration-500">
              {loading ? "..." : `$${totalWithdraw.toFixed(2)}`}
            </p>
            <p className={clsx("text-[13px] text-red-500 whitespace-pre-line text-center mt-4", fadeIn(200))}>
              Total{'\n'}Withdrawal
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
