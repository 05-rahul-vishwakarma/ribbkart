import { API_ENDPOINTS } from '../api_endpoints';

export const register = (data: any) => fetch(API_ENDPOINTS.auth.register, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export const login = (data: any) => fetch(API_ENDPOINTS.auth.login, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export const logout = (token: string) => fetch(API_ENDPOINTS.auth.logout, {
  method: 'GET',
  headers: { Authorization: `Bearer ${token}` },
});

export const me = (token: string) => fetch(API_ENDPOINTS.auth.me, {
  method: 'GET',
  headers: { Authorization: `Bearer ${token}` },
});

export const updatePassword = (token: string, data: any) => fetch(API_ENDPOINTS.auth.updatePassword, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data),
});

export const forgotPassword = (data: any) => fetch(API_ENDPOINTS.auth.forgotPassword, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export const resetPassword = (resettoken: string, data: any) => fetch(API_ENDPOINTS.auth.resetPassword(resettoken), {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}); 