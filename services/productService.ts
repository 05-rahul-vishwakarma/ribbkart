import { API_ENDPOINTS } from '../api_endpoints';

export const getAllProducts = () => fetch(API_ENDPOINTS.products.all);
export const getProduct = (id: string) => fetch(API_ENDPOINTS.products.single(id));
export const getFeaturedProducts = () => fetch(API_ENDPOINTS.products.featured);
export const getRelatedProducts = (id: string) => fetch(API_ENDPOINTS.products.related(id));

export const createProduct = (token: string, data: any) => fetch(API_ENDPOINTS.products.create, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const updateProduct = (token: string, id: string, data: any) => fetch(API_ENDPOINTS.products.update(id), {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const deleteProduct = (token: string, id: string) => fetch(API_ENDPOINTS.products.delete(id), {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` },
});

export const createBulkProducts = (token: string, data: any) => fetch(API_ENDPOINTS.products.createBulk, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const createMaterialProduct = (token: string, data: any) => fetch(API_ENDPOINTS.products.createMaterial, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const createClothingProduct = (token: string, data: any) => fetch(API_ENDPOINTS.products.createClothing, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
}); 