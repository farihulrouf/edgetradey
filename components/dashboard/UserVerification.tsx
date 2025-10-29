'use client'

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserVerificationDialog } from "./UserVerificationDialog"
import { fetchAllUsersVerification, UserVerificationData } from "@/lib/api"

const ITEMS_PER_PAGE = 8

export const UserVerification = () => {
  const [usersData, setUsersData] = useState<UserVerificationData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserVerificationData | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchAllUsersVerification()
      .then((data) => setUsersData(data))
      .catch((err) => {
        console.error(err)
        setError("Failed to load users data")
      })
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = showAll ? usersData.length : startIndex + ITEMS_PER_PAGE
  const currentUsers = usersData.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setShowAll(false)
    }
  }

  const handleShowAll = () => {
    setShowAll(true)
    setCurrentPage(1)
  }

  const handleRowClick = (user: UserVerificationData) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading users...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="rounded-lg flex flex-col h-full w-full bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="relative flex items-center p-4 border-b border-gray-200 flex-shrink-0 bg-white rounded-t-lg">
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-600 font-semibold">
          Users Information
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
                <th className="p-2 text-left font-semibold first:rounded-tl-lg">User ID</th>
                <th className="p-2 text-left font-semibold">Name</th>
                <th className="p-2 text-left font-semibold">Account Type</th>
                <th className="p-2 text-left font-semibold">Email</th>
                <th className="p-2 text-left font-semibold">Phone</th>
                <th className="p-2 text-left font-semibold">Date of Birth</th>
                <th className="p-2 text-left font-semibold">Account Setting</th>
                <th className="p-2 text-left font-semibold last:rounded-tr-lg">Verification</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user, idx) => (
                <tr
                  key={user.userId}
                  className={`h-[45px] cursor-pointer hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                    } transition-all duration-300 ease-in-out`}
                  onClick={() => handleRowClick(user)}
                >
                  <td className="p-2 text-[10px]">{user.userId}</td>
                  <td className="p-2 text-[10px]">{user.name}</td>
                  <td className="p-2 text-[10px]">{user.accountType}</td>
                  <td className="p-2 text-[10px]">{user.email}</td>
                  <td className="p-2 text-[10px]">{user.phone}</td>
                  <td className="p-2 text-[10px]">{user.dateOfBirth}</td>
                  <td className="p-2 text-[10px]">
                    <p className="bg-blue-500 p-1 text-white rounded-lg text-center">
                      {user.accountSetting}
                    </p>
                  </td>
                  <td className="p-2 text-[10px]">
                    <p
                      className={`p-1 px-2 rounded-lg text-center font-medium ${user.verification === "Pending"
                          ? "bg-gray-100 text-gray-500"
                          : user.verification === "Uploaded"
                            ? "bg-blue-100 text-blue-500"
                            : user.verification === "Approved"
                              ? "bg-green-50 text-green-500"
                              : ""
                        }`}
                    >
                      {user.verification}
                    </p>
                  </td>
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

        {[...Array(totalPages)].map((_, i) => {
          const isActive = i + 1 === currentPage
          return (
            <Button
              key={i}
              size="sm"
              onClick={() => goToPage(i + 1)}
              className={`${isActive ? "bg-[#1D6CE9] text-white" : "bg-white text-black hover:bg-[#e6f0ff]"
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

        {!showAll ? (
          <Button
            onClick={handleShowAll}
            size="sm"
            className="bg-white text-black hover:bg-[#e6f0ff]"
          >
            Show all
          </Button>
        ) : (
          <Button
            onClick={() => setShowAll(false)}
            size="sm"
            className="bg-white text-black hover:bg-[#e6f0ff]"
          >
            Show paginated
          </Button>
        )}
      </div>

      {/* Dialog */}
      {selectedUser && (
        <UserVerificationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          user={selectedUser}
        />
      )}
    </div>
  )
}
