import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Base URL should be your backend API
export const API_URL = "https://api.university-portal.com";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token (if you have refresh token logic)
        const refreshToken = await SecureStore.getItemAsync("refresh_token");

        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { token } = response.data;

          // Save the new token
          await SecureStore.setItemAsync("auth_token", token);

          // Update the failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;

          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing token fails, redirect to login
        await SecureStore.deleteItemAsync("auth_token");
        await SecureStore.deleteItemAsync("refresh_token");

        // Return a rejected promise - the error handler will redirect to login
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
