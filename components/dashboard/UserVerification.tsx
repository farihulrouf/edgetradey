'use client'

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserVerificationDialog } from "./UserVerificationDialog"

// jumlah data per halaman
const ITEMS_PER_PAGE = 5

export const UserVerification = () => {
  const [usersData, setUsersData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showAll, setShowAll] = useState(false)


  useEffect(() => {
    fetch("/data/allusersverification.json")
      .then((res) => {
        if (!res.ok) throw new Error("File not found: " + res.status)
        return res.json()
      })
      .then((data) => setUsersData(data))
      .catch((err) => console.error("Failed to load data:", err))
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

  const handleRowClick = (user: any) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-card-foreground">User Verification</h2>
        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Account Type</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Date of Birth</th>
              <th className="px-4 py-2 text-left">Account Setting</th>
              <th className="px-4 py-2 text-left">Verification</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr
                key={user.userId}
                className={`${idx % 2 === 1 ? "bg-muted/30" : ""} hover:bg-muted/70 cursor-pointer`}
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
                  className={`px-4 py-2 font-medium ${user.verification === "Verified" ? "text-green-600" : "text-yellow-600"
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
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={i + 1 === currentPage ? "default" : "ghost"}
              size="sm"
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>

          <Button onClick={handleShowAll} variant="link" size="sm">
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
