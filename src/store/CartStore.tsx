import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  procod: string;
  title: string;
  img_url: string;
  price?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isPriceHidden: boolean;
  isOpen: boolean; // NOVO: Controle da gaveta
  
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (procod: string) => void;
  updateQuantity: (procod: string, quantity: number) => void;
  clearCart: () => void;
  togglePriceVisibility: (hidden: boolean) => void;
  
  // NOVOS: Ações da gaveta
  openCart: () => void;
  closeCart: () => void;
  
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isPriceHidden: true,
      isOpen: false, // Começa fechada

      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.procod === newItem.procod);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.procod === newItem.procod
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true, // NOVO: Abre a sacola automaticamente ao adicionar!
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
        });
      },

      removeItem: (procod) => {
        set((state) => ({
          items: state.items.filter((item) => item.procod !== procod),
        }));
      },

      updateQuantity: (procod, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.procod === procod ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      togglePriceVisibility: (hidden) => set({ isPriceHidden: hidden }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0),
    }),
    {
      name: 'profilter-cart-storage',
    }
  )
);