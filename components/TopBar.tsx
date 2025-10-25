import { SearchIcon, BellIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboardStore } from '@/stores/dashboardStore';

export function TopBar() {
  const { setMobileMenuOpen } = useDashboardStore();

  return (
    <header className="sticky top-0 z-30 bg-neutral border-b border-border">
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <Button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden bg-tertiary text-tertiary-foreground hover:bg-gray-200"
          size="icon"
        >
          <MenuIcon className="w-5 h-5" strokeWidth={2} />
        </Button>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={2} />
            <Input
              type="search"
              placeholder="Quick search..."
              className="pl-10 bg-tertiary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-tertiary text-tertiary-foreground hover:bg-gray-200" size="icon">
            <BellIcon className="w-5 h-5" strokeWidth={2} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">DC</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-body-sm font-medium text-foreground">Dominique Ch.</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-neutral border-border">
              <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-tertiary">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-tertiary">Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-warning cursor-pointer hover:bg-tertiary">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
