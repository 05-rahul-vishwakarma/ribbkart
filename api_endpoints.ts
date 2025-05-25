const BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  auth: {
    register: `${BASE_URL}/auth/register`,
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
    me: `${BASE_URL}/auth/me`,
    updatePassword: `${BASE_URL}/auth/updatepassword`,
    forgotPassword: `${BASE_URL}/auth/forgotpassword`,
    resetPassword: (resettoken: string) => `${BASE_URL}/auth/resetpassword/${resettoken}`,
  },
  admin: {
    users: `${BASE_URL}/admin/users`,
    updateUserRole: (id: string) => `${BASE_URL}/admin/users/${id}/role`,
    dashboard: `${BASE_URL}/admin/dashboard`,
    salesAnalytics: `${BASE_URL}/admin/analytics/sales`,
    inventoryAnalytics: `${BASE_URL}/admin/analytics/inventory`,
  },
  products: {
    all: `${BASE_URL}/products`,
    single: (id: string) => `${BASE_URL}/products/${id}`,
    featured: `${BASE_URL}/products/featured`,
    related: (id: string) => `${BASE_URL}/products/${id}/related`,
    create: `${BASE_URL}/products`,
    update: (id: string) => `${BASE_URL}/products/${id}`,
    delete: (id: string) => `${BASE_URL}/products/${id}`,
    createBulk: `${BASE_URL}/api/v1/products/bulk`,
    createMaterial: `${BASE_URL}/api/v1/products`,
    createClothing: `${BASE_URL}/api/v1/products`,
  },
  categories: {
    all: `${BASE_URL}/categories`,
    single: (id: string) => `${BASE_URL}/categories/${id}`,
    create: `${BASE_URL}/categories`,
    update: (id: string) => `${BASE_URL}/categories/${id}`,
    delete: (id: string) => `${BASE_URL}/categories/${id}`,
  },
  brands: {
    all: `${BASE_URL}/brands`,
    single: (id: string) => `${BASE_URL}/brands/${id}`,
    create: `${BASE_URL}/brands`,
    update: (id: string) => `${BASE_URL}/brands/${id}`,
    delete: (id: string) => `${BASE_URL}/brands/${id}`,
  },
  orders: {
    myOrders: `${BASE_URL}/orders`,
    single: (id: string) => `${BASE_URL}/orders/${id}`,
    create: `${BASE_URL}/orders`,
    updateStatus: (id: string) => `${BASE_URL}/orders/${id}/status`,
  },
  cart: {
    get: `${BASE_URL}/cart`,
  },
  reviews: {
    delete: (productId: string, reviewId: string) => `${BASE_URL}/products/${productId}/reviews/${reviewId}`,
  },
}; 