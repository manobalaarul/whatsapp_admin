import axios from "axios";
import { baseUrl } from "../common/Summaryapi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    // Get token from localStorage or your state management
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login or trigger logout
      window.location.href = '/whatsapp_admin/auth/login';
    }
    return Promise.reject(error);
  }
);


export default Axios;