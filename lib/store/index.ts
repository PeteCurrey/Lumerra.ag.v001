import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ── Cart Store ──────────────────────────────────────────── */

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  brandName: string;
  brand?: string; // added for compat
  slug: string;
  imageUrl: string;
  image?: string; // added for compat
  price: number; // pounds
  deposit?: number; // pounds
  variantName?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === item.productId && i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] }));
        }
        set({ isOpen: true });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'lumerra-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

/* ── UI Store ────────────────────────────────────────────── */

interface UIStore {
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isMobileNavOpen: false,
  isSearchOpen: false,
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));

/* ── Configurator Store ──────────────────────────────────── */

export interface ConfiguratorAnswers {
  capacity?: number;
  goal?: 'wellness' | 'family' | 'entertaining' | 'holiday_let';
  power?: '13_amp' | '32_amp' | 'unsure';
  seatPreference?: 'lounger' | 'all_seats' | 'no_preference';
  budget?: 'under_7k' | '7k_10k' | '10k_15k' | '15k_plus';
  gardenPhotoUrl?: string;
}

interface ConfiguratorStore {
  step: number;
  answers: ConfiguratorAnswers;
  isComplete: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setAnswer: <K extends keyof ConfiguratorAnswers>(key: K, value: ConfiguratorAnswers[K]) => void;
  complete: () => void;
  reset: () => void;
}

export const useConfiguratorStore = create<ConfiguratorStore>()((set) => ({
  step: 1,
  answers: {},
  isComplete: false,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 6) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  setAnswer: (key, value) =>
    set((state) => ({ answers: { ...state.answers, [key]: value } })),
  complete: () => set({ isComplete: true }),
  reset: () => set({ step: 1, answers: {}, isComplete: false }),
}));
