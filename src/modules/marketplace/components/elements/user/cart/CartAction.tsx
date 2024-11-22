/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BIW1AMAoSON
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import React, { useState } from 'react';

import Image from 'next/image';

import { Loader2, ShoppingCart, X } from 'lucide-react';

import axios from 'axios';
import { metadata } from '@prisma/client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@shadcn/components/ui/dropdown-menu';
import { Separator } from '@shadcn/components/ui/separator';
import { Button } from '@shadcn/components/ui/button';
import { Badge } from '@shadcn/components/ui/badge';

import useCartStore from '@marketplace/stores/useCartStore';
import useUserStore from '@marketplace/stores/useUserStore';
import { useRouter } from 'next/navigation';

function CartAction() {
  const { replace } = useRouter();

  const { cart, setCart } = useCartStore();
  const { user } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);

  const total = cart.reduce(
    (acc, item) => acc + (item.price - item.discount),
    0,
  );

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!user) {
      replace('/user/login');
    } else {
      cart.map(async ({ content_id }: metadata) => {
        setLoading(true);
        const { data, status } = await axios.post('/api/user/purchase', {
          content_id,
        });

        if (status === 200) {
          setCart([]);
          console.log(`Content ${content_id}: `, data);
        }
        setLoading(false);
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="outline" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
          {cart.length > 0 && (
            <Badge
              className="absolute top-[-10px] right-[-15px]"
              variant="destructive"
            >
              {cart.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="grid gap-4 p-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Cart</h4>
              <span className="text-muted-foreground">
                {cart.length} item(s)
              </span>
            </div>
            <div className="grid gap-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/publications/cover-images/${item.content_id}.png?timestamp=${new Date().getTime()}`}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="rounded-md"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="grid gap-1">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm text-muted-foreground">
                        ${item.price - item.discount}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Checkout
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CartAction;
