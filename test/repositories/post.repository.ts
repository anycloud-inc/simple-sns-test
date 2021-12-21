import api from '../lib/api'
import { PaginationParams } from '../lib/pagination'

export const postRepository = {
  async create(body: string) {
    return await api.post('/posts', { post: { body } })
  },

  async find(pagination?: PaginationParams) {
    return await api.get('/posts', {
      params: { pagination },
    })
  },

  async findOne(id: number) {
    return await api.get(`/posts/${id}`)
  },

  async delete(id: number) {
    return await api.delete(`/posts/${id}`)
  },
}
