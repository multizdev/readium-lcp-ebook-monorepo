'use client';

import React, { ReactElement, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import useSWR, { SWRResponse } from 'swr';
import { metadata } from '@prisma/client';

import MainFilter from '@marketplace/components/elements/filters/MainFilter';
import EBookCard from '@marketplace/components/elements/ebook/EBookCard';
import useUserStore from '@marketplace/stores/useUserStore';

function MainContent({ url }: { url: string }): ReactElement {
  const pathName = usePathname();

  const { user, selectedCategory, searchQuery, setCategories } = useUserStore();

  const { data: books, isLoading }: SWRResponse<metadata[]> = useSWR(url);

  useEffect(() => {
    if (books) {
      const categories = Array.from(
        new Set(books.map((book) => book.categories[0])),
      );
      setCategories(categories);
    }
  }, [books]);

  const filteredBooks: metadata[] | undefined = useMemo(() => {
    let filtered = books;
    if (selectedCategory !== 'All') {
      filtered = books?.filter((book) =>
        book.categories.includes(selectedCategory),
      );
    }
    if (searchQuery) {
      filtered = filtered?.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return filtered;
  }, [selectedCategory, searchQuery, books]);

  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="mr-2 h-10 w-10 color-pr animate-spin" />
        </div>
      )}
      {!isLoading && (
        <>
          {pathName === '/mybooks' ? (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Hi {user?.name}, Here are your books
              </h1>
              <p>You can access and read any of the books given below.</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Welcome to EbookStore</h1>
              <p>
                Discover your next favorite book from our vast collection of
                ebooks.
              </p>
            </>
          )}
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              <section className="container mx-auto px-4 py-8">
                <MainFilter />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks &&
                    filteredBooks.map((book: metadata) => {
                      if (book) return <EBookCard key={book.id} book={book} />;
                    })}
                </div>
              </section>
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default MainContent;
