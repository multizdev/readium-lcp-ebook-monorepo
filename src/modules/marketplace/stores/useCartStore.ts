import { create } from 'zustand';

import { metadata } from '@prisma/client';

type State = {
  cart: metadata[];
};

type Actions = {
  setCart: (cart: metadata[]) => void;
};

const defaultState: State = {
  cart: [],
};

const useCartStore = create<State & Actions>()((set) => ({
  ...defaultState,
  setCart: (cart: metadata[]) => set(() => ({ cart: [...cart] })),
}));

export default useCartStore;
