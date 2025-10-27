'use client'

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserVerificationDialog } from "./UserVerificationDialog"
import { fetchAllUsersVerification, UserVerificationData } from "@/lib/api"

// jumlah data per halaman
const ITEMS_PER_PAGE = 5

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
    <div className="bg-white rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center">
        
        <Button
          variant="outline"
          size="sm"
          className="text-[#1D6CE9] border-[#1D6CE9] hover:bg-[#1D6CE9] hover:text-white"
        >
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-[#D1D1D6] sticky top-0">
            <tr className="h-[30px]">
              <th className="px-4 py-2 border-b rounded-tl-lg">User ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Account Type</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Date of Birth</th>
              <th className="px-4 py-2 border-b">Account Setting</th>
              <th className="px-4 py-2 border-b rounded-tr-lg">Verification</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr
                key={user.userId}
                className={`cursor-pointer hover:bg-[#D1D1D6]/50 ${
                  idx % 2 === 1 ? "bg-[#D1D1D6]" : "bg-white"
                }`}
                onClick={() => handleRowClick(user)}
              >
                <td className="px-4 py-2">{user.userId}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.accountType}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.dateOfBirth}</td>
                <td className="px-4 py-2">{user.accountSetting}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    user.verification === "Verified"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {user.verification}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!showAll && usersData.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
            className="text-[#1D6CE9] hover:bg-[#1D6CE9]/20"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={i + 1 === currentPage ? "solid" : "ghost"}
              size="sm"
              onClick={() => goToPage(i + 1)}
              className={`${
                i + 1 === currentPage
                  ? "bg-[#1D6CE9] text-white"
                  : "text-[#1D6CE9] hover:bg-[#1D6CE9]/20"
              }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
            className="text-[#1D6CE9] hover:bg-[#1D6CE9]/20"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>

          <Button
            onClick={handleShowAll}
            variant="link"
            size="sm"
            className="text-[#1D6CE9]"
          >
            Show all
          </Button>
        </div>
      )}

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
