import { publicInstance, privateInstance } from '../axiosInstance';
import { API_ENDPOINTS } from '../api_endpoints';

export const register = (data: any) => publicInstance.post(API_ENDPOINTS.auth.register, data);

export const login = (data: any) => publicInstance.post(API_ENDPOINTS.auth.login, data);

export const logout = () => privateInstance.get(API_ENDPOINTS.auth.logout);

export const me = () => privateInstance.get(API_ENDPOINTS.auth.me);

export const updatePassword = (data: any) => privateInstance.put(API_ENDPOINTS.auth.updatePassword, data);

export const forgotPassword = (data: any) => publicInstance.post(API_ENDPOINTS.auth.forgotPassword, data);

export const resetPassword = (resettoken: string, data: any) => publicInstance.put(API_ENDPOINTS.auth.resetPassword(resettoken), data); 