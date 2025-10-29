'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { fetchAllAdmins } from "@/lib/api"

interface Admin {
  id: number
  name: string
  role: string
  email: string
  password: string
}

const ITEMS_PER_PAGE = 8

export const Administration = () => {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchAllAdmins()
      .then((data) => {
        setAdmins(data)
        setFilteredAdmins(data)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load admin data")
      })
      .finally(() => setLoading(false))
  }, [])

  // 🔍 Search handler
  useEffect(() => {
    const filtered = admins.filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredAdmins(filtered)
    setCurrentPage(1)
  }, [searchQuery, admins])

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleShowAll = () => {
    setItemsPerPage(filteredAdmins.length)
    setCurrentPage(1)
  }

  const handleResetPagination = () => {
    setItemsPerPage(ITEMS_PER_PAGE)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  if (loading)
    return <div className="p-6 text-center text-muted-foreground">Loading admins...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="rounded-lg flex flex-col h-full w-full bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="relative flex items-center p-4 border-b border-gray-200 flex-shrink-0 bg-white rounded-t-lg">
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-600 font-semibold">
          Administrators
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
      <div className="flex-1 overflow-x-auto px-2 bg-white shadow-lg ring-1 ring-white/50">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-max min-w-full text-sm border-separate border-spacing-0">
            <thead className="bg-[#E0E0E0] text-gray-600 sticky top-0 z-10">
              <tr className="h-[45px] text-[10px]">
                <th className="p-2 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg">
                  Name
                </th>
                <th className="p-2 text-left font-semibold">Role</th>
                <th className="p-2 text-left font-semibold">Email</th>
                <th className="p-2 text-left font-semibold">Password</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.map((admin, idx) => (
                <tr
                  key={admin.id}
                  className={`h-[45px] ${idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                    } hover:bg-blue-50 transition-all duration-300 ease-in-out`}
                >
                  <td className="p-2 text-[10px]">{admin.name}</td>
                  <td className="p-2 text-[10px]">{admin.role}</td>
                  <td className="p-2 text-[10px]">{admin.email}</td>
                  <td className="p-2 text-[10px]">{admin.password}</td>
                </tr>
              ))}
              {paginatedAdmins.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 text-[11px]"
                  >
                    No matching records found
                  </td>
                </tr>
              )}
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
              className={`${isActive
                ? "bg-[#1D6CE9] text-white"
                : "bg-white text-black hover:bg-[#e6f0ff]"
                }`}
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

        {itemsPerPage < filteredAdmins.length ? (
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
    </div>
  )
}
