'use client'

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCcw, Pencil, ChevronDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import data from "@/data/trades.json"

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

export const UserTradeDialog = ({
  isOpen,
  onClose,
  selectedUser,
}: UserTradeDialogProps) => {
  const [subTab, setSubTab] = useState("open")
  const [openPositions, setOpenPositions] = useState<TradeRow[]>([])
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [tempEdited, setTempEdited] = useState<TradeRow[]>([]) // simpan sementara

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
    "commission",
  ]

  const symbolOptions = ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "USDCAD"]

  // === Load initial data ===
  useEffect(() => {
    setOpenPositions(data.tradePositions)
  }, [])

  // === Handler: Klik cell untuk edit ===
  const handleCellClick = (rowIndex: number, col: string, value: any) => {
    if (editableColumns.includes(col)) {
      setEditingCell({ row: rowIndex, col })
      setEditValue(String(value ?? ""))
    } else {
      setEditingCell(null)
    }
    setSelectedRowIndex(rowIndex)
  }

  // === Simpan perubahan ke state sementara ===
  const handleEditSave = () => {
    if (editingCell) {
      const updated = [...openPositions]
      updated[editingCell.row] = {
        ...updated[editingCell.row],
        [editingCell.col]: editValue,
      }
      setOpenPositions(updated)
      setTempEdited(updated) // simpan sementara di tempEdited
      setEditingCell(null)
      setEditValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleEditSave()
    else if (e.key === "Escape") {
      setEditingCell(null)
      setEditValue("")
    }
  }

  const renderValue = (val: unknown) =>
    val === null || val === undefined ? "-" : String(val)

  // === Render table ===
  const renderTable = (rows: TradeRow[], columns: string[]) => (
    <div className="overflow-x-auto max-h-[300px] overflow-y-auto rounded-xl">
      <Table className="text-[11px] border-collapse w-full text-center">
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((col) => (
              <TableHead
                key={col}
                className="text-[11px] font-semibold text-gray-600 whitespace-nowrap text-center"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, i) => {
            const isEditingRow = editingCell?.row === i
            const isSelectedRow = selectedRowIndex === i

            return (
              <TableRow
                key={i}
                className={`hover:bg-gray-50 transition-colors text-center ${isSelectedRow ? "" : ""
                  }`}
                style={{ height: "26px" }}
              >
                {columns.map((col, j) => {
                  const isEditingCell = isEditingRow && editingCell?.col === col
                  const cellValue = renderValue(row[col])
                  const textColor =
                    col === "direction"
                      ? cellValue === "BUY"
                        ? "text-green-600"
                        : cellValue === "SELL"
                          ? "text-red-600"
                          : "text-gray-700"
                      : "text-gray-700"

                  return (
                    <TableCell
                      key={j}
                      onClick={() => handleCellClick(i, col, row[col])}
                      className="relative text-[11px] whitespace-nowrap align-middle cursor-pointer border-t border-gray-200 p-0 text-center"
                      style={{
                        height: "40px",
                        lineHeight: "24px",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        className={`${["createdTime", "closeTime"].includes(col) ? "w-[120px]" : "w-[60px]"
                          } h-[26px] flex items-center justify-center ${isSelectedRow && !["userId", "pidNo", "profit", "netprofit"].includes(col)
                            ? "bg-[#BFBFBF40]"
                            : "bg-white"
                          }`}
                      >

                        {/* === Editable Cells === */}
                        {isEditingCell && col === "direction" ? (
                          <select
                            className="absolute inset-0 w-full h-full border border-gray-300 bg-white text-[11px] text-center focus:outline-none cursor-pointer"
                            value={editValue}
                            onChange={(e) => {
                              const newVal = e.target.value
                              const updated = [...openPositions]
                              updated[i] = { ...updated[i], [col]: newVal }
                              setOpenPositions(updated)
                              setTempEdited(updated)
                              setEditValue(newVal)
                              setEditingCell(null)
                            }}
                            autoFocus
                          >
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                          </select>
                        ) : isEditingCell && col === "symbol" ? (
                          <select
                            className="absolute inset-0 w-full h-full border border-gray-300 bg-white text-[11px] text-center focus:outline-none cursor-pointer"
                            value={editValue}
                            onChange={(e) => {
                              const newVal = e.target.value
                              const updated = [...openPositions]
                              updated[i] = { ...updated[i], [col]: newVal }
                              setOpenPositions(updated)
                              setTempEdited(updated)
                              setEditValue(newVal)
                              setEditingCell(null)
                            }}
                            autoFocus
                          >
                            {symbolOptions.map((sym) => (
                              <option key={sym} value={sym}>
                                {sym}
                              </option>
                            ))}
                          </select>
                        ) : isEditingCell ? (
                          <input
                            className="absolute inset-0 w-full h-full border border-gray-300 bg-white text-[11px] text-center focus:outline-none"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditSave}
                            onKeyDown={handleKeyDown}
                            autoFocus
                          />
                        ) : (
                          <>
                            <span className={textColor}>{cellValue}</span>
                            {["direction", "symbol"].includes(col) && (
                              <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                            )}
                          </>
                        )}
                      </div>
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

  // === Buttons ===
  const handleRefresh = () => {
    console.log("Refreshing table from original source...")
    setOpenPositions(data.tradePositions)
    setTempEdited([]) // hapus data edit sementara
  }

  const handleEdit = () => {
    console.log("Edited positions (temporary):", tempEdited)
    alert("Perubahan disimpan sementara (belum dikirim ke API).")
  }

  const handleClosePosition = () => {
    console.log("Close position clicked")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1280px] bg-[#EAEAEA] rounded-xl shadow-2xl border border-gray-200 overflow-hidden p-0 flex items-center justify-center">
        <div className="relative h-full flex flex-col w-full">
          <div className="flex-1 overflow-auto p-2">
            {selectedUser ? (
              <>
                {/* === USER INFO === */}
                <div className="grid grid-cols-8 gap-1 mb-3 w-full">
                  {[
                    ["User ID", selectedUser.userId],
                    ["Name", selectedUser.name],
                    ["Balance", selectedUser.balance],
                    ["Credit", "22"],
                    ["Profit", "76"],
                    ["Equity", selectedUser.equity],
                    ["Margin", selectedUser.margin],
                    ["Free Margin", selectedUser.freeMargin],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="h-16 w-[120px] bg-white rounded-md shadow-sm border border-gray-200 flex flex-col items-center justify-center"
                    >
                      <p className="text-gray-400 text-xs font-medium">{label}</p>
                      <p className="font-semibold text-sm text-gray-800">
                        {typeof value === "number" ? value.toFixed(2) : value ?? "-"}
                      </p>
                    </div>
                  ))}
                </div>


                {/* === Summary Info Bar === */}
                <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-md px-4 py-3 mb-3 text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-6">
                    <span className="text-blue-700 font-semibold">AL Swaps:</span>
                    <span>0.08</span>
                    <span className="text-blue-700 font-semibold">AL Commission:</span>
                    <span>0.08</span>
                    <span className="text-blue-700 font-semibold">AL Profit:</span>
                    <span>0.08</span>
                    <span className="text-blue-700 font-semibold">All Total Profits:</span>
                    <span>0.08</span>
                  </div>
                </div>

                {/* === TABLE SECTION === */}
                <div className="bg-white border rounded-md shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Tabs value={subTab} onValueChange={setSubTab}>
                      <TabsList className="flex space-x-3 py-6">
                        <TabsTrigger
                          value="open"
                          className="py-2 px-4 text-lg rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                          Open Positions
                        </TabsTrigger>
                        <TabsTrigger
                          value="order"
                          className="py-2 px-4 text-lg rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                          Order Positions
                        </TabsTrigger>
                        <TabsTrigger
                          value="closed"
                          className="py-2 px-4 text-lg rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                          Closed Positions
                        </TabsTrigger>
                        <TabsTrigger
                          value="transactions"
                          className="py-2 px-4 text-lg rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                          Transactions
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <div className="flex space-x-2 text-white">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        className="flex items-center bg-blue-600 gap-1 h-12 py-3 hover:bg-blue-600 hover:text-white"
                      >
                        <RefreshCcw className="w-4 h-6" /> Refresh Data
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        className="flex items-center bg-gray-500 gap-1 h-12 py-3 hover:bg-blue-600 hover:text-white"
                      >
                        <Pencil className="w-4 h-6" /> Edit Position
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleClosePosition}
                        className="flex items-center bg-gray-500 gap-1 h-12 py-3 hover:bg-blue-600 hover:text-white"
                      >
                        <XCircle className="w-4 h-6" /> Close Position
                      </Button>
                    </div>


                  </div>

                  <Tabs value={subTab} onValueChange={setSubTab}>
                    <TabsContent value="open" className="flex-1 overflow-auto">
                      {renderTable(openPositions, [
                        "userId",
                        "pidNo",
                        "symbol",
                        "createdTime",
                        "volume",
                        "direction",
                        "enterPrice",
                        "price",
                        "stopLoss",
                        "takeProfit",
                        "swap",
                        "commission",
                        "profit",
                        "netprofit",
                      ])}
                    </TabsContent>

                    {/* Order Positions */}
                    <TabsContent value="order" className="flex-1 overflow-auto">
                      {renderTable(data.orderPositions, [
                        "userId",
                        "pidNo",
                        "symbol",
                        "createdTime",
                        "volume",
                        "direction",
                        "orderPrice",
                        "price",
                        "stopLoss",
                        "takeProfit",
                      ])}
                    </TabsContent>
                    <TabsContent value="closed" className="flex-1 overflow-auto">
                      {renderTable(data.closedPositions, [
                        "userId",
                        "pidNo",
                        "symbol",
                        "createdTime",
                        "closeTime",
                        "volume",
                        "direction",
                        "enterPrice",
                        "closePrice",
                        "stopLoss",
                        "takeProfit",
                        "swap",
                        "commission",
                        "profit",
                        "netProfit",
                      ])}
                    </TabsContent>
                    <TabsContent value="transactions" className="flex-1 overflow-auto">
                      {renderTable(data.transactions || [], [
                        "userId",
                        "type",
                        "place",
                        "time",
                        "amount",
                      ])}
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
