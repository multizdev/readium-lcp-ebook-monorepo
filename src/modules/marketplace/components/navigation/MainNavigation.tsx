'use client';

import { ReactElement, useState } from 'react';

import Link from 'next/link';

import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Input } from '@shadcn/components/ui/input';
import { Button } from '@shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@shadcn/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@shadcn/components/ui/sheet';

function MainNavigation({ content }: { content: ReactElement }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Biography',
    'Self-Help',
    'Business',
    'Cookbooks',
    "Children's Books",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary">
                Ebook Marketplace
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden sm:block flex-grow mx-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for books..."
                  className="w-full pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Menu</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="mb-4">
                      <Input type="search" placeholder="Search for books..." />
                    </div>
                    <nav className="flex flex-col space-y-2">
                      <Button variant="ghost" className="justify-start">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Cart
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Button>
                    </nav>
                    <div className="mt-auto">
                      <h3 className="font-semibold mb-2">Categories</h3>
                      <nav className="flex flex-col space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category}
                            href={`#${category.toLowerCase().replace(' ', '-')}`}
                            className="text-sm hover:underline"
                          >
                            {category}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex-grow flex">
        {/* Collapsible Sidebar - Hidden on mobile */}
        <aside
          className={`hidden md:flex flex-col ${
            isSidebarCollapsed ? 'w-16' : 'w-64'
          } bg-gray-100 transition-all duration-300 ease-in-out`}
        >
          <div className="p-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={
                isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
              }
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          {!isSidebarCollapsed && (
            <div className="p-4 pt-0">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`#${category.toLowerCase().replace(' ', '-')}`}
                    className="block hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    {category}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to EbookStore</h1>
          <p>
            Discover your next favorite book from our vast collection of ebooks.
          </p>
          {content}
        </main>
      </div>
    </div>
  );
}

export default MainNavigation;
