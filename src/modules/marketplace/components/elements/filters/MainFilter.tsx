import React, { ReactElement } from 'react';

import { Filter } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shadcn/components/ui/dropdown-menu';
import { Button } from '@shadcn/components/ui/button';
import useUserStore from '@marketplace/stores/useUserStore';

function MainFilter(): ReactElement {
  const { categories, selectedCategory, setSelectedCategory } = useUserStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Category: {selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {['All', ...categories].map((range) => (
            <DropdownMenuItem
              key={range}
              onSelect={() => setSelectedCategory(range)}
            >
              {range}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MainFilter;
