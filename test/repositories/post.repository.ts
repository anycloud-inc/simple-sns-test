import api from '../lib/api'

export const postRepository = {
  async create(body: string) {
    return await api.post('/posts', { post: { body } })
  },

  async find() {
    return await api.get('/posts')
  },

  async findOne(id: number) {
    return await api.get(`/posts/${id}`)
  },

  async delete(id: number) {
    return await api.delete(`/posts/${id}`)
  },
}
