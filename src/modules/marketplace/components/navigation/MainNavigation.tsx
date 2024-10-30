'use client';

import React, { ReactElement, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronLeft,
  ChevronRight,
  Book,
  Loader2,
  LogOutIcon,
} from 'lucide-react';

import { Input } from '@shadcn/components/ui/input';
import { Button } from '@shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@shadcn/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@shadcn/components/ui/sheet';

import CartAction from '@marketplace/components/elements/user/cart/CartAction';
import useUserStore from '@marketplace/stores/useUserStore';
import useAuth from '@marketplace/auth/hooks/useAuth';

function MainNavigation({ content }: { content: ReactElement }) {
  const pathName = usePathname();
  const { replace, push } = useRouter();

  const { fetchSession, logout, loading } = useAuth();

  const { user } = useUserStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    (async () => fetchSession())();
  }, []);

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
      {!pathName.includes('user') && !pathName.includes('admin') && (
        <>
          {/* Top Navigation Bar */}
          <header className="w-full bg-white border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-2 flex-shrink-0 text-primary">
                  <Book className="h-6 w-6" />
                  <Link href="/" className="text-2xl font-bold">
                    Marketplace
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
                  <CartAction />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        {user ? user.name : 'Login'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user && (
                        <>
                          <DropdownMenuLabel onClick={() => push('/')}>
                            Account
                          </DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => push('/')}>
                            Home
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => push('/mybooks')}>
                            My Books
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={async () => {
                              await logout();
                            }}
                          >
                            {loading && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Log out
                          </DropdownMenuItem>
                        </>
                      )}
                      {!user && (
                        <>
                          <DropdownMenuItem
                            onClick={() => replace('/user/login')}
                          >
                            Log In
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => replace('/user/register')}
                          >
                            Register
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Sheet
                    open={isMobileMenuOpen}
                    onOpenChange={setIsMobileMenuOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <div className="flex flex-col h-full">
                        <span className="text-lg font-semibold">Menu</span>
                        <div className="mb-4">
                          <Input
                            type="search"
                            placeholder="Search for books..."
                          />
                        </div>
                        {!user && (
                          <>
                            <Button
                              variant="ghost"
                              className="justify-start"
                              onClick={() => replace('/user/login')}
                            >
                              Log In
                            </Button>
                            <Button
                              variant="ghost"
                              className="justify-start"
                              onClick={() => replace('/user/register')}
                            >
                              Register
                            </Button>
                          </>
                        )}
                        {user && (
                          <nav className="flex flex-col space-y-2">
                            <Button
                              variant="ghost"
                              className="justify-start"
                              onClick={() => push('/')}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Home
                            </Button>
                            <Button
                              variant="ghost"
                              className="justify-start"
                              onClick={() => push('/mybooks')}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              My Books
                            </Button>
                            <Button
                              variant="ghost"
                              className="justify-start"
                              onClick={async () => {
                                await logout();
                              }}
                            >
                              <LogOutIcon className="mr-2 h-4 w-4" />
                              Logout
                            </Button>
                          </nav>
                        )}
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
        </>
      )}

      {/* Main Content Area with Sidebar */}
      <div className="flex-grow flex">
        {!pathName.includes('user') && !pathName.includes('admin') && (
          <>
            {/* Collapsible Sidebar - Hidden on mobile */}
            <aside
              className={`hidden md:flex flex-col ${
                isSidebarCollapsed ? 'w-16' : 'w-64'
              } transition-all duration-300 ease-in-out border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
            >
              <div className="p-4 flex justify-end">
                <Button
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
          </>
        )}
        {/* Main Content */}
        <main className="flex-grow p-4">{content}</main>
      </div>
    </div>
  );
}

export default MainNavigation;
