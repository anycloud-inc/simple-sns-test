import * as qs from 'qs'
import api from '../lib/api'
import { PaginationParams } from '../lib/pagination'

export const postRepository = {
  async create(body: string) {
    return await api.post('/posts', { post: { body } })
  },

  async find(pagination?: PaginationParams) {
    const paramsSerializer = (params: any) => qs.stringify(params)
    return await api.get('/posts', {
      params: { pagination },
      paramsSerializer,
    })
  },

  async findOne(id: number) {
    return await api.get(`/posts/${id}`)
  },

  async delete(id: number) {
    return await api.delete(`/posts/${id}`)
  },
}
