'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserVerificationDialog } from "./UserVerificationDialog"; // import dialog

// Dummy data users
const usersData = [
  {
    userId: 100001,
    name: "Rizky Ahmad",
    accountType: "Standard",
    email: "rizky.ahmad@gmail.com",
    phone: "081234567890",
    dateOfBirth: "12/03/1995",
    accountSetting: "Account Setting",
    verification: "Verified",
  },
  {
    userId: 100002,
    name: "Dewi Kartika",
    accountType: "Premium",
    email: "dewi.kartika@gmail.com",
    phone: "081298765432",
    dateOfBirth: "04/09/1993",
    accountSetting: "Account Setting",
    verification: "Pending",
  },
  {
    userId: 100003,
    name: "Budi Santoso",
    accountType: "Standard",
    email: "budi.santoso@gmail.com",
    phone: "085612345678",
    dateOfBirth: "25/01/1990",
    accountSetting: "Account Setting",
    verification: "Verified",
  },
  {
    userId: 100004,
    name: "Siti Aisyah",
    accountType: "VIP",
    email: "siti.aisyah@gmail.com",
    phone: "082134567890",
    dateOfBirth: "18/07/1998",
    accountSetting: "Account Setting",
    verification: "Pending",
  },
  {
    userId: 100005,
    name: "John Miller",
    accountType: "Standard",
    email: "john.miller@gmail.com",
    phone: "081345987654",
    dateOfBirth: "09/02/1988",
    accountSetting: "Account Setting",
    verification: "Verified",
  },
  {
    userId: 100006,
    name: "Lisa Chen",
    accountType: "Premium",
    email: "lisa.chen@gmail.com",
    phone: "083567890123",
    dateOfBirth: "20/11/1996",
    accountSetting: "Account Setting",
    verification: "Pending",
  },
  {
    userId: 100007,
    name: "Ahmad Fauzi",
    accountType: "Standard",
    email: "ahmad.fauzi@gmail.com",
    phone: "085723456789",
    dateOfBirth: "30/08/1994",
    accountSetting: "Account Setting",
    verification: "Verified",
  },
  {
    userId: 100008,
    name: "Maria Gonzalez",
    accountType: "VIP",
    email: "maria.g@gmail.com",
    phone: "089812345678",
    dateOfBirth: "05/06/1992",
    accountSetting: "Account Setting",
    verification: "Pending",
  },
  {
    userId: 100009,
    name: "Rina Kusuma",
    accountType: "Standard",
    email: "rina.kusuma@gmail.com",
    phone: "081276543210",
    dateOfBirth: "14/10/1997",
    accountSetting: "Account Setting",
    verification: "Verified",
  },
  {
    userId: 100010,
    name: "George Williams",
    accountType: "Premium",
    email: "george.w@gmail.com",
    phone: "082198765432",
    dateOfBirth: "22/12/1989",
    accountSetting: "Account Setting",
    verification: "Pending",
  },
  {
    userId: 100011,
    name: "Nur Aisyah",
    accountType: "Standard",
    email: "nur.aisyah@gmail.com",
    phone: "081398765432",
    dateOfBirth: "03/05/1995",
    accountSetting: "Account Setting",
    verification: "Verified",
  },
  {
    userId: 100012,
    name: "David Kim",
    accountType: "Premium",
    email: "david.kim@gmail.com",
    phone: "087812345678",
    dateOfBirth: "15/01/1991",
    accountSetting: "Account Setting",
    verification: "Pending",
  },
];

const ITEMS_PER_PAGE = 5;

export const UserVerification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentUsers = usersData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-card-foreground">User Verification</h2>
        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Export
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Account Setting</TableHead>
              <TableHead>Verification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, idx) => (
              <TableRow
                key={user.userId}
                className={`${idx % 2 === 1 ? "bg-muted/50" : ""} cursor-pointer hover:bg-muted/70`}
                onClick={() => handleRowClick(user)}
              >
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.accountType}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.accountSetting}</TableCell>
                <TableCell
                  className={`font-medium ${
                    user.verification === "Verified" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {user.verification}
                </TableCell>
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

        {totalPages > 5 && <span>...</span>}

        <Button onClick={() => goToPage(totalPages)} variant="ghost" size="sm">
          {totalPages}
        </Button>

        <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} variant="ghost" size="sm">
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>

        <Button onClick={() => setCurrentPage(1)} variant="link" size="sm">
          Show all
        </Button>
      </div>

      {selectedUser && (
        <UserVerificationDialog open={dialogOpen} onOpenChange={setDialogOpen} user={selectedUser} />
      )}
    </div>
  );
};
