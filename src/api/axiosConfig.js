import axios from 'axios';

const apiClient = axios.create({
 
  baseURL: process.env.SHOPPER_API_URL || 'https://localhost:5142', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the JWT token if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration (e.g., trigger refresh-token or logout)
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;