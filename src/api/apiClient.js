import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://shopper-k30n.onrender.com',
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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Avoid intercepting the refresh endpoint itself if it fails with 401
      if (originalRequest.url.includes('/auth/refresh')) {
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
        // Retrieve the refresh token (adjust key if yours is named differently)
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          alert("No refresh token")
          throw new Error('No refresh token available');
        }

        // Call your backend refresh endpoint
        // NOTE: Replace '/auth/refresh' with your actual refresh route
        console.log("sent the refresh request")
        console.log("sent the refresh request")
        console.log("sent the refresh request")
        console.log("sent the refresh request")
        console.log("sent the refresh request")
        console.log("sent the refresh request")
        const response = await axios.post(
          'https://shopper-k30n.onrender.com/auth/refresh',
          { "refreshToken": refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        // Extract new tokens (adjust property names based on your backend response)
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // Update default headers and the failed request header
        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Release queued requests with the new token
        processQueue(null, accessToken);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed or expired -> reject queue and log out
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
  alert("Session expired. Kindly login to continue.");
  window.location.replace('/auth/login');
}

export default apiClient;