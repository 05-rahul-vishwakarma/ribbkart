import { privateInstance } from '../axiosInstance';
import { API_ENDPOINTS } from '../api_endpoints';

export const getCart = () => privateInstance.get(API_ENDPOINTS.cart.get); 