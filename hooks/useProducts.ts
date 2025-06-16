import { useProductStore } from '../stores/productStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllProducts,
  getFeaturedProducts,
  getProduct,
  getProductsByCategory,
} from '../services/productService';
import { useEffect } from 'react';

export const useProducts = () => {
  const { setProducts, setFeaturedProducts, setProduct, setLoading, setError, loading, error, products, setRefetchAllProducts } = useProductStore();
  const queryClient = useQueryClient();

  const { data: productsData, isLoading: productsLoading, error: productsError, refetch } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllProducts();
        setProducts(response.data?.data);
        return response.data?.data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setRefetchAllProducts(refetch);
  }, [refetch, setRefetchAllProducts]);

  const { data: featuredProducts, isLoading: featuredProductsLoading, error: featuredProductsError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getFeaturedProducts();
        setFeaturedProducts(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
  });

  // const fetchProductById = (id: string) => {
  //   const { data: product, isLoading: productLoading, error: productError } = useQuery({
  //     queryKey: ['product', id],
  //     queryFn: async () => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const response = await getProduct(id);
  //         // setProduct(response.data);
  //         return response.data?.data;
  //       } catch (err: any) {
  //         setError(err.message);
  //         throw err;
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     enabled: !!id,
  //   });
  //   return { product, productLoading, productError };
  // };

  const fetchProductsByCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    console.log(categoryId,'categoryId')
    try {
      const response = await getProductsByCategory(categoryId);
      setProducts(response.data?.data);
      console.log(response?.data?.data)
      return response.data?.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    productsLoading,
    productsError,
    featuredProducts,
    featuredProductsLoading,
    featuredProductsError,
    fetchProductById,
    fetchProductsByCategory,
    refetchAllProducts: refetch,
  };
}; 