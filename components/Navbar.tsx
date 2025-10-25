'use client'

import { Search, Bell, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between sticky top-0 z-50">

      {/* User Section */}
      <div className="relative flex items-center gap-2">
        <DropdownMenu
          trigger={
            <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:bg-accent">
              <span className="font-medium">Dominique Ch.</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          }
          className="absolute left-0 mt-1 w-48"
        >
          <DropdownMenuItem>Admin Level: Super</DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Logout clicked")}>Logout</DropdownMenuItem>
        </DropdownMenu>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Quick search"
            className="pl-10 bg-muted/50 border-muted"
          />
        </div>
      </div>

      {/* Notification Icon */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            4
          </Badge>
        </Button>
      </div>
    </header>
  );
};
