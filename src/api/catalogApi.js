import apiClient from './apiClient';

export const catalogApi = {
  getCategories: async () => {
    // Returns an array of CategoryDto
    const response = await apiClient.get('/api/catalog/categories');
    return response.data;
  },

  getProducts: async (params = {}) => {
    // Accepts params: PageNumber, PageSize, CategoryId, MinPrice, MaxPrice, SearchTerm, SortOrder
    // Returns ProductDtoPagedList
    const response = await apiClient.get('/api/catalog/products', { params });
    return response.data;
  }
};