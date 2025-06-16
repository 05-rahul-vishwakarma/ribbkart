import { create } from 'zustand';

interface ProductState {
  products: any[];
  featuredProducts: any[];
  product: any | null;
  loading: boolean;
  error: string | null;
  refetchAllProducts?: () => void;
  setProducts: (products: any[]) => void;
  setFeaturedProducts: (featuredProducts: any[]) => void;
  setProduct: (product: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setRefetchAllProducts: (refetch: () => void) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  featuredProducts: [],
  product: null,
  loading: false,
  error: null,
  refetchAllProducts: undefined,

  setProducts: (products) => set({ products }),
  setFeaturedProducts: (featuredProducts) => set({ featuredProducts }),
  setProduct: (product) => set({ product }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setRefetchAllProducts: (refetch) => set({ refetchAllProducts: refetch }),
})); 