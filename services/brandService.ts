import { publicInstance, privateInstance } from '../axiosInstance';
import { API_ENDPOINTS } from '../api_endpoints';

export const getAllBrands = () => publicInstance.get(API_ENDPOINTS.brands.all);
export const getBrand = (id: string) => publicInstance.get(API_ENDPOINTS.brands.single(id));

export const createBrand = (data: any) => privateInstance.post(API_ENDPOINTS.brands.create, data);

export const updateBrand = (id: string, data: any) => privateInstance.put(API_ENDPOINTS.brands.update(id), data);

export const deleteBrand = (id: string) => privateInstance.delete(API_ENDPOINTS.brands.delete(id)); 