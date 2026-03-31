import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categorySlug: string;
}

const TAX_RATE = 0.1025;
const DELIVERY_FEE = 3.99;
const FREE_DELIVERY_THRESHOLD = 30;

interface CartState {
  items: CartItem[];
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // Computed (functions to keep store serializable)
  cartCount: () => number;
  subtotal: () => number;
  tax: () => number;
  deliveryFee: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      cartCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      tax: () => get().subtotal() * TAX_RATE,

      deliveryFee: () =>
        get().subtotal() > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE,

      total: () => get().subtotal() + get().tax() + get().deliveryFee(),
    }),
    {
      name: 'jubilee-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
