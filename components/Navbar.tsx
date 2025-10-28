'use client'

import { Search, Bell, ChevronDown, Shield, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import * as React from "react"
import { useLogout } from '@/lib/useLogout'


// -------------------- Dropdown Components --------------------
export const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div ref={ref} className="relative inline-block text-left">
      {children}
    </div>
  )
})
DropdownMenu.displayName = "DropdownMenu"

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`absolute z-50 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none ${className}`}
  >
    {children}
  </div>
))
DropdownMenuContent.displayName = "DropdownMenuContent"

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
  >
    {children}
  </div>
))
DropdownMenuItem.displayName = "DropdownMenuItem"

// -------------------- Navbar Component --------------------
export function Navbar() {
  const [userOpen, setUserOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)

  const userRef = React.useRef<HTMLDivElement>(null)
  const notifRef = React.useRef<HTMLDivElement>(null)
  const logout = useLogout()

  const handleLogout = () => {
    logout()
    setUserOpen(false) // close dropdown
  }

  // Close dropdown if click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="border-b bg-background px-6 py-3 h-16">
      <div className="flex items-center justify-between gap-4">
        {/* User Dropdown */}
        <DropdownMenu ref={userRef}>
          <Button
            variant="ghost"
            className="flex items-center gap-1 hover:bg-accent"
            onClick={() => setUserOpen(!userOpen)}
          >
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Quick search"
            className="pl-9 bg-muted/50"
          />
        </div>

        {/* Notification Dropdown */}
        <DropdownMenu ref={notifRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell className="h-5 w-5 text-blue-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full" />
          </Button>
          {notifOpen && (
            <DropdownMenuContent className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none">
              <div className="px-3 py-2 border-b">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <span className="font-medium text-sm">New withdrawal request</span>
                  <span className="text-xs text-muted-foreground">User #1846456 requested $200.00 withdrawal</span>
                  <span className="text-xs text-blue-500">2 minutes ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <span className="font-medium text-sm">Withdrawal approved</span>
                  <span className="text-xs text-muted-foreground">Withdrawal for user #1846455 has been processed</span>
                  <span className="text-xs text-blue-500">15 minutes ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <span className="font-medium text-sm">System maintenance</span>
                  <span className="text-xs text-muted-foreground">Scheduled maintenance at 2:00 AM tonight</span>
                  <span className="text-xs text-blue-500">1 hour ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <span className="font-medium text-sm">Security alert</span>
                  <span className="text-xs text-muted-foreground">New login from unknown device detected</span>
                  <span className="text-xs text-blue-500">3 hours ago</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </header>
  )
}
