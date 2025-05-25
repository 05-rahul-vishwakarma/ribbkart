import { API_ENDPOINTS } from '../api_endpoints';

export const getAllCategories = () => fetch(API_ENDPOINTS.categories.all);
export const getCategory = (id: string) => fetch(API_ENDPOINTS.categories.single(id));

export const createCategory = (token: string, data: any) => fetch(API_ENDPOINTS.categories.create, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const updateCategory = (token: string, id: string, data: any) => fetch(API_ENDPOINTS.categories.update(id), {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const deleteCategory = (token: string, id: string) => fetch(API_ENDPOINTS.categories.delete(id), {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` },
}); 