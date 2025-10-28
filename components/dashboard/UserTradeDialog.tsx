'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import tradesData from "@/data/trades.json";
import { Trader } from "@/lib/api";

interface UserTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Trader;
}

export const UserTradeDialog = ({ open, onOpenChange, user }: UserTradeDialogProps) => {
  const [activeTab, setActiveTab] = useState("open-positions");

  const [openPositions, setOpenPositions] = useState(tradesData.tradePositions);
  const [orderPositions, setOrderPositions] = useState(tradesData.orderPositions);
  const [closedPositions, setClosedPositions] = useState(tradesData.closedPositions);
  const [transactions, setTransactions] = useState(tradesData.transactions);

  const [editingCell, setEditingCell] = useState<{ tab: string; row: number; field: string } | null>(null);

  const handleCellChange = (tab: string, row: number, field: string, value: string) => {
    const update = (setter: any, data: any[]) => {
      const updated = [...data];
      updated[row][field] = value;
      setter(updated);
    };

    switch (tab) {
      case "open-positions":
        update(setOpenPositions, openPositions);
        break;
      case "order-positions":
        update(setOrderPositions, orderPositions);
        break;
      case "closed-positions":
        update(setClosedPositions, closedPositions);
        break;
      case "transactions":
        update(setTransactions, transactions);
        break;
    }
  };

  const handleBlur = () => setEditingCell(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") setEditingCell(null);
  };

  const parseFlexibleDate = (value: string): Date | null => {
    if (!value) return null;
    let date: Date | null = null;
    if (!isNaN(Date.parse(value))) {
      date = new Date(value);
    } else {
      const match = value.match(/(\d{1,2}) (\w{3}) (\d{4})(?:, (\d{1,2}):(\d{2}):(\d{2}))?/);
      if (match) {
        const [, day, mon, year, h = "00", m = "00", s = "00"] = match;
        date = new Date(`${day} ${mon} ${year} ${h}:${m}:${s}`);
      } else {
        const parts = value.split("/");
        if (parts.length === 3) {
          const [d, m, y] = parts;
          date = new Date(`${y}-${m}-${d}`);
        }
      }
    }
    return isNaN(date?.getTime() || NaN) ? null : date;
  };

  const formatDateTime = (value: string) => {
    const d = parseFlexibleDate(value);
    if (!d) return value;
    const date = d.toLocaleDateString("en-GB");
    const time = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${date}\n${time}`;
  };

  const renderEditableTable = (tab: string, data: any[], setData: any) => (
    <Table className="text-[12px] mx-2 border h-[405px]">
      <TableHeader>
        <TableRow>
          {Object.keys(data[0] || {}).map((key) => (
            <TableHead key={key} className="px-2 py-2 whitespace-nowrap">
              {key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="h-[38px]">
            {Object.keys(row).map((key) => {
              const isEditable = true;
              const isEditing =
                editingCell &&
                editingCell.row === rowIndex &&
                editingCell.field === key &&
                editingCell.tab === tab;

              const isDateField = key.toLowerCase().includes("time") || key.toLowerCase().includes("date");
              const isDirectionField = key === "direction";
              const dateObj = isDateField ? parseFlexibleDate(row[key]) : null;

              return (
                <TableCell
                  key={key}
                  onClick={() => isEditable && setEditingCell({ tab, row: rowIndex, field: key })}
                  className={`cursor-pointer align-middle h-[36px] px-2 py-1 ${isDirectionField
                      ? row[key] === "BUY"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                      : ""
                    }`}
                  style={{
                    verticalAlign: "middle",
                    minWidth: "90px",
                    whiteSpace: isDateField ? "pre-line" : "nowrap",
                  }}
                >
                  {isEditing ? (
                    <div className="h-[32px] flex items-center justify-center">
                      {isDateField ? (
                        <input
                          type="date"
                          autoFocus
                          value={dateObj ? dateObj.toISOString().split("T")[0] : ""}
                          onChange={(e) =>
                            handleCellChange(tab, rowIndex, key, new Date(e.target.value).toISOString())
                          }
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          className="border rounded-sm px-1 text-[12px] focus:outline-none focus:ring-2 focus:ring-primary h-[26px] w-[110px]"
                        />
                      ) : isDirectionField ? (
                        <select
                          autoFocus
                          value={row[key]}
                          onChange={(e) => handleCellChange(tab, rowIndex, key, e.target.value)}
                          onBlur={handleBlur}
                          className="border rounded-sm px-1 text-[12px] focus:outline-none focus:ring-2 focus:ring-primary h-[26px] w-[70px]"
                        >
                          <option value="BUY">BUY</option>
                          <option value="SELL">SELL</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          autoFocus
                          value={row[key]}
                          onChange={(e) => handleCellChange(tab, rowIndex, key, e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          className="border rounded-sm px-1 text-[12px] focus:outline-none focus:ring-2 focus:ring-primary h-[26px] w-full"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`h-[32px] flex items-center justify-start ${isDateField ? "whitespace-pre-line text-[11px]" : "truncate"
                        }`}
                    >
                      {isDateField ? formatDateTime(row[key]) : row[key]}
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] p-0 gap-0 max-h-[90vh]">
        <DialogTitle>
          <VisuallyHidden>User Trade Details</VisuallyHidden>
        </DialogTitle>

        {/* Tombol Close di kanan atas */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Info Trader */}
        {/* Header Info Trader */}
        <DialogHeader className="px-4 pt-6 pb-4 border-b bg-gray-50">
          <div className="flex flex-wrap gap-3 text-sm leading-tight">
            {[
              { label: "User ID", value: user.userId },
              { label: "Name", value: user.name },
              { label: "Account Type", value: user.accountType },
              { label: "Credit", value: user.credit },
              { label: "Balance", value: user.balance, color: "text-blue-600" },
              { label: "Equity", value: user.equity },
              { label: "Margin", value: user.margin },
              { label: "Free Margin", value: user.freeMargin },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center rounded-md bg-white px-3 py-2"
                style={{ width: "125px", height: "67px" }}
              >
                <span className="text-gray-500 text-[12px]">{item.label}</span>
                <span className={`font-semibold text-[13px] ${item.color || ""}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </DialogHeader>

        {/* Tabs Section */}
        <div className="px-6 pt-4 pb-3 border-b flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-1">
              <TabsTrigger
                value="open-positions"
                className="px-3 py-1.5 text-sm rounded-md hover:bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition"
              >
                Open Positions
              </TabsTrigger>
              <TabsTrigger
                value="order-positions"
                className="px-3 py-1.5 text-sm rounded-md hover:bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition"
              >
                Order Positions
              </TabsTrigger>
              <TabsTrigger
                value="closed-positions"
                className="px-3 py-1.5 text-sm rounded-md hover:bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition"
              >
                Closed Positions
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="px-3 py-1.5 text-sm rounded-md hover:bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition"
              >
                Transactions
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 ml-4">
            <Button>Refresh</Button>
            <Button variant="secondary">Save Changes</Button>
          </div>
        </div>

        {/* Tables */}
        <div className="overflow-auto max-h-[500px]">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="open-positions">
              {renderEditableTable("open-positions", openPositions, setOpenPositions)}
            </TabsContent>
            <TabsContent value="order-positions">
              {renderEditableTable("order-positions", orderPositions, setOrderPositions)}
            </TabsContent>
            <TabsContent value="closed-positions">
              {renderEditableTable("closed-positions", closedPositions, setClosedPositions)}
            </TabsContent>
            <TabsContent value="transactions">
              {renderEditableTable("transactions", transactions, setTransactions)}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
