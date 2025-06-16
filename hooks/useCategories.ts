import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getCategory } from '@/services/categoryService';
import { Category } from '@/components/product/CategoryCard';

export const useCategories = (id?: string) => {
  return useQuery<Category[] | Category | undefined>({
    queryKey: ['categories', id],
    queryFn: () => (id ? getCategory(id) : getAllCategories()),
  });
}; 