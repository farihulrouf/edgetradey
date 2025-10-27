'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import tradesData from "@/data/trades.json";

interface UserTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserTradeDialog = ({ open, onOpenChange }: UserTradeDialogProps) => {
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

  // 🔹 Universal date parser
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
    const date = d.toLocaleDateString("en-GB"); // 07/09/2025
    const time = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${date}\n${time}`;
  };

  const renderEditableTable = (tab: string, data: any[], setData: any) => (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(data[0] || {}).map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="h-[40px]">
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
                  className={`cursor-pointer align-middle h-[40px] ${
                    isDirectionField
                      ? row[key] === "BUY"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                      : ""
                  }`}
                  style={{
                    verticalAlign: "middle",
                    minWidth: "100px",
                    whiteSpace: isDateField ? "pre-line" : "nowrap",
                  }}
                >
                  {isEditing ? (
                    <div className="h-[36px] flex items-center justify-center">
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
                          className="border rounded-sm px-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary h-[28px] w-[120px]"
                          style={{
                            lineHeight: "28px",
                          }}
                        />
                      ) : isDirectionField ? (
                        <select
                          autoFocus
                          value={row[key]}
                          onChange={(e) => handleCellChange(tab, rowIndex, key, e.target.value)}
                          onBlur={handleBlur}
                          className="border rounded-sm px-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary h-[28px] w-[80px]"
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
                          className="border rounded-sm px-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary h-[28px] w-full"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`h-[36px] flex items-center justify-start ${
                        isDateField ? "whitespace-pre-line text-xs" : "truncate"
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
      <DialogContent className="max-w-[1400px] p-0 gap-0 max-h-[90vh]">
        <DialogTitle>
          <VisuallyHidden>User Trade Details</VisuallyHidden>
        </DialogTitle>

        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 text-sm">
              <div><span className="text-muted-foreground">User ID:</span> <span className="font-medium">11768855</span></div>
              <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">Emma Brown</span></div>
              <div><span className="text-muted-foreground">Balance:</span> <span className="font-medium">$181.50</span></div>
            </div>
            <button onClick={() => onOpenChange(false)} className="opacity-70 hover:opacity-100 transition-opacity">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="px-6 pt-4 pb-3 border-b flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger value="open-positions">Open Positions</TabsTrigger>
              <TabsTrigger value="order-positions">Order Positions</TabsTrigger>
              <TabsTrigger value="closed-positions">Closed Positions</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
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
            <TabsContent value="open-positions">{renderEditableTable("open-positions", openPositions, setOpenPositions)}</TabsContent>
            <TabsContent value="order-positions">{renderEditableTable("order-positions", orderPositions, setOrderPositions)}</TabsContent>
            <TabsContent value="closed-positions">{renderEditableTable("closed-positions", closedPositions, setClosedPositions)}</TabsContent>
            <TabsContent value="transactions">{renderEditableTable("transactions", transactions, setTransactions)}</TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
