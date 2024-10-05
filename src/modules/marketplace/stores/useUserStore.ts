import { create } from 'zustand';

import { user } from '@prisma/client';

type State = {
  user: user | null;
};

type Actions = {
  setUser: (user: user | null) => void;
};

const defaultState: State = {
  user: null,
};

const useCartStore = create<State & Actions>()((set) => ({
  ...defaultState,
  setUser: (user: user | null) => set(() => ({ user })),
}));

export default useCartStore;
