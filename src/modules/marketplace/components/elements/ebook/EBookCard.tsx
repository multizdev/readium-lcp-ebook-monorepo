import React, { ReactElement } from 'react';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { Button } from '@shadcn/components/ui/button';

import { ContentWithMetadata } from '@/types';

function EBookCard({ book }: { book: ContentWithMetadata }): ReactElement {
  const { id, metadata } = book;
  const { title, authors, categories, price, discount } = metadata[0];

  return (
    <Card key={id} className="flex flex-col">
      <CardHeader>
        <div className="aspect-[3/4] relative mb-4">
          <Image
            src={`/publications/cover-images/${id}.png`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">By {authors[0]}</p>
        <p className="text-sm text-muted-foreground">Genre: {categories[0]}</p>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            $ {(price - discount).toFixed(2)}
          </span>
          <span className="line-through">${price.toFixed(2)}</span>
        </div>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EBookCard;
