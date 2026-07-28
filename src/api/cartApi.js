import apiClient from './apiClient';

export const cartApi = {
  getCart: async (cartId) => {
    // Returns ShoppingCart schema
    const response = await apiClient.get(`/api/cart/${cartId}`);
    return response.data;
  },

  deleteCart: async (cartId) => {
    // Returns 204 No Content
    const response = await apiClient.delete(`/api/cart/${cartId}`);
    return response.data;
  },

  updateCartItem: async (data) => {
    // schema: UpdateCartItemCommand { cartId, productId, quantity }
    const response = await apiClient.put('/api/cart/items', data);
    return response.data;
  }
};