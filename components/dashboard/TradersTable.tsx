'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { UserTradeDialog } from "./UserTradeDialog"
import { fetchAllTraders, Trader } from "@/lib/api"

const ITEMS_PER_PAGE = 8

export const TradersTable = () => {
  const [allTraders, setAllTraders] = useState<Trader[]>([])
  const [traders, setTraders] = useState<Trader[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  const [selectedUser, setSelectedUser] = useState<Trader | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchAllTraders()
      .then((data) => setAllTraders(data))
      .catch((err) => {
        console.error(err)
        setError("Failed to load trader data")
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setAnimating(true)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const newTraders = allTraders.slice(startIndex, endIndex)

    const timer = setTimeout(() => {
      setTraders(newTraders)
      setAnimating(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [allTraders, currentPage, itemsPerPage])

  const totalPages = Math.ceil(allTraders.length / itemsPerPage)
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const handleShowAll = () => {
    setItemsPerPage(allTraders.length)
    setCurrentPage(1)
  }

  const handleResetPagination = () => {
    setItemsPerPage(ITEMS_PER_PAGE)
    setCurrentPage(1)
  }

  const handleRowClick = (user: Trader) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  if (loading)
    return <div className="p-6 text-center text-muted-foreground">Loading traders...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <>
<div className="rounded-lg flex flex-col h-full w-full bg-white shadow-sm overflow-hidden">
  {/* Header */}
  <div className="relative flex items-center p-4 border-b border-gray-200 flex-shrink-0 bg-white rounded-t-lg">
    <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-600 font-semibold">
      Traders Information
    </h2>
    <div className="ml-auto">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      >
        <Download className="w-4 h-4 mr-2" /> Export to Excel
      </Button>
    </div>
  </div>

  {/* Table */}
  <div className="flex-1 overflow-x-auto px-2">
    <div className="max-h-[60vh] overflow-y-auto">
      <table className="w-max min-w-full text-sm border-separate border-spacing-0">
        <thead className="bg-[#E0E0E0] text-gray-600 sticky top-0 z-10">
          <tr className="h-[45px] text-[10px]">
            <th className="p-2 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg">User ID</th>
            <th className="p-2 text-left font-semibold">Status</th>
            <th className="p-2 text-left font-semibold">Name</th>
            <th className="p-2 text-left font-semibold">Account Type</th>
            <th className="p-2 text-left font-semibold">Email</th>
            <th className="p-2 text-left font-semibold">Phone</th>
            <th className="p-2 text-left font-semibold">Credit</th>
            <th className="p-2 text-left font-semibold">Balance</th>
            <th className="p-2 text-left font-semibold">Equity</th>
            <th className="p-2 text-left font-semibold">Margin</th>
            <th className="p-2 text-left font-semibold last:rounded-tr-lg">Free Margin</th>
          </tr>
        </thead>

        <tbody>
          {traders.map((trader, idx) => (
            <tr
              key={trader.userId}
              className={`h-[45px] cursor-pointer hover:bg-blue-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
              } transition-all duration-300 ease-in-out ${animating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}
              onClick={() => handleRowClick(trader)}
            >
              <td className="p-2 text-[10px]">{trader.userId}</td>
              <td className="p-2 flex justify-center text-[10px]">
                <div className={`w-3.5 h-3.5 rounded-full ${trader.status ? "bg-green-500" : "bg-red-500"}`} />
              </td>
              <td className="p-2 text-[10px]">{trader.name}</td>
              <td className="p-2 text-[10px]">{trader.accountType}</td>
              <td className="p-2 text-[10px]">{trader.email}</td>
              <td className="p-2 text-[10px]">{trader.phone}</td>
              <td className="p-2 text-[10px]">{trader.credit}</td>
              <td className="p-2 text-[10px]">{trader.balance}</td>
              <td className="p-2 text-[10px]">{trader.equity}</td>
              <td className="p-2 text-[10px]">{trader.margin}</td>
              <td className="p-2 text-[10px]">{trader.freeMargin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Pagination */}
  <div className="flex-shrink-0 flex items-center justify-center gap-2 p-4 border-t border-gray-200 flex-wrap bg-white rounded-b-lg">
  <Button
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    size="sm"
    className="bg-white text-black hover:bg-[#e6f0ff]"
  >
    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
  </Button>

  {Array.from({ length: totalPages }, (_, i) => {
    const isActive = i + 1 === currentPage
    return (
      <Button
        key={i}
        size="sm"
        onClick={() => goToPage(i + 1)}
        className={`${isActive ? "bg-[#1D6CE9] text-white" : "bg-white text-black hover:bg-[#e6f0ff]"}`}
      >
        {i + 1}
      </Button>
    )
  })}

  <Button
    onClick={() => goToPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    size="sm"
    className="bg-white text-black hover:bg-[#e6f0ff]"
  >
    Next <ChevronRight className="w-4 h-4 ml-1" />
  </Button>

  {itemsPerPage < allTraders.length ? (
    <Button
      onClick={handleShowAll}
      size="sm"
      className="bg-white text-black hover:bg-[#e6f0ff]"
    >
      Show all
    </Button>
  ) : (
    <Button
      onClick={handleResetPagination}
      size="sm"
      className="bg-white text-black hover:bg-[#e6f0ff]"
    >
      Show paginated
    </Button>
  )}
</div>


  {selectedUser && (
    <UserTradeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={selectedUser} />
  )}
</div>

      {selectedUser && (
        <UserTradeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          user={selectedUser}
        />

      )}
    </>
  )
}
