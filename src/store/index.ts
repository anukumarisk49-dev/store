import { create } from 'zustand';

interface AuthStore {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
  setToken: (token: string) => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
}));

// Wishlist Store
interface WishlistStore {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (productId: string) => {
    const { items } = get();
    if (!items.includes(productId)) {
      set({ items: [...items, productId] });
    }
  },

  removeItem: (productId: string) => {
    const { items } = get();
    set({ items: items.filter((id) => id !== productId) });
  },

  isFavorite: (productId: string) => {
    const { items } = get();
    return items.includes(productId);
  },
}));

// Filter Store
interface FilterStore {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sortBy?: 'price' | 'rating' | 'discount';
  setFilters: (filters: Partial<FilterStore>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: undefined,
  priceMin: undefined,
  priceMax: undefined,
  rating: undefined,
  sortBy: undefined,

  setFilters: (filters) => set(filters),
  resetFilters: () => set({
    category: undefined,
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
    sortBy: undefined,
  }),
}));
