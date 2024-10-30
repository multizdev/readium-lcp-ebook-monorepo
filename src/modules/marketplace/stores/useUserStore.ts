import { create } from 'zustand';

import { metadata, user } from '@prisma/client';

type State = {
  user: user | null;
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  filteredBooks: metadata[];
};

type Actions = {
  setUser: (user: user | null) => void;
  setCategories: (categories: string[]) => void;
  setFilteredBooks: (filteredBooks: metadata[]) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSelectedCategory: (selectedCategory: string) => void;
};

const defaultState: State = {
  user: null,
  searchQuery: '',
  selectedCategory: 'All',
  categories: [],
  filteredBooks: [],
};

const useCartStore = create<State & Actions>()((set) => ({
  ...defaultState,
  setUser: (user: user | null) => set(() => ({ user })),
  setCategories: (categories: string[]) =>
    set(() => ({ categories: [...categories] })),
  setFilteredBooks: (filteredBooks: metadata[]) =>
    set(() => ({ filteredBooks: [...filteredBooks] })),
  setSearchQuery: (searchQuery: string) => set(() => ({ searchQuery })),
  setSelectedCategory: (selectedCategory: string) =>
    set(() => ({ selectedCategory })),
}));

export default useCartStore;
