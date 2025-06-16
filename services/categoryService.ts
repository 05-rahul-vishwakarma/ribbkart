import { publicInstance } from '../axiosInstance';
import { API_ENDPOINTS } from '../api_endpoints';
import { Category } from '@/components/product/CategoryCard';

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await publicInstance.get(API_ENDPOINTS.categories.all);
    return response.data.data;
};

export const getCategory = async (id: string): Promise<Category> => {
    const response = await publicInstance.get(API_ENDPOINTS.categories.single(id));
    return response.data.data;
};
