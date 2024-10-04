import { create } from 'zustand';

type State = {
  currentMenuItem: string;
  mainMenuCollapsed: boolean;
};

type Actions = {
  setCurrentMenuItem: (currentMenuItem: string) => void;
  setMainMenuCollapsed: (mainMenuCollapsed: boolean) => void;
};

const defaultState: State = {
  mainMenuCollapsed: false,
  currentMenuItem: 'addPublications',
};

const useAppStore = create<State & Actions>()((set) => ({
  ...defaultState,
  setMainMenuCollapsed: (mainMenuCollapsed: boolean) =>
    set(() => ({ mainMenuCollapsed })),
  setCurrentMenuItem: (currentMenuItem: string) =>
    set(() => ({ currentMenuItem })),
}));

export default useAppStore;
