'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { UserVerificationDialog } from './UserVerificationDialog'
import { UserVerificationData, fetchUsersVerificationPage } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS_PER_PAGE = 8

export const UserVerification = () => {
  const [usersData, setUsersData] = useState<UserVerificationData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserVerificationData | null>(null)
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const loadPage = async (page: number) => {
    setLoading(true)
    try {
      const skip = (page - 1) * ITEMS_PER_PAGE
      const { users, total } = await fetchUsersVerificationPage(skip, ITEMS_PER_PAGE)
      setUsersData(users)
      setTotalItems(total)
      setCurrentPage(page)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPage(1)
  }, [])

  const handleRowClick = (user: UserVerificationData) => {
    setSelectedUser(user)
    setDialogMode('edit')
    setDialogOpen(true)
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setDialogMode('add')
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
            onClick={handleAddUser}
          >
            Add User
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
                <th className="p-2 text-left font-semibold last:rounded-tr-lg">Verification</th>
              </tr>
            </thead>

            {/* AnimatePresence & Motion Tbody */}
            <AnimatePresence mode="popLayout">
              <motion.tbody layout>
                {usersData.map((user, idx) => (
                  <motion.tr
                    key={user.userId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className={`h-[45px] cursor-pointer hover:bg-blue-50 transition-all duration-300 ${
                      selectedUser?.userId === user.userId
                        ? 'border-t-2 border-b-2 border-blue-400'
                        : idx % 2 === 0
                        ? 'bg-white'
                        : 'bg-[#F5F5F5]'
                    }`}
                    onClick={() => handleRowClick(user)}
                  >
                    <td className="p-2 text-[10px]">{user.userId}</td>
                    <td className="p-2 text-[10px]">{user.name}</td>
                    <td className="p-2 text-[10px]">{user.accountType}</td>
                    <td className="p-2 text-[10px]">{user.email}</td>
                    <td className="p-2 text-[10px]">{user.phone}</td>
                    <td className="p-2 text-[10px]">{user.dateOfBirth}</td>
                    <td className="p-2 text-[10px]">
                      <p
                        className={`p-1 px-2 rounded-lg text-center font-medium ${
                          user.verification === 'Pending'
                            ? 'bg-gray-100 text-gray-500'
                            : user.verification === 'Approved'
                            ? 'bg-green-50 text-green-500'
                            : user.verification === 'Rejected'
                            ? 'bg-red-100 text-red-500'
                            : ''
                        }`}
                      >
                        {user.verification}
                      </p>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex-shrink-0 flex items-center justify-center gap-2 p-4 border-t border-gray-200 flex-wrap bg-white rounded-b-lg">
        <Button
          onClick={() => loadPage(currentPage - 1)}
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
              onClick={() => loadPage(i + 1)}
              className={`${isActive ? 'bg-[#1D6CE9] text-white' : 'bg-white text-black hover:bg-[#e6f0ff]'} `}
            >
              {i + 1}
            </Button>
          )
        })}

        <Button
          onClick={() => loadPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="sm"
          className="bg-white text-black hover:bg-[#e6f0ff]"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Dialog */}
      {(selectedUser || dialogMode === 'add') && (
        <UserVerificationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          user={selectedUser || undefined}
          mode={dialogMode}
        />
      )}
    </div>
  )
}
