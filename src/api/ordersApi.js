import apiClient from './apiClient';

export const ordersApi = {
    checkout: async (data) => {
        // schema: CheckoutRequest { cartId, shippingAddress, paymentToken }
        const response = await apiClient.post('/api/orders/checkout', data);
        return response.data;
    },

    getOrderHistory: async () => {
        // Returns array of OrderHistoryDto for the current user
        const response = await apiClient.get('/api/orders/history');
        return response.data;
    },

    getOrders: async () => {
        // Returns array of OrderHistoryDto (likely an admin or general query route)
        const response = await apiClient.get('/api/orders');
        return response.data;
    },

    updateOrderStatus: async (id, data) => {
        // schema: UpdateStatusRequest { status: 1 | 2 | 3 | 4 | 5 }
        const response = await apiClient.patch(`/api/orders/${id}/status`, data);
        return response.data;
    }
};