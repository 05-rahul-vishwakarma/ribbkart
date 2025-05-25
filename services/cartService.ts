import { API_ENDPOINTS } from '../api_endpoints';

export const getCart = (token: string) => fetch(API_ENDPOINTS.cart.get, {
  headers: { Authorization: `Bearer ${token}` },
}); 