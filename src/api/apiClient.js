import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://shopper-k30n.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- State for handling concurrent 401s ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// --- Request Interceptor ---
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

// --- Response Interceptor ---
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already retried this request
    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
      // Avoid intercepting the refresh endpoint itself if it fails with 401
      if (originalRequest.url && originalRequest.url.toLowerCase().includes('/api/auth/refresh-token')) {
        handleLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If a refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          handleLogout();
          return Promise.reject(new Error('No refresh token available'));
        }

        // Call backend refresh endpoint
        const response = await axios.post(
          `${API_BASE_URL}/api/Auth/refresh-token`,
          {
            accessToken: accessToken || '',
            refreshToken: refreshToken,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data || {};

        if (!newAccessToken) {
          throw new Error('Refresh failed - invalid response token');
        }

        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// --- Helper to clean up state on total authentication failure ---
function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  if (window.location.pathname !== '/auth/login' && !window.location.pathname.startsWith('/auth/')) {
    toast.error('Session expired. Please log in again.');
    setTimeout(() => {
      window.location.replace('/auth/login');
    }, 1200);
  }
}

export default apiClient;