'use client';

import React from 'react';

import useSWR, { SWRResponse } from 'swr';
import { metadata } from '@prisma/client';

import MainFilter from '@marketplace/components/elements/filters/MainFilter';
import EBookCard from '@marketplace/components/elements/ebook/EBookCard';

function MainContent() {
  const { data: books }: SWRResponse<metadata[]> = useSWR(
    '/api/publications/content/all',
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-8">
          <MainFilter />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books?.map((book: metadata) => {
              if (book) return <EBookCard key={book.id} book={book} />;
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainContent;
