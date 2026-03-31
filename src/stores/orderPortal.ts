import { create } from 'zustand';

interface OrderPortalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useOrderPortalStore = create<OrderPortalState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
