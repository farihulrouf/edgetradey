'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold">Page 1</span>
        <span className="text-muted-foreground">of 10</span>
      </div>

      <Button variant="outline" size="sm" className="flex items-center gap-1">
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
