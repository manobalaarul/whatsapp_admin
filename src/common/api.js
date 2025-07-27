import Axios from '../utils/axios';
import SummaryApi from './Summaryapi';

// Authentication helper functions
export const authAPI = {
  // Login function
  login: async (email, password) => {
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: { email, password }
      });
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // navigate("/");
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Register function
  register: async (userData) => {
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: userData
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout function
  logout: async () => {
    try {
      await Axios(SummaryApi.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Verify token function
  verifyToken: async () => {
    try {
      const response = await Axios(SummaryApi.verifyToken);
      return response.data;
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error.response?.data || error.message;
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  // Get current token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }
};

export { Axios, SummaryApi };
export default Axios;