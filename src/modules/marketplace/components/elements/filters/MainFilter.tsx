import React, { ReactElement, useState } from 'react';

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

function MainFilter(): ReactElement {
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Price: {selectedPriceRange}
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
  );
}

export default MainFilter;
