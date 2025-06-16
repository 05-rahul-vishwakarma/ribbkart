import { privateInstance } from '../axiosInstance';
import { API_ENDPOINTS } from '../api_endpoints';

export const getMyOrders = () => privateInstance.get(API_ENDPOINTS.orders.myOrders);

export const getOrder = (id: string) => privateInstance.get(API_ENDPOINTS.orders.single(id));

export const createOrder = (data: any) => privateInstance.post(API_ENDPOINTS.orders.create, data);

export const updateOrderStatus = (id: string, data: any) => privateInstance.put(API_ENDPOINTS.orders.updateStatus(id), data); 