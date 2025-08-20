import api from './api';

export const userService = {
  // Buscar todos os usuarios do cabaré
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  // Buscar usuário por ID
  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Buscar posts de um fdp específico
  async getUserPosts(userId) {
    const response = await api.get(`/posts?userId=${userId}`);
    return response.data;
  }
};
