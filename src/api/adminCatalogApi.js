import apiClient from './apiClient';

export const adminCatalogApi = {
  createCategory: async (data) => {
    // schema: CreateCategoryCommand { name, slug }
    const response = await apiClient.post('/api/admin/catalog/categories', data);
    return response.data;
  },

  createProduct: async (data) => {
    // schema: CreateProductCommand { name, description, price, stockQuantity, categoryId, imageUrl }
    const response = await apiClient.post('/api/admin/catalog/products', data);
    return response.data;
  }
};