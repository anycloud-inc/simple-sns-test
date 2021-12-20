import api from '../lib/api'

export const postRepository = {
  async create(body: string) {
    const { data } = await api.post('/posts', { post: { body } })
    return data.post
  },
}
