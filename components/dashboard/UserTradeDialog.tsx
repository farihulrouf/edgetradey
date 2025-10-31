// UserTradeDialog.tsx
'use client'

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCcw, Pencil, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import data from "@/data/trades.json"

// tipe user yang digunakan dialog, userId string
export interface TraderDialogUser {
  userId: string
  name: string
  email: string
  phone: string
  balance: string | number
  equity: string | number
  margin: string | number
  freeMargin: string | number
}

type TradeRow = Record<string, any>

interface UserTradeDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedUser: TraderDialogUser | null
}

export const UserTradeDialog = ({ isOpen, onClose, selectedUser }: UserTradeDialogProps) => {
  const [subTab, setSubTab] = useState("open")
  const [openPositions, setOpenPositions] = useState<TradeRow[]>(data.tradePositions)
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)

  const editableColumns = [
    "symbol",
    "createdTime",
    "volume",
    "direction",
    "enterPrice",
    "price",
    "stopLoss",
    "takeProfit",
    "swap",
    "commission"
  ]

  const handleCellClick = (rowIndex: number, col: string, value: any) => {
    if (editableColumns.includes(col)) {
      setEditingCell({ row: rowIndex, col })
      setEditValue(String(value ?? ""))
    }
    setSelectedRowIndex(rowIndex)
  }

  const handleEditSave = () => {
    if (editingCell) {
      const updated = [...openPositions]
      const row = { ...updated[editingCell.row] }
      row[editingCell.col] = editValue
      updated[editingCell.row] = row
      setOpenPositions(updated)
      setEditingCell(null)
      setEditValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleEditSave()
    else if (e.key === "Escape") {
      setEditingCell(null)
      setEditValue("")
      setSelectedRowIndex(null)
    }
  }

  const renderValue = (val: unknown) =>
    val === null || val === undefined ? "-" : String(val)

  const renderTable = (rows: TradeRow[], columns: string[], editable = false) => (
    <div className="overflow-x-auto max-h-[300px] overflow-y-auto rounded-xl border border-gray-200">
      <Table className="text-[11px]">
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((col) => (
              <TableHead key={col} className="text-[11px] font-semibold text-gray-600 whitespace-nowrap">{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => {
            const isEditingRow = editingCell?.row === i
            const isSelectedRow = selectedRowIndex === i

            return (
              <TableRow key={i} className={`transition-all duration-150 hover:bg-gray-50
                ${isSelectedRow ? "border-t-2 border-b-2 border-black" : "border-t border-gray-200"}
              `}>
                {columns.map((col, j) => {
                  const isEditingCell = isEditingRow && editingCell?.col === col
                  const cellValue = renderValue(row[col])
                  const textColor =
                    col === "direction"
                      ? cellValue === "BUY"
                        ? "text-green-600"
                        : cellValue === "SELL"
                          ? "text-red-600"
                          : ""
                      : "text-gray-700"

                  return (
                    <TableCell key={j} className="relative text-[11px] whitespace-nowrap px-1 cursor-pointer"
                      onClick={() => handleCellClick(i, col, row[col])}>
                      {isEditingCell && col === "direction" ? (
                        <select className="absolute inset-0 w-full h-full rounded-sm px-1 py-0.5 text-[11px] focus:outline-none"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleEditSave}
                          autoFocus
                        >
                          <option value="BUY">BUY</option>
                          <option value="SELL">SELL</option>
                        </select>
                      ) : isEditingCell && col !== "direction" ? (
                        <input className="absolute inset-0 w-full h-full px-1 py-0.5 text-[11px] focus:outline-none"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleEditSave}
                          onKeyDown={handleKeyDown}
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center">
                          <span className={textColor}>{cellValue}</span>
                          {col === "direction" && <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />}
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )

  const handleRefresh = () => console.log("Refreshing data...")
  const handleEdit = () => console.log("Edit position clicked")
  const handleClosePosition = () => console.log("Close position clicked")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] h-[700px] bg-gray-50 rounded-xl shadow-2xl border border-gray-200 overflow-hidden p-0 flex items-center justify-center">
        <div className="relative h-full flex flex-col w-full">
          <div className="flex-1 overflow-auto p-6">
            {selectedUser ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    ["User ID", selectedUser.userId],
                    ["Name", selectedUser.name],
                    ["Email", selectedUser.email],
                    ["Phone", selectedUser.phone],
                  ].map(([label, value]) => (
                    <div key={label} className="p-3 bg-white rounded-md shadow-sm border">
                      <p className="text-gray-500 text-sm font-medium">{label}</p>
                      <p className="font-semibold text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border rounded-md shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Tabs value={subTab} onValueChange={setSubTab}>
                      <TabsList className="flex space-x-2">
                        <TabsTrigger value="open">Open Positions</TabsTrigger>
                        <TabsTrigger value="order">Order Positions</TabsTrigger>
                        <TabsTrigger value="closed">Closed Positions</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-1">
                        <RefreshCcw className="w-4 h-4" /> Refresh
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleEdit} className="flex items-center gap-1">
                        <Pencil className="w-4 h-4" /> Edit Position
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleClosePosition} className="flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Close Position
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-[10px] text-xs text-gray-700 mb-4">
                    <p>All Swaps: 0.08</p>
                    <p>All Commissions: 0.08</p>
                    <p>All Profit: -$174.21</p>
                    <p>All Total Profit: -$174.21</p>
                  </div>

                  <Tabs value={subTab} onValueChange={setSubTab}>
                    <TabsContent value="open">
                      {renderTable(openPositions, ["userId","pidNo","symbol","createdTime","volume","direction","enterPrice","price","stopLoss","takeProfit","swap","commission","profit","netprofit"], true)}
                    </TabsContent>

                    <TabsContent value="order">
                      {renderTable(data.orderPositions as TradeRow[], ["userId","pidNo","symbol","createdTime","volume","direction","orderPrice","price","stopLoss","takeProfit"])}
                    </TabsContent>

                    <TabsContent value="closed">
                      {renderTable(data.closedPositions as TradeRow[], ["userId","pidNo","symbol","createdTime","closeTime","volume","direction","enterPrice","closePrice","stopLoss","takeProfit","swap","commission","profit","netProfit"])}
                    </TabsContent>

                    <TabsContent value="transactions">
                      {renderTable(data.transactions as TradeRow[], ["userId","type","place","time","amount"])}
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">No user selected.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
