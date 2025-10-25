'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dummy data admin
const adminsData = Array.from({ length: 30 }, (_, idx) => ({
  name: `Admin ${idx + 1}`,
  role: idx % 2 === 0 ? "Super Admin" : "Moderator",
  email: `admin${idx + 1}@example.com`,
  password: `pass${1000 + idx}`,
}));

const ITEMS_PER_PAGE = 5;

export const Administration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = Math.ceil(adminsData.length / ITEMS_PER_PAGE);

  const isShowAll = currentPage === 0;

  // Filter berdasarkan searchQuery
  const filteredAdmins = adminsData.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentAdmins = isShowAll
    ? filteredAdmins
    : filteredAdmins.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "ghost"}
          size="sm"
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border gap-2">
        <h2 className="text-lg font-semibold text-card-foreground">Admin Users</h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by Name, Role, or Email"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-64"
          />
          <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAdmins.map((admin, idx) => (
              <TableRow key={idx} className={idx % 2 === 1 ? "bg-muted/50" : ""}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.password}</TableCell>
              </TableRow>
            ))}
            {currentAdmins.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 p-4 border-t border-border flex-wrap">
        <Button
          onClick={() => !isShowAll && goToPage(currentPage - 1)}
          disabled={currentPage === 1 || isShowAll}
          variant="ghost"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>

        {!isShowAll && getPageButtons()}

        {!isShowAll && totalPages > 5 && <span>...</span>}

        {!isShowAll && (
          <Button onClick={() => goToPage(totalPages)} variant="ghost" size="sm">{totalPages}</Button>
        )}

        <Button
          onClick={() => !isShowAll && goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || isShowAll}
          variant="ghost"
          size="sm"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>

        <Button
          onClick={() => setCurrentPage(0)}
          variant="link"
          size="sm"
        >
          Show all
        </Button>
      </div>
    </div>
  );
};
