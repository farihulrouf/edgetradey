'use client'
import { Search, Bell, ChevronDown, Shield, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { useLogout } from '@/lib/useLogout'
import { useRouter } from "next/navigation"

// -------------------- Dropdown Components --------------------
export const DropdownMenu = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => <div ref={ref} className="relative inline-block text-left">{children}</div>
)
DropdownMenu.displayName = "DropdownMenu"

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={`absolute z-50 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none ${className}`}
    >
      {children}
    </div>
  )
)
DropdownMenuContent.displayName = "DropdownMenuContent"

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
    >
      {children}
    </div>
  )
)
DropdownMenuItem.displayName = "DropdownMenuItem"

// -------------------- Navbar Component --------------------
export function Navbar() {
  const [userOpen, setUserOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)

  const userRef = React.useRef<HTMLDivElement>(null)
  const notifRef = React.useRef<HTMLDivElement>(null)
  const logout = useLogout()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setUserOpen(false)
    router.push("/login")
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) setUserOpen(false)
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setNotifOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="border-b bg-background px-6 py-3 h-16">
      <div className="flex items-center justify-between gap-4">
        {/* User Dropdown */}
        <DropdownMenu ref={userRef}>
          <Button variant="ghost" className="flex items-center gap-1 hover:bg-accent" onClick={() => setUserOpen(!userOpen)}>
            <span className="font-medium">Dominique Ch.</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          {userOpen && (
            <DropdownMenuContent className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none">
              <DropdownMenuItem className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Admin Level</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Input placeholder="Search..." className="w-full" />
        </div>

        {/* Notification Dropdown */}
        <DropdownMenu ref={notifRef}>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setNotifOpen(!notifOpen)}>
            <Bell className="h-5 w-5 text-blue-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full" />
          </Button>
          {notifOpen && (
            <DropdownMenuContent className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none">
              <div className="px-3 py-2 border-b">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Contoh notifikasi */}
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </header>
  )
}
