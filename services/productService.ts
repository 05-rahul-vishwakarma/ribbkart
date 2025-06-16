import { API_ENDPOINTS } from '../api_endpoints';
import axios from 'axios';

export const getAllProducts = () => axios.get(API_ENDPOINTS.products.all);
export const getProduct = (id: string) => axios.get(API_ENDPOINTS.products.single(id));
export const getFeaturedProducts = () => axios.get(API_ENDPOINTS.products.featured);

export const getRelatedProducts = (id: string) => axios.get(API_ENDPOINTS.products.related(id));
export const getProductsByCategory = (categoryId: string) =>
  axios.get(`${API_ENDPOINTS.products.all}?category=${categoryId}`);
