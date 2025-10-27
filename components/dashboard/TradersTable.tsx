'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { UserTradeDialog } from "./UserTradeDialog"
import { fetchAllTraders, Trader } from "@/lib/api"

const ITEMS_PER_PAGE = 10

export const TradersTable = () => {
  const [allTraders, setAllTraders] = useState<Trader[]>([])
  const [traders, setTraders] = useState<Trader[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  const [selectedUser, setSelectedUser] = useState<Trader | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Ambil data dari API.ts
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
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setTraders(allTraders.slice(startIndex, endIndex))
  }, [allTraders, currentPage, itemsPerPage])

  const totalPages = Math.ceil(allTraders.length / itemsPerPage)
  const goToPage = (page: number) => { if (page >= 1 && page <= totalPages) setCurrentPage(page) }
  const handleShowAll = () => { setItemsPerPage(allTraders.length); setCurrentPage(1) }
  const handleResetPagination = () => { setItemsPerPage(ITEMS_PER_PAGE); setCurrentPage(1) }
  const handleRowClick = (user: Trader) => { setSelectedUser(user); setIsDialogOpen(true) }

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading traders...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <>
      <div className="bg-card rounded-lg flex flex-col h-full w-full">
        {/* Header */}
        {/* Header */}
        <div className="flex items-center p-4 border-b border-border flex-shrink-0">
          <h2 className="flex-1 text-center text-lg font-semibold">Traders Information</h2>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export to Excel
          </Button>
        </div>


        {/* Table wrapper */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-max min-w-full text-sm border-collapse">
            <thead className="bg-muted/50 text-left sticky top-0">
              <tr>
                <th className="p-2 border-b">User ID</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Account Type</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">Phone</th>
                <th className="p-2 border-b">Credit</th>
                <th className="p-2 border-b">Balance</th>
                <th className="p-2 border-b">Equity</th>
                <th className="p-2 border-b">Margin</th>
                <th className="p-2 border-b">Free Margin</th>
              </tr>
            </thead>
            <tbody>
              {traders.map((trader, idx) => (
                <tr key={trader.userId} className={`${idx % 2 === 1 ? "bg-muted/40" : ""} hover:bg-accent/50 cursor-pointer`} onClick={() => handleRowClick(trader)}>
                  <td className="p-2 border-b">{trader.userId}</td>
                  <td className="p-2 border-b flex justify-center">
                    <div className={`w-4 h-4 rounded-full border ${trader.status ? "bg-green-500" : "bg-red-500"}`} />
                  </td>
                  <td className="p-2 border-b">{trader.name}</td>
                  <td className="p-2 border-b">{trader.accountType}</td>
                  <td className="p-2 border-b">{trader.email}</td>
                  <td className="p-2 border-b">{trader.phone}</td>
                  <td className="p-2 border-b">{trader.credit}</td>
                  <td className="p-2 border-b">{trader.balance}</td>
                  <td className="p-2 border-b">{trader.equity}</td>
                  <td className="p-2 border-b">{trader.margin}</td>
                  <td className="p-2 border-b">{trader.freeMargin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex-shrink-0 flex items-center justify-center gap-2 p-4 border-t border-border flex-wrap">
          <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} variant={i + 1 === currentPage ? "default" : "ghost"} size="sm" onClick={() => goToPage(i + 1)}>
              {i + 1}
            </Button>
          ))}
          <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} variant="ghost" size="sm">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          {itemsPerPage < allTraders.length ? (
            <Button onClick={handleShowAll} variant="link" size="sm">Show all</Button>
          ) : (
            <Button onClick={handleResetPagination} variant="link" size="sm">Show paginated</Button>
          )}
        </div>
      </div>

      {selectedUser && <UserTradeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />}
    </>
  )
}
