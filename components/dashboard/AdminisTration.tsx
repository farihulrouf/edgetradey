'use client'

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAllAdmins } from "@/lib/api"; // kita buat function baru di api.ts

interface Admin {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

const ITEMS_PER_PAGE = 5;

export const Administration = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch data via api.ts
  useEffect(() => {
    setLoading(true);
    fetchAllAdmins()
      .then(data => {
        setAdmins(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load admin data");
        setLoading(false);
      });
  }, []);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
  const isShowAll = currentPage === 0;

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

  if (loading) return <div className="p-4 text-center text-muted-foreground">Loading admins...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-[10px]">Name</TableHead>
              <TableHead className="text-[10px]">Role</TableHead>
              <TableHead className="text-[10px]">Email</TableHead>
              <TableHead className="text-[10px]">Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAdmins.map((admin, idx) => (
              <TableRow key={admin.id} className={idx % 2 === 1 ? "bg-muted/50" : ""}>
                <TableCell className="text-[10px]">{admin.name}</TableCell>
                <TableCell className="text-[10px]">{admin.role}</TableCell>
                <TableCell className="text-[10px]">{admin.email}</TableCell>
                <TableCell className="text-[10px]">{admin.password}</TableCell>
              </TableRow>
            ))}
            {currentAdmins.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-[10px]">
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

        <Button
          onClick={() => !isShowAll && goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || isShowAll}
          variant="ghost"
          size="sm"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>

        {isShowAll ? (
          <Button onClick={() => setCurrentPage(1)} variant="link" size="sm">
            Show paginated
          </Button>
        ) : (
          <Button onClick={() => setCurrentPage(0)} variant="link" size="sm">
            Show all
          </Button>
        )}
      </div>
    </div>
  );
};
