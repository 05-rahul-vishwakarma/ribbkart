import { API_ENDPOINTS } from '../api_endpoints';

export const getUsers = (token: string) => fetch(API_ENDPOINTS.admin.users, {
  headers: { Authorization: `Bearer ${token}` },
});

export const updateUserRole = (token: string, id: string, data: any) => fetch(API_ENDPOINTS.admin.updateUserRole(id), {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const getDashboard = (token: string) => fetch(API_ENDPOINTS.admin.dashboard, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getSalesAnalytics = (token: string) => fetch(API_ENDPOINTS.admin.salesAnalytics, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getInventoryAnalytics = (token: string) => fetch(API_ENDPOINTS.admin.inventoryAnalytics, {
  headers: { Authorization: `Bearer ${token}` },
}); 