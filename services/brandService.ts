import { API_ENDPOINTS } from '../api_endpoints';

export const getAllBrands = () => fetch(API_ENDPOINTS.brands.all);
export const getBrand = (id: string) => fetch(API_ENDPOINTS.brands.single(id));

export const createBrand = (token: string, data: any) => fetch(API_ENDPOINTS.brands.create, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const updateBrand = (token: string, id: string, data: any) => fetch(API_ENDPOINTS.brands.update(id), {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const deleteBrand = (token: string, id: string) => fetch(API_ENDPOINTS.brands.delete(id), {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` },
}); 