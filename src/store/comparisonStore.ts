import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ComparisonProduct {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  specifications?: Record<string, string>;
}

interface ComparisonStore {
  products: ComparisonProduct[];
  addProduct: (product: ComparisonProduct) => void;
  removeProduct: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  canAddMore: () => boolean;
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        const { products } = get();

        // Maximum 4 products for comparison
        if (products.length >= 4) {
          return;
        }

        // Check if product already in comparison
        if (products.some((p) => p.id === product.id)) {
          return;
        }

        set({ products: [...products, product] });
      },

      removeProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },

      clearComparison: () => {
        set({ products: [] });
      },

      isInComparison: (productId) => {
        return get().products.some((p) => p.id === productId);
      },

      canAddMore: () => {
        return get().products.length < 4;
      },
    }),
    {
      name: 'comparison-storage',
    }
  )
);
