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
  },

  updateProduct: async (data) => {
    // schema: UpdateProductCommand {id, name, description, price, stockQuantity, categoryId, imageUrl }
    const response = await apiClient.put('/api/admin/catalog/products', data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(
      '/api/admin/catalog/products',
      {
        data: {
          id: id
        }
      }
    );

    return response.data;
  }
};