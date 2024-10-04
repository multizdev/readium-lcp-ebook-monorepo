'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Filter, ShoppingCart } from 'lucide-react';

import { Button } from '@shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shadcn/components/ui/dropdown-menu';

const ebooks = [
  {
    id: 1,
    title: 'The Digital Revolution',
    author: 'John Doe',
    price: 9.99,
    genre: 'Technology',
  },
  {
    id: 2,
    title: 'Cooking Masterclass',
    author: 'Jane Smith',
    price: 14.99,
    genre: 'Cooking',
  },
  {
    id: 3,
    title: 'Financial Freedom',
    author: 'Mike Johnson',
    price: 19.99,
    genre: 'Finance',
  },
  {
    id: 4,
    title: 'Fitness for Beginners',
    author: 'Sarah Brown',
    price: 7.99,
    genre: 'Health',
  },
  {
    id: 5,
    title: 'The Art of Painting',
    author: 'Emily Davis',
    price: 24.99,
    genre: 'Art',
  },
  {
    id: 6,
    title: 'World History',
    author: 'David Wilson',
    price: 29.99,
    genre: 'History',
  },
];

function MainContent() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  const filteredEbooks = ebooks.filter((ebook) => {
    const genreMatch = selectedGenre === 'All' || ebook.genre === selectedGenre;
    const priceMatch =
      selectedPriceRange === 'All' ||
      (selectedPriceRange === 'Under $10' && ebook.price < 10) ||
      (selectedPriceRange === '$10 - $20' &&
        ebook.price >= 10 &&
        ebook.price <= 20) ||
      (selectedPriceRange === 'Over $20' && ebook.price > 20);
    return genreMatch && priceMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" /> Genre: {selectedGenre}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Genre</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  'All',
                  'Technology',
                  'Cooking',
                  'Finance',
                  'Health',
                  'Art',
                  'History',
                ].map((genre) => (
                  <DropdownMenuItem
                    key={genre}
                    onSelect={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" /> Price:{' '}
                  {selectedPriceRange}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['All', 'Under $10', '$10 - $20', 'Over $20'].map((range) => (
                  <DropdownMenuItem
                    key={range}
                    onSelect={() => setSelectedPriceRange(range)}
                  >
                    {range}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEbooks.map((ebook) => (
              <Card key={ebook.id} className="flex flex-col">
                <CardHeader>
                  <div className="aspect-[3/4] relative mb-4">
                    <Image
                      src={`/placeholder.svg`}
                      alt={ebook.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <CardTitle>{ebook.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    By {ebook.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Genre: {ebook.genre}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold">
                    ${ebook.price.toFixed(2)}
                  </span>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainContent;
