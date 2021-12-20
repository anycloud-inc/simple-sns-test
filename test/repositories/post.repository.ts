import api from '../lib/api'

export const postRepository = {
  async create(token: string, body: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return await api.post('/posts', { post: { body } })
  },

  async find(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return await api.get('/posts')
  },
}
