'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export const DropdownMenu = ({ trigger, children }: any) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-card border rounded-md shadow-md z-50">
          {children}
        </div>
      )}
    </div>
  )
}

export const DropdownMenuItem = ({ children, onClick }: any) => (
  <button
    className="w-full px-4 py-2 text-left hover:bg-muted"
    onClick={onClick}
  >
    {children}
  </button>
)
