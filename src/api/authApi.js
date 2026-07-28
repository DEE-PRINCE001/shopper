import apiClient from './apiClient';

export const authApi = {
  register: async (data) => {
    // schema: RegisterUserCommand { firstName, lastName, email, password }
    const response = await apiClient.post('/api/Auth/register', data);
    return response.data;
  },

  login: async (data) => {
    // schema: LoginCommand { email, password }
    const response = await apiClient.post('/api/Auth/login', data);
    return response.data;
  },

  refreshToken: async (data) => {
    // schema: RefreshTokenCommand { accessToken, refreshToken }
    const response = await apiClient.post('/api/Auth/refresh-token', data);
    return response.data;
  },

  forgotPassword: async (data) => {
    // schema: ForgotPasswordCommand { email }
    const response = await apiClient.post('/api/Auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data) => {
    // schema: ResetPasswordCommand { token, newPassword }
    const response = await apiClient.post('/api/Auth/reset-password', data);
    return response.data;
  }
};