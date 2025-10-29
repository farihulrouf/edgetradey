'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { fetchAllAdmins } from "@/lib/api"

interface Admin {
  id: number
  name: string
  role: string
  email: string
  password: string
}

interface AdminDialogProps {
  open: boolean
  onClose: () => void
  onSave: (admin: Admin) => void
  admin?: Admin
}

const AdminDialog = ({ open, onClose, onSave, admin }: AdminDialogProps) => {
  const [name, setName] = useState(admin?.name || "")
  const [email, setEmail] = useState(admin?.email || "")
  const [password, setPassword] = useState(admin?.password || "")
  const [role, setRole] = useState<"Super Admin" | "Moderator">(admin?.role as "Super Admin" | "Moderator" || "Moderator")

  useEffect(() => {
    if (admin) {
      setName(admin.name)
      setEmail(admin.email)
      setPassword(admin.password)
      setRole(admin.role as "Super Admin" | "Moderator")
    } else {
      setName("")
      setEmail("")
      setPassword("")
      setRole("Moderator")
    }
  }, [admin])

  if (!open) return null

  const handleSubmit = () => {
    if (!name || !email || !password) return
    onSave({ id: admin?.id || 0, name, email, password, role })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">{admin ? "Edit Admin" : "Add Admin"}</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Select value={role} onValueChange={(v) => setRole(v as "Super Admin" | "Moderator")}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmit}>
            {admin ? "Save Changes" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  )
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
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | undefined>(undefined)

  useEffect(() => {
    setLoading(true)
    fetchAllAdmins()
      .then((data) => {
        setAdmins(data)
        setFilteredAdmins(data)
      })
      .catch(() => setError("Failed to load admin data"))
      .finally(() => setLoading(false))
  }, [])

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

  const handleSaveAdmin = (admin: Admin) => {
    if (admin.id === 0) {
      const newAdmin: Admin = { ...admin, id: admins.length ? Math.max(...admins.map(a => a.id)) + 1 : 1 }
      setAdmins([newAdmin, ...admins])
      setFilteredAdmins([newAdmin, ...filteredAdmins])
    } else {
      const updatedAdmins = admins.map(a => (a.id === admin.id ? admin : a))
      setAdmins(updatedAdmins)
      setFilteredAdmins(updatedAdmins)
    }
  }

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading admins...</div>
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
            onClick={() => { setSelectedAdmin(undefined); setDialogOpen(true) }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Admin
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto px-2 bg-white shadow-lg ring-1 ring-white/50">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-max min-w-full text-sm border-separate border-spacing-0">
            <thead className="bg-[#E0E0E0] text-gray-600 sticky top-0 z-10">
              <tr className="h-[45px] text-[10px]">
                <th className="p-2 text-left font-semibold first:rounded-tl-lg w-[250px]">Name</th>
                <th className="p-2 text-left font-semibold w-[120px]">Role</th>
                <th className="p-2 text-left font-semibold w-[200px]">Email</th>
                <th className="p-2 text-left font-semibold w-[80px]">Password</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.map((admin, idx) => (
                <tr
                  key={admin.id}
                  className={`h-[45px] ${idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"} hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer`}
                  onClick={() => { setSelectedAdmin(admin); setDialogOpen(true) }}
                >
                  <td className="p-2 text-[10px] w-[250px]">{admin.name}</td>
                  <td className="p-2 text-[10px] w-[120px]">{admin.role}</td>
                  <td className="p-2 text-[10px] w-[200px]">{admin.email}</td>
                  <td className="p-2 text-[10px] w-[80px]">****</td>
                </tr>
              ))}
              {paginatedAdmins.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 text-[11px]">
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

        {itemsPerPage < filteredAdmins.length ? (
          <Button onClick={handleShowAll} size="sm" className="bg-white text-black hover:bg-[#e6f0ff]">
            Show all
          </Button>
        ) : (
          <Button onClick={handleResetPagination} size="sm" className="bg-white text-black hover:bg-[#e6f0ff]">
            Show paginated
          </Button>
        )}
      </div>

      {/* Add / Edit Admin Dialog */}
      <AdminDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveAdmin}
        admin={selectedAdmin}
      />
    </div>
  )
}
