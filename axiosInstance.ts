import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const publicInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token only to privateInstance
privateInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
