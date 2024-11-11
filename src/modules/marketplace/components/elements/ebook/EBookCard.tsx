import React, { ReactElement } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { PackageOpen, ShoppingCart } from 'lucide-react';
import { metadata } from '@prisma/client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/components/ui/card';
import { Button } from '@shadcn/components/ui/button';

import useCartStore from '@marketplace/stores/useCartStore';

function FinalFooter({ book }: { book: metadata }): ReactElement {
  const pathName = usePathname();
  const { cart, setCart } = useCartStore();

  const { price, discount } = book;

  if (pathName.includes('/mybooks'))
    return (
      <CardFooter className="mt-auto flex justify-between items-center">
        <Button onClick={() => setCart([...cart, book])}>
          <PackageOpen className="mr-2 h-4 w-4" /> Open Book
        </Button>
      </CardFooter>
    );

  return (
    <CardFooter className="mt-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">
          $ {(price - discount).toFixed(2)}
        </span>
        <span className="line-through">${price.toFixed(2)}</span>
      </div>
      <Button onClick={() => setCart([...cart, book])}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </CardFooter>
  );
}

function EBookCard({ book }: { book: metadata }): ReactElement {
  const { id, title, authors, categories, content_id } = book;

  const imageURL = `${process.env.NEXT_PUBLIC_IMAGE_HOST}/publications/cover-images/${content_id}.png`;

  return (
    <Card key={id} className="flex flex-col">
      <CardHeader>
        <div className="aspect-[3/4] relative mb-4">
          <Image
            src={imageURL}
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
      <FinalFooter book={book} />
    </Card>
  );
}

export default EBookCard;
