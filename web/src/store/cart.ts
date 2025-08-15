import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  priceInCents: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalInCents: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) =>
        set(state => {
          const exists = state.items.find(i => i.id === item.id);
          if (exists) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),
      remove: id =>
        set(state => ({ items: state.items.filter(i => i.id !== id) })),
      clear: () => set({ items: [] }),
      totalInCents: () =>
        get().items.reduce((acc, i) => acc + i.priceInCents * i.quantity, 0),
      count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: 'capputeeno:cart' },
  ),
);
