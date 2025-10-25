'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserTradeDialog } from "./UserTradeDialog";

const tradersData = [
  {
    userId: "895545",
    status: true,
    name: "Kutay Amca",
    accountType: "Standard",
    email: "kutay.amca@gmail.com",
    phone: "081245678901",
    credit: "$120.00",
    balance: "$1,050.25",
    equity: "$1,030.10",
    margin: "$250.00",
    freeMargin: "$780.10",
  },
  {
    userId: "712389",
    status: false,
    name: "Emma Brown",
    accountType: "Premium",
    email: "emma.brown@gmail.com",
    phone: "082345678912",
    credit: "$200.00",
    balance: "$2,300.00",
    equity: "$2,150.00",
    margin: "$500.00",
    freeMargin: "$1,650.00",
  },
  {
    userId: "445672",
    status: true,
    name: "Rizky Ahmad",
    accountType: "Standard",
    email: "rizky.ahmad@gmail.com",
    phone: "085123456789",
    credit: "$50.00",
    balance: "$850.00",
    equity: "$875.00",
    margin: "$150.00",
    freeMargin: "$725.00",
  },
  {
    userId: "998231",
    status: false,
    name: "Sophia Turner",
    accountType: "VIP",
    email: "sophia.turner@gmail.com",
    phone: "083145679821",
    credit: "$500.00",
    balance: "$5,400.00",
    equity: "$5,100.00",
    margin: "$1,000.00",
    freeMargin: "$4,100.00",
  },
  {
    userId: "324879",
    status: true,
    name: "Andi Wijaya",
    accountType: "Premium",
    email: "andi.wijaya@gmail.com",
    phone: "087654321098",
    credit: "$180.00",
    balance: "$1,800.00",
    equity: "$1,760.00",
    margin: "$400.00",
    freeMargin: "$1,360.00",
  },
  {
    userId: "762314",
    status: true,
    name: "Maya Sari",
    accountType: "Standard",
    email: "maya.sari@gmail.com",
    phone: "081376549020",
    credit: "$90.00",
    balance: "$950.00",
    equity: "$940.00",
    margin: "$200.00",
    freeMargin: "$740.00",
  },
  {
    userId: "865432",
    status: false,
    name: "John Miller",
    accountType: "Premium",
    email: "john.miller@gmail.com",
    phone: "084576321098",
    credit: "$250.00",
    balance: "$3,200.00",
    equity: "$3,180.00",
    margin: "$800.00",
    freeMargin: "$2,380.00",
  },
  {
    userId: "111234",
    status: true,
    name: "Lisa Chen",
    accountType: "Standard",
    email: "lisa.chen@gmail.com",
    phone: "082135709865",
    credit: "$100.00",
    balance: "$1,200.00",
    equity: "$1,210.00",
    margin: "$300.00",
    freeMargin: "$910.00",
  },
  {
    userId: "547821",
    status: false,
    name: "George Williams",
    accountType: "VIP",
    email: "george.w@gmail.com",
    phone: "089812345678",
    credit: "$400.00",
    balance: "$4,800.00",
    equity: "$4,750.00",
    margin: "$1,200.00",
    freeMargin: "$3,550.00",
  },
  {
    userId: "897531",
    status: true,
    name: "Nur Aisyah",
    accountType: "Premium",
    email: "nur.aisyah@gmail.com",
    phone: "085432109876",
    credit: "$160.00",
    balance: "$2,050.00",
    equity: "$2,020.00",
    margin: "$450.00",
    freeMargin: "$1,570.00",
  },
  {
    userId: "763412",
    status: false,
    name: "David Kim",
    accountType: "Standard",
    email: "david.kim@gmail.com",
    phone: "083654789012",
    credit: "$70.00",
    balance: "$870.00",
    equity: "$855.00",
    margin: "$220.00",
    freeMargin: "$635.00",
  },
  {
    userId: "129384",
    status: true,
    name: "Fatimah Rahma",
    accountType: "Standard",
    email: "fatimah.rahma@gmail.com",
    phone: "081345987612",
    credit: "$110.00",
    balance: "$1,100.00",
    equity: "$1,095.00",
    margin: "$250.00",
    freeMargin: "$845.00",
  },
];

const ITEMS_PER_PAGE = 6;

export const TradersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPages = Math.ceil(tradersData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTraders = tradersData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">Traders Information</h2>
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Equity</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Free Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTraders.map((trader, idx) => (
                <TableRow
                  key={startIndex + idx}
                  className={`${idx % 2 === 1 ? "bg-muted/50" : ""} cursor-pointer hover:bg-accent/50`}
                  onClick={() => handleRowClick(trader)}
                >
                  <TableCell>{trader.userId}</TableCell>
                  <TableCell>
                    <div className={`w-2 h-2 rounded-full ${trader.status ? "bg-green-500" : "bg-red-500"}`} />
                  </TableCell>
                  <TableCell>{trader.name}</TableCell>
                  <TableCell>{trader.accountType}</TableCell>
                  <TableCell>{trader.email}</TableCell>
                  <TableCell>{trader.phone}</TableCell>
                  <TableCell>{trader.credit}</TableCell>
                  <TableCell>{trader.balance}</TableCell>
                  <TableCell>{trader.equity}</TableCell>
                  <TableCell>{trader.margin}</TableCell>
                  <TableCell>{trader.freeMargin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
          <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          {[...Array(Math.min(5, totalPages))].map((_, page) => (
            <Button
              key={page}
              variant={page + 1 === currentPage ? "default" : "ghost"}
              size="sm"
              onClick={() => goToPage(page + 1)}
            >
              {page + 1}
            </Button>
          ))}
          <span>...</span>
          <Button onClick={() => goToPage(totalPages)} variant="ghost" size="sm">
            {totalPages}
          </Button>
          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button onClick={() => setCurrentPage(1)} variant="link" size="sm">
            Show all
          </Button>
        </div>
      </div>

      {selectedUser && (
        <UserTradeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
};
