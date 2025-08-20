import api from './api';

export const postService = {
  // Buscar a porra detodos os posts
  async getPosts() {
    const response = await api.get('/posts');
    return response.data;
  },

  // Buscar post por ID
  async getPostById(id) {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Buscar comentários de um klr de um post específico
  async getCommentsByPost(postId) {
    const response = await api.get(`/comments?postId=${postId}`);
    return response.data;
  }
};
