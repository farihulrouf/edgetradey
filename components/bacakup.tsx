'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface UserTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserTradeDialog = ({ open, onOpenChange }: UserTradeDialogProps) => {
  const [activeTab, setActiveTab] = useState("open-positions");

  // Mock trading data Open Positions (9 item)
  const tradePositions = [
    { userId: "1846456", pidNo: "515418", symbol: "AUDUSD", createdTime: "07/09/2025\n10:45:56", volume: "0.1", direction: "BUY", enterPrice: "1.03658", price: "1.03658", stopLoss: "1.03658", takeProfit: "1.03658", swap: "-1.25", commission: "0", profit: "+$23.36", netProfit: "+$21.70" },
    { userId: "1846457", pidNo: "515419", symbol: "EURUSD", createdTime: "07/09/2025\n11:05:12", volume: "0.2", direction: "SELL", enterPrice: "1.04500", price: "1.04450", stopLoss: "1.05000", takeProfit: "1.04000", swap: "-0.50", commission: "0", profit: "-$12.50", netProfit: "-$13.00" },
    { userId: "1846458", pidNo: "515420", symbol: "GBPUSD", createdTime: "07/09/2025\n12:15:33", volume: "0.3", direction: "BUY", enterPrice: "1.23000", price: "1.23500", stopLoss: "1.22500", takeProfit: "1.24000", swap: "-0.75", commission: "0", profit: "+$30.00", netProfit: "+$29.25" },
    { userId: "1846459", pidNo: "515421", symbol: "USDJPY", createdTime: "07/09/2025\n13:22:47", volume: "0.1", direction: "SELL", enterPrice: "150.25", price: "150.10", stopLoss: "150.50", takeProfit: "149.90", swap: "-0.30", commission: "0", profit: "+$15.00", netProfit: "+$14.70" },
    { userId: "1846460", pidNo: "515422", symbol: "AUDUSD", createdTime: "07/09/2025\n14:00:00", volume: "0.2", direction: "BUY", enterPrice: "1.03500", price: "1.03800", stopLoss: "1.03000", takeProfit: "1.04000", swap: "-0.40", commission: "0", profit: "+$16.00", netProfit: "+$15.60" },
    { userId: "1846461", pidNo: "515423", symbol: "EURUSD", createdTime: "07/09/2025\n14:30:12", volume: "0.1", direction: "SELL", enterPrice: "1.04600", price: "1.04400", stopLoss: "1.05000", takeProfit: "1.04000", swap: "-0.25", commission: "0", profit: "+$20.00", netProfit: "+$19.75" },
    { userId: "1846462", pidNo: "515424", symbol: "GBPUSD", createdTime: "07/09/2025\n15:05:22", volume: "0.3", direction: "BUY", enterPrice: "1.23100", price: "1.23800", stopLoss: "1.22500", takeProfit: "1.24500", swap: "-0.80", commission: "0", profit: "+$35.00", netProfit: "+$34.20" },
    { userId: "1846463", pidNo: "515425", symbol: "USDJPY", createdTime: "07/09/2025\n15:50:10", volume: "0.1", direction: "SELL", enterPrice: "150.50", price: "150.30", stopLoss: "150.80", takeProfit: "150.00", swap: "-0.35", commission: "0", profit: "+$18.00", netProfit: "+$17.65" },
    { userId: "1846464", pidNo: "515426", symbol: "AUDUSD", createdTime: "07/09/2025\n16:20:45", volume: "0.2", direction: "BUY", enterPrice: "1.03700", price: "1.04050", stopLoss: "1.03200", takeProfit: "1.04500", swap: "-0.50", commission: "0", profit: "+$22.00", netProfit: "+$21.50" },
  ];

  // Mock data Order Positions (9 item)
  const orderPositions = [
    { userId: "923823", pidNo: "8374", symbol: "AUDUSD", createdTime: "25/10/2025 14:20:11", volume: "0.1", direction: "BUY", orderPrice: "1.872812", price: "1.9323", stopLoss: "1.811", takeProfit: "1.9819" },
    { userId: "923824", pidNo: "8375", symbol: "EURUSD", createdTime: "25/10/2025 14:25:45", volume: "0.2", direction: "SELL", orderPrice: "1.056712", price: "1.0623", stopLoss: "1.051", takeProfit: "1.0819" },
    { userId: "923825", pidNo: "8376", symbol: "GBPUSD", createdTime: "25/10/2025 14:30:12", volume: "0.3", direction: "BUY", orderPrice: "1.23200", price: "1.23800", stopLoss: "1.22800", takeProfit: "1.24500" },
    { userId: "923826", pidNo: "8377", symbol: "USDJPY", createdTime: "25/10/2025 14:35:50", volume: "0.1", direction: "SELL", orderPrice: "150.50", price: "150.30", stopLoss: "150.80", takeProfit: "150.00" },
    { userId: "923827", pidNo: "8378", symbol: "AUDUSD", createdTime: "25/10/2025 14:40:22", volume: "0.2", direction: "BUY", orderPrice: "1.87500", price: "1.93500", stopLoss: "1.82000", takeProfit: "1.98500" },
    { userId: "923828", pidNo: "8379", symbol: "EURUSD", createdTime: "25/10/2025 14:45:33", volume: "0.1", direction: "SELL", orderPrice: "1.05800", price: "1.06400", stopLoss: "1.05300", takeProfit: "1.08200" },
    { userId: "923829", pidNo: "8380", symbol: "GBPUSD", createdTime: "25/10/2025 14:50:11", volume: "0.3", direction: "BUY", orderPrice: "1.23500", price: "1.24000", stopLoss: "1.23000", takeProfit: "1.24500" },
    { userId: "923830", pidNo: "8381", symbol: "USDJPY", createdTime: "25/10/2025 14:55:45", volume: "0.1", direction: "SELL", orderPrice: "150.60", price: "150.40", stopLoss: "150.90", takeProfit: "150.10" },
    { userId: "923831", pidNo: "8382", symbol: "AUDUSD", createdTime: "25/10/2025 15:00:00", volume: "0.2", direction: "BUY", orderPrice: "1.88000", price: "1.94000", stopLoss: "1.82500", takeProfit: "1.99000" },
  ];

  // Mock data Closed Positions (9 item)
  const closedPositions = [
    { userId: "1846500", pidNo: "9001", symbol: "AUDUSD", createdTime: "20/10/2025 10:15:00", closeTime: "20/10/2025 14:20:11", volume: "0.1", direction: "BUY", enterPrice: "1.8700", closePrice: "1.8750", stopLoss: "1.8600", takeProfit: "1.8800", swap: "-0.05", commission: "0", profit: "+$5.00", netProfit: "+$4.95" },
    { userId: "1846501", pidNo: "9002", symbol: "EURUSD", createdTime: "20/10/2025 11:10:00", closeTime: "20/10/2025 15:00:11", volume: "0.2", direction: "SELL", enterPrice: "1.0560", closePrice: "1.0500", stopLoss: "1.0600", takeProfit: "1.0480", swap: "-0.10", commission: "0", profit: "+$12.00", netProfit: "+$11.90" },
    { userId: "1846502", pidNo: "9003", symbol: "GBPUSD", createdTime: "20/10/2025 09:45:00", closeTime: "20/10/2025 13:30:11", volume: "0.3", direction: "BUY", enterPrice: "1.2300", closePrice: "1.2350", stopLoss: "1.2250", takeProfit: "1.2400", swap: "-0.15", commission: "0", profit: "+$15.00", netProfit: "+$14.85" },
    { userId: "1846503", pidNo: "9004", symbol: "USDJPY", createdTime: "20/10/2025 12:00:00", closeTime: "20/10/2025 16:45:11", volume: "0.1", direction: "SELL", enterPrice: "150.50", closePrice: "150.30", stopLoss: "150.80", takeProfit: "150.00", swap: "-0.05", commission: "0", profit: "+$20.00", netProfit: "+$19.95" },
    { userId: "1846504", pidNo: "9005", symbol: "AUDUSD", createdTime: "20/10/2025 13:00:00", closeTime: "20/10/2025 17:20:11", volume: "0.2", direction: "BUY", enterPrice: "1.8720", closePrice: "1.8780", stopLoss: "1.8650", takeProfit: "1.8850", swap: "-0.08", commission: "0", profit: "+$12.00", netProfit: "+$11.92" },
    { userId: "1846505", pidNo: "9006", symbol: "EURUSD", createdTime: "20/10/2025 14:10:00", closeTime: "20/10/2025 18:00:11", volume: "0.1", direction: "SELL", enterPrice: "1.0570", closePrice: "1.0510", stopLoss: "1.0600", takeProfit: "1.0480", swap: "-0.05", commission: "0", profit: "+$6.00", netProfit: "+$5.95" },
    { userId: "1846506", pidNo: "9007", symbol: "GBPUSD", createdTime: "20/10/2025 15:00:00", closeTime: "20/10/2025 19:15:11", volume: "0.3", direction: "BUY", enterPrice: "1.2320", closePrice: "1.2380", stopLoss: "1.2250", takeProfit: "1.2450", swap: "-0.12", commission: "0", profit: "+$18.00", netProfit: "+$17.88" },
    { userId: "1846507", pidNo: "9008", symbol: "USDJPY", createdTime: "20/10/2025 16:05:00", closeTime: "20/10/2025 20:10:11", volume: "0.1", direction: "SELL", enterPrice: "150.60", closePrice: "150.40", stopLoss: "150.90", takeProfit: "150.10", swap: "-0.05", commission: "0", profit: "+$10.00", netProfit: "+$9.95" },
    { userId: "1846508", pidNo: "9009", symbol: "AUDUSD", createdTime: "20/10/2025 16:50:00", closeTime: "20/10/2025 21:00:11", volume: "0.2", direction: "BUY", enterPrice: "1.8750", closePrice: "1.8800", stopLoss: "1.8700", takeProfit: "1.8850", swap: "-0.07", commission: "0", profit: "+$10.00", netProfit: "+$9.93" },
  ];


    const transactions = [
    { userId: "93843", type: "Deposit", place: "Bank", time: "07/09/2025 09:30", amount: "$100" },
    { userId: "83748", type: "Withdraw", place: "Crypto", time: "07/09/2025 10:00", amount: "$500" },
    { userId: "83749", type: "Deposit", place: "Bank", time: "08/09/2025 11:15", amount: "$250" },
    { userId: "83750", type: "Deposit", place: "Crypto", time: "09/09/2025 14:45", amount: "$300" },
    { userId: "83751", type: "Withdraw", place: "Bank", time: "10/09/2025 15:10", amount: "$150" },
    { userId: "83752", type: "Deposit", place: "Crypto", time: "11/09/2025 08:40", amount: "$600" },
    { userId: "83753", type: "Withdraw", place: "Bank", time: "12/09/2025 09:50", amount: "$200" },
    { userId: "83754", type: "Deposit", place: "Bank", time: "13/09/2025 13:25", amount: "$400" },
    { userId: "83755", type: "Withdraw", place: "Crypto", time: "14/09/2025 16:00", amount: "$350" },
  ];

  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px] p-0 gap-0 max-h-[90vh]">
        <DialogTitle>
          <VisuallyHidden>User Trade Details</VisuallyHidden>
        </DialogTitle>

        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 text-sm">
              <div><span className="text-muted-foreground">User ID: </span><span className="font-medium">11768855</span></div>
              <div><span className="text-muted-foreground">Name: </span><span className="font-medium">Emma Brown</span></div>
              <div><span className="text-muted-foreground">Balance: </span><span className="font-medium">$181.50</span></div>
              <div><span className="text-muted-foreground">Credit: </span><span className="font-medium">$181.50</span></div>
              <div><span className="text-muted-foreground">Profit: </span><span className="font-medium">$181.50</span></div>
              <div><span className="text-muted-foreground">Equity: </span><span className="font-medium">$181.50</span></div>
              <div><span className="text-muted-foreground">Margin: </span><span className="font-medium">$181.50</span></div>
              <div><span className="text-muted-foreground">Free Margin: </span><span className="font-medium">%55.41</span></div>
            </div>
            <button onClick={() => onOpenChange(false)} className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 pt-4 pb-3 border-b flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger value="open-positions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Open Positions</TabsTrigger>
              <TabsTrigger value="order-positions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Order Positions</TabsTrigger>
              <TabsTrigger value="closed-positions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Closed Positions</TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Transactions</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2 ml-4">
            <Button>Refresh Data</Button>
            <Button variant="secondary">Edit Position</Button>
            <Button variant="secondary">Close Position</Button>
          </div>
        </div>

        <div className="overflow-auto max-h-[500px]">
          <Tabs value={activeTab} className="w-full">

            {/* Open Positions */}
            <TabsContent value="open-positions" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>PID No</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Created Time</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Enter Price</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stop Loss</TableHead>
                    <TableHead>Take Profit</TableHead>
                    <TableHead>Swap</TableHead>
                    <TableHead>Comission</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Net Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tradePositions.map((position, index) => (
                    <TableRow key={index}>
                      <TableCell>{position.userId}</TableCell>
                      <TableCell>{position.pidNo}</TableCell>
                      <TableCell>{position.symbol}</TableCell>
                      <TableCell className="text-xs whitespace-pre-line">{position.createdTime}</TableCell>
                      <TableCell>{position.volume}</TableCell>
                      <TableCell className={position.direction === "BUY" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{position.direction}</TableCell>
                      <TableCell>{position.enterPrice}</TableCell>
                      <TableCell>{position.price}</TableCell>
                      <TableCell>{position.stopLoss}</TableCell>
                      <TableCell>{position.takeProfit}</TableCell>
                      <TableCell>{position.swap}</TableCell>
                      <TableCell>{position.commission}</TableCell>
                      <TableCell className={position.profit.startsWith("+") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{position.profit}</TableCell>
                      <TableCell className={position.netProfit.startsWith("+") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{position.netProfit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Order Positions */}
            <TabsContent value="order-positions" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>PID No</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Created Time</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Order Price</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stop Loss</TableHead>
                    <TableHead>Take Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderPositions.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.pidNo}</TableCell>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell>{order.createdTime}</TableCell>
                      <TableCell>{order.volume}</TableCell>
                      <TableCell className={order.direction === "BUY" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{order.direction}</TableCell>
                      <TableCell>{order.orderPrice}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.stopLoss}</TableCell>
                      <TableCell>{order.takeProfit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Closed Positions */}
            <TabsContent value="closed-positions" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>PID No</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Created Time</TableHead>
                    <TableHead>Close Time</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Enter Price</TableHead>
                    <TableHead>Close Price</TableHead>
                    <TableHead>Stop Loss</TableHead>
                    <TableHead>Take Profit</TableHead>
                    <TableHead>Swap</TableHead>
                    <TableHead>Comission</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Net Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {closedPositions.map((pos, index) => (
                    <TableRow key={index}>
                      <TableCell>{pos.userId}</TableCell>
                      <TableCell>{pos.pidNo}</TableCell>
                      <TableCell>{pos.symbol}</TableCell>
                      <TableCell>{pos.createdTime}</TableCell>
                      <TableCell>{pos.closeTime}</TableCell>
                      <TableCell>{pos.volume}</TableCell>
                      <TableCell className={pos.direction === "BUY" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{pos.direction}</TableCell>
                      <TableCell>{pos.enterPrice}</TableCell>
                      <TableCell>{pos.closePrice}</TableCell>
                      <TableCell>{pos.stopLoss}</TableCell>
                      <TableCell>{pos.takeProfit}</TableCell>
                      <TableCell>{pos.swap}</TableCell>
                      <TableCell>{pos.commission}</TableCell>
                      <TableCell className={pos.profit.startsWith("+") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{pos.profit}</TableCell>
                      <TableCell className={pos.netProfit.startsWith("+") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{pos.netProfit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Transactions */}
            <TabsContent value="transactions" className="mt-0">
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User id</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((pos, index) => (
                    <TableRow key={index}>
                      <TableCell>{pos.userId}</TableCell>
                      <TableCell>{pos.type}</TableCell>
                      <TableCell>{pos.place}</TableCell>
                      <TableCell>{pos.time}</TableCell>
                      <TableCell>{pos.amount}</TableCell>
 
                </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

          </Tabs>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
          <Button variant="outline" size="sm">5</Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">31</Button>
          <Button variant="outline" size="sm">Next</Button>
          <Button variant="link" size="sm">Show all</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
