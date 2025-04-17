import { createStore } from "zustand/vanilla";

export type SidebarState = {
  sidebarVisibility: boolean;
  sidebarShrink: boolean;
};

export type SidebarActions = {
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebarShrink: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const defaultInitState: SidebarState = {
  sidebarVisibility: false,
  sidebarShrink: false,
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState,
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    showSidebar: () => set(() => ({ sidebarVisibility: true })),
    hideSidebar: () =>
      set(() => ({ sidebarVisibility: false, sidebarShrink: false })),
    toggleSidebarShrink: () =>
      set((state) => ({ sidebarShrink: !state.sidebarShrink })),
  }));
};
