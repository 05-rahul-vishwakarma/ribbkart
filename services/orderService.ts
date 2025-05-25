import { API_ENDPOINTS } from '../api_endpoints';

export const getMyOrders = (token: string) => fetch(API_ENDPOINTS.orders.myOrders, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getOrder = (token: string, id: string) => fetch(API_ENDPOINTS.orders.single(id), {
  headers: { Authorization: `Bearer ${token}` },
});

export const createOrder = (token: string, data: any) => fetch(API_ENDPOINTS.orders.create, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const updateOrderStatus = (token: string, id: string, data: any) => fetch(API_ENDPOINTS.orders.updateStatus(id), {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
}); 